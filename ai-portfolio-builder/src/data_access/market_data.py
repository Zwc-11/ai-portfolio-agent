"""Fetch live market data using yfinance."""

import math
import yfinance as yf
from src.data_access.assets import TICKER_LIST

INDEX_TICKERS = ["^GSPC", "^IXIC", "^DJI"]
INDEX_NAMES = {"^GSPC": "S&P 500", "^IXIC": "NASDAQ", "^DJI": "DOW"}


def get_market_quotes(tickers=None):
    tickers = tickers or TICKER_LIST
    results = []
    try:
        data = yf.download(tickers, period="2d", group_by="ticker", progress=False)
    except Exception:
        return results

    for ticker in tickers:
        try:
            if len(tickers) == 1:
                hist = data
            else:
                hist = data[ticker]
            if hist.empty or len(hist) < 2:
                continue
            prev_close = float(hist["Close"].iloc[-2])
            current = float(hist["Close"].iloc[-1])
            if math.isnan(prev_close) or math.isnan(current):
                continue
            change = current - prev_close
            change_pct = (change / prev_close) * 100
            results.append({
                "ticker": ticker,
                "price": round(current, 2),
                "change": round(change, 2),
                "change_pct": round(change_pct, 2),
            })
        except (KeyError, IndexError):
            continue
    return results


def get_index_quotes():
    results = []
    try:
        data = yf.download(INDEX_TICKERS, period="2d", group_by="ticker", progress=False)
    except Exception:
        return results

    for ticker in INDEX_TICKERS:
        try:
            hist = data[ticker]
            if hist.empty or len(hist) < 2:
                continue
            prev_close = float(hist["Close"].iloc[-2])
            current = float(hist["Close"].iloc[-1])
            change_pct = ((current - prev_close) / prev_close) * 100
            results.append({
                "ticker": ticker,
                "name": INDEX_NAMES.get(ticker, ticker),
                "price": round(current, 2),
                "change_pct": round(change_pct, 2),
            })
        except (KeyError, IndexError):
            continue
    return results


def get_stock_history(ticker, period="1mo"):
    try:
        t = yf.Ticker(ticker)
        hist = t.history(period=period)
        if hist.empty:
            return []
        rows = []
        for date, row in hist.iterrows():
            rows.append({
                "date": date.strftime("%Y-%m-%d"),
                "open": round(float(row["Open"]), 2),
                "high": round(float(row["High"]), 2),
                "low": round(float(row["Low"]), 2),
                "close": round(float(row["Close"]), 2),
                "volume": int(row["Volume"]),
            })
        return rows
    except Exception:
        return []
