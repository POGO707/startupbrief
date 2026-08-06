export interface WidgetSettings {
  showDateTime: boolean;
  showWeather: boolean;
  showStocks: boolean;
  showCrypto: boolean;
  showForex: boolean;
  showMetals: boolean;
  defaultCity: string;
  refreshInterval: number; // in seconds
}

export const defaultWidgetSettings: WidgetSettings = {
  showDateTime: true,
  showWeather: true,
  showStocks: true,
  showCrypto: true,
  showForex: true,
  showMetals: true,
  defaultCity: "New Delhi",
  refreshInterval: 300,
};

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface MarketTicker {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

// Fallback Live Data (Used when free APIs are slow or offline)
export const fallbackMarkets: MarketTicker[] = [
  { symbol: "NIFTY", name: "NIFTY 50", price: "24,852.10", change: "+142.30", changePercent: "+0.58%", isPositive: true },
  { symbol: "SENSEX", name: "SENSEX", price: "81,455.80", change: "+410.20", changePercent: "+0.51%", isPositive: true },
  { symbol: "NASDAQ", name: "NASDAQ", price: "17,680.40", change: "-65.10", changePercent: "-0.37%", isPositive: false },
  { symbol: "SP500", name: "S&P 500", price: "5,520.15", change: "+12.80", changePercent: "+0.23%", isPositive: true },
];

export const fallbackCrypto: MarketTicker[] = [
  { symbol: "BTC", name: "Bitcoin", price: "$64,250.00", change: "+$1,120.00", changePercent: "+1.77%", isPositive: true },
  { symbol: "ETH", name: "Ethereum", price: "$3,480.50", change: "+$85.20", changePercent: "+2.51%", isPositive: true },
];

export const fallbackForex: MarketTicker = {
  symbol: "USDINR",
  name: "USD / INR",
  price: "83.92",
  change: "+0.08",
  changePercent: "+0.10%",
  isPositive: true,
};

export const fallbackMetals: MarketTicker[] = [
  { symbol: "GOLD", name: "Gold (10g)", price: "₹72,450", change: "+₹210", changePercent: "+0.29%", isPositive: true },
  { symbol: "SILVER", name: "Silver (1kg)", price: "₹88,200", change: "-₹150", changePercent: "-0.17%", isPositive: false },
];

export async function fetchWeatherData(city: string = "New Delhi"): Promise<WeatherData | null> {
  try {
    // Geocoding city name to lat/lon via Open-Meteo free geocoding API
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
      { next: { revalidate: 3600 } }
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return {
        city: city || "New Delhi",
        temperature: 29,
        condition: "Partly Cloudy",
        humidity: 62,
        windSpeed: 12,
        icon: "⛅",
      };
    }

    const { latitude, longitude, name } = geoData.results[0];
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`,
      { next: { revalidate: 600 } }
    );
    const weatherData = await weatherRes.json();

    if (!weatherData.current) throw new Error("Invalid weather response");

    const code = weatherData.current.weather_code;
    let condition = "Clear";
    let icon = "☀️";

    if (code >= 1 && code <= 3) { condition = "Partly Cloudy"; icon = "⛅"; }
    else if (code >= 45 && code <= 48) { condition = "Foggy"; icon = "🌫️"; }
    else if (code >= 51 && code <= 67) { condition = "Rainy"; icon = "🌧️"; }
    else if (code >= 71 && code <= 77) { condition = "Snowy"; icon = "❄️"; }
    else if (code >= 95) { condition = "Thunderstorm"; icon = "🌩️"; }

    return {
      city: name,
      temperature: Math.round(weatherData.current.temperature_2m),
      condition,
      humidity: weatherData.current.relative_humidity_2m,
      windSpeed: Math.round(weatherData.current.wind_speed_10m),
      icon,
    };
  } catch (error) {
    console.warn("Weather API fallback active for:", city);
    return {
      city: city || "New Delhi",
      temperature: 28,
      condition: "Sunny",
      humidity: 58,
      windSpeed: 10,
      icon: "☀️",
    };
  }
}
