"""Fetch financial news from free RSS feeds."""

import feedparser

FEEDS = [
    "https://feeds.finance.yahoo.com/rss/2.0/headline?s=^GSPC&region=US&lang=en-US",
    "https://feeds.finance.yahoo.com/rss/2.0/headline?s=^IXIC&region=US&lang=en-US",
]


def get_news(limit=20):
    articles = []
    for url in FEEDS:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries:
                articles.append({
                    "title": entry.get("title", ""),
                    "link": entry.get("link", ""),
                    "published": entry.get("published", ""),
                    "source": feed.feed.get("title", "Yahoo Finance"),
                })
        except Exception:
            continue

    articles.sort(key=lambda x: x.get("published", ""), reverse=True)
    return articles[:limit]
