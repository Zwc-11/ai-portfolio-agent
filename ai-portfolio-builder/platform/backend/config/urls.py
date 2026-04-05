import sys
from pathlib import Path

# Add frontend to path so its views module is importable
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent / "frontend"))

from django.urls import path
from routes.portfolio import BuildPortfolioView
from routes.market import MarketDataView, IndexQuotesView, StockHistoryView
from routes.news import NewsView
from views import index

urlpatterns = [
    path("", index),
    path("api/build-portfolio", BuildPortfolioView.as_view()),
    path("api/market-data", MarketDataView.as_view()),
    path("api/index-quotes", IndexQuotesView.as_view()),
    path("api/stock-history/<str:ticker>", StockHistoryView.as_view()),
    path("api/news", NewsView.as_view()),
]
