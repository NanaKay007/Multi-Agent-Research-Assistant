from agents.base import BaseAgent
from langchain.tools import tool
from ..utils.research_tools import ResearchTools

class ResearchAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            """
            You are a research agent. You have multiple internet search capabilities presented as tools. 
            Use what you need to obtain the best result
            """,
            tools=[self.invoke_websearch],
        )

    @tool
    def invoke_websearch(query, include_domains, max_results):
        """
        Performs AI-enhanced websearch

        :param query: brief query to search for
        :param include_domains: public domains to search
        :param max_results: size of results
        """
        client = ResearchTools()
        return client.search_query(query, include_domains, max_results)
