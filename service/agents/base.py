from types import FunctionType
from langchain.chat_models import init_chat_model
from langchain_core.tools import BaseTool
from langgraph.func import task, entrypoint
from langgraph.graph import add_messages
from langchain_core.messages import BaseMessage, ToolCall, SystemMessage


class BaseAgent:
    def __init__(
        self,
        system_prompt,
        model_name="claude-sonnet-4-5-20250929",
        tools: list[BaseTool] = [],
    ):
        self.system_prompt = system_prompt
        model = init_chat_model(model_name, temperature=0)
        self.model_with_tools = model.bind_tools(tools)
        self.tools_by_name = {tool.name: tool for tool in tools}
        
        # create tasks
        self.call_llm_task = task(self.call_llm)
        self.call_tool_task = task(self.call_tool)
        
        # register entry point
        self.agent_task = entrypoint()(self.agent)
            
    def call_tool(self, tool_call: ToolCall):
        tool = self.tools_by_name[tool_call["name"]]
        return tool.invoke(tool_call)
    
    def call_llm(self, messages: list[BaseMessage]):
        return self.model_with_tools.invoke(
            [
                SystemMessage(
                    content=self.system_prompt
                )
            ] + messages
        )
            
    def agent(self, messages: list[BaseMessage]):
        response = self.call_llm_task(messages).result()
        
        while True:
            if not response.tool_calls:
                break
            
            tool_result_futures = [
                self.call_tool_task(tool_call) for tool_call in response.tool_calls
            ]
            tool_results = [fut.result() for fut in tool_result_futures]
            
            messages = add_messages(messages, [response, *tool_results])
            
            response = self.call_llm_task(messages).result()
        messages = add_messages(messages, response)
        return messages
