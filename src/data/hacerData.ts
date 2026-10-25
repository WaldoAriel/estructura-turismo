export interface HacerItem {
  title: string
  description: string
  category: string
  subcategory?: string
  address?: string
  phone?: string
  web?: string
  mapUrl?: string
  hours?: string
  recommendations?: string
  difficulty?: string
  duration?: string
  distance?: string
  price?: string
  gallery?: string[]
  children?: HacerItem[]
}

const PLACEHOLDER_IMAGES: Record<string, string[]> = {
  'Cerro Vía Crucis': ['/images/placeholder/cerro-via-crucis.svg', '/images/placeholder/cerro-via-crucis.svg'],
  'Reserva Natural La Cascada': ['/images/placeholder/la-cascada.svg', '/images/placeholder/la-cascada.svg'],
  'Desafío Aguarayba': ['/images/placeholder/aguarayba.svg', '/images/placeholder/aguarayba.svg'],
  'Circuito del Arroyo Seco': ['/images/placeholder/arroyo-seco.svg'],
  'Costanera y Balnearios': ['/images/placeholder/costanera.svg'],
  'Calicanto Jesuita': ['/images/placeholder/calicanto.svg', '/images/placeholder/calicanto.svg'],
  'Puente Colgante': ['/images/placeholder/puente-colgante.svg'],
  'Escalera de los Inmigrantes': ['/images/placeholder/escalera.svg'],
  'Falla Geológica': ['/images/placeholder/falla.svg'],
  'Museo Estanislao Baños (MEB)': ['/images/placeholder/meb.svg'],
  'Museo de Arte Religioso Santa Rosa de Lima': ['/images/placeholder/museo-religioso.svg'],
  'Sass': ['/images/placeholder/sass.svg'],
  'Bowling Kamama': ['/images/placeholder/bowling.svg'],
  'Arca de Noé': ['/images/placeholder/arca-de-noe.svg'],
  'Cutulecita': ['/images/placeholder/cutulecita.svg'],
  'Cine Teatro Deportivo Italiano': ['/images/placeholder/cine-teatro.svg'],
  'Club Hípico El Chulengo': ['/images/placeholder/cabalgata.svg'],
  'Tribu Serrana': ['/images/placeholder/tribu-serrana.svg'],
  'Dafne Tribu Serrana': ['/images/placeholder/dafne.svg'],
  'Alquiler de Caballos': ['/images/placeholder/caballos.svg'],
  'Arte Nuestro': ['/images/placeholder/art-nuestro.svg'],
  'Manos Calamuchitanas': ['/images/placeholder/manos-calamuchitanas.svg'],
  'Paseo de los Artesanos': ['/images/placeholder/paseo-artesanos.svg'],
  'Haceres Ancestrales': ['/images/placeholder/haceres-ancestrales.svg'],
  'El Almacén del Mate': ['/images/placeholder/almacen-mate.svg'],
  'Esencias Naturales De La Meca': ['/images/placeholder/esencias.svg'],
  'Establecimiento Apícola Yullin': ['/images/placeholder/yullin.svg'],
  'Galería de Artes Quiroga': ['/images/placeholder/galaria-quiroga.svg'],
  'Orfebre Caminitti y Aguaribú Cerámica': ['/images/placeholder/orfebre.svg'],
  'Cervecería Artesanal Emily Brau': ['/images/placeholder/emily-brau.svg'],
  'La Isabelina': ['/images/placeholder/la-isabelina.svg'],
  'Complejo La Estancia': ['/images/placeholder/complejo-estancia.svg'],
  'Plazoleta del Tercer Milenio': ['/images/placeholder/plazoleta-milenio.svg'],
  'Monumento a la Madre': ['/images/placeholder/monumento-madre.svg'],
  'Monumento a Güemes': ['/images/placeholder/monumento-guemes.svg'],
  'Mirador del Valle': ['/images/placeholder/mirador-valle.svg'],
  'Paseo del Remanso': ['/images/placeholder/paseo-remanso.svg'],
  'Paseo Las Higueras': ['/images/placeholder/paseo-las-higueras.svg'],
  'Paseo Libertad': ['/images/placeholder/paseo-libertad.svg'],
  'Paseo de la Historia': ['/images/placeholder/paseo-historia.svg'],
  'Chau Sostenido': ['/images/placeholder/chau-sostenido.svg'],
  'Complejo Valle del Sol': ['/images/placeholder/valle-sol.svg'],
  'Complejo Coovaeco': ['/images/placeholder/coovaeco.svg'],
  'Hotel Evita': ['/images/placeholder/hotel-evita.svg'],
  'Armonías del Río': ['/images/placeholder/armonias-rio.svg'],
  'Alquiler de Bicicletas': ['/images/placeholder/bicicletas.svg'],
  'Alquiler de Bicicletas - Centro Bike': ['/images/placeholder/bici-centro.svg'],
  'Alquiler de Bicicletas - Bicicletería Medina': ['/images/placeholder/bici-medina.svg'],
}

export const getPlaceholderImages = (title: string): string[] => {
  return PLACEHOLDER_IMAGES[title] || []
}

export const introText = 'Santa Rosa de Calamuchita es una ciudad que combina la imponente belleza natural de las sierras y el río Santa Rosa con una rica oferta cultural y de entretenimiento. Desde aventuras en la montaña hasta experiencias gastronómicas únicas, descubrí todo lo que te espera en el corazón del Valle de Calamuchita.'

