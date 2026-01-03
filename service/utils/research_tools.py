from tavily import TavilyClient
import os

class ResearchTools:
    def __init__(self):
        self.client = TavilyClient(os.environ["TAVILY_API_KEY"])

    def search_query(self, query, include_domains, max_results):
        return self.client.search(
            query, "advanced", include_domains=include_domains, max_results=max_results
        )