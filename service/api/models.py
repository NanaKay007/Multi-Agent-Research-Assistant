from pydantic import BaseModel
from langchain_core.messages import HumanMessage

class Message(BaseModel):
    message: str
    
    def to_human_message(self):
        return HumanMessage(content=self.message)