export const senderismoItems: HacerItem[] = [
  {
    title: 'Cerro Vía Crucis',
    description: 'El sendero al Cerro Vía Crucis es uno de los más elegidos para abrazar el sueño de llegar a la cima. El trekking dura una hora y media hasta la cruz más alta, con vistas panorámicas del Valle de Calamuchita. Recorre 14 estaciones con dificultad media.',
    category: 'senderismo',
    hours: 'Temporada alta: 09:00 a 17:00 hs (permanencia hasta 19:00)\nTemporada baja: Vie, sáb, dom y feriados 10:00 a 16:00 hs (permanencia hasta 18:00)',
    recommendations: 'Llevar agua, protector solar, ropa y calzado adecuados. No arrojar residuos. No encender fuego.',
    difficulty: 'Media',
    duration: '1h 30min',
    gallery: ['/images/placeholder/cerro-via-crucis.svg', '/images/placeholder/cerro-via-crucis.svg'],
    mapUrl: 'https://goo.gl/maps/Y7B2NDCtYqaWYU3j8',
  },
  {
    title: 'Reserva Natural La Cascada',
    description: 'Sendero de 1.700 metros que bordea el arroyo Loyola, con duración de 1 hora para llegar a un espectacular salto de agua de 6 metros. Dentro del recorrido se pueden apreciar árboles nativos y aves locales. Cada 150 metros hay postas numeradas del 1 al 10.',
    category: 'senderismo',
    hours: 'Temporada alta: 09:00 a 17:00 hs (permanencia hasta 19:00)\nTemporada baja: Vie, sáb, dom 10:00 a 16:00 hs (permanencia hasta 18:00)',
    recommendations: 'Llevar agua, protector solar, ropa y calzado adecuados. No arrojar residuos. No encender fuego.',
    difficulty: 'Baja a media',
    duration: '1h ida',
    distance: '1.7 km',
    gallery: ['/images/placeholder/la-cascada.svg', '/images/placeholder/la-cascada.svg'],
  },
  {
    title: 'Desafío Aguarayba',
    description: 'Recorrido guiado de seis kilómetros en las Sierras Chicas con dificultad intermedia. El itinerario atraviesa el cauce de la Cañada del Durazno y culmina en una plataforma elevada con vistas panorámicas del Valle.',
    category: 'senderismo',
    hours: 'Fines de semana largos y temporada de verano',
    recommendations:
      'Llevar agua, protector solar, ropa y calzado adecuados. No arrojar residuos. No encender fuego. Reserva con anticipación.',
    difficulty: 'Intermedia',
    duration: '~3h',
    distance: '6 km',
    gallery: ['/images/placeholder/aguarayba.svg', '/images/placeholder/aguarayba.svg'],
    mapUrl: 'https://goo.gl/maps/kFMpFotsrwGWKTfNA',
  },
  {
    title: 'Circuito del Arroyo Seco',
    description: 'Recorrido de ida y vuelta de aproximadamente 6,2 km con poca dificultad. Conecta el sector del Calicanto Jesuita con la Escuela Rural José Ingenieros, cruzando el arroyo 18 veces.',
    category: 'senderismo',
    hours: 'Fines de semana largos y temporada de verano',
    recommendations:
      'Llevar agua, protector solar, ropa y calzado adecuados. No arrojar residuos. No encender fuego. Reserva con anticipación.',
    difficulty: 'Baja',
    distance: '6.2 km',
    gallery: ['/images/placeholder/arroyo-seco.svg'],
    mapUrl: 'https://maps.app.goo.gl/it3BXZJVo2aB2QHT9?g_st=iw',
  },
]

export const cicloturismoItems: HacerItem[] = [
   {
    title: 'Alquiler de Bicicletas - Centro Bike',
    description: 'Recorrer los senderos de Santa Rosa en bicicleta es una excelente alternativa disponible todo el año. Centro Bike ofrece alquiler por hora o por día para explorar los circuitos serranos y la costanera.',
    category: 'cicloturismo',
    address: 'Calle España 130',
    phone: '03546 – 422496 / 15455943',
    gallery: ['/images/placeholder/bici-centro.svg'],
  },
  {
    title: 'Alquiler de Bicicletas - Bicicletería Medina',
    description: 'Recorrer los senderos de Santa Rosa en bicicleta es una excelente alternativa disponible todo el año. Bicicletería Medina ofrece alquiler por hora o por día para explorar los circuitos serranos y la costanera.',
    category: 'cicloturismo',
    address: 'Av. Roberto Giachetto y Calle Piedras',
    phone: '03546 – 436395',
    gallery: ['/images/placeholder/bici-medina.svg'],
  },
]

