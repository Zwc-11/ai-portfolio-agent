// ================================================================
// PortfolioAI — Main Application Script
// ================================================================

(function () {
"use strict";

// ---- Mock Data ----

var PORTFOLIOS = {
  base: {
    name: "Base Portfolio",
    subtitle: "Balanced Growth",
    tag: "Recommended", tagCls: "t-base", variant: "v-base",
    expectedReturn: "8.2 – 12.4%", riskLevel: "Moderate", volatility: "14.2%",
    holdings: [
      { ticker: "VTI",  name: "Vanguard Total Stock",  type: "ETF",   weight: 22, value: 27500, day:  0.34, total:  8.2, role: "Core Exposure",    suit: 95, conf: 92 },
      { ticker: "AAPL", name: "Apple Inc.",             type: "Stock", weight: 14, value: 17500, day: -0.18, total: 12.4, role: "Growth",            suit: 88, conf: 85 },
      { ticker: "BND",  name: "Vanguard Total Bond",   type: "ETF",   weight: 15, value: 18750, day:  0.02, total:  2.1, role: "Stability",         suit: 90, conf: 88 },
      { ticker: "MSFT", name: "Microsoft Corp.",        type: "Stock", weight: 12, value: 15000, day:  0.45, total: 15.6, role: "Growth",            suit: 91, conf: 89 },
      { ticker: "VGT",  name: "Vanguard IT ETF",       type: "ETF",   weight: 11, value: 13750, day:  0.28, total: 18.3, role: "Sector Tilt",       suit: 82, conf: 80 },
      { ticker: "GOOGL",name: "Alphabet Inc.",          type: "Stock", weight:  8, value: 10000, day: -0.52, total:  9.7, role: "Growth",            suit: 85, conf: 82 },
      { ticker: "AMZN", name: "Amazon.com Inc.",        type: "Stock", weight:  7, value:  8750, day:  0.67, total: 14.1, role: "Growth",            suit: 84, conf: 81 },
      { ticker: "JPM",  name: "JPMorgan Chase",        type: "Stock", weight:  6, value:  7500, day:  0.12, total:  6.8, role: "Financials",        suit: 78, conf: 76 }
    ],
    sectors: [
      { name: "Technology",   pct: 52, color: "#3b82f6" },
      { name: "Financials",   pct:  6, color: "#8b5cf6" },
      { name: "Bonds",        pct: 15, color: "#6366f1" },
      { name: "Broad Market", pct: 22, color: "#64748b" },
      { name: "Cash",         pct:  5, color: "#334155" }
    ],
    assetClass: [
      { name: "US Equity",  pct: 47, color: "#3b82f6" },
      { name: "ETFs",       pct: 33, color: "#6366f1" },
      { name: "Bonds",      pct: 15, color: "#10b981" },
      { name: "Cash",       pct:  5, color: "#334155" }
    ],
    explanation: "Balanced mix of growth equities and bond ballast. Designed for moderate risk tolerance with a 5+ year horizon.",
    annualReturn: 10, vol: 14
  },
  safer: {
    name: "Safer Version",
    subtitle: "Capital Preservation",
    tag: "Lower Risk", tagCls: "t-safer", variant: "v-safer",
    expectedReturn: "5.4 – 7.8%", riskLevel: "Low-Moderate", volatility: "8.6%",
    holdings: [
      { ticker: "BND",  name: "Vanguard Total Bond",  type: "ETF",   weight: 22, value: 27500, day:  0.02, total:  2.1, role: "Core Stability",   suit: 96, conf: 94 },
      { ticker: "VTI",  name: "Vanguard Total Stock",  type: "ETF",   weight: 15, value: 18750, day:  0.34, total:  8.2, role: "Core Equity",      suit: 92, conf: 90 },
      { ticker: "AGG",  name: "iShares Core Bond",     type: "ETF",   weight: 12, value: 15000, day:  0.01, total:  1.8, role: "Bond Diversifier",  suit: 94, conf: 92 },
      { ticker: "SCHD", name: "Schwab Dividend",       type: "ETF",   weight: 10, value: 12500, day:  0.15, total:  5.4, role: "Dividend Income",   suit: 90, conf: 88 },
      { ticker: "VXUS", name: "Vanguard Intl Stock",   type: "ETF",   weight:  8, value: 10000, day: -0.22, total:  3.6, role: "Intl Diversifier",  suit: 85, conf: 82 },
      { ticker: "JNJ",  name: "Johnson & Johnson",     type: "Stock", weight:  8, value: 10000, day:  0.08, total:  4.2, role: "Defensive",         suit: 88, conf: 86 },
      { ticker: "PG",   name: "Procter & Gamble",      type: "Stock", weight:  6, value:  7500, day:  0.11, total:  3.8, role: "Defensive",         suit: 86, conf: 84 },
      { ticker: "TIP",  name: "iShares TIPS Bond",     type: "ETF",   weight: 12, value: 15000, day:  0.03, total:  1.5, role: "Inflation Hedge",   suit: 88, conf: 86 }
    ],
    sectors: [
      { name: "Bonds",             pct: 46, color: "#6366f1" },
      { name: "Broad Market",      pct: 15, color: "#64748b" },
      { name: "Consumer Defensive",pct: 14, color: "#10b981" },
      { name: "Dividend",          pct: 10, color: "#8b5cf6" },
      { name: "International",     pct:  8, color: "#f59e0b" },
      { name: "Cash",              pct:  7, color: "#334155" }
    ],
    assetClass: [
      { name: "Bonds",     pct: 46, color: "#6366f1" },
      { name: "ETFs",      pct: 25, color: "#3b82f6" },
      { name: "Dividend",  pct: 10, color: "#10b981" },
      { name: "US Equity", pct: 12, color: "#8b5cf6" },
      { name: "Cash",      pct:  7, color: "#334155" }
    ],
    explanation: "Higher bond allocation and defensive stocks reduce downside risk. Trades upside potential for stability and income.",
    annualReturn: 6.5, vol: 8.6
  },
  higher: {
    name: "Higher Return",
    subtitle: "Aggressive Growth",
    tag: "More Growth", tagCls: "t-higher", variant: "v-higher",
    expectedReturn: "12.8 – 18.6%", riskLevel: "High", volatility: "22.4%",
    holdings: [
      { ticker: "QQQ",  name: "Invesco QQQ Trust",     type: "ETF",   weight: 18, value: 22500, day:  0.52, total: 22.4, role: "Growth Core",      suit: 78, conf: 82 },
      { ticker: "NVDA", name: "NVIDIA Corp.",           type: "Stock", weight: 14, value: 17500, day:  1.24, total: 42.8, role: "AI / Growth",      suit: 72, conf: 78 },
      { ticker: "AAPL", name: "Apple Inc.",             type: "Stock", weight: 12, value: 15000, day: -0.18, total: 12.4, role: "Mega Cap Growth",  suit: 82, conf: 84 },
      { ticker: "MSFT", name: "Microsoft Corp.",        type: "Stock", weight: 11, value: 13750, day:  0.45, total: 15.6, role: "Mega Cap Growth",  suit: 84, conf: 86 },
      { ticker: "AMZN", name: "Amazon.com Inc.",        type: "Stock", weight: 10, value: 12500, day:  0.67, total: 14.1, role: "Growth",           suit: 80, conf: 82 },
      { ticker: "VGT",  name: "Vanguard IT ETF",       type: "ETF",   weight: 12, value: 15000, day:  0.28, total: 18.3, role: "Tech Sector",      suit: 76, conf: 80 },
      { ticker: "META", name: "Meta Platforms",         type: "Stock", weight:  8, value: 10000, day:  0.38, total: 24.6, role: "Growth",           suit: 74, conf: 76 },
      { ticker: "TSLA", name: "Tesla Inc.",             type: "Stock", weight:  7, value:  8750, day: -1.42, total: -4.2, role: "Speculative",      suit: 62, conf: 58 },
      { ticker: "SOXX", name: "iShares Semiconductor", type: "ETF",   weight:  5, value:  6250, day:  0.84, total: 28.2, role: "Sector Bet",       suit: 70, conf: 72 }
    ],
    sectors: [
      { name: "Technology",       pct: 82, color: "#3b82f6" },
      { name: "Consumer Cyclical",pct:  7, color: "#f59e0b" },
      { name: "Semiconductors",   pct:  5, color: "#ec4899" },
      { name: "Broad Growth",     pct:  3, color: "#64748b" },
      { name: "Cash",             pct:  3, color: "#334155" }
    ],
    assetClass: [
      { name: "US Equity",  pct: 62, color: "#3b82f6" },
      { name: "ETFs",       pct: 35, color: "#f59e0b" },
      { name: "Cash",       pct:  3, color: "#334155" }
    ],
    explanation: "Concentrated tech and growth exposure maximizes upside potential. Accepts significantly higher volatility and drawdown risk.",
    annualReturn: 15, vol: 22
  }
};

var RAIL_DATA = {
  aiSummary: 'Based on your <strong>moderate growth</strong> profile, we recommend a balanced portfolio weighted toward <strong>broad market ETFs</strong> and <strong>large-cap growth stocks</strong>. The base allocation targets <strong>8–12% annual returns</strong> with controlled downside. Two alternative variants offer paths for more conservative or aggressive positioning.',
  news: [
    { title: "Fed signals potential rate cut as inflation eases to 2.3%",          source: "Reuters",   time: "2h ago",  tag: "Macro" },
    { title: "NVIDIA reports record Q1 data center revenue of $28.4B",            source: "Bloomberg", time: "4h ago",  tag: "NVDA" },
    { title: "Apple announces $110B stock buyback, largest in history",            source: "CNBC",      time: "6h ago",  tag: "AAPL" },
    { title: "Treasury yields fall as economic data points to slowdown",           source: "WSJ",       time: "8h ago",  tag: "Bonds" },
    { title: "Microsoft Azure growth accelerates to 33% year-over-year",          source: "Bloomberg", time: "12h ago", tag: "MSFT" }
  ],
  movers: [
    { ticker: "NVDA", name: "NVIDIA",    pct:  2.8 },
    { ticker: "AAPL", name: "Apple",     pct: -1.1 },
    { ticker: "MSFT", name: "Microsoft", pct:  1.2 },
    { ticker: "TSLA", name: "Tesla",     pct: -3.2 },
    { ticker: "AMZN", name: "Amazon",    pct:  2.4 }
  ],
  alerts: [
    "Portfolio tech concentration exceeds 50% — consider adding non-correlated assets.",
    "TSLA volatility is 3.2× the portfolio average — monitor position sizing."
  ],
  events: [
    { date: "Apr 5",  text: "AAPL earnings report (Q2 FY26)" },
    { date: "Apr 8",  text: "Fed meeting minutes release" },
    { date: "Apr 12", text: "MSFT earnings report (Q3 FY26)" },
    { date: "Apr 15", text: "CPI inflation data release" }
  ]
};

var AGENTS = [
  { name: "Investor Profile Agent",   color: "#3b82f6", text: "Classified as moderate growth investor. Age 25 with 5+ year horizon supports equity-heavy allocation. Beginner experience level suggests preference for well-known large caps and broad ETFs over obscure picks." },
  { name: "Asset Discovery Agent",    color: "#8b5cf6", text: "Screened 2,400+ US equities and 850+ ETFs. Identified 45 candidates matching growth + moderate risk criteria. Prioritized liquid large-cap stocks and low-cost broad market ETFs with strong 3-year track records." },
  { name: "Asset Filtering Agent",    color: "#10b981", text: "Narrowed from 45 to 12 suitable assets. Excluded high-volatility small caps, leveraged ETFs, and sector-specific plays that exceed moderate risk tolerance. Applied expense ratio ceiling of 0.20% for ETFs." },
  { name: "Portfolio Builder Agent",  color: "#f59e0b", text: "Constructed base portfolio with 22% broad market core (VTI), 15% bond ballast (BND), and 58% individual growth stocks + sector ETFs. Maintained 5% cash buffer. Target Sharpe ratio: 0.85." },
  { name: "Portfolio Simulator Agent", color: "#ec4899", text: "Generated safer variant by shifting 31% from equities to bonds/dividend ETFs, reducing expected volatility from 14.2% to 8.6%. Generated higher return variant by concentrating in tech/growth, increasing expected return to 12.8–18.6% with 22.4% volatility." },
  { name: "Risk & Tradeoff Agent",    color: "#ef4444", text: "Base portfolio has 12% maximum expected drawdown over 1 year. Safer version reduces this to 6% but caps upside at ~7.8%. Higher return version exposes to 28% potential drawdown. Profile match score: Base 92/100, Safer 78/100, Higher 65/100." }
];

var TRADEOFFS = {
  safer: {
    title: "Why the Safer Version Has Less Risk",
    changes: [
      { metric: "Bond Allocation",     from: "15%",  to: "46%",   dir: "up" },
      { metric: "Tech Exposure",        from: "52%",  to: "0%",    dir: "down" },
      { metric: "Expected Volatility",  from: "14.2%",to: "8.6%",  dir: "down" },
      { metric: "Max Drawdown (1Y)",    from: "12%",  to: "6%",    dir: "down" }
    ],
    text: "The safer version shifts heavily into bonds and defensive stocks. It replaces individual tech stocks with dividend ETFs and inflation-protected securities. This significantly reduces volatility and drawdown risk, but caps the upside potential at 7.8% annually."
  },
  higher: {
    title: "Why the Higher Return Version Has More Upside",
    changes: [
      { metric: "Tech Allocation",  from: "52%",        to: "82%",         dir: "up" },
      { metric: "Bond Allocation",  from: "15%",        to: "0%",          dir: "down" },
      { metric: "Expected Return",  from: "8.2–12.4%",  to: "12.8–18.6%", dir: "up" },
      { metric: "Max Drawdown (1Y)",from: "12%",        to: "28%",         dir: "up" }
    ],
    text: "The higher return version concentrates in high-growth tech stocks and sector ETFs. It removes all bond exposure and adds speculative positions like TSLA and semiconductor ETFs. This maximizes upside potential but exposes the portfolio to significantly higher volatility and potential drawdowns."
  },
  profile: "Your age (25) and long time horizon (5+ years) support taking equity risk, but your moderate risk tolerance and beginner experience suggest the base portfolio is the best match. The safer version may be appropriate if you want to sleep well at night. The higher return version should only be considered if you can stomach 20%+ drawdowns."
};

// ---- State ----

var state = {
  activeVariant: "base",
  activeTab: "overview",
  activeChartType: "performance",
  activeRange: "1M",
  chart: null,
  sectorChart: null,
  assetChart: null
};

// ---- Ticker info for mapping API response ----
var TICKER_INFO = {
  "VOO": { name: "Vanguard S&P 500 ETF", type: "ETF", sector: "Broad Market" },
  "SPY": { name: "SPDR S&P 500 ETF", type: "ETF", sector: "Broad Market" },
  "QQQ": { name: "Invesco QQQ Trust", type: "ETF", sector: "Technology" },
  "VXUS": { name: "Vanguard Intl Stock ETF", type: "ETF", sector: "International" },
  "SCHD": { name: "Schwab Dividend ETF", type: "ETF", sector: "Dividend" },
  "VTI": { name: "Vanguard Total Stock", type: "ETF", sector: "Broad Market" },
  "MSFT": { name: "Microsoft Corp.", type: "Stock", sector: "Technology" },
  "AAPL": { name: "Apple Inc.", type: "Stock", sector: "Technology" },
  "NVDA": { name: "NVIDIA Corp.", type: "Stock", sector: "Technology" },
  "BRK-B": { name: "Berkshire Hathaway B", type: "Stock", sector: "Financials" },
  "COST": { name: "Costco Wholesale", type: "Stock", sector: "Consumer" },
  "AMZN": { name: "Amazon.com Inc.", type: "Stock", sector: "Technology" },
  "BND": { name: "Vanguard Total Bond", type: "ETF", sector: "Bonds" },
  "AGG": { name: "iShares Core Bond", type: "ETF", sector: "Bonds" },
  "VGT": { name: "Vanguard IT ETF", type: "ETF", sector: "Technology" },
  "GOOGL": { name: "Alphabet Inc.", type: "Stock", sector: "Technology" },
  "TSLA": { name: "Tesla Inc.", type: "Stock", sector: "Consumer Cyclical" },
  "META": { name: "Meta Platforms", type: "Stock", sector: "Technology" },
  "JPM": { name: "JPMorgan Chase", type: "Stock", sector: "Financials" },
  "JNJ": { name: "Johnson & Johnson", type: "Stock", sector: "Healthcare" },
  "PG": { name: "Procter & Gamble", type: "Stock", sector: "Consumer" },
  "SOXX": { name: "iShares Semiconductor", type: "ETF", sector: "Semiconductors" },
  "TIP": { name: "iShares TIPS Bond", type: "ETF", sector: "Bonds" }
};

var SECTOR_COLORS = {
  "Technology": "#3b82f6", "Broad Market": "#64748b", "Financials": "#8b5cf6",
  "Dividend": "#10b981", "International": "#f59e0b", "Consumer": "#ec4899",
  "Cash": "#334155", "Bonds": "#6366f1", "Healthcare": "#14b8a6",
  "Consumer Cyclical": "#f97316", "Semiconductors": "#a855f7", "Other": "#475569"
};

// ---- Profile Storage (localStorage) ----
function saveProfile(name, data) {
  var profiles = JSON.parse(localStorage.getItem("portfolioai_profiles") || "{}");
  profiles[name] = { data: data, saved: new Date().toISOString() };
  localStorage.setItem("portfolioai_profiles", JSON.stringify(profiles));
}
function getProfiles() {
  return JSON.parse(localStorage.getItem("portfolioai_profiles") || "{}");
}
function deleteProfile(name) {
  var profiles = getProfiles();
  delete profiles[name];
  localStorage.setItem("portfolioai_profiles", JSON.stringify(profiles));
}
function setActiveProfile(name) {
  localStorage.setItem("portfolioai_active_profile", name);
}
function getActiveProfile() {
  return localStorage.getItem("portfolioai_active_profile") || "John D.";
}

// ---- Map API portfolio to frontend structure ----
function mapApiPortfolio(apiHoldings, investAmount, variantKey) {
  investAmount = investAmount || 125000;
  var riskMap = { base: { level: "Moderate", ret: "8.2 – 12.4%", vol: "14.2%", annRet: 10, annVol: 14 },
                  safer: { level: "Low-Moderate", ret: "5.4 – 7.8%", vol: "8.6%", annRet: 6.5, annVol: 8.6 },
                  higher: { level: "High", ret: "12.8 – 18.6%", vol: "22.4%", annRet: 15, annVol: 22 } };
  var rm = riskMap[variantKey] || riskMap.base;
  var tagMap = { base: { tag: "Recommended", cls: "t-base", variant: "v-base" },
                 safer: { tag: "Lower Risk", cls: "t-safer", variant: "v-safer" },
                 higher: { tag: "More Growth", cls: "t-higher", variant: "v-higher" } };
  var tm = tagMap[variantKey] || tagMap.base;
  var nameMap = { base: "Base Portfolio", safer: "Safer Version", higher: "Higher Return" };
  var subMap = { base: "Balanced Growth", safer: "Capital Preservation", higher: "Aggressive Growth" };

  var holdings = apiHoldings.map(function (h) {
    var info = TICKER_INFO[h.ticker] || { name: h.name || h.ticker, type: "Stock", sector: "Other" };
    return {
      ticker: h.ticker, name: info.name, type: info.type, weight: h.weight,
      value: Math.round(investAmount * h.weight / 100),
      day: +(Math.random() * 2 - 0.5).toFixed(2),
      total: +(Math.random() * 20 - 2).toFixed(1),
      role: info.sector === "Bonds" ? "Stability" : info.type === "ETF" ? "Core Exposure" : "Growth",
      suit: 75 + Math.floor(Math.random() * 20),
      conf: 70 + Math.floor(Math.random() * 25)
    };
  });

  var sectorMap = {};
  holdings.forEach(function (h) {
    var info = TICKER_INFO[h.ticker] || {};
    var sector = info.sector || "Other";
    sectorMap[sector] = (sectorMap[sector] || 0) + h.weight;
  });
  var cashWeight = 100 - holdings.reduce(function (s, h) { return s + h.weight; }, 0);
  if (cashWeight > 0) sectorMap["Cash"] = cashWeight;

  var sectors = Object.keys(sectorMap).map(function (s) {
    return { name: s, pct: sectorMap[s], color: SECTOR_COLORS[s] || "#64748b" };
  });

  var assetMap = {};
  holdings.forEach(function (h) { assetMap[h.type] = (assetMap[h.type] || 0) + h.weight; });
  if (cashWeight > 0) assetMap["Cash"] = cashWeight;
  var assetColors = { "ETF": "#6366f1", "Stock": "#3b82f6", "Cash": "#334155" };
  var assetClass = Object.keys(assetMap).map(function (a) {
    return { name: a, pct: assetMap[a], color: assetColors[a] || "#64748b" };
  });

  return {
    name: nameMap[variantKey], subtitle: subMap[variantKey],
    tag: tm.tag, tagCls: tm.cls, variant: tm.variant,
    expectedReturn: rm.ret, riskLevel: rm.level, volatility: rm.vol,
    holdings: holdings, sectors: sectors, assetClass: assetClass,
    explanation: "", annualReturn: rm.annRet, vol: rm.annVol
  };
}

// ---- Process Card ----
var PROCESS_AGENTS = [
  { name: "Investor Profile Agent", color: "#3b82f6" },
  { name: "Asset Discovery Agent", color: "#8b5cf6" },
  { name: "Asset Filtering Agent", color: "#10b981" },
  { name: "Portfolio Builder Agent", color: "#f59e0b" },
  { name: "Portfolio Simulator Agent", color: "#ec4899" },
  { name: "Risk & Tradeoff Agent", color: "#ef4444" }
];

function showProcessCard() {
  var el = document.getElementById("process-overlay");
  var steps = document.getElementById("process-steps");
  var html = "";
  PROCESS_AGENTS.forEach(function (a) {
    html += '<div class="process-step" data-agent="' + a.name + '">';
    html += '<span class="process-dot" style="border-color:' + a.color + '"></span>';
    html += '<span class="process-name">' + a.name + '</span>';
    html += '<span class="process-detail"></span>';
    html += '<span class="process-status">Waiting...</span></div>';
  });
  steps.innerHTML = html;
  el.classList.add("active");
  document.getElementById("process-fill").style.width = "0%";
}

function updateProcessStep(index, status, detail) {
  var steps = document.querySelectorAll("#process-steps .process-step");
  if (index < 0 || index >= steps.length) return;
  var step = steps[index];
  var statusEl = step.querySelector(".process-status");
  var detailEl = step.querySelector(".process-detail");

  if (status === "running") {
    step.classList.remove("done");
    step.classList.add("processing");
    statusEl.textContent = "Processing...";
    if (detailEl) detailEl.textContent = "";
  } else if (status === "done") {
    step.classList.remove("processing");
    step.classList.add("done");
    statusEl.textContent = "Done \u2713";
    if (detailEl && detail) detailEl.textContent = detail;
  } else if (status === "error") {
    step.classList.remove("processing");
    step.classList.add("done");
    statusEl.textContent = "Error";
    statusEl.style.color = "#ef4444";
  }

  // Update progress bar based on how many are done
  var doneCount = document.querySelectorAll("#process-steps .process-step.done").length;
  var total = PROCESS_AGENTS.length;
  document.getElementById("process-fill").style.width = (doneCount / total * 100) + "%";
}

function hideProcessCard(success) {
  var el = document.getElementById("process-overlay");
  if (!success) {
    var steps = el.querySelectorAll(".process-step");
    steps.forEach(function (s) {
      if (!s.classList.contains("done")) {
        s.querySelector(".process-status").textContent = "Error";
        s.querySelector(".process-status").style.color = "#ef4444";
      }
    });
  }
  document.getElementById("process-fill").style.width = "100%";
  setTimeout(function () { el.classList.remove("active"); }, 800);
}

// ---- Helpers ----

function esc(s) {
  var d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function fmt(n) {
  return n.toLocaleString("en-US");
}

function fmtMoney(n) {
  return "$" + n.toLocaleString("en-US");
}

function signStr(n) {
  return (n >= 0 ? "+" : "") + n.toFixed(2) + "%";
}

function cls(n) {
  return n >= 0 ? "positive" : "negative";
}

function generateTimeSeries(months, annualRet, vol) {
  var pts = [];
  var v = 100000;
  var mr = annualRet / 12 / 100;
  var mv = vol / Math.sqrt(12) / 100;
  // seed for reproducibility per call
  var seed = annualRet * 100 + vol * 10;
  function rand() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }
  for (var i = 0; i <= months; i++) {
    var noise = (rand() - 0.5) * 2 * mv;
    v = v * (1 + mr + noise);
    pts.push(Math.round(v));
  }
  return pts;
}

function monthLabels(months) {
  var labels = [];
  var now = new Date();
  for (var i = months; i >= 0; i--) {
    var d = new Date(now);
    d.setMonth(d.getMonth() - i);
    labels.push(d.toLocaleDateString("en-US", { month: "short", year: "2-digit" }));
  }
  return labels;
}

function rangeMonths(r) {
  var m = { "1D": 1, "1W": 1, "1M": 1, "6M": 6, "1Y": 12, "MAX": 36 };
  return m[r] || 12;
}

// ---- Render: Portfolio Comparison Cards ----

function renderComparison() {
  var el = document.getElementById("comparison-grid");
  var html = "";
  ["base", "safer", "higher"].forEach(function (key) {
    var p = PORTFOLIOS[key];
    var sel = key === state.activeVariant ? " selected" : "";
    html += '<div class="pcard ' + p.variant + sel + '" data-variant="' + key + '">';
    html += '<div class="pcard-top"><div><div class="pcard-name">' + esc(p.name) + '</div>';
    html += '<div class="pcard-sub">' + esc(p.subtitle) + '</div></div>';
    html += '<span class="pcard-tag ' + p.tagCls + '">' + esc(p.tag) + '</span></div>';

    html += '<div class="pcard-metrics">';
    html += '<div class="pcard-metric"><span class="pm-label">Expected Return</span><span class="pm-value">' + esc(p.expectedReturn) + '</span></div>';
    html += '<div class="pcard-metric"><span class="pm-label">Risk</span><span class="pm-value">' + esc(p.riskLevel) + '</span></div>';
    html += '<div class="pcard-metric"><span class="pm-label">Volatility</span><span class="pm-value">' + esc(p.volatility) + '</span></div>';
    html += '<div class="pcard-metric"><span class="pm-label">Holdings</span><span class="pm-value">' + p.holdings.length + '</span></div>';
    html += '</div>';

    html += '<div class="pcard-holdings"><div class="ph-title">Top Holdings</div>';
    p.holdings.slice(0, 5).forEach(function (h) {
      html += '<div class="ph-row"><span class="ph-ticker">' + esc(h.ticker) + '</span><span class="ph-weight">' + h.weight + '%</span></div>';
    });
    html += '</div>';

    html += '<div class="pcard-sector-bar">';
    p.sectors.forEach(function (s) {
      html += '<div class="pcard-sector-seg" style="flex:' + s.pct + ';background:' + s.color + '"></div>';
    });
    html += '</div>';

    html += '<div class="pcard-explain">' + esc(p.explanation) + '</div>';
    html += '</div>';
  });
  el.innerHTML = html;

  el.querySelectorAll(".pcard").forEach(function (card) {
    card.addEventListener("click", function () {
      state.activeVariant = card.getAttribute("data-variant");
      renderComparison();
      renderChart();
      renderTab();
      updateSwitcher();
    });
  });
}

// ---- Render: Chart ----

var VARIANT_COLORS = { base: "#3b82f6", safer: "#10b981", higher: "#f59e0b" };

// Stock chart cache
var stockChartCache = {};

function renderChart() {
  var t = state.activeChartType;
  if (t === "stock") return renderStockChart();
  if (t === "benchmark") return renderBenchmarkChart();
  renderPerformanceChart();
}

function renderPerformanceChart() {
  var canvas = document.getElementById("main-chart");
  var ctx = canvas.getContext("2d");
  var p = PORTFOLIOS[state.activeVariant];
  var months = rangeMonths(state.activeRange);
  var data = generateTimeSeries(months, p.annualReturn, p.vol);
  var labels = monthLabels(months);
  var color = VARIANT_COLORS[state.activeVariant];

  if (state.chart) state.chart.destroy();

  state.chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        data: data,
        borderColor: color,
        backgroundColor: color + "18",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: color,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#161d2c",
          titleColor: "#e2e8f0",
          bodyColor: "#8b95a8",
          borderColor: "#1c2536",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function (c) { return "$" + c.parsed.y.toLocaleString(); }
          }
        }
      },
      scales: {
        x: {
          grid: { color: "#141c2a", drawBorder: false },
          ticks: { color: "#525d70", font: { size: 10, family: "'Inter'" }, maxTicksLimit: 8 },
          border: { display: false }
        },
        y: {
          grid: { color: "#141c2a", drawBorder: false },
          ticks: { color: "#525d70", font: { size: 10, family: "'JetBrains Mono'" }, callback: function (v) { return "$" + (v / 1000).toFixed(0) + "k"; } },
          border: { display: false }
        }
      }
    }
  });
}

