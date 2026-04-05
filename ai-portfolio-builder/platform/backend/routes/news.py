from rest_framework.views import APIView
from rest_framework.response import Response
from src.data_access.news_feed import get_news


class NewsView(APIView):
    def get(self, request):
        articles = get_news()
        return Response(articles)