export const cabalgatasItems: HacerItem[] = [
   {
    title: 'Club Hípico El Chulengo',
    description:
      'Escuela de equitación y centro ecuestre. Ofrece actividades recreativas, deportivas y terapéuticas para todas las edades en un entorno natural frente a las sierras. Organizan cabalgatas guiadas en temporada alta.',
    category: 'cabalgatas',
    address: 'Ruta Prov. Y Vado Gde. - Sta. Rosa de Calamuchita',
    phone: '1161933067',
    gallery: ['/images/placeholder/cabalgata.svg'],
  },
  {
    title: 'Tribu Serrana',
    description:
      'Establecimiento especializado en cabalgatas guiadas dentro de un predio de campo privado. Combina turismo activo con aprendizaje sobre historia local y flora/fauna nativas. Requiere reserva anticipada.',
    category: 'cabalgatas',
    address: 'Santa Mónica',
    phone: '351 5742283',
    gallery: ['/images/placeholder/tribu-serrana.svg'],
  },
  {
    title: 'Dafne Tribu Serrana',
    description:
      'Cabalgata guiada por el valle del río, con un trayecto que combina paisajes serranos y naturaleza. Ideal para descubrir la fauna y flora del lugar desde la espalda de un caballo.',
    category: 'cabalgatas',
    address: 'Santa Mónica',
    phone: '351 5742283',
    gallery: ['/images/placeholder/dafne.svg'],
  },
  {
    title: 'Alquiler de Caballos',
    description:
      'Servicio de alquiler de caballos para recorridos independientes o guiados. Ideal para explorar los caminos de la sierra a tu propio ritmo. Incluye guía opcional y equipamiento básico.',
    category: 'cabalgatas',
    address: 'Ruta Prov. Y Vado Gde. - Sta. Rosa de Calamuchita',
    phone: '03546 – 436395',
    gallery: ['/images/placeholder/caballos.svg'],
  },
]

export const historiaItems: HacerItem[] = [
  {
    description:
      'Puente acueducto del siglo XVIII, resto de la estancia jesuítica San Ignacio. Caminata de 300 metros de baja dificultad que bordea el Arroyo Seco, rodeada de vegetación autóctona. Puede visitarse libremente todos los días del año.',
    title: 'Calicanto Jesuita',
    category: 'historia',
    gallery: ['/images/placeholder/calicanto.svg', '/images/placeholder/calicanto.svg'],
    mapUrl: 'https://maps.app.goo.gl/it3BXZJVo2aB2QHT9?g_st=iw',
  },
  {
    description:
      'Inaugurado en 1959. Principal ícono cultural y paisajístico de la ciudad. Pasarela peatonal con estructura flexible de tablas de madera con vistas panorámicas del río y las sierras.',
    title: 'Puente Colgante',
    category: 'historia',
    gallery: ['/images/placeholder/puente-colgante.svg'],
  },
  {
    description:
      'Auténtica explosión de color con mosaicos multicolores por la artista Carmen Abonizzio. Conecta el centro con las zonas altas del pueblo. Transformada de atajo a paseo emblemático.',
    title: 'Escalera de los Inmigrantes',
    category: 'historia',
    gallery: ['/images/placeholder/escalera.svg'],
  },
  {
    description:
      'Transmite la historia desde la Megafauna, Primeros Habitantes, Periodo Colonial, Los Inmigrantes, hasta la Fundación de Santa Rosa. Incluye un gliptodonte de gran valor histórico.',
    title: 'Museo Estanislao Baños (MEB)',
    category: 'historia',
    gallery: ['/images/placeholder/meb.svg'],
  },
  {
    description:
      'Capilla de 1784, núcleo del centro urbano. Fue donada por Estanislao Baños y Mercedes Prado Núñez en 1877. Imágenes de culto, cruz tallada del siglo XVII y vestimentas religiosas.',
    title: 'Museo de Arte Religioso Santa Rosa de Lima',
    category: 'historia',
    gallery: ['/images/placeholder/museo-religioso.svg'],
  },
]

export const cultureItems: HacerItem[] = [
  {
    title: 'Calicanto Jesuita',
    description:
      'Puente acueducto del siglo XVIII, resto de la estancia jesuítica San Ignacio de los Santos Ejercicios. Originalmente parte de un sistema de canalización hidráulica de 36 km con seis acequias. Caminata de 300 metros de baja dificultad bordea el Arroyo Seco.',
    category: 'cultura',
    subcategory: 'Atractivos Culturales',
    gallery: ['/images/placeholder/calicanto.svg', '/images/placeholder/calicanto.svg'],
    mapUrl: 'https://maps.app.goo.gl/it3BXZJVo2aB2QHT9?g_st=iw',
  },
  {
    title: 'Puente Colgante',
    description:
      'Inaugurado en 1959. Principal ícono cultural y paisajístico de la ciudad. Pasarela peatonal construida por los propios vecinos bajo el diseño del Ing. Luis Arturo Hughes para permitir acceso durante crecidas del río. Ofrece vistas panorámicas del río y las sierras.',
    category: 'cultura',
    subcategory: 'Atractivos Culturales',
    gallery: ['/images/placeholder/puente-colgante.svg'],
  },
  {
    title: 'Escalera de los Inmigrantes',
    description:
      'Auténtica explosión de color. Transformada de atajo a paseo con miles de mosaicos multicolores por la artista Carmen Abonizzio, inspirados en la naturaleza. Cada parte representa los recursos naturales de la ciudad.',
    category: 'cultura',
    subcategory: 'Atractivos Culturales',
    gallery: ['/images/placeholder/escalera.svg'],
  },
  {
    title: 'Falla Geológica',
    description:
      'La falla de la Sierra Chica (sección Santa Rosa) expone el origen de las sierras. Placas tectónicas y capas de sedimento visibles. Faulta de cabalgamiento con rocas antiguas sobre rocas modernas, reactivada hace 23 millones de años.',
    category: 'cultura',
    subcategory: 'Atractivos Culturales',
    recommendations: 'No acercarse demasiado a la barranca.',
    gallery: ['/images/placeholder/falla.svg'],
    mapUrl: 'https://goo.gl/maps/pqne1oxoJLDAoVGr9',
  },
  {
    title: 'Museo Estanislao Baños (MEB)',
    description:
      'Transmite la historia desde la Megafauna, Primeros Habitantes, Periodo Colonial, Los Inmigrantes, hasta la Fundación de Santa Rosa. Incluye un gliptodonte de gran valor hallado en 1991. Horario conlleva según temporada, lunes cerrado.',
    category: 'cultura',
    subcategory: 'Atractivos Culturales',
    gallery: ['/images/placeholder/meb.svg'],
  },
  {
    title: 'Museo de Arte Religioso Santa Rosa de Lima',
    description:
      'Capilla de 1784, corazón del centro urbano. Donada por Estanislao Baños y Mercedes Prado Núñez en 1877. Museo desde 1997 con imágenes de culto, cruz tallada del siglo XVII y vestimentas religiosas.',
    category: 'cultura',
    subcategory: 'Atractivos Culturales',
    gallery: ['/images/placeholder/museo-religioso.svg'],
  },
]

