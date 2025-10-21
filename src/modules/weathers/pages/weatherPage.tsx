import CurrentWeatherCard from '../components/CurrentWeatherCard'
import ForecastDayCard from '../components/ForecastDayCard'
import AlertsList, { type Alert } from '../components/AlertsList'

const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const sampleAlerts: Alert[] = [
	{
		title: 'Riesgo de lluvias intensas',
		description: 'Posibilidad de 25-50 mm de lluvia en 24 horas este fin de semana. Protege tus cultivos y prepara drenajes.',
		severity: 'medium',
		tags: ['Maíz', 'Frijol']
	},
	{
		title: 'Ventana ideal para fertilizar',
		description: 'Vientos suaves y humedad moderada: condiciones favorables para aplicación de fertilizantes.',
		severity: 'low',
		tags: ['Café']
	}
]

export default function WeatherPage() {
	return (
		<div className="pb-16">
			<h1 className="text-3xl font-extrabold text-center mb-6">Clima y Alertas Agrícolas</h1>

			{/* Clima actual */}
			<CurrentWeatherCard
				tempC={27}
				summary="Soleado con nubes dispersas"
				details={[
					{ label: 'Sensación', value: '26°C', icon: 'feels' },
					{ label: 'Humedad', value: '65%', icon: 'humidity' },
					{ label: 'Viento', value: '12 km/h', icon: 'wind' },
					{ label: 'Índice UV', value: 'Bajo', icon: 'uv' },
				]}
			/>

			{/* Alertas (primero) */}
			<section className="mt-8">
				<h2 className="text-xl font-semibold mb-3">Alertas destacadas</h2>
				<AlertsList alerts={sampleAlerts} />
			</section>

			{/* Pronóstico */}
			<section className="mt-8">
				<h2 className="text-xl font-semibold mb-3">Pronóstico extendido (7 días)</h2>
				{/* En móvil permitimos desplazamiento horizontal para mejor aprovechamiento de espacio */}
				<div className="-mx-4 sm:mx-0 overflow-x-auto pb-2">
					<div className="px-4 sm:px-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4 min-w-[540px] sm:min-w-0">
						{days.map((d, i) => (
							<ForecastDayCard
								key={d}
								day={d}
								min={16 + (i % 3)}
								max={26 + (i % 4)}
								note={i % 3 === 0 ? 'Soleado' : i % 3 === 1 ? 'Parcialmente nublado' : 'Chubascos'}
								// isToday: resaltamos dependiendo del día actual
								// Nota: en datos reales usaríamos la fecha exacta. Aquí simulamos comparando el índice con Date.getDay()
								isToday={(new Date().getDay() + 6) % 7 === i}
							/>
						))}
					</div>
				</div>

				<div className="mt-6 text-center">
					<button className="px-5 py-2.5 rounded-xl bg-primary-600 text-white hover:bg-primary-700 shadow-sm">Ver más detalles</button>
				</div>
			</section>
		</div>
	)
}
