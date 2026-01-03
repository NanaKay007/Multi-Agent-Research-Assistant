from langchain.tools import tool
from langchain_core.messages import AIMessage
from agents.base import BaseAgent
from agents.research import ResearchAgent
from service.agents.fact_checker import FactCheckAgent

class SupervisorAgent(BaseAgent):
    """
    Determines what sub-agents to invoke based on human message
    """
    def __init__(self):
        tools = [self.invoke_fact_check, self.invoke_research, self.invoke_summarization]
        super().__init__(
            system_prompt="You are a helpful assistant tasked with answering any queries the user might have. You have specialized tools at your disposal. Use them at your convenience if it helps you answer the user's query.",
            tools=tools)
    
    @tool
    def invoke_research(message: str):
        """
        Invokes a specialized research agent capable of performing web search.

        :param message: research instructions for the research agent
        :type message: str
        """
        agent = ResearchAgent()
        return agent.agent_task.invoke([AIMessage(content=message)])
    
    @tool
    def invoke_fact_check(message: str):
        """
        Invokes a specialized fact check agent capable of fact-checking claims based on shared documents
        or web research results.
        
        :param message: fact check instructions for the fact check agent
        :type message: str
        """
        agent = FactCheckAgent()
        return agent.agent_task.invoke([AIMessage(message)])