export const cabalgataItems: HacerItem[] = [
  {
    title: 'Club Hípico El Chulengo',
    description:
      'Escuela de equitación y centro ecuestre. Ofrece actividades recreativas, deportivas y terapéuticas para todas las edades en un entorno natural frente a las sierras. Organizan cabalgatas guiadas en temporada alta.',
    category: 'esparcimiento',
    subcategory: 'Cabalgatas',
    address: 'Ruta Prov. Y Vado Gde. - Sta. Rosa de Calamuchita',
    phone: '1161933067',
    gallery: ['/images/placeholder/cabalgata.svg'],
  },
  {
    title: 'Tribu Serrana',
    description:
      'Establecimiento especializado en cabalgatas guiadas dentro de un predio de campo privado. Combina turismo activo con aprendizaje sobre historia local y flora/fauna nativas. Requiere reserva anticipada.',
    category: 'esparcimiento',
    subcategory: 'Cabalgatas',
    address: 'Santa Mónica',
    phone: '351 5742283',
    gallery: ['/images/placeholder/tribu-serrana.svg'],
  },
  {
    title: 'Dafne Tribu Serrana',
    description:
      'Cabalgata guiada por el valle del río, con un trayecto que combina paisajes serranos y naturaleza. Ideal para descubrir la fauna y flora del lugar desde la espalda de un caballo.',
    category: 'esparcimiento',
    subcategory: 'Cabalgatas',
    address: 'Santa Mónica',
    phone: '351 5742283',
    gallery: ['/images/placeholder/dafne.svg'],
  },
  {
    title: 'Alquiler de Caballos',
    description:
      'Servicio de alquiler de caballos para recorridos independientes o guiados. Ideal para explorar los caminos de la sierra a tu propio ritmo. Incluye guía opcional y equipamiento básico.',
    category: 'esparcimiento',
    subcategory: 'Cabalgatas',
    address: 'Ruta Prov. Y Vado Gde. - Sta. Rosa de Calamuchita',
    phone: '03546 – 436395',
    gallery: ['/images/placeholder/caballos.svg'],
  },
]

export const esparcimientoItems: HacerItem[] = [
  {
    title: 'Sass',
    description:
      'Sala de Entretenimientos SASS con juegos electrónicos distribuidos en dos plantas. Amplia gama de opciones para toda la familia. Alquiler de instalaciones para cumpleaños y eventos privados.',
    category: 'esparcimiento',
    subcategory: 'Esparcimiento',
    address: 'Libertad 106',
    gallery: ['/images/placeholder/sass.svg'],
  },
  {
    title: 'Bowling Kamama',
    description:
      'Pistas de bowling y mesas de pool. Servicio gastronómico con picadas, pizzas, tragos y cervezas. Ambiente moderno y recreativo para compartir con amigos y familiares.',
    category: 'esparcimiento',
    subcategory: 'Esparcimiento',
    address: 'Güemes 74',
    phone: '(03546) 15-45-8083',
    gallery: ['/images/placeholder/bowling-kamama.svg'],
  },
  {
    title: 'Arca de Noé',
    description:
      '7 parques temáticos: sector acuático, área de aventura con karting, 50+ juegos, dinosaurios, minigranja y spa. Destino familiar con opciones para todos los gustos y edades.',
    category: 'esparcimiento',
    subcategory: 'Esparcimiento',
    address: 'Ruta 5 km 83.9',
    phone: '3546 414161',
    web: 'www.arcadenoecalamuchita.com',
    gallery: ['/images/placeholder/arca-de-noe.svg'],
  },
  {
    title: 'Cutulecita',
    description:
      'En el Parador La Choza, los niños pueden disfrutar de esta calesita, algodón de azúcar, garrapiñadas, pochoclos. Parada de refrescos clásica en un entorno rústico.',
    category: 'esparcimiento',
    subcategory: 'Esparcimiento',
    address: 'Av. Pedro Roasenda',
    phone: '(03546) 15-40-9510',
    gallery: ['/images/placeholder/cutulecita.svg'],
  },
  {
    title: 'Cine Teatro Deportivo Italiano',
    description:
      'Durante la temporada alta, se puede disfrutar cada noche de una obra de teatro con artistas reconocidos a nivel nacional e internacional. También proyecta cine en cartelera.',
    category: 'esparcimiento',
    subcategory: 'Esparcimiento',
    address: 'Mendoza esquina',
    phone: '(03546) 42-0262',
    gallery: ['/images/placeholder/cine-teatro-italiano.svg'],
  },
  {
    title: 'Alquiler de Bicicletas',
    description:
      'Servicio de alquiler de bicicletas para explorar los caminos del valle y la costanera. Ideal para recorrer los paisajes de la sierra a tu propio ritmo. Incluye bicicletas de montaña y urbana para todas las edades.',
    category: 'esparcimiento',
    subcategory: 'Esparcimiento',
    address: 'Ruta Prov. Y Vado Gde. - Sta. Rosa de Calamuchita',
    phone: '3546 414161',
    gallery: ['/images/placeholder/bicicletas.svg'],
  },
  {
    title: 'Cabalgatas',
    description:
      'Explorá las sierras a caballo con experiencias guiadas por los mejores operadores locales. Desde recorridos familiares hasta cabalgatas de aventura, descubrí la naturaleza desde una perspectiva única.',
    category: 'esparcimiento',
    subcategory: 'Esparcimiento',
    gallery: ['/images/placeholder/cabalgata.svg'],
    children: cabalgataItems,
  },
]