function renderStockChart() {
  var p = PORTFOLIOS[state.activeVariant];
  var ticker = p.holdings[0].ticker;
  var periodMap = { "1D": "1d", "1W": "5d", "1M": "1mo", "6M": "6mo", "1Y": "1y", "MAX": "5y" };
  var period = periodMap[state.activeRange] || "1mo";
  var cacheKey = ticker + "-" + period;

  if (stockChartCache[cacheKey]) {
    drawStockChart(stockChartCache[cacheKey], ticker);
    return;
  }

  fetch("/api/stock-history/" + ticker + "?period=" + period)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data || !data.length) return;
      stockChartCache[cacheKey] = data;
      drawStockChart(data, ticker);
    })
    .catch(function () {});
}

function drawStockChart(data, ticker) {
  var canvas = document.getElementById("main-chart");
  var ctx = canvas.getContext("2d");
  if (state.chart) state.chart.destroy();

  var labels = data.map(function (d) { return d.date; });
  var bodies = data.map(function (d) {
    return [Math.min(d.open, d.close), Math.max(d.open, d.close)];
  });
  var colors = data.map(function (d) {
    return d.close >= d.open ? "#10b981" : "#ef4444";
  });

  state.chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: ticker,
        data: bodies,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: true, labels: { color: "#8b95a8", font: { size: 11 } } },
        tooltip: {
          backgroundColor: "#161d2c",
          titleColor: "#e2e8f0",
          bodyColor: "#8b95a8",
          borderColor: "#1c2536",
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: function (c) {
              var d = data[c.dataIndex];
              return ["O: $" + d.open.toFixed(2), "H: $" + d.high.toFixed(2), "L: $" + d.low.toFixed(2), "C: $" + d.close.toFixed(2)];
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: "#141c2a", drawBorder: false },
          ticks: { color: "#525d70", font: { size: 10 }, maxTicksLimit: 8 },
          border: { display: false }
        },
        y: {
          grid: { color: "#141c2a", drawBorder: false },
          ticks: { color: "#525d70", font: { size: 10, family: "'JetBrains Mono'" }, callback: function (v) { return "$" + v.toFixed(0); } },
          border: { display: false }
        }
      }
    },
    plugins: [{
      id: "candlestickWicks",
      afterDatasetsDraw: function (chart) {
        var meta = chart.getDatasetMeta(0);
        var cctx = chart.ctx;
        meta.data.forEach(function (bar, i) {
          var d = data[i];
          var yScale = chart.scales.y;
          var high = yScale.getPixelForValue(d.high);
          var low = yScale.getPixelForValue(d.low);
          var x = bar.x;
          var color = d.close >= d.open ? "#10b981" : "#ef4444";
          cctx.save();
          cctx.beginPath();
          cctx.strokeStyle = color;
          cctx.lineWidth = 1;
          cctx.moveTo(x, high);
          cctx.lineTo(x, low);
          cctx.stroke();
          cctx.restore();
        });
      }
    }]
  });
}

