from rest_framework.views import APIView
from rest_framework.response import Response
from src.data_access.market_data import get_market_quotes, get_index_quotes, get_stock_history


class MarketDataView(APIView):
    def get(self, request):
        quotes = get_market_quotes()
        return Response(quotes)


class IndexQuotesView(APIView):
    def get(self, request):
        quotes = get_index_quotes()
        return Response(quotes)


class StockHistoryView(APIView):
    def get(self, request, ticker):
        period = request.query_params.get("period", "1mo")
        allowed = {"1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "max"}
        if period not in allowed:
            period = "1mo"
        data = get_stock_history(ticker.upper(), period)
        return Response(data)