export const artesanosItems: HacerItem[] = [
  {
    title: 'Manos Calamuchitanas',
    description:
      'Agrupación y feria de artesanos del Valle que comercializa productos regionales: artesanías (madera, metal, tejidos), gastronomía local (chacinados, miel, dulces) y objetos de diseño pintados a mano. Se inauguró el 7 de diciembre de 2021.',
    category: 'artesanos',
    address: 'Intersección Paseo Viena y Soberanía Nacional',
    hours: 'Fines de semana y temporada alta todos los días',
    gallery: ['/images/placeholder/manos-calamuchitanas.svg'],
  },
  {
    title: 'Paseo de los Artesanos',
    description:
      'Más de 40 puestos de madera con alfarería, cuero, textiles, joyería, cosmética natural y juguetes didácticos. Patio central con shows musicales y eventos artísticos familiares.',
    category: 'artesanos',
    address: 'Intersección España y Puente Viena, junto al río',
    hours: 'Por la tarde y noche (temporada alta y fines de semana grandes)',
    gallery: ['/images/placeholder/paseo-artesanos.svg'],
  },
  {
    title: 'Haceres Ancestrales',
    description:
      'Feria dedicada a las artesanías ancestrales que rescatan técnicas tradicionales de madera, barro, tela y metal. Productores locales que mantienen vivas las técnicas de las generaciones anteriores.',
    category: 'artesanos',
    address: 'Parque Central de Santa Rosa',
    hours: 'Fines de semana y feriados',
    gallery: ['/images/placeholder/haceres-ancestrales.svg'],
  },
]

export const caminoProductorItems: HacerItem[] = [
  {
    title: 'El Almacén del Mate',
    description:
      'Espacio artesanal de Ignacio Valerio dedicado a la elaboración artesanal de mates tallados en calabaza. Observá el proceso de talla y grabado, y adquirí piezas únicas con diseños inspirados en la fauna y flora local.',
    category: 'artesanos',
    subcategory: 'Camino del Productor',
    address: 'Parador de la Montaña (10 km del centro)',
    gallery: ['/images/placeholder/almacen-mate.svg'],
  },
  {
    title: 'Esencias Naturales De La Meca',
    description:
      'Firma familiar desde 1993. Destila resinas de pinos nativos y produce aceites esenciales, fragancias y cremas libres de aditivos químicos. Visitas guiadas al aroma de los bosques.',
    category: 'artesanos',
    subcategory: 'Camino del Productor',
    address: 'Calle 3 esquina 10',
    phone: '+54 (3546) 421931',
    gallery: ['/images/placeholder/esencias.svg'],
  },
  {
    title: 'Establecimiento Apícola Yullin',
    description:
      'Empresa familiar con más de 20 años de experiencia apícola. Ofrece visitas didácticas para conocer el mundo de las abejas, la recolección del néctar y la producción de miel, polen, jalea real y derivados de cuidado.',
    category: 'artesanos',
    subcategory: 'Camino del Productor',
    address: 'Ruta Provincial 3737',
    phone: '(03546) 15528231',
    gallery: ['/images/placeholder/yullin.svg'],
  },
  {
    title: 'Galería de Artes Quiroga',
    description:
      'Exposición y comercialización de esculturas en hierro de Juan Carlos Quiroga, inspiradas en la cultura gaucha y el ganado. También ofrece tallados, pinturas y pirograbados en madera.',
    category: 'artesanos',
    subcategory: 'Camino del Productor',
    address: 'Güemes 268',
    phone: '351 62888336 / 421511',
    gallery: ['/images/placeholder/galaria-quiroga.svg'],
  },
  {
    title: 'Orfebre Caminitti y Aguaribú Cerámica',
    description:
      'Atelier y taller abierto. Marcelo Caminiti crea obras en hierro, alpaca y madera con técnica de forja. Denise Vignolio produce vajilla y decoración en arcilla.',
    category: 'artesanos',
    subcategory: 'Camino del Productor',
    address: 'Los Eucaliptus 175',
    gallery: ['/images/placeholder/orfebre.svg'],
  },
  {
    title: 'Cervecería Artesanal Emily Brau',
    description:
      'Cervecería pionera en variedades premium del Valle de Calamuchita. Recorridos guiados explican el proceso de elaboración, la malta, lúpulo y fermentación, con degustación final.',
    category: 'artesanos',
    subcategory: 'Camino del Productor',
    address: 'La Ribera 984',
    phone: '3571 598023',
    gallery: ['/images/placeholder/emily-brau.svg'],
  },
  {
    title: 'La Isabelina',
    description:
      'Destilería artesanal que produce el Gin Botánico Rouge, elaborado con botánicos locales. Incluye showroom de bienestar y tienda de artículos exclusivos de diseño y productos naturales.',
    category: 'artesanos',
    subcategory: 'Camino del Productor',
    gallery: ['/images/placeholder/la-isabelina.svg'],
  },
]

