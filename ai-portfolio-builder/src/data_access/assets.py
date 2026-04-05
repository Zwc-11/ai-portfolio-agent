"""Starter asset universe for the MVP demo."""

ASSET_UNIVERSE = {
    "VOO": {"name": "Vanguard S&P 500 ETF", "type": "etf", "category": "broad_market"},
    "SPY": {"name": "SPDR S&P 500 ETF", "type": "etf", "category": "broad_market"},
    "QQQ": {"name": "Invesco QQQ Trust", "type": "etf", "category": "growth"},
    "VXUS": {"name": "Vanguard Total Intl Stock ETF", "type": "etf", "category": "international"},
    "SCHD": {"name": "Schwab US Dividend Equity ETF", "type": "etf", "category": "dividend"},
    "MSFT": {"name": "Microsoft", "type": "stock", "category": "tech"},
    "AAPL": {"name": "Apple", "type": "stock", "category": "tech"},
    "NVDA": {"name": "NVIDIA", "type": "stock", "category": "tech"},
    "BRK-B": {"name": "Berkshire Hathaway B", "type": "stock", "category": "value"},
    "COST": {"name": "Costco", "type": "stock", "category": "consumer"},
}

TICKER_LIST = list(ASSET_UNIVERSE.keys())