function renderBenchmarkChart() {
  var p = PORTFOLIOS[state.activeVariant];
  var months = rangeMonths(state.activeRange);
  var portfolioData = generateTimeSeries(months, p.annualReturn, p.vol);
  var sp500Data = generateTimeSeries(months, 10, 15);
  var labels = monthLabels(months);

  var canvas = document.getElementById("main-chart");
  var ctx = canvas.getContext("2d");
  if (state.chart) state.chart.destroy();

  var color = VARIANT_COLORS[state.activeVariant];

  state.chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: p.name,
          data: portfolioData,
          borderColor: color,
          backgroundColor: "transparent",
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.3
        },
        {
          label: "S&P 500",
          data: sp500Data,
          borderColor: "#64748b",
          backgroundColor: "transparent",
          borderWidth: 1.5,
          borderDash: [4, 3],
          pointRadius: 0,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: true, labels: { color: "#8b95a8", font: { size: 11 } } },
        tooltip: {
          backgroundColor: "#161d2c",
          titleColor: "#e2e8f0",
          bodyColor: "#8b95a8",
          borderColor: "#1c2536",
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: function (c) { return c.dataset.label + ": $" + c.parsed.y.toLocaleString(); }
          }
        }
      },
      scales: {
        x: {
          grid: { color: "#141c2a", drawBorder: false },
          ticks: { color: "#525d70", font: { size: 10 }, maxTicksLimit: 8 },
          border: { display: false }
        },
        y: {
          grid: { color: "#141c2a", drawBorder: false },
          ticks: { color: "#525d70", font: { size: 10, family: "'JetBrains Mono'" }, callback: function (v) { return "$" + (v / 1000).toFixed(0) + "k"; } },
          border: { display: false }
        }
      }
    }
  });
}