export const natureItems: HacerItem[] = [
  {
    title: 'Cerro Vía Crucis',
    description:
      'El sendero al Cerro Vía Crucis es uno de los más elegidos para abrazar el sueño de llegar a la cima. El trekking dura una hora y media hasta la cruz más alta, con vistas panorámicas del Valle de Calamuchita. Recorre 14 estaciones con dificultad media.',
    category: 'naturaleza',
    difficulty: 'Media',
    duration: '1h 30min',
    mapUrl: 'https://goo.gl/maps/Y7B2NDCtYqaWYU3j8',
  },
  {
    title: 'Reserva Natural La Cascada',
    description:
      'Sendero de 1.700 metros que bordea el arroyo Loyola, con duración de 1 hora para llegar a un espectacular salto de agua de 6 metros. Dentro del recorrido se pueden apreciar árboles nativos y aves locales. Cada 150 metros hay postas numeradas del 1 al 10.',
    category: 'naturaleza',
    difficulty: 'Baja a media',
    duration: '1h ida',
    distance: '1.7 km',
  },
  {
    title: 'Desafío Aguarayba',
    description:
      'Recorrido guiado de seis kilómetros en las Sierras Chicas con dificultad intermedia. El itinerario atraviesa el cauce de la Cañada del Durazno y culmina en una plataforma elevada con vistas panorámicas del Valle.',
    category: 'naturaleza',
    difficulty: 'Intermedia',
    duration: '~3h',
    distance: '6 km',
    mapUrl: 'https://goo.gl/maps/kFMpFotsrwGWKTfNA',
  },
  {
    title: 'Circuito del Arroyo Seco',
    description:
      'Recorrido de ida y vuelta de aproximadamente 6,2 km con poca dificultad. Conecta el sector del Calicanto Jesuita con la Escuela Rural José Ingenieros, cruzando el arroyo 18 veces.',
    category: 'naturaleza',
    difficulty: 'Baja',
    distance: '6.2 km',
  },
  {
    title: 'Costanera y Balnearios',
    description:
      'A orillas del río Santa Rosa, la costanera ofrece parques, senderos peatonales y áreas recreativas. Los balnearios del Valle de Calamuchita son destinos ideales para disfrutar del agua y la naturaleza.',
    category: 'naturaleza',
    gallery: ['/images/placeholder/costanera.svg'],
    mapUrl: 'https://goo.gl/maps/Y7B2NDCtYqaWYU3j8',
  },
]

export const paseosItems: HacerItem[] = [
  {
    title: 'Complejo La Estancia',
    description:
      'Antesala del casco histórico. Fue posta de recambio, oficina de correos, escuela, primer hotel y terminal. Hoy alberga un moderno Salón de Eventos y Convenciones, espacio multicentro para todo tipo de actividades.',
    category: 'paseos',
    gallery: ['/images/placeholder/complejo-estancia.svg'],
  },
  {
    title: 'Plazoleta del Tercer Milenio',
    description:
      'Alberga una escultura de tres cuerpos abstractos sobre piedra de granito negro de 8 toneladas, creada por el artista Hugo Coya. Representa la evolución del hombre y el cosmos.',
    category: 'paseos',
    gallery: ['/images/placeholder/plazoleta-milenio.svg'],
  },
  {
    title: 'Monumento a la Madre',
    description:
      'Inaugurado el 17 de octubre de 1972. Escultura de cemento armado que rinde homenaje a las madres, con una figura maternal que abraza a un niño.',
    category: 'paseos',
    gallery: ['/images/placeholder/monumento-madre.svg'],
  },
  {
    title: 'Monumento a Güemes',
    description:
      'Monumento emblemático en una de las calles principales de la ciudad, dedicado al héroe de la Independencia y a la Revolución de los Patirijos, Juan José Paso y Francisco Narciso de Güemes.',
    category: 'paseos',
    gallery: ['/images/placeholder/monumento-guemes.svg'],
  },
  {
    title: 'Mirador del Valle',
    description:
      'Punto de observación con vistas panorámicas del Valle de Calamuchita. Ideal para fotos y contemplar los atardeceres sobre las sierras.',
    category: 'paseos',
    gallery: ['/images/placeholder/mirador-valle.svg'],
  },
  {
    title: 'Paseo del Remanso',
    description:
      'Espacio público con anfiteatro descubierto frente al río. Escenario de mega eventos multitudinarios. Inicia el Kilómetro 0 de los circuitos turísticos del Valle de Calamuchita.',
    category: 'paseos',
    gallery: ['/images/placeholder/paseo-remanso.svg'],
  },
  {
    title: 'Paseo Las Higueras',
    description:
      'Paseo peatonal inaugurado el 10 de diciembre de 2018. Obras del orfebre Marcelo Caminitti. Conecta las arterias principales del casco céntrico, diseñado para la convivencia familiar.',
    category: 'paseos',
    gallery: ['/images/placeholder/paseo-las-higueras.svg'],
  },
  {
    title: 'Paseo Libertad',
    description:
      'Corredor peatonal inaugurado el 10 de diciembre de 2017. Veredas adoquinadas, fuentes decorativas, áreas de descanso y esculturas de avifauna del río.',
    category: 'paseos',
    gallery: ['/images/placeholder/paseo-libertad.svg'],
  },
  {
    title: 'Paseo de la Historia',
    description:
      'Exhibe 4 esculturas sobre la calle Humberto Salgado: "Origenario", "Peón Rural Mestizo", "Mercedes Prado Núñez" e "Inmigrantes". Narran la historia local en forma artística.',
    category: 'paseos',
    gallery: ['/images/placeholder/paseo-historia.svg'],
  },
  {
    title: 'Chau Sostenido',
    description:
      'Paseo emblemático en el centro de la ciudad que alberga el mural "Chau Sostenido", una obra que representa la identidad del lugar y su gente.',
    category: 'paseos',
    gallery: ['/images/placeholder/chau-sostenido.svg'],
  },
]

