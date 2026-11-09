import WbSunny from '@mui/icons-material/WbSunny'
import Cloud from '@mui/icons-material/Cloud'
import CloudQueue from '@mui/icons-material/CloudQueue'
import BlurOn from '@mui/icons-material/BlurOn'
import Grain from '@mui/icons-material/Grain'
import WaterDrop from '@mui/icons-material/WaterDrop'
import AcUnit from '@mui/icons-material/AcUnit'
import Thunderstorm from '@mui/icons-material/Thunderstorm'
import FlashOn from '@mui/icons-material/FlashOn'

const SANTA_ROSA_COORDS = { lat: -32.2833, lon: -64.0167 }
const TIMEZONE = 'America/Argentina/Cordoba'
const CACHE_TTL = 45 * 60 * 1000

const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast'

interface CacheEntry<T> {
  data: T
  timestamp: number
}

function getCache<T>(key: string): T | null {
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      const entry: CacheEntry<T> = JSON.parse(stored)
      if (Date.now() - entry.timestamp < CACHE_TTL) {
        return entry.data
      }
    }
  } catch {
  }
  return null
}

function setCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }))
  } catch {
  }
}

export interface CurrentWeather {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  time: string
}

export interface DailyForecast {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_probability_max: number[]
  weathercode: number[]
  uv_index_max: number[]
  windspeed_10m_max: number[]
  relativehumidity_2m_max: number[]
}

export interface HourlyForecast {
  time: string[]
  temperature_2m: number[]
  precipitation_probability: number[]
  weathercode: number[]
}

export interface ForecastResponse {
  daily: DailyForecast
  hourly: HourlyForecast
  current_weather?: CurrentWeather
}

export interface WeatherDisplay {
  icon: React.ComponentType<any>
  label: string
  color: string
}

const WMO_ICONS: Record<number, WeatherDisplay> = {
  0: { icon: WbSunny, label: 'Despejado', color: '#FFD54F' },
  1: { icon: Cloud, label: 'Parcialmente nublado', color: '#90CAF9' },
  2: { icon: CloudQueue, label: 'Nublado', color: '#90CAF9' },
  3: { icon: CloudQueue, label: 'Muy nublado', color: '#78909C' },
  45: { icon: BlurOn, label: 'Niebla', color: '#B0BEC5' },
  48: { icon: BlurOn, label: 'Niebla depositante', color: '#B0BEC5' },
  51: { icon: Grain, label: 'Llovizna ligera', color: '#64B5F6' },
  53: { icon: Grain, label: 'Llovizna moderada', color: '#64B5F6' },
  55: { icon: Grain, label: 'Llovizna densa', color: '#42A5F5' },
  56: { icon: Grain, label: 'Llovizna helada ligera', color: '#64B5F6' },
  57: { icon: Grain, label: 'Llovizna helada densa', color: '#42A5F5' },
  61: { icon: WaterDrop, label: 'Lluvia ligera', color: '#42A5F5' },
  63: { icon: WaterDrop, label: 'Lluvia moderada', color: '#2196F3' },
  65: { icon: WaterDrop, label: 'Lluvia fuerte', color: '#1E88E5' },
  66: { icon: WaterDrop, label: 'Lluvia helada ligera', color: '#42A5F5' },
  67: { icon: WaterDrop, label: 'Lluvia helada fuerte', color: '#1E88E5' },
  71: { icon: AcUnit, label: 'Nieve ligera', color: '#E3F2FD' },
  73: { icon: AcUnit, label: 'Nieve moderada', color: '#BBDEFB' },
  75: { icon: AcUnit, label: 'Nieve fuerte', color: '#90CAF9' },
  77: { icon: AcUnit, label: 'Copos de nieve', color: '#E3F2FD' },
  80: { icon: Thunderstorm, label: 'Chaparrones ligeros', color: '#1E88E5' },
  81: { icon: Thunderstorm, label: 'Chaparrones moderados', color: '#1E88E5' },
  82: { icon: Thunderstorm, label: 'Chaparrones violentos', color: '#1565C0' },
  95: { icon: FlashOn, label: 'Tormenta', color: '#FDD835' },
  96: { icon: FlashOn, label: 'Tormenta con granizo ligero', color: '#FDD835' },
  99: { icon: FlashOn, label: 'Tormenta con granizo fuerte', color: '#F9A825' },
}

function getIconComponent(code: number | null | undefined): WeatherDisplay['icon'] {
  if (code == null) return WMO_ICONS[0].icon
  const mapping = WMO_ICONS[code] || WMO_ICONS[0]
  return mapping.icon
}

function getLabel(code: number | null | undefined): string {
  if (code == null) return 'Desconocido'
  return WMO_ICONS[code]?.label || 'Desconocido'
}