// ---- Render: Tabs ----

function renderTab() {
  var el = document.getElementById("tab-content");
  var t = state.activeTab;
  if (t === "overview")    el.innerHTML = renderOverview();
  else if (t === "holdings")    el.innerHTML = renderHoldings();
  else if (t === "allocation")  { el.innerHTML = renderAllocationHTML(); renderAllocationCharts(); }
  else if (t === "tradeoffs")   el.innerHTML = renderTradeoffs();
  else if (t === "reasoning")   el.innerHTML = renderReasoning();
  else if (t === "chat")        { el.innerHTML = renderChat(); bindChat(); }
}

function renderOverview() {
  var p = PORTFOLIOS[state.activeVariant];
  var html = '<div class="overview-layout">';
  html += '<div class="overview-text">';
  html += '<p>This portfolio is designed for a <strong>moderate growth</strong> investor with a 5+ year time horizon. ';
  html += 'It balances broad market exposure through low-cost ETFs with targeted positions in large-cap growth stocks.</p>';
  html += '<p>The allocation maintains a ' + p.sectors[p.sectors.length - 1].pct + '% cash buffer and distributes risk across ';
  html += p.sectors.length + ' sectors. Expected annual returns range from ' + esc(p.expectedReturn) + ' with ';
  html += p.volatility + ' annualized volatility.</p>';
  html += '<p>Each holding was selected by the AI based on suitability scoring, liquidity, track record, and alignment with the investor profile.</p>';
  html += '</div>';
  html += '<div class="overview-stats">';
  var stats = [
    ["Variant", p.name],
    ["Expected Return", p.expectedReturn],
    ["Risk Level", p.riskLevel],
    ["Volatility", p.volatility],
    ["Holdings", p.holdings.length.toString()],
    ["Top Holding", p.holdings[0].ticker + " (" + p.holdings[0].weight + "%)"],
    ["ETF Count", p.holdings.filter(function (h) { return h.type === "ETF"; }).length.toString()],
    ["Stock Count", p.holdings.filter(function (h) { return h.type === "Stock"; }).length.toString()]
  ];
  stats.forEach(function (s) {
    html += '<div class="ov-stat"><span class="ov-stat-label">' + s[0] + '</span><span class="ov-stat-value">' + esc(s[1]) + '</span></div>';
  });
  html += '</div></div>';
  return html;
}

function renderHoldings() {
  var p = PORTFOLIOS[state.activeVariant];
  var html = '<div style="overflow-x:auto"><table class="holdings-table">';
  html += '<thead><tr>';
  html += '<th>Ticker</th><th>Type</th><th class="right">Weight</th><th class="right">Value</th>';
  html += '<th class="right">Day</th><th class="right">Total</th><th>Role</th>';
  html += '<th class="right">Suit.</th><th class="right">Conf.</th>';
  html += '</tr></thead><tbody>';
  p.holdings.forEach(function (h) {
    html += '<tr>';
    html += '<td><div class="ht-ticker">' + esc(h.ticker) + '</div><div class="ht-name">' + esc(h.name) + '</div></td>';
    html += '<td><span class="ht-type">' + h.type + '</span></td>';
    html += '<td class="right">' + h.weight + '%</td>';
    html += '<td class="right">' + fmtMoney(h.value) + '</td>';
    html += '<td class="right ' + cls(h.day) + '">' + signStr(h.day) + '</td>';
    html += '<td class="right ' + cls(h.total) + '">' + signStr(h.total) + '</td>';
    html += '<td>' + esc(h.role) + '</td>';
    html += '<td class="right">' + h.suit + '</td>';
    html += '<td class="right">' + h.conf + ' <span class="confidence-bar"><span class="confidence-fill" style="width:' + h.conf + '%"></span></span></td>';
    html += '</tr>';
  });
  // Cash row
  var cashW = 100 - p.holdings.reduce(function (s, h) { return s + h.weight; }, 0);
  if (cashW > 0) {
    var cashV = Math.round(125000 * cashW / 100);
    html += '<tr><td><div class="ht-ticker">CASH</div><div class="ht-name">Cash & Equivalents</div></td>';
    html += '<td><span class="ht-type">Cash</span></td>';
    html += '<td class="right">' + cashW + '%</td><td class="right">' + fmtMoney(cashV) + '</td>';
    html += '<td class="right">—</td><td class="right">—</td><td>Buffer</td><td class="right">—</td><td class="right">—</td></tr>';
  }
  html += '</tbody></table></div>';
  return html;
}

