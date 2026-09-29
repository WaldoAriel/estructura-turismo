export interface Event {
  title: string
  description: string
  season: string
  month?: string
  location?: string
  image?: string
}

const EVENT_PLACEHOLDERS: Record<string, string> = {
  'AÑO NUEVO BLANCO': '/images/placeholder/evento-anio-nuevo.svg',
  'APERTURA DE TEMPORADA': '/images/placeholder/evento-apertura.svg',
  'FESTIVAL DEL RÍO Y LA LUNA': '/images/placeholder/evento-rioyluna.svg',
  'CARNAVALES DEL RÍO': '/images/placeholder/evento-carnaval.svg',
  'RALLY CORDOBÉS': '/images/placeholder/evento-rally.svg',
  'SAN PATRICIO': '/images/placeholder/evento-sanpatricio.svg',
  'DELICIAS DE PASCUAS': '/images/placeholder/evento-pascuas.svg',
  'SABORES SERRANOS': '/images/placeholder/evento-sabores.svg',
  'FIESTAS PATRONALES': '/images/placeholder/evento-fiestaspatronales.svg',
  'RALLY BIKE CALAMUCHITA': '/images/placeholder/evento-rallybike.svg',
  'OPEN DE PATÍN': '/images/placeholder/evento-patin.svg',
  'OCTUBRE CORDOBÉS': '/images/placeholder/evento-octubrecordobes.svg',
  'BRUTAL RACE': '/images/placeholder/evento-brutal.svg',
  'FIESTA NACIONAL DE LA TRADICIÓN': '/images/placeholder/evento-tradicion.svg',
  'SONIDOS Y SABORES DEL MUNDO': '/images/placeholder/evento-saboresmundo.svg',
  'LANZAMIENTO DE TEMPORADA Y ANIVERSARIO DE LA CIUDAD': '/images/placeholder/evento-lanzamiento.svg',
}

export const getEventPlaceholder = (title: string): string => {
  return EVENT_PLACEHOLDERS[title] || '/images/placeholder/default-gallery.svg'
}

export const introText = 'Santa Rosa de Calamuchita es el corazón vibrante del valle, donde la imponente belleza natural se fusiona con una oferta cultural y de entretenimiento única. Nuestra ciudad trasciende sus postales tradicionales de sierras, ríos cristalinos y playas para consolidarse como un destino activo, dinámico y lleno de vida durante todo el año.'

export const autumnIntroText = 'Santa Rosa de Calamuchita se prepara para vivir un otoño inolvidable con una propuesta turística que combina la adrenalina que da el rugir de los motores, el color de las tradiciones internacionales y lo mejor de la gastronomía típica de Semana Santa. El Valle de Calamuchita se convertirá en el escenario perfecto para disfrutar de tres grandes eventos durante esta temporada.'

export const summerEvents: Event[] = [
  {
    title: 'AÑO NUEVO BLANCO',
    description:
      'Santa Rosa de Calamuchita celebra Año Nuevo Blanco, un evento comunitario y gratuito que se festeja en el Paseo del Remanso, iniciando en los primeros minutos del Nuevo Año. La propuesta invita a vecinos y turistas a vestir de blanco para un brindis entre todos, música en vivo y celebración bajo las estrellas.',
    season: 'Verano',
    month: 'Enero',
    location: 'Paseo del Remanso',
  },
  {
    title: 'APERTURA DE TEMPORADA',
    description:
      'Nuestra ciudad se viste de fiesta en una noche mágica, con un show lleno de glamour para dar inicio a la temporada más importante del año. La velada promete deslumbrar a turistas y vecinos con una puesta en escena única, donde el arte y la música en vivo se fusionarán bajo las estrellas. Un despliegue de luces y elegancia diseñado para celebrar el comienzo del verano, anticipando los grandes momentos que viviremos en el corazón de las sierras.',
    season: 'Verano',
    month: 'Diciembre',
    location: 'Paseo del Remanso',
  },
  {
    title: 'FESTIVAL DEL RÍO Y LA LUNA',
    description:
      'El Balneario Puente Colgante es el escenario ideal para disfrutar del calor del verano bajo la luz de la luna. Las sierras se transforman en el marco perfecto para una velada única, donde la brisa nocturna acompaña el ritmo de la celebración. Danzas que transmiten pasión, música de primer nivel que resuena en el aire y una gastronomía exquisita se conjugan en una noche que te hará erizar la piel.',
    season: 'Verano',
    month: 'Enero - Febrero',
    location: 'Balneario Puente Colgante',
  },
  {
    title: 'CARNAVALES DEL RÍO',
    description:
      'Febrero trae aires de fiesta. El carnaval es el evento cultural más popular para vivir la alegría de murgas, comparsas e imperdibles espectáculos musicales. Cada noche el brillo de los trajes, el ritmo del bombo y el color de las agrupaciones que pasan por el corsódromo, invitan a vecinos y turistas a sumarse al baile. Una celebración masiva que rescata la identidad de nuestros barrios, combinando el juego con espuma para los más chicos y una atractiva grilla de artistas sobre el escenario mayor para disfrutar en familia.',
    season: 'Verano',
    month: 'Febrero',
    location: 'Corsódromo',
  },
]