export const bienestarItems: HacerItem[] = [
  {
    title: 'Complejo Valle del Sol',
    description:
      'Complejo de salud integral, desarrollo personal y relajación. Ofrece clases de yoga, meditación, spa con tratamientos de masajes, y programas de bienestar holístico en un entorno rodeado de naturaleza.',
    category: 'bienestar',
    address: 'RUTA N° 5 KM.93, 5',
    phone: '(03546) 15543983',
    web: 'https://complejovalledelsol.com/',
    gallery: ['/images/placeholder/valle-sol.svg'],
  },
  {
    title: 'Complejo Coovaeco',
    description:
      'Centro de bienestar con condiciones ambientales naturales de las sierras. Combina spa, hidroterapia, masajes terapéuticos y clases de fitness al aire libre para una experiencia de relajación total.',
    category: 'bienestar',
    address: 'AV. DE LOS PÁJAROS S/N',
    phone: '(0341) 155627713',
    web: 'https://www.complejocoovaeco.com.ar/',
    gallery: ['/images/placeholder/coovaeco.svg'],
  },
  {
    title: 'Hotel Evita',
    description:
      'Situado a orillas del río para disfrutar de la naturaleza con comodidad. Ofrece acogida, restaurante con vista al río y espacios para eventos privados en un entorno privilegiado.',
    category: 'bienestar',
    address: 'RUTA N° 5 KM 90',
    phone: '(03546) 424099',
    gallery: ['/images/placeholder/hotel-evita.svg'],
  },
  {
    title: 'Armonías del Río',
    description:
      'Centro de bienestar con espacios para el cuidado personal y relajación. Proporciona tratamientos de spa, masajes, y sesiones de bienestar emocional en un ambiente acogedor junto al río.',
    category: 'bienestar',
    address: 'CNO. REAL KM 6',
    phone: '(0297) 154138343',
    web: 'https://armoniasdelrio.com.ar/',
    gallery: ['/images/placeholder/armonias-rio.svg'],
  },
  {
    title: 'Hotel Casablanca',
    description: 'Establecimiento con encanto histórico ofreciendo servicios de bienestar.',
    category: 'bienestar',
    address: 'EL NOGAL 33',
    phone: '(03546) 426174',
    web: 'https://www.hotelcasablancacba.com.ar/',
  },
]

interface HacerCategory {
  name: string
  label: string
  description?: string
  items: HacerItem[]
}

export const hacerCategories: HacerCategory[] = [
  {
    name: 'cicloturismo',
    label: 'Cicloturismo',
    description:
      'Para los aficionados al turismo aventura, recorrer los senderos de Santa Rosa en bicicleta es una excelente alternativa disponible todo el año. La localidad cuenta con dos locales comerciales que ofrecen el alquiler de rodados tanto por hora como por día, permitiendo explorar los circuitos serranos y la costanera con total flexibilidad.',
    items: cicloturismoItems,
  },
  {
    name: 'cabalgatas',
    label: 'Cabalgatas',
    description:
      'Para los amantes de la aventura al aire libre, las cabalgatas son una opción para disfrutar paseos recorriendo cascos históricos de estancias, paisajes serranos, cruces de río y espacios de naturaleza autóctona. Para aquellos que deseen optar por una cabalgata en un espacio más agreste, se pueden contactar con "Tribu Serrana".',
    items: cabalgatasItems,
  },
  {
    name: 'senderismo',
    label: 'Senderismo',
    description:
      'Explorá los caminos de la sierra y las orillas del río. Desde caminatas fáciles hasta trekkings de mayor exigencia, cada paso revela paisajes únicos del Valle de Calamuchita.',
    items: senderismoItems,
  },
  {
    name: 'historia',
    label: 'Nuestra Historia',
    description:
      'Santa Rosa de Calamuchita combina una rica herencia histórica con un entorno natural idóneo para las actividades al aire libre. El patrimonio local invita a reconstruir el legado de las generaciones precedentes.',
    items: historiaItems,
  },
]