function renderAllocationHTML() {
  var p = PORTFOLIOS[state.activeVariant];
  var etfCount = p.holdings.filter(function (h) { return h.type === "ETF"; }).length;
  var stockCount = p.holdings.filter(function (h) { return h.type === "Stock"; }).length;
  var topW = p.holdings[0].weight;

  var html = '<div class="allocation-grid">';
  // Sector chart
  html += '<div class="alloc-panel"><div class="alloc-title">Sector Allocation</div>';
  html += '<div class="alloc-chart-wrap"><div class="alloc-canvas"><canvas id="sector-chart"></canvas></div>';
  html += '<div class="alloc-legend" id="sector-legend"></div></div></div>';
  // Asset class chart
  html += '<div class="alloc-panel"><div class="alloc-title">Asset Class</div>';
  html += '<div class="alloc-chart-wrap"><div class="alloc-canvas"><canvas id="asset-chart"></canvas></div>';
  html += '<div class="alloc-legend" id="asset-legend"></div></div></div>';
  html += '</div>';

  // Summary stats
  html += '<div class="alloc-summary">';
  html += '<div class="alloc-stat"><div class="alloc-stat-label">ETF / Stock Mix</div><div class="alloc-stat-value">' + etfCount + ' / ' + stockCount + '</div></div>';
  html += '<div class="alloc-stat"><div class="alloc-stat-label">Top Concentration</div><div class="alloc-stat-value">' + topW + '%</div></div>';
  html += '<div class="alloc-stat"><div class="alloc-stat-label">Sectors</div><div class="alloc-stat-value">' + p.sectors.length + '</div></div>';
  html += '<div class="alloc-stat"><div class="alloc-stat-label">Total Holdings</div><div class="alloc-stat-value">' + p.holdings.length + '</div></div>';
  html += '</div>';
  return html;
}

function renderAllocationCharts() {
  var p = PORTFOLIOS[state.activeVariant];
  // Destroy old charts
  if (state.sectorChart) state.sectorChart.destroy();
  if (state.assetChart) state.assetChart.destroy();

  function makeDoughnut(canvasId, legendId, data) {
    var ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    var labels = data.map(function (d) { return d.name; });
    var values = data.map(function (d) { return d.pct; });
    var colors = data.map(function (d) { return d.color; });

    // Legend
    var leg = document.getElementById(legendId);
    if (leg) {
      leg.innerHTML = data.map(function (d) {
        return '<div class="legend-row"><span class="legend-dot" style="background:' + d.color + '"></span><span class="legend-lbl">' + esc(d.name) + '</span><span class="legend-val">' + d.pct + '%</span></div>';
      }).join("");
    }

    return new Chart(ctx, {
      type: "doughnut",
      data: { labels: labels, datasets: [{ data: values, backgroundColor: colors, borderWidth: 0, hoverOffset: 4 }] },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "65%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#161d2c",
            titleColor: "#e2e8f0",
            bodyColor: "#8b95a8",
            borderColor: "#1c2536",
            borderWidth: 1,
            padding: 8,
            callbacks: { label: function (c) { return c.label + ": " + c.parsed + "%"; } }
          }
        }
      }
    });
  }

  state.sectorChart = makeDoughnut("sector-chart", "sector-legend", p.sectors);
  state.assetChart = makeDoughnut("asset-chart", "asset-legend", p.assetClass);
}

function renderTradeoffs() {
  var html = '<div class="tradeoffs-grid">';
  ["safer", "higher"].forEach(function (key) {
    var t = TRADEOFFS[key];
    html += '<div class="tradeoff-block"><div class="tradeoff-title">' + esc(t.title) + '</div>';
    html += '<div class="tradeoff-changes">';
    t.changes.forEach(function (c) {
      var arrow = c.dir === "up" ? "↑" : "↓";
      html += '<div class="tradeoff-change"><span class="tc-label">' + esc(c.metric) + '</span>';
      html += '<span style="color:var(--text-muted);font-size:10px;font-family:var(--mono)">' + esc(c.from) + '</span>';
      html += '<span class="tc-arrow ' + c.dir + '">' + arrow + '</span>';
      html += '<span style="font-size:10px;font-family:var(--mono);font-weight:600">' + esc(c.to) + '</span></div>';
    });
    html += '</div>';
    html += '<div class="tradeoff-text">' + esc(t.text) + '</div>';
    html += '</div>';
  });
  html += '<div class="tradeoff-profile">' + esc(TRADEOFFS.profile) + '</div>';
  html += '</div>';
  return html;
}

function renderReasoning() {
  var html = '<div class="reasoning-grid">';
  AGENTS.forEach(function (a) {
    html += '<div class="agent-block"><div class="agent-head">';
    html += '<span class="agent-dot" style="background:' + a.color + '"></span>';
    html += '<span class="agent-name">' + esc(a.name) + '</span></div>';
    html += '<div class="agent-text">' + esc(a.text) + '</div></div>';
  });
  html += '</div>';
  return html;
}

function renderChat() {
  var html = '<div class="chat-panel">';
  html += '<div class="chat-messages" id="chat-messages">';
  html += '<div class="chat-msg ai"><span class="chat-avatar">AI</span>';
  html += '<div class="chat-bubble">Your base portfolio is ready. You can ask me to adjust the allocation, explain specific holdings, compare variants, or explore what-if scenarios. What would you like to refine?</div></div>';
  html += '</div>';
  html += '<div class="chat-input-bar">';
  html += '<input class="chat-input" id="chat-input" type="text" placeholder="Ask about your portfolio...">';
  html += '<button class="chat-send" id="chat-send-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9"/></svg></button>';
  html += '</div></div>';
  return html;
}

function bindChat() {
  var input = document.getElementById("chat-input");
  var btn = document.getElementById("chat-send-btn");
  var msgs = document.getElementById("chat-messages");
  if (!input || !btn || !msgs) return;

  function send() {
    var text = input.value.trim();
    if (!text) return;
    msgs.innerHTML += '<div class="chat-msg user"><span class="chat-avatar">JD</span><div class="chat-bubble">' + esc(text) + '</div></div>';
    input.value = "";
    setTimeout(function () {
      msgs.innerHTML += '<div class="chat-msg ai"><span class="chat-avatar">AI</span><div class="chat-bubble">I\'ll analyze that for you. Based on your current ' + PORTFOLIOS[state.activeVariant].name + ', the adjustment would affect your risk-return profile. Let me calculate the impact.</div></div>';
      msgs.scrollTop = msgs.scrollHeight;
    }, 600);
    msgs.scrollTop = msgs.scrollHeight;
  }

  btn.addEventListener("click", send);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") send();
  });
}

// ---- Render: Right Rail ----

function renderRail() {
  // AI Summary
  var aiEl = document.getElementById("ai-summary");
  if (aiEl) aiEl.innerHTML = RAIL_DATA.aiSummary;

  // News
  var newsEl = document.getElementById("rail-news");
  if (newsEl) {
    newsEl.innerHTML = RAIL_DATA.news.map(function (n) {
      var href = n.link ? '" href="' + esc(n.link) + '" target="_blank" rel="noopener' : '';
      return '<a class="news-item flash' + href + '"><span class="news-headline">' + esc(n.title) + '</span>' +
        '<span class="news-meta">' + esc(n.source) + ' \u00b7 ' + esc(n.time) + '<span class="news-tag">' + esc(n.tag) + '</span></span></a>';
    }).join("");
  }

  // Movers
  var movEl = document.getElementById("rail-movers");
  if (movEl) {
    movEl.innerHTML = RAIL_DATA.movers.map(function (m) {
      var c = m.pct >= 0 ? "positive" : "negative";
      return '<div class="mover-row"><span class="mover-ticker">' + esc(m.ticker) + '</span>' +
        '<span class="mover-name">' + esc(m.name) + '</span>' +
        '<span class="mover-chg ' + c + '">' + (m.pct >= 0 ? "+" : "") + m.pct.toFixed(1) + '%</span></div>';
    }).join("");
  }

  // Alerts
  var alertEl = document.getElementById("rail-alerts");
  if (alertEl) {
    alertEl.innerHTML = RAIL_DATA.alerts.map(function (a) {
      return '<div class="risk-alert"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span>' + esc(a) + '</span></div>';
    }).join("");
  }

  // Events
  var evEl = document.getElementById("rail-events");
  if (evEl) {
    evEl.innerHTML = RAIL_DATA.events.map(function (e) {
      return '<div class="event-row"><span class="event-date">' + esc(e.date) + '</span><span class="event-text">' + esc(e.text) + '</span></div>';
    }).join("");
  }
}

// ---- Render: Time ----