export const autumnEvents: Event[] = [
  {
    title: 'RALLY CORDOBÉS',
    description:
      'Los autos del Rally Cordobés transitan a puro derrape por los sinuosos caminos del Valle de Calamuchita. Santa Rosa es tierra de Rally, los saltos, los amplios curvones, la gran velocidad y los vados más espectaculares ponen a prueba las habilidades de los mejores pilotos y navegantes del país. Los trazados de ripio más rápidos y extremos incrustados en los majestuosos paisajes, generan un atractivo singular y seducen a los protagonistas de la principal categoría provincial de carreras en ruta abierta del país. Las maravillas del entorno natural y la gran cantidad de espectadores ponen un sello a esta pasión, que Santa Rosa puede mostrar al mundo con gran orgullo.',
    season: 'Otoño',
    month: 'Marzo',
    location: 'Valle de Calamuchita',
  },
  {
    title: 'SAN PATRICIO',
    description:
      'Una propuesta única que transformará la céntrica calle Libertad en un gran bar a cielo abierto. El evento promete traer toda la tradición y el color de la cultura irlandesa al corazón del valle. Vecinos y turistas podrán recorrer un atractivo paseo cervecero que reunirá a los mejores productores artesanales de la región, acompañados por una variada oferta de platos típicos. Con duendes, tréboles, gaitas, bandas de rock y música celta en vivo, la noche se convertirá en el plan ideal para brindar con amigos y disfrutar de la mejor energía bajo las estrellas.',
    season: 'Otoño',
    month: 'Marzo - Abril',
    location: 'Calle Libertad',
  },
  {
    title: 'DELICIAS DE PASCUAS',
    description:
      'Una de las celebraciones más emblemáticas de la región se lleva a cabo en Semana Santa. El evento ofrece una completa carta con las más deliciosas especialidades gastronómicas: platos tradicionales y de vigilia, dulces, confituras y chocolates artesanales que rescatan las recetas más ricas de nuestra comunidad. La propuesta culinaria se complementa a la perfección con un exquisito y variado programa artístico que comprende actividades y shows para los más pequeños, la gracia de las academias de danzas locales y la potencia de bandas musicales de primer nivel. Un encuentro pensado de principio a fin para disfrutar de espectáculos de alta calidad para toda la familia en el marco natural único que ofrecen nuestras sierras.',
    season: 'Otoño',
    month: 'Abril',
    location: 'Santa Rosa de Calamuchita',
  },
]

export const winterIntroText = 'Santa Rosa de Calamuchita presenta su propuesta turística para la temporada de invierno, consolidando una oferta que fusiona el deporte de alta competencia con las tradiciones culturales y la gastronomía regional. La localidad del Valle de Calamuchita se posiciona como un destino activo durante los meses de frío con eventos de relevancia nacional.'

export const winterEvents: Event[] = [
  {
    title: 'SABORES SERRANOS',
    description:
      'La gastronomía típica de la cocina serrana es la principal protagonista de esta propuesta. Los aromas a costillares al asador, empanadas criollas jugosas y pastelitos caseros invitan a un viaje a través de los sabores más auténticos de nuestra tierra. Este es un espacio pensado especialmente para honrar las virtudes de nuestro folklore, donde el sonido de guitarras, violines y bombos legüeros se fusiona con la destreza de las danzas tradicionales en vivo. Una cita imperdible para avivar el fuego de la tradición, compartir un buen mate y celebrar nuestra identidad cultural en familia y con amigos.',
    season: 'Invierno',
    month: 'Julio - Agosto',
    location: 'Santa Rosa de Calamuchita',
  },
  {
    title: 'FIESTAS PATRONALES',
    description:
      'Cada 30 de agosto, nuestra ciudad celebra el día de su Patrona, Santa Rosa de Lima. En esta fecha, vecinos y fieles se reúnen para acompañar la imagen de la Santa en una tradicional procesión por las calles céntricas de la ciudad. Durante la jornada también se desarrollan diversas actividades culturales y artísticas, con muestras de arte, danzas y música, que invitan a toda la comunidad a compartir y celebrar esta fecha tan significativa.',
    season: 'Invierno',
    month: 'Agosto',
    location: 'Calles céntricas de Santa Rosa de Calamuchita',
  },
  {
    title: 'RALLY BIKE CALAMUCHITA',
    description:
      'Nuestra localidad propone una gran variedad de escenarios urbanos y naturales para ponerse a rodar. Miles de apasionados por el mountain bike y corredores de primer nivel se reúnen cada año en Santa Rosa para recorrerlos y superar sus propios límites. Este evento se ha consolidado firmemente entre los más importantes del país, atrayendo tanto a atletas de élite como a ciclistas aficionados. La geografía de Calamuchita ofrece el marco perfecto para una competencia de alta exigencia técnica, transformando las Sierras de Córdoba en el epicentro nacional del deporte sobre ruedas y en un espectáculo imperdible para todos los visitantes.',
    season: 'Invierno',
    month: 'Agosto - Septiembre',
    location: 'Santa Rosa de Calamuchita',
  },
]

