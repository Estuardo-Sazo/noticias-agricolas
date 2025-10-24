import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet'

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY as string

type Props = {
  center: { lat: number; lon: number }
  zoom?: number
}

export default function WeatherMap({ center, zoom = 10 }: Props) {
  const MapC: any = MapContainer as any
  const Layers: any = LayersControl as any
  const TL: any = TileLayer as any
  const { BaseLayer, Overlay } = Layers
  const owm = (layer: string) => `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${API_KEY}`

  return (
    <section className="rounded-2xl border border-gray-200 overflow-hidden">
      <div className="h-[360px]">
        <MapC center={[center.lat, center.lon]} zoom={zoom} style={{ height: '100%', width: '100%' }}>
          <Layers position="topright">
            <BaseLayer checked name="Mapa base (OSM)">
              <TL
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>

            <Overlay checked name="Precipitación">
              <TL url={owm('precipitation_new')} />
            </Overlay>
            <Overlay name="Temperatura">
              <TL url={owm('temp_new')} />
            </Overlay>
            <Overlay name="Nubes">
              <TL url={owm('clouds_new')} />
            </Overlay>
            <Overlay name="Viento">
              <TL url={owm('wind_new')} />
            </Overlay>
            <Overlay name="Presión">
              <TL url={owm('pressure_new')} />
            </Overlay>
          </Layers>
        </MapC>
      </div>
    </section>
  )
}
