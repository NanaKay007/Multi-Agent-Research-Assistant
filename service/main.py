from fastapi import FastAPI
from api.models import Message
from agents.supervisor import SupervisorAgent
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

@app.get("/")
def health():
    return {"Hello": "World"}


@app.post("/send-messsage-to-agent")
def invoke_agent(message: Message):
    agent = SupervisorAgent()
    response = agent.agent_task.invoke([message.to_human_message()])
    return {
        "response": response
    }