function getColor(code: number | null | undefined): string {
  if (code == null) return '#FFD54F'
  return WMO_ICONS[code]?.color || '#FFD54F'
}

export function getWeatherDisplay(code: number | null | undefined): WeatherDisplay {
  return {
    icon: getIconComponent(code),
    label: getLabel(code),
    color: getColor(code),
  }
}

function buildUrl(path: string, params: Record<string, string>): string {
  const url = new URL(`${OPEN_METEO_BASE}${path}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  return url.toString()
}

export async function fetchCurrentWeather(): Promise<CurrentWeather | null> {
  const cacheKey = 'weather_current'
  const cached = getCache<CurrentWeather>(cacheKey)
  if (cached) return cached

  try {
    const url = buildUrl('', {
      latitude: SANTA_ROSA_COORDS.lat.toString(),
      longitude: SANTA_ROSA_COORDS.lon.toString(),
      current_weather: 'true',
      timezone: TIMEZONE,
    })
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    const data = json.current_weather
    if (!data) throw new Error('No current_weather in response')
    setCache(cacheKey, data)
    return data
  } catch (err) {
    console.warn('[weather] fetchCurrentWeather failed:', err)
    return getCache<CurrentWeather>(cacheKey)
  }
}

export async function fetchForecast(): Promise<ForecastResponse | null> {
  const cacheKey = 'weather_forecast'
  const cached = getCache<ForecastResponse>(cacheKey)
  if (cached) return cached

  try {
    const params = new URLSearchParams({
      latitude: SANTA_ROSA_COORDS.lat.toString(),
      longitude: SANTA_ROSA_COORDS.lon.toString(),
      timezone: TIMEZONE,
      forecast_days: '5',
      temperature_unit: 'celsius',
      wind_speed_unit: 'kmh',
      precipitation_unit: 'mm',
    })
    params.append('daily', 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,uv_index_max,wind_speed_10m_max,relative_humidity_2m_max')
    params.append('hourly', 'temperature_2m,precipitation_probability,weathercode')
    const url = `${OPEN_METEO_BASE}?${params.toString()}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    if (!json.daily || !json.hourly) throw new Error('No daily/hourly in forecast response')
    const data: ForecastResponse = {
      daily: json.daily,
      hourly: json.hourly,
      current_weather: json.current_weather,
    }
    setCache(cacheKey, data)
  return data
  } catch (err) {
    console.warn('[weather] fetchForecast failed:', err)
    return getCache<ForecastResponse>(cacheKey)
  }
}

export function formatTime(isoString: string): string {
  try {
    const date = new Date(isoString)
    return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })
  } catch {
    return isoString
  }
}

export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString)
    return date.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' })
  } catch {
    return isoString
  }
}

export function formatDayName(isoString: string): string {
  try {
    const date = new Date(isoString)
    return date.toLocaleDateString('es-AR', { weekday: 'long' })
  } catch {
    return isoString
  }
}

export function getTodayHourlyForecast(forecast: ForecastResponse): Array<{ time: string; temp: number; precip: number; code: number }> {
  if (!forecast?.hourly) return []
  const today = new Date().toISOString().split('T')[0]
  return forecast.hourly.time
    .map((t, i) => ({
      time: t,
      temp: forecast.hourly.temperature_2m[i],
      precip: forecast.hourly.precipitation_probability[i],
      code: forecast.hourly.weathercode[i],
    }))
    .filter((h) => h.time.startsWith(today))
    .slice(0, 24)
}

export function getDailyForecastList(forecast: ForecastResponse): Array<{
  date: string
  dayName: string
  max: number
  min: number
  precip: number
  code: number
  uv: number
  wind: number
  humidity: number
}> {
  if (!forecast?.daily) return []
  const timeArray = forecast.daily.time ?? []
  const maxArray = forecast.daily.temperature_2m_max ?? []
  const minArray = forecast.daily.temperature_2m_min ?? []
  const precipArray = forecast.daily.precipitation_probability_max ?? []
  const codeArray = forecast.daily.weathercode ?? []
  const uvArray = forecast.daily.uv_index_max ?? []
  const windArray = (forecast.daily as any).wind_speed_10m_max ?? (forecast.daily as any).windspeed_10m_max ?? []
  const humidityArray = (forecast.daily as any).relative_humidity_2m_max ?? (forecast.daily as any).relativehumidity_2m_max ?? []
  return timeArray.map((date: string, i: number) => ({
    date,
    dayName: formatDayName(date),
    max: Math.round(maxArray[i] ?? 0),
    min: Math.round(minArray[i] ?? 0),
    precip: precipArray[i] ?? 0,
    code: codeArray[i] ?? 0,
    uv: Math.round(uvArray[i] ?? 0),
    wind: Math.round(windArray[i] ?? 0),
    humidity: humidityArray[i] ?? 0,
  }))
}