from agents.base import BaseAgent
from langchain.tools import tool
from ..utils.research_tools import ResearchTools

class FactCheckAgent(BaseAgent):
    def __init__(self):
        super.__init__(
            """
            You are a fact check agent. Your have access to a web search tool that allows you to browse known websites with credible information.
            Sites with credible information are typically research-based sites like arXiv. You are free to use other research-based or trusted academic outlets as well.
            """,
            tools=[]
        )
        
    def invoke_factcheck(query, include_domains, max_results):
        """
        Docstring for invoke_factcheck
        
        :param query: brief query to fact check against
        :param include_domains: public trusted fact-checking websites to browse
        :param max_results: size of results
        """
        client = ResearchTools()
        return client.search_query(query, include_domains, max_results)