export const hacerCategoryGradients: Record<string, string> = {
  Cicloturismo: 'linear-gradient(135deg, #3AABB5, #0E98AE)',
  Cabalgatas: 'linear-gradient(135deg, #92C14A, #B9CF41)',
  Senderismo: 'linear-gradient(135deg, #0E98AE, #3AABB5)',
  'Nuestra Historia': 'linear-gradient(135deg, #F89C32, #F37335)',
}

export interface VisitSubcategory {
  name: string
  label: string
  description?: string
  items: HacerItem[]
}

export interface VisitCategory {
  name: string
  label: string
  description: string
  items?: HacerItem[]
  subcategories?: VisitSubcategory[]
}

export const visitarCategories: VisitCategory[] = [
  {
    name: 'naturaleza',
    label: 'Descubrí la Naturaleza',
    description:
      'Hacé una pausa y descubrí la naturaleza en su estado más puro. Contemplá las sierras, caminá junto al río transparente y disfrutá de los paisajes maravillosos que te esperan a cada paso. En nuestra ciudad, lo simple se transforma en un recuerdo inolvidable. ¿Te lo vas a perder?',
    items: natureItems,
  },
  {
    name: 'cultura',
    label: 'Cultura y Entretenimiento',
    description:
      'La localidad despliega un abanico de actividades recreativas diseñadas para incentivar el encuentro social, el esparcimiento y el disfrute pleno de los visitantes y locales durante todo el año. Esta oferta combina opciones recreativas desafiantes con espacios de interés cultural, consolidando a la ciudad como un destino que equilibra la naturaleza, la diversión y la vida comunitaria.',
    subcategories: [
      {
        name: 'atractivos-culturales',
        label: 'Atractivos Culturales',
        items: cultureItems,
      },
      {
        name: 'esparcimiento',
        label: 'Esparcimiento',
        description: 'La localidad despliega un abanico de actividades recreativas para compartir con amigos y familiares. Desde salas de entretenimiento hasta espacios al aire libre, pasando por cabalgatas por las sierras. Todo pensado para disfrutar en cualquier temporada.',
        items: esparcimientoItems,
      },
      {
        name: 'artesanos',
        label: 'Artesanos',
        description: 'Descubrí la riqueza del trabajo artesanal local. Desde productos de cuero y madera hasta joyería y textiles, estos espacios conservan vivas las técnicas tradicionales y ofrecen piezas únicas.',
        items: artesanosItems,
      },
      {
        name: 'camino-productor',
        label: 'Camino del Productor',
        description: 'Un recorrido por la creatividad local. Productores artesanales que transforman materiales naturales en productos únicos: mates tallados, aceites esenciales, miel artesanal, cerámica y cerveza artesanal. Un descubrimiento de auténtica sabor y tradición.',
        items: caminoProductorItems,
      },
    ],
  },
  {
    name: 'paseos',
    label: 'Paseos / Lugares de Interés',
    description:
      'Santa Rosa de Calamuchita combina su entorno natural, su legado histórico y su moderna arquitectura en destinos atractivos. Sitios que conservan su identidad e idiosincrasia en su patrimonio natural y cultural.',
    items: paseosItems,
  },
]

export const visitarCategoryGradients: Record<string, string> = {
  'Descubrí la Naturaleza': 'linear-gradient(135deg, #92C14A, #B9CF41)',
  'Cultura y Entretenimiento': 'linear-gradient(135deg, #F37335, #F89C32)',
  'Paseos / Lugares de Interés': 'linear-gradient(135deg, #0E98AE, #3AABB5)',
}

export const visitarSubcategoryGradients: Record<string, string> = {
  'Atractivos Culturales': 'linear-gradient(135deg, #F37335, #E29578)',
  Esparcimiento: 'linear-gradient(135deg, #3AABB5, #0E98AE)',
  Artesanos: 'linear-gradient(135deg, #F89C32, #B9CF41)',
  'Camino del Productor': 'linear-gradient(135deg, #F89C32, #F37335)',
}

export const seasonData = [
  {
    name: 'verano',
    label: 'Verano',
    intro:
      'La época estival en Santa Rosa se consolida como el ciclo principal del movimiento turístico regional. El flujo de visitantes diurnos se concentra a lo largo de la franja costera con playas locales que brindan áreas equipadas y servicios gastronómicos al aire libre.',
  },
  {
    name: 'otonio',
    label: 'Otoño',
    intro:
      'Descubrí un mundo de colores. En Santa Rosa podés disfrutar de la calma de las Sierras y llenar tus ojos del color ocre y amarronado que tiñe nuestra ciudad.',
  },
  {
    name: 'invierno',
    label: 'Invierno',
    intro:
      '¡Vení a vivir la naturaleza, vení a ser feliz! Lo simple se vuelve inolvidable: una caminata por la costanera, una escalada al Cerro Vía Crucis, la sorpresa al llegar a La Cascada.',
  },
  {
    name: 'primavera',
    label: 'Primavera',
    intro:
      '¡Un renacer de colores, un reencuentro con los aromas! Santa Rosa se viste de verde y florecen las más coloridas flores.',
  },
]
