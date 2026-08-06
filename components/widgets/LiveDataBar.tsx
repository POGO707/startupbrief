"use client";

import { useState, useEffect } from "react";
import {
  fetchWeatherData,
  fallbackMarkets,
  fallbackCrypto,
  fallbackForex,
  fallbackMetals,
  WeatherData,
  WidgetSettings,
  defaultWidgetSettings,
} from "@/lib/widgets";
import { TrendingUp, TrendingDown, Clock, Sun, DollarSign, Coins } from "lucide-react";

export default function LiveDataBar() {
  const [settings, setSettings] = useState<WidgetSettings>(defaultWidgetSettings);
  const [timeString, setTimeString] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [markets] = useState(fallbackMarkets);
  const [crypto] = useState(fallbackCrypto);
  const [forex] = useState(fallbackForex);
  const [metals] = useState(fallbackMetals);

  // Load Settings from API / LocalStorage
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
      })
      .catch(() => {});
  }, []);

  // Update Live Time every second / minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setDateString(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }).toUpperCase()
      );
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 10000); // 10s check
    return () => clearInterval(interval);
  }, []);

  // Fetch Weather
  useEffect(() => {
    if (settings.showWeather) {
      fetchWeatherData(settings.defaultCity).then(setWeather);
    }
  }, [settings.showWeather, settings.defaultCity]);

  return (
    <div className="live-data-bar-wrapper">
      <div className="newspaper-container">
        <div className="live-data-inner">
          {/* 1. LIVE DATE & TIME */}
          {settings.showDateTime && (
            <div className="live-widget-item date-time-widget">
              <Clock size={13} className="widget-icon" />
              <span className="date-text">{dateString}</span>
              <span className="time-badge">{timeString}</span>
            </div>
          )}

          {/* 2. WEATHER WIDGET */}
          {settings.showWeather && weather && (
            <div className="live-widget-item weather-widget">
              <span className="weather-emoji">{weather.icon}</span>
              <span className="weather-city">{weather.city}:</span>
              <span className="weather-temp">{weather.temperature}°C</span>
              <span className="weather-cond">({weather.condition})</span>
              <span className="weather-meta">H: {weather.humidity}% | W: {weather.windSpeed} km/h</span>
            </div>
          )}

          {/* 3. STOCK MARKET INDICES */}
          {settings.showStocks && (
            <div className="live-widget-item market-widget">
              {markets.map((m) => (
                <div key={m.symbol} className="ticker-chip">
                  <span className="chip-name">{m.name}:</span>
                  <span className="chip-price">{m.price}</span>
                  <span className={`chip-change ${m.isPositive ? "pos" : "neg"}`}>
                    {m.isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {m.changePercent}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 4. CRYPTO WIDGET */}
          {settings.showCrypto && (
            <div className="live-widget-item crypto-widget">
              <Coins size={12} className="widget-icon" />
              {crypto.map((c) => (
                <div key={c.symbol} className="ticker-chip">
                  <span className="chip-name">{c.name}:</span>
                  <span className="chip-price">{c.price}</span>
                  <span className={`chip-change ${c.isPositive ? "pos" : "neg"}`}>
                    {c.changePercent}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 5. USD/INR FOREX */}
          {settings.showForex && (
            <div className="live-widget-item forex-widget">
              <DollarSign size={12} className="widget-icon" />
              <span className="chip-name">{forex.name}:</span>
              <span className="chip-price">₹{forex.price}</span>
              <span className={`chip-change ${forex.isPositive ? "pos" : "neg"}`}>
                {forex.changePercent}
              </span>
            </div>
          )}

          {/* 6. GOLD & SILVER */}
          {settings.showMetals && (
            <div className="live-widget-item metals-widget">
              {metals.map((mt) => (
                <div key={mt.symbol} className="ticker-chip">
                  <span className="chip-name">{mt.name}:</span>
                  <span className="chip-price">{mt.price}</span>
                  <span className={`chip-change ${mt.isPositive ? "pos" : "neg"}`}>
                    {mt.changePercent}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .live-data-bar-wrapper {
          background: #0f172a;
          color: #ffffff;
          border-bottom: 1px solid #1e293b;
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          padding: 6px 0;
          overflow: hidden;
        }
        .live-data-inner {
          display: flex;
          align-items: center;
          gap: 20px;
          overflow-x: auto;
          scrollbar-width: none;
          white-space: nowrap;
        }
        .live-data-inner::-webkit-scrollbar { display: none; }

        .live-widget-item {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          padding-right: 16px;
          border-right: 1px solid #334155;
        }
        .live-widget-item:last-child {
          border-right: none;
          padding-right: 0;
        }

        .widget-icon {
          color: #ff6a00;
          flex-shrink: 0;
        }
        .date-text {
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #cbd5e1;
        }
        .time-badge {
          background: #ff6a00;
          color: #ffffff;
          font-weight: 800;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 2px;
        }

        .weather-emoji { font-size: 13px; }
        .weather-city { font-weight: 700; color: #ffffff; }
        .weather-temp { font-weight: 800; color: #ff6a00; }
        .weather-cond { color: #94a3b8; font-size: 10px; }
        .weather-meta { color: #64748b; font-size: 10px; }

        .market-widget, .crypto-widget, .metals-widget {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ticker-chip {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .chip-name { font-weight: 700; color: #94a3b8; }
        .chip-price { font-weight: 700; color: #ffffff; }
        .chip-change {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          font-weight: 800;
          font-size: 10px;
          padding: 1px 4px;
          border-radius: 2px;
        }
        .chip-change.pos {
          background: #15803d;
          color: #ffffff;
        }
        .chip-change.neg {
          background: #b91c1c;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