export const springIntroText = 'Llega la estación más linda del año y con ella nuestra ciudad se viste de colores, atardeceres inigualables y grandes eventos. El aire serrano se renueva y los paisajes nos regalan postales doradas que invitan a bajar un cambio, caminar junto al río y respirar hondo. Santa Rosa te espera con una calidez única, una gastronomía exquisita. Tu lugar en el mundo está listo para recibirte.'

export const springEvents: Event[] = [
  {
    title: 'OPEN DE PATÍN',
    description:
      'Santa Rosa de Calamuchita se consolida como el epicentro del patinaje sobre ruedas al recibir una nueva edición del Open Internacional de Patín Artístico, considerado uno de los certámenes independientes más importantes de Sudamérica, ya que reúne a más de 900 patinadores y patinadoras de diversas edades junto a destacados técnicos y especialistas de toda la región. Con una fuerte presencia internacional que incluye delegaciones de países vecinos, la competencia no solo promueve el alto rendimiento deportivo en modalidades como libre, escuela y show, sino que genera un gran impacto en la economía local, consolidando el perfil de la ciudad como destino de excelencia para el turismo deportivo.',
    season: 'Primavera',
    month: 'Octubre',
    location: 'Santa Rosa de Calamuchita',
  },
  {
    title: 'OCTUBRE CORDOBÉS',
    description:
      'Nuestra ciudad se prepara para vivir una noche histórica que pondrá en valor el corazón de nuestra identidad musical. Será una jornada dedicada a su ritmo más representativo, destacando espectáculos musicales en vivo y bandas de primer nivel. El evento busca unir a la comunidad a través de la música y el baile en una gran fiesta popular a cielo abierto. Con una puesta en escena que invita a todas las generaciones de vecinos y turistas a compartir la alegría de la música y el baile en esta noche especial.',
    season: 'Primavera',
    month: 'Octubre',
    location: 'Santa Rosa de Calamuchita',
  },
  {
    title: 'BRUTAL RACE',
    description:
      'La competencia de superación personal que invita a los más audaces a desafiar la fuerza física y la resistencia mental en un entorno natural. Bajo el lema de conquistar la aventura, este evento se posiciona como una de las carreras de obstáculos más exigentes de la región. El circuito combina de manera estratégica la rusticidad del terreno serrano —con cruces de ríos, trepadas empinadas y senderos técnicos— con estructuras artificiales complejas de alta exigencia. Diseñada tanto para atletas de élite como para entusiastas del fitness que buscan salir de su zona de confort, la competencia promete una experiencia épica de compañerismo, adrenalina y superación en cada kilómetro.',
    season: 'Primavera',
    month: 'Octubre - Noviembre',
    location: 'Valle de Calamuchita',
  },
  {
    title: 'FIESTA NACIONAL DE LA TRADICIÓN',
    description:
      'De gran atractivo regional y nacional, en este homenaje a la cultura, se vive la argentinidad a flor de piel durante cada jornada. Una nutrida grilla de artistas y actividades, puestos de artesanos, talabarteros y los más ricos platos serranos, se conjugan para dar forma a una de las celebraciones más auténticas del calendario turístico. Desfile por nuestras calles, destrezas criollas, vestimenta típica y una gastronomía serrana que acompaña cada momento de este evento que convoca a familias de todo el país a celebrar las raíces que nos unen.',
    season: 'Primavera',
    month: 'Noviembre',
    location: 'Santa Rosa de Calamuchita',
  },
  {
    title: 'SONIDOS Y SABORES DEL MUNDO',
    description:
      'Nuestra localidad se transforma en el epicentro de la diversidad y el encuentro internacional. Un paseo cultural a través de la música y la gastronomía de diferentes países se vive en cada jornada que llena de alegría y color nuestra ciudad. Esta propuesta invita a vecinos y turistas a sumergirse en un recorrido sensorial único, donde las recetas ancestrales y los sabores típicos de las distintas colectividades del mundo se convierten en los grandes protagonistas. El evento se complementa con un escenario multicultural, en el cual se fusionan la música en vivo, los instrumentos tradicionales y las danzas nativas de cada región, en una fiesta popular que celebra la integración y el intercambio cultural.',
    season: 'Primavera',
    month: 'Noviembre',
    location: 'Santa Rosa de Calamuchita',
  },
  {
    title: 'LANZAMIENTO DE TEMPORADA Y ANIVERSARIO DE LA CIUDAD',
    description:
      'Cada 10 de diciembre Santa Rosa se viste de fiesta para recibir a un cálido público que asiste especialmente para celebrar su aniversario y presentar la nueva temporada estival. En la propuesta confluyen expresiones artísticas y musicales que marcan el inicio del período turístico más importante del año. Este doble acontecimiento invita a la comunidad y a los primeros turistas a disfrutar de una noche mágica a cielo abierto, coronada por una presentación de la inolvidable temporada que ofrecerá el Corazón de Calamuchita.',
    season: 'Primavera',
    month: 'Diciembre',
    location: 'Santa Rosa de Calamuchita',
  },
]