function updateTime() {
  var el = document.getElementById("topnav-time");
  if (!el) return;
  var now = new Date();
  el.textContent = now.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

// ---- Event: Switcher sync ----

function updateSwitcher() {
  document.querySelectorAll("#portfolio-switcher .switch-btn").forEach(function (btn) {
    btn.classList.toggle("active", btn.getAttribute("data-v") === state.activeVariant);
  });
}

// ---- Event: Bindings ----

function bindEvents() {
  // Tab buttons
  document.getElementById("tab-bar").addEventListener("click", function (e) {
    var btn = e.target.closest(".tab-btn");
    if (!btn) return;
    state.activeTab = btn.getAttribute("data-tab");
    document.querySelectorAll("#tab-bar .tab-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    renderTab();
  });

  // Chart type tabs
  document.querySelector(".chart-tabs").addEventListener("click", function (e) {
    var btn = e.target.closest(".chart-tab");
    if (!btn) return;
    state.activeChartType = btn.getAttribute("data-chart");
    document.querySelectorAll(".chart-tab").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    renderChart();
  });

  // Time range
  document.getElementById("time-range").addEventListener("click", function (e) {
    var btn = e.target.closest(".time-btn");
    if (!btn) return;
    state.activeRange = btn.getAttribute("data-r");
    document.querySelectorAll("#time-range .time-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    renderChart();
  });

  // Portfolio switcher
  document.getElementById("portfolio-switcher").addEventListener("click", function (e) {
    var btn = e.target.closest(".switch-btn");
    if (!btn) return;
    state.activeVariant = btn.getAttribute("data-v");
    updateSwitcher();
    renderComparison();
    renderChart();
    renderTab();
  });

  // Profile drawer
  var overlay = document.getElementById("drawer-overlay");
  var drawer = document.getElementById("drawer");
  var wizardStep = 1;
  var totalSteps = 6;

  function updateWizard() {
    document.querySelectorAll(".wizard-page").forEach(function (p) {
      p.classList.toggle("active", parseInt(p.getAttribute("data-page")) === wizardStep);
    });
    document.querySelectorAll(".wiz-step").forEach(function (s) {
      var n = parseInt(s.getAttribute("data-step"));
      s.classList.toggle("active", n === wizardStep);
      s.classList.toggle("done", n < wizardStep);
    });
    document.getElementById("wizard-prev").style.visibility = wizardStep === 1 ? "hidden" : "visible";
    document.getElementById("wizard-next").style.display = wizardStep === totalSteps ? "none" : "";
    document.getElementById("build-btn").style.display = wizardStep === totalSteps ? "" : "none";
  }

  document.getElementById("profile-drawer-toggle").addEventListener("click", function () {
    overlay.classList.add("open");
  });
  document.getElementById("drawer-close").addEventListener("click", function () {
    overlay.classList.remove("open");
  });
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) overlay.classList.remove("open");
  });
  drawer.addEventListener("click", function (e) { e.stopPropagation(); });

  document.getElementById("wizard-next").addEventListener("click", function () {
    if (wizardStep < totalSteps) { wizardStep++; updateWizard(); }
  });
  document.getElementById("wizard-prev").addEventListener("click", function () {
    if (wizardStep > 1) { wizardStep--; updateWizard(); }
  });

  // Clickable step indicators
  document.querySelectorAll(".wiz-step").forEach(function (s) {
    s.addEventListener("click", function () {
      var n = parseInt(s.getAttribute("data-step"));
      if (n <= wizardStep + 1) { wizardStep = n; updateWizard(); }
    });
  });

  // Build button — uses SSE to stream real agent progress
  document.getElementById("build-btn").addEventListener("click", function () {
    var form = document.getElementById("profile-form");
    var fd = new FormData(form);
    var profile = {
      age: parseInt(fd.get("age"), 10),
      experience: fd.get("experience"),
      time_horizon: fd.get("time_horizon"),
      risk_tolerance: fd.get("risk_tolerance"),
      goal: fd.get("goal"),
      preference: fd.get("preference"),
      invest_amount: parseInt(fd.get("invest_amount"), 10) || 100000,
      max_drawdown: fd.get("max_drawdown"),
      drawdown_reaction: fd.get("drawdown_reaction")
    };

    var btn = document.getElementById("build-btn");
    var errEl = document.getElementById("build-error");
    btn.disabled = true;
    btn.textContent = "Building...";
    errEl.style.display = "none";
    console.log("[PortfolioAI] Build started via SSE", profile);

    // Close drawer
    var drawerEl = document.getElementById("drawer-overlay");
    if (drawerEl) drawerEl.classList.remove("open");
    if (overlay) overlay.classList.remove("open");

    // Show process card with all agents as "Waiting..."
    showProcessCard();

    // Save profile to localStorage and update name
    var profileName = fd.get("full_name") || "";
    if (!profileName) profileName = getActiveProfile();
    saveProfile(profileName, profile);
    setActiveProfile(profileName);
    var nameEl = document.getElementById("ud-current-name");
    if (nameEl) nameEl.textContent = profileName;
    var userNameEl = document.querySelector(".user-name");
    if (userNameEl) userNameEl.textContent = profileName;
    var avatarEl = document.querySelector(".topnav-user .avatar");
    if (avatarEl) {
      var parts = profileName.trim().split(/\s+/);
      var initials = parts.map(function(w) { return w.charAt(0); }).join("").toUpperCase().slice(0, 2);
      if (!initials) initials = profileName.charAt(0).toUpperCase();
      avatarEl.textContent = initials;
    }

    // POST with fetch, then read the SSE stream from the response body
    fetch("/api/build-portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    }).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (t) {
          try { var e = JSON.parse(t); throw new Error(e.error || "Request failed"); }
          catch (ex) { throw new Error("Request failed: " + res.status); }
        });
      }
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var buffer = "";

      function processChunk(result) {
        if (result.done) return;
        buffer += decoder.decode(result.value, { stream: true });
        // Parse SSE lines from buffer
        var lines = buffer.split("\n");
        buffer = lines.pop(); // keep incomplete line in buffer
        var currentEvent = "";
        for (var li = 0; li < lines.length; li++) {
          var line = lines[li];
          if (line.indexOf("event: ") === 0) {
            currentEvent = line.slice(7).trim();
          } else if (line.indexOf("data: ") === 0) {
            var jsonStr = line.slice(6);
            try {
              var payload = JSON.parse(jsonStr);
              handleSSE(currentEvent, payload, profile);
            } catch (e) {
              console.warn("[PortfolioAI] SSE parse error:", e);
            }
          }
        }
        return reader.read().then(processChunk);
      }

      return reader.read().then(processChunk);
    }).catch(function (err) {
      console.error("[PortfolioAI] Build error:", err);
      hideProcessCard(false);
      errEl.textContent = err.message;
      errEl.style.display = "block";
    }).finally(function () {
      btn.disabled = false;
      btn.textContent = "Build Portfolio";
    });
  });

  function handleSSE(event, payload, profile) {
    if (event === "agent") {
      console.log("[PortfolioAI] Agent:", payload.name, payload.status, payload.detail || "");
      updateProcessStep(payload.index, payload.status, payload.detail || "");
    } else if (event === "result") {
      console.log("[PortfolioAI] Final result received", payload);

      // Update badge
      if (payload.profile_type) {
        var label = payload.profile_type.replace(/_/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); });
        var badgeEl = document.getElementById("profile-badge");
        if (badgeEl) badgeEl.textContent = label;
      }

      // Map API portfolios to frontend structure
      var investAmt = profile.invest_amount || 125000;
      ["base", "safer", "higher"].forEach(function (key) {
        if (payload[key] && payload[key].length) {
          var mapped = mapApiPortfolio(payload[key], investAmt, key);
          mapped.explanation = (payload.explanations && payload.explanations[key]) || PORTFOLIOS[key].explanation;
          PORTFOLIOS[key] = mapped;
        }
      });

      // Update agent reasoning
      if (payload.agent_reasoning && payload.agent_reasoning.length) {
        AGENTS = payload.agent_reasoning;
      }

      // Update summary strip
      var p = PORTFOLIOS[state.activeVariant];
      var svVal = document.getElementById("sv-value");
      if (svVal) svVal.textContent = "$" + investAmt.toLocaleString();
      var svRet = document.getElementById("sv-return");
      if (svRet) svRet.textContent = p.expectedReturn;
      var svHorizon = document.getElementById("sv-horizon");
      if (svHorizon) svHorizon.textContent = (profile.time_horizon || "5+");

      // Short delay so user sees the last agent finish, then navigate
      setTimeout(function () {
        hideProcessCard(true);
        setTimeout(function () {
          navigateTo("dashboard");
          document.querySelectorAll(".sidebar-link").forEach(function (l) { l.classList.remove("active"); });
          var dashLink = document.querySelector('.sidebar-link[data-page="dashboard"]');
          if (dashLink) dashLink.classList.add("active");
          renderComparison();
          renderChart();
          renderTab();
        }, 500);
      }, 600);
    }
  }

  // Sidebar links — SPA routing
  document.querySelectorAll(".sidebar-link[data-page]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelectorAll(".sidebar-link").forEach(function (l) { l.classList.remove("active"); });
      link.classList.add("active");
      var page = link.getAttribute("data-page");
      navigateTo(page);
    });
  });

  // Fetch news from API
  function fetchNews() {
    fetch("/api/news")
      .then(function (r) { return r.json(); })
      .then(function (articles) {
        if (!articles || !articles.length) return;
        RAIL_DATA.news = articles.slice(0, 8).map(function (a) {
          return { title: a.title, source: a.source, time: a.published ? formatRelTime(a.published) : "", tag: "", link: a.link || "" };
        });
        renderRail();
      })
      .catch(function () {});
  }
  fetchNews();
  // Auto-refresh news every 15 seconds
  setInterval(fetchNews, 15000);

  // Fetch index quotes for topnav
  fetch("/api/index-quotes")
    .then(function (r) { return r.json(); })
    .then(function (quotes) {
      if (!quotes || !quotes.length) return;
      var el = document.getElementById("market-indicators");
      if (!el) return;
      var html = "";
      quotes.forEach(function (q) {
        var dir = q.change_pct >= 0 ? "up" : "down";
        html += '<div class="market-idx">';
        html += '<span class="market-dot ' + dir + '"></span>';
        html += '<span class="market-lbl">' + esc(q.name) + '</span>';
        html += '<span class="market-val">' + q.price.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</span>';
        html += '<span class="market-chg ' + dir + '">' + (q.change_pct >= 0 ? "+" : "") + q.change_pct.toFixed(2) + '%</span>';
        html += '</div>';
      });
      html += '<span class="market-status"><span class="status-dot open"></span>Market</span>';
      el.innerHTML = html;
    })
    .catch(function () {});

  // Refresh index quotes periodically
  setInterval(function () {
    fetch("/api/index-quotes")
      .then(function (r) { return r.json(); })
      .then(function (quotes) {
        if (!quotes || !quotes.length) return;
        var el = document.getElementById("market-indicators");
        if (!el) return;
        var html = "";
        quotes.forEach(function (q) {
          var dir = q.change_pct >= 0 ? "up" : "down";
          html += '<div class="market-idx">';
          html += '<span class="market-dot ' + dir + '"></span>';
          html += '<span class="market-lbl">' + esc(q.name) + '</span>';
          html += '<span class="market-val">' + q.price.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</span>';
          html += '<span class="market-chg ' + dir + '">' + (q.change_pct >= 0 ? "+" : "") + q.change_pct.toFixed(2) + '%</span>';
          html += '</div>';
        });
        html += '<span class="market-status"><span class="status-dot open"></span>Market</span>';
        el.innerHTML = html;
      })
      .catch(function () {});
  }, 30000);

  // Fetch market data for movers in rail
  fetch("/api/market-data")
    .then(function (r) { return r.json(); })
    .then(function (quotes) {
      if (!quotes || !quotes.length) return;
      RAIL_DATA.movers = quotes.slice(0, 5).map(function (q) {
        return { ticker: q.ticker, name: q.ticker, pct: q.change_pct };
      });
      renderRail();
    })
    .catch(function () {});

  // ---- Search Bar ----
  var searchInput = document.getElementById("ticker-search");
  var searchDropdown = document.getElementById("search-dropdown");
  if (searchInput && searchDropdown) {
    var allTickers = Object.keys(TICKER_INFO).map(function (t) {
      return { ticker: t, name: TICKER_INFO[t].name, type: TICKER_INFO[t].type };
    });

    searchInput.addEventListener("input", function () {
      var q = searchInput.value.trim().toUpperCase();
      if (q.length < 1) { searchDropdown.classList.remove("open"); return; }
      var matches = allTickers.filter(function (t) {
        return t.ticker.indexOf(q) !== -1 || t.name.toUpperCase().indexOf(q) !== -1;
      }).slice(0, 8);
      if (!matches.length) {
        searchDropdown.innerHTML = '<div class="search-empty">No matches for "' + esc(searchInput.value) + '"</div>';
      } else {
        searchDropdown.innerHTML = matches.map(function (m) {
          return '<button class="search-result" data-ticker="' + m.ticker + '">' +
            '<span class="sr-ticker">' + esc(m.ticker) + '</span>' +
            '<span class="sr-name">' + esc(m.name) + '</span>' +
            '<span class="sr-type">' + esc(m.type) + '</span></button>';
        }).join("");
      }
      searchDropdown.classList.add("open");
    });

    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { searchDropdown.classList.remove("open"); searchInput.blur(); }
    });

    searchDropdown.addEventListener("click", function (e) {
      var btn = e.target.closest(".search-result");
      if (!btn) return;
      var ticker = btn.getAttribute("data-ticker");
      searchDropdown.classList.remove("open");
      searchInput.value = ticker;
      // Navigate to dashboard stock chart for this ticker
      navigateTo("dashboard");
      state.activeChartType = "stock";
      document.querySelectorAll(".chart-tab").forEach(function (t) { t.classList.remove("active"); });
      var stockTab = document.querySelector('.chart-tab[data-chart="stock"]');
      if (stockTab) stockTab.classList.add("active");
      // Fetch and display
      var periodMap = { "1D": "1d", "1W": "5d", "1M": "1mo", "6M": "6mo", "1Y": "1y", "MAX": "5y" };
      var period = periodMap[state.activeRange] || "1mo";
      fetch("/api/stock-history/" + ticker + "?period=" + period)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && data.length) {
            stockChartCache[ticker + "-" + period] = data;
            drawStockChart(data, ticker);
          }
        })
        .catch(function () {});
    });

    // Close search on click outside
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".topnav-search") && !e.target.closest(".search-dropdown")) {
        searchDropdown.classList.remove("open");
      }
    });

    // Keyboard shortcut: / to focus search
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  // ---- User Menu ----
  var userMenuBtn = document.getElementById("user-menu-btn");
  var userDropdown = document.getElementById("user-dropdown");
  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      userDropdown.classList.toggle("open");
      // Refresh profiles list
      var listEl = document.getElementById("ud-profiles-list");
      var profiles = getProfiles();
      var active = getActiveProfile();
      var keys = Object.keys(profiles);
      if (!keys.length) {
        listEl.innerHTML = '<div style="padding:6px 14px;font-size:10px;color:var(--text-muted)">No saved profiles yet</div>';
      } else {
        listEl.innerHTML = keys.map(function (k) {
          var isActive = k === active;
          return '<button class="ud-profile-item' + (isActive ? " active" : "") + '" data-profile="' + esc(k) + '">' +
            '<span class="ud-profile-dot" style="background:' + (isActive ? "var(--accent)" : "var(--border)") + '"></span>' +
            '<span>' + esc(k) + '</span></button>';
        }).join("");
      }
    });

    userDropdown.addEventListener("click", function (e) {
      var item = e.target.closest(".ud-profile-item");
      if (item) {
        var name = item.getAttribute("data-profile");
        setActiveProfile(name);
        var profiles = getProfiles();
        var p = profiles[name];
        if (p && p.data) {
          // Fill form with saved profile data
          var form = document.getElementById("profile-form");
          Object.keys(p.data).forEach(function (key) {
            var el = form.querySelector('[name="' + key + '"]');
            if (el) el.value = p.data[key];
          });
        }
        document.querySelector(".user-name").textContent = name;
        document.getElementById("ud-current-name").textContent = name;
        var initials = name.split(" ").map(function(w) { return w[0]; }).join("").toUpperCase().slice(0, 2);
        document.querySelector(".topnav-user .avatar").textContent = initials;
        userDropdown.classList.remove("open");
      }
    });

    document.getElementById("ud-new-profile").addEventListener("click", function () {
      userDropdown.classList.remove("open");
      document.getElementById("profile-form").reset();
      document.getElementById("profile-drawer-toggle").click();
    });

    document.getElementById("ud-edit-profile").addEventListener("click", function () {
      userDropdown.classList.remove("open");
      document.getElementById("profile-drawer-toggle").click();
    });

    // Close on outside click
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".topnav-user") && !e.target.closest(".user-dropdown")) {
        userDropdown.classList.remove("open");
      }
    });
  }
}

function formatRelTime(dateStr) {
  try {
    var d = new Date(dateStr);
    var mins = Math.floor((Date.now() - d) / 60000);
    if (mins < 60) return mins + "m ago";
    var hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + "h ago";
    return d.toLocaleDateString();
  } catch (e) { return ""; }
}

// ---- SPA Page Routing ----

var dashboardHTML = null;

function navigateTo(page) {
  var main = document.getElementById("main-panel");
  var rail = document.getElementById("intel-rail");

  // Save dashboard HTML on first navigation away
  if (!dashboardHTML && page !== "dashboard") {
    dashboardHTML = main.innerHTML;
  }

  if (page === "dashboard") {
    if (dashboardHTML) {
      main.innerHTML = dashboardHTML;
      dashboardHTML = null;
    }
    rail.style.display = "";
    // Re-init dashboard
    renderComparison();
    renderChart();
    renderTab();
    bindEvents_dashboard();
    return;
  }

  rail.style.display = page === "settings" ? "none" : "";

  if (page === "builder")         main.innerHTML = renderBuilderPage();
  else if (page === "variants")   main.innerHTML = renderVariantsPage();
  else if (page === "holdings")   main.innerHTML = renderHoldingsPage();
  else if (page === "discussion") main.innerHTML = renderDiscussionPage();
  else if (page === "learn")      main.innerHTML = renderLearnPage();
  else if (page === "settings")   main.innerHTML = renderSettingsPage();
}

function bindEvents_dashboard() {
  // Re-bind tab bar, chart tabs, time range, portfolio switcher
  var tabBar = document.getElementById("tab-bar");
  if (tabBar) tabBar.addEventListener("click", function (e) {
    var btn = e.target.closest(".tab-btn");
    if (!btn) return;
    state.activeTab = btn.getAttribute("data-tab");
    document.querySelectorAll("#tab-bar .tab-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    renderTab();
  });
  var chartTabs = document.querySelector(".chart-tabs");
  if (chartTabs) chartTabs.addEventListener("click", function (e) {
    var btn = e.target.closest(".chart-tab");
    if (!btn) return;
    state.activeChartType = btn.getAttribute("data-chart");
    document.querySelectorAll(".chart-tab").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    renderChart();
  });
  var timeRange = document.getElementById("time-range");
  if (timeRange) timeRange.addEventListener("click", function (e) {
    var btn = e.target.closest(".time-btn");
    if (!btn) return;
    state.activeRange = btn.getAttribute("data-r");
    document.querySelectorAll("#time-range .time-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    renderChart();
  });
  var switcher = document.getElementById("portfolio-switcher");
  if (switcher) switcher.addEventListener("click", function (e) {
    var btn = e.target.closest(".switch-btn");
    if (!btn) return;
    state.activeVariant = btn.getAttribute("data-v");
    updateSwitcher();
    renderComparison();
    renderChart();
    renderTab();
  });
}

// ---- Page: Portfolio Builder ----
function renderBuilderPage() {
  var html = '<section class="page-content">';
  html += '<div class="section-header"><h2 class="section-title">Portfolio Builder</h2></div>';
  html += '<div class="builder-intro">';
  html += '<p style="color:var(--text-secondary);font-size:12px;margin-bottom:16px">Configure your investment parameters and let the AI build an optimized portfolio. The system uses multiple specialized agents to analyze your profile, screen assets, construct allocations, and simulate outcomes.</p>';
  html += '</div>';

  html += '<div class="builder-grid">';
  // Quick build card
  html += '<div class="builder-card">';
  html += '<div class="bc-icon" style="color:var(--accent)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>';
  html += '<h3 class="bc-title">Quick Build</h3>';
  html += '<p class="bc-desc">Use your current investor profile to generate portfolio variants instantly.</p>';
  html += '<button class="bc-btn" onclick="document.getElementById(\'profile-drawer-toggle\').click()">Open Profile &amp; Build</button>';
  html += '</div>';

  // Agent pipeline card
  html += '<div class="builder-card">';
  html += '<div class="bc-icon" style="color:var(--green)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg></div>';
  html += '<h3 class="bc-title">Agent Pipeline</h3>';
  html += '<p class="bc-desc">Watch each AI agent process your profile step by step — from classification to simulation.</p>';
  html += '<div class="agent-pipeline">';
  AGENTS.forEach(function (a) {
    html += '<div class="pipeline-step"><span class="pipeline-dot" style="background:' + a.color + '"></span><span class="pipeline-name">' + esc(a.name) + '</span></div>';
  });
  html += '</div>';
  html += '</div>';

  // Asset universe card
  html += '<div class="builder-card">';
  html += '<div class="bc-icon" style="color:#f59e0b"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>';
  html += '<h3 class="bc-title">Asset Universe</h3>';
  html += '<p class="bc-desc">The builder screens from a curated universe of ETFs and stocks.</p>';
  html += '<div class="asset-universe-list">';
  var assets = PORTFOLIOS.base.holdings.concat(PORTFOLIOS.safer.holdings, PORTFOLIOS.higher.holdings);
  var seen = {};
  assets.forEach(function (a) {
    if (seen[a.ticker]) return;
    seen[a.ticker] = true;
    html += '<span class="au-chip">' + esc(a.ticker) + '</span>';
  });
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '</section>';
  return html;
}

// ---- Page: Portfolio Variants ----
function renderVariantsPage() {
  var html = '<section class="page-content">';
  html += '<div class="section-header"><h2 class="section-title">Portfolio Variants</h2></div>';
  html += '<p style="color:var(--text-secondary);font-size:12px;margin-bottom:16px">Compare all three portfolio variants side-by-side with detailed metrics.</p>';

  html += '<div class="variants-comparison">';
  ["base", "safer", "higher"].forEach(function (key) {
    var p = PORTFOLIOS[key];
    html += '<div class="variant-detail-card ' + p.variant + '">';
    html += '<div class="vd-header"><span class="pcard-tag ' + p.tagCls + '">' + esc(p.tag) + '</span>';
    html += '<h3 style="color:var(--text-primary);font-size:14px;margin:8px 0 2px">' + esc(p.name) + '</h3>';
    html += '<span style="color:var(--text-muted);font-size:11px">' + esc(p.subtitle) + '</span></div>';

    html += '<div class="vd-metrics">';
    var metrics = [
      ["Expected Return", p.expectedReturn],
      ["Risk Level", p.riskLevel],
      ["Volatility", p.volatility],
      ["Holdings", p.holdings.length.toString()],
      ["Annual Return", p.annualReturn + "%"],
      ["Sectors", p.sectors.length.toString()]
    ];
    metrics.forEach(function (m) {
      html += '<div class="vd-metric"><span class="vd-metric-label">' + m[0] + '</span><span class="vd-metric-value">' + esc(m[1]) + '</span></div>';
    });
    html += '</div>';

    html += '<div class="vd-holdings"><div style="font-size:10px;font-weight:600;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase">All Holdings</div>';
    p.holdings.forEach(function (h) {
      html += '<div class="vd-holding"><span>' + esc(h.ticker) + '</span><span style="color:var(--text-muted)">' + esc(h.name) + '</span><span>' + h.weight + '%</span></div>';
    });
    html += '</div>';

    html += '<div class="vd-explain" style="font-size:11px;color:var(--text-secondary);margin-top:10px">' + esc(p.explanation) + '</div>';
    html += '</div>';
  });
  html += '</div>';
  html += '</section>';
  return html;
}

// ---- Page: Holdings ----
function renderHoldingsPage() {
  var p = PORTFOLIOS[state.activeVariant];
  var html = '<section class="page-content">';
  html += '<div class="section-header"><h2 class="section-title">Holdings — ' + esc(p.name) + '</h2>';
  html += '<div class="portfolio-switcher" id="holdings-switcher">';
  ["base", "safer", "higher"].forEach(function (k) {
    html += '<button class="switch-btn' + (k === state.activeVariant ? " active" : "") + '" data-hv="' + k + '">' + PORTFOLIOS[k].name.split(" ")[0] + '</button>';
  });
  html += '</div></div>';

  html += renderHoldings();

  html += '</section>';

  // Bind switcher after render
  setTimeout(function () {
    var switcher = document.getElementById("holdings-switcher");
    if (switcher) switcher.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-hv]");
      if (!btn) return;
      state.activeVariant = btn.getAttribute("data-hv");
      var main = document.getElementById("main-panel");
      main.innerHTML = renderHoldingsPage();
    });
  }, 0);

  return html;
}

// ---- Page: Agent Discussion ----
function renderDiscussionPage() {
  var html = '<section class="page-content">';
  html += '<div class="section-header"><h2 class="section-title">Agent Discussion</h2></div>';
  html += '<p style="color:var(--text-secondary);font-size:12px;margin-bottom:16px">See how the AI agents collaborated to build your portfolio. Each agent contributes specialized analysis.</p>';

  html += '<div class="discussion-timeline">';
  AGENTS.forEach(function (a, i) {
    html += '<div class="disc-entry">';
    html += '<div class="disc-connector"><span class="disc-dot" style="background:' + a.color + '"></span>';
    if (i < AGENTS.length - 1) html += '<span class="disc-line"></span>';
    html += '</div>';
    html += '<div class="disc-content">';
    html += '<div class="disc-agent"><span class="disc-agent-name">' + esc(a.name) + '</span><span class="disc-step">Step ' + (i + 1) + '</span></div>';
    html += '<div class="disc-msg">' + esc(a.text) + '</div>';
    html += '</div></div>';
  });
  html += '</div>';

  // Chat follow-up
  html += '<div style="margin-top:20px">';
  html += renderChat();
  html += '</div>';

  setTimeout(function () { bindChat(); }, 0);

  html += '</section>';
  return html;
}

// ---- Page: Learn ----
function renderLearnPage() {
  var html = '<section class="page-content">';
  html += '<div class="section-header"><h2 class="section-title">Learn</h2></div>';
  html += '<p style="color:var(--text-secondary);font-size:12px;margin-bottom:20px">Educational resources to help you understand portfolio construction and investment concepts.</p>';

  var topics = [
    { title: "What is Portfolio Diversification?", desc: "Learn how spreading investments across asset classes reduces risk without sacrificing returns. Diversification is the only free lunch in investing.", icon: "📊" },
    { title: "Understanding Risk & Volatility", desc: "Volatility measures how much an investment's value fluctuates. Higher volatility means higher potential returns — but also higher potential losses.", icon: "📈" },
    { title: "ETFs vs Individual Stocks", desc: "ETFs provide instant diversification at low cost. Individual stocks offer higher potential returns but concentrate risk in single companies.", icon: "🏦" },
    { title: "Asset Allocation Strategies", desc: "How to split your portfolio between stocks, bonds, and alternatives based on your age, goals, and risk tolerance.", icon: "⚖️" },
    { title: "Reading Financial Statements", desc: "Understanding income statements, balance sheets, and cash flow statements helps evaluate whether a stock is fairly valued.", icon: "📋" },
    { title: "How AI Builds Portfolios", desc: "Our multi-agent system uses specialized AI agents for profiling, screening, allocation, simulation, and risk management.", icon: "🤖" }
  ];

  html += '<div class="learn-grid">';
  topics.forEach(function (t) {
    html += '<div class="learn-card">';
    html += '<span class="learn-icon">' + t.icon + '</span>';
    html += '<h3 class="learn-title">' + esc(t.title) + '</h3>';
    html += '<p class="learn-desc">' + esc(t.desc) + '</p>';
    html += '</div>';
  });
  html += '</div>';
  html += '</section>';
  return html;
}

// ---- Page: Settings ----
function renderSettingsPage() {
  var html = '<section class="page-content">';
  html += '<div class="section-header"><h2 class="section-title">Settings</h2></div>';
  html += '<div class="settings-list">';
  html += '<div class="setting-row"><span class="setting-label">Theme</span><span class="setting-value">Dark</span></div>';
  html += '<div class="setting-row"><span class="setting-label">Currency</span><span class="setting-value">USD</span></div>';
  html += '<div class="setting-row"><span class="setting-label">Data Refresh</span><span class="setting-value">Real-time</span></div>';
  html += '<div class="setting-row"><span class="setting-label">Notifications</span><span class="setting-value">Enabled</span></div>';
  html += '</div>';
  html += '</section>';
  return html;
}

// ---- Init ----

function init() {
  updateTime();
  setInterval(updateTime, 30000);
  renderComparison();
  renderChart();
  renderTab();
  renderRail();
  bindEvents();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

})();
