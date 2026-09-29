export interface InfoPage {
  key: string
  label: string
  title: string
  intro: string
}

export const infoPages: InfoPage[] = [
  {
    key: 'sobre-santa-rosa',
    label: 'Sobre Santa Rosa',
    title: 'Sobre Santa Rosa',
    intro: `Santa Rosa de Calamuchita combina la imponente belleza natural de las sierras y el río Santa Rosa con una rica oferta cultural y de entretenimiento. Desde aventuras en la montaña hasta experiencias gastronómicas únicas, descubrí todo lo que te espera en el corazón del Valle de Calamuchita.`,
  },
  {
    key: 'como-llegar',
    label: 'Cómo llegar',
    title: 'Cómo llegar',
    intro: `Ubicada en el corazón del Valle de Calamuchita, Santa Rosa de Calamuchita se encuentra a 96 km de la ciudad de Córdoba. Accedé desde la RN 9 o la RN 15. Consultá los horarios y medios de transporte disponibles.`,
  },
  {
    key: 'mapas',
    label: 'Mapas y planos',
    title: 'Mapas y planos',
    intro: `Descubrí los mapas y planos de la ciudad para explorar todos los puntos de interés, balnearios, caminos y rutas recreativas de Santa Rosa de Calamuchita.`,
  },
  {
    key: 'agencias',
    label: 'Agencias de viajes',
    title: 'Agencias de viajes',
    intro: `Encontrá agencias de viajes locales que ofrecen paquetes turísticos, excursiones y asesoramiento para explorar el Valle de Calamuchita.`,
  },
  {
    key: 'telefonos',
    label: 'Teléfonos útiles',
    title: 'Teléfonos útiles',
    intro: `Consultá los números de contacto útiles para tu visita: emergencias, servicios públicos, turismo y más.`,
  },
  {
    key: 'galeria',
    label: 'Galería fotográfica',
    title: 'Galería fotográfica',
    intro: `Recorre la galería fotográfica de Santa Rosa de Calamuchita y descubrí paisajes, eventos y momentos únicos de nuestra ciudad.`,
  },
  {
    key: 'faq',
    label: 'Preguntas frecuentes',
    title: 'Preguntas frecuentes',
    intro: `Encontrá respuestas a las preguntas más frecuentes sobre tu visita a Santa Rosa de Calamuchita.`,
  },
  {
    key: 'contacto',
    label: 'Contacto',
    title: 'Contacto',
    intro: `Contactanos para consultas turísticas, eventos, denuncias o sugerencias sobre Santa Rosa de Calamuchita.`,
  },
]

export const sobreSantaRosaContent = {
  intro: `Ubicada estratégicamente en el corazón del Valle de Calamuchita, Santa Rosa despliega un encanto único que cautiva a primera vista. Sus imponentes Sierras dibujan el horizonte mientras sus cursos de aguas cristalinas custodian la ciudad, creando rincones perfectos que te invitan a sumergirte en la frescura de la naturaleza o a relajarte bajo el sol en sus extensas playas de arena.

Esa magia especial que nos caracteriza se esconde en los pequeños detalles de cada día: se percibe al abrir la ventana y dejar entrar el canto de los pájaros autóctonos, o al deleitarte simplemente contemplando la imponencia de la montaña. Aquí el tiempo se mide en recuerdos y la rutina se transforma en calma.

Al final del viaje, entenderás por qué "hay lugares donde uno se queda y lugares que se quedan en uno".`,

  citySection: {
    title: 'La ciudad',
    content: `Santa Rosa se encuentra en el corazón del Valle de Calamuchita, a 96 km de la ciudad de Córdoba. Rodeada por las Sierras Chicas al este y las Sierras Grandes al oeste. Está atravesada por el río homónimo, con hermosas playas y balnearios para disfrutar en familia o con amigos. Ofrece gran cantidad de actividades para el día y la noche, además eventos que se realizan durante todo el año, que hacen de éste el lugar elegido por miles de personas que llegan desde diferentes puntos del país.`,
  },

  historySection: {
    title: 'Las raíces de nuestra historia',
    subtitle: 'Desde los Comechingones hasta la fundación',
    content: `El territorio que hoy da vida a Santa Rosa de Calamuchita atesora siglos de historia, identidad y cultura. Los primeros habitantes del lugar fueron los Comechingones, un pueblo de cazadores y recolectores nativos. Su estilo de vida nómade los llevaba a refugiarse en cuevas naturales durante las campañas de cacería, mientras que construían casas de pozo cuando se asentaban temporalmente en un sector determinado. El paso del tiempo no borró su memoria: todavía hoy es posible hallar vestigios de esta cultura originaria en la región, tales como puntas de flecha de piedra, fragmentos de piezas cerámicas y antiguos morteros tallados sobre las grandes rocas a orillas del río.

Con el avance de la colonización, la región recibió un profundo legado religioso y arquitectónico. En Calamuchita se construyó en el año 1725 la última de las famosas estancias de la Compañía de Jesús en la provincia de Córdoba. Aunque posee la particularidad histórica de haber sido la única estructura jesuítica que se derrumbó en su totalidad, la fuerte influencia de esta orden religiosa todavía se respira y se aprecia en diversas construcciones antiguas que aún se preservan en pie dentro del casco urbano.

Más tarde, la administración colonial española implementó el sistema de encomiendas para los nativos y de mercedes reales para el reparto de tierras, las cuales paulatinamente se transformaron en grandes establecimientos rurales. La primera de estas propiedades fue la estancia de Don Pedro Carranza, quien la bautizó como Estancia Santa Rosa en honor a Santa Rosa de Lima. En ese predio se erigió la histórica capilla local, cuyos registros documentales más antiguos datan del año 1784, donde quedó asentado el bautizo de un niño esclavo negro llamado José Hilario. Con el correr de los años, tras sucesivas ventas, la estancia fue heredada por Doña Mercedes Prado Núñez. El 10 de diciembre de 1787, junto a su esposo Estanislao Baños, firmaron la histórica donación de la Capilla y de una cuadra cuadrada a su alrededor con la firme condición de fundar y construir un poblado. Ese acto generoso marcó el nacimiento formal de la actual ciudad, por eso cada 10 de diciembre se festeja su aniversario.`,
  },
}

export const distancesFromSantaRosa = [
  { city: 'Córdoba', distance: 96 },
  { city: 'Rosario', distance: 450 },
  { city: 'Buenos Aires', distance: 735 },
  { city: 'Mendoza', distance: 620 },
  { city: 'Salta', distance: 970 },
  { city: 'San Luis', distance: 334 },
  { city: 'Merlo (San Luis)', distance: 271 },
  { city: 'La Pampa (Santa Rosa)', distance: 510 },
  { city: 'Paraná', distance: 481 },
  { city: 'Santa Fe', distance: 449 },
  { city: 'Neuquén', distance: 1038 },
  { city: 'Bariloche', distance: 1470 },
  { city: 'Chaco (Resistencia)', distance: 972 },
  { city: 'Chubut', distance: 1376 },
  { city: 'Corrientes', distance: 1004 },
  { city: 'Formosa', distance: 1155 },
  { city: 'La Rioja', distance: 562 },
  { city: 'Posadas', distance: 1232 },
  { city: 'Río Gallegos', distance: 2513 },
  { city: 'San Fernando del Valle de Catamarca', distance: 543 },
  { city: 'San Juan', distance: 602 },
  { city: 'San Miguel de Tucumán', distance: 672 },
  { city: 'San Salvador de Jujuy', distance: 1012 },
  { city: 'Santiago del Estero', distance: 538 },
  { city: 'Ushuaia', distance: 3081 },
]

export const distancesToNearby = [
  { city: 'Villa General Belgrano', distance: 11 },
  { city: 'Villa Rumipal', distance: 12 },
  { city: 'Los Reartes', distance: 21 },
  { city: 'Amboy', distance: 26 },
  { city: 'Embalse', distance: 26 },
  { city: 'Yacanto de Calamuchita', distance: 30 },
  { city: 'El Durazno', distance: 38 },
  { city: 'Dique Los Molinos', distance: 32 },
  { city: 'Río Tercero', distance: 56 },
  { city: 'Almafuerte', distance: 52 },
  { city: 'La Cumbrecita', distance: 50 },
  { city: 'Alta Gracia', distance: 61 },
  { city: 'Villa Carlos Paz', distance: 105 },
  { city: 'Cosquín', distance: 132 },
  { city: 'La Falda', distance: 142 },
  { city: 'Jesús María', distance: 148 },
  { city: 'Mina Clavero', distance: 175 },
  { city: 'Capilla del Monte', distance: 175 },
  { city: 'Villa del Dique', distance: 14 },
  { city: 'Río Cuarto', distance: 131 },
  { city: 'Río Ceballos', distance: 134 },
  { city: 'La Cumbre', distance: 193 },
  { city: 'San Marcos Sierras', distance: 218 },
  { city: 'Villa María', distance: 171 },
]

export const travelGuides = [
  {
    from: 'Córdoba (96 km)',
    content:
      'Conducción directa hacia el sur por la RP 5, pasando por Alta Gracia, Dique Los Molinos y Villa General Belgrano.',
  },
  {
    from: 'Buenos Aires / Rosario',
    content:
      'Tránsito por Autopista RN 9 (Córdoba-Rosario) hasta Río Segundo, desvío en Oncativo hacia las rutas providenciales (RP E79 / RP 2 / RP 6), y tramo final por RN 36 y RP 5.',
  },
  {
    from: 'Santa Fe',
    content:
      'Recorrido por RN 19 hasta la Ciudad de Córdoba, ingreso por Av. de Circunvalación (Salida 14B) y descenso directo por RP 5.',
  },
  {
    from: 'Mendoza / San Luis',
    content:
      'Circulación por Autopista RN 7 (Serranías Puntanas), enlace con RN 8 hasta Río Cuarto, ascenso al norte por la autovía RN 36 y empalme a la izquierda en RP 5.',
  },
  {
    from: 'La Pampa',
    content:
      'Conducción hacia el norte por la RN 35 hasta la ciudad de Río Cuarto. Desde allí, tomar la autovía RN 36 en sentido norte y empalmar a la izquierda en la RP 5 para ingresar a la ciudad.',
  },
  {
    from: 'Noroeste (Jujuy, Salta, Tucumán)',
    content:
      'Tránsito por la RN 34 y luego la RN 9 en sentido sur directo hacia la provincia de Córdoba. Ingresar por la Av. de Circunvalación de Córdoba capital y tomar el descenso de la RP 5 hacia el sur.',
  },
  {
    from: 'Mesopotamia (Misiones, Corrientes, Entre Ríos)',
    content:
      'Conexión de corredores mediante RN 14, RN 127, RN 12 y RN 168 cruzando el túnel subfluvial hacia Santa Fe. Continuar por la RN 19 hasta Córdoba capital, ingresar por la Av. de Circunvalación (Salida 14B) y bajar por la RP 5.',
  },
  {
    from: 'Patagonia',
    content:
      'Ascenso por la RN 3 (incluye cruce en ferry por el Estrecho de Magallanes si se sale de Ushuaia). Enlazar hacia el norte del país por las rutas RN 251, RN 22, RN 154 y RN 35 hasta Río Cuarto, para realizar el tramo final por RN 36 y RP 5.',
  },
]

export const busInfo = {
  title: 'En Ómnibus',
  intro:
    'Al consolidarse como uno de los principales destinos turísticos de la provincia y el motor del Valle de Calamuchita, nuestra ciudad cuenta con una amplia y excelente oferta de conexiones en ómnibus de larga y media distancia.',
  fromCordoba: [
    { label: 'Sierras de Calamuchita', phone: 'WhatsApp 351 6560390', web: 'www.sierrasdecalamuchita.com' },
    { label: 'Buses Lep', phone: '03546-421787 / WhatsApp 351 5554222', web: 'www.buseslep.com.ar' },
  ],
  fromVillaMaria: [
    { label: 'Sierras de Calamuchita', phone: 'WhatsApp 351 6560390', web: 'www.sierrasdecalamuchita.com' },
  ],
  fromRioIV: [
    { label: 'Sierras de Calamuchita', phone: 'WhatsApp 351 6560390', web: 'www.sierrasdecalamuchita.com' },
    { label: 'Buses Lep', phone: '03546-421787 / WhatsApp 351 5554222', web: 'www.buseslep.com.ar' },
  ],
  fromBuenosAires: [
    { label: 'Chevallier', phone: '3546 404020', web: 'www.nuevachevallier.com' },
    { label: 'Sierras Cordobesas', phone: '3546-519410', web: 'https://www.sierrascordobesas.com.ar/' },
    { label: 'El Práctico', phone: '3546-519410', web: 'https://www.elpractico.com/' },
    { label: 'Vía Tac', phone: '3546-519410', web: 'https://viatac.com.ar/' },
    { label: 'Buses Lep', phone: '03546-421787 / WhatsApp 351 5554222', web: 'www.buseslep.com.ar' },
  ],
  fromRosario: [
    { label: 'Sierras de Córdoba', phone: '3546 404020', web: '' },
    { label: 'General Urquiza', phone: '3546 404020', web: 'www.generalurquiza.com.ar' },
  ],
  note: 'Desde Rosario: Directo 3 o 4 veces por semana en temporada baja o diariamente en temporada alta.',
}

export const flightInfo = {
  title: 'En Avión',
  intro: 'Otras alternativas de llegada a la ciudad.',
  cordobaAirport: {
    label: 'Aeropuerto Ingeniero Taravella (Pajas Blancas)',
    content:
      'Se encuentra a 11,5 km del centro de la ciudad de Córdoba. Desde allí podrá tomar un colectivo que lo lleva hasta la terminal de ómnibus o bien elegir otro medio de transporte como taxi o remis para llegar a Santa Rosa de Calamuchita.',
  },
  rioIVAirport: {
    label: 'Aeropuerto Río IV',
    content:
      'Es un aeropuerto pequeño que recibe vuelos nacionales. Se encuentra en el pueblo de Las Higueras, a 10 km al noreste de la ciudad. Desde allí deberá tomar un taxi o remis para llegar a la terminal de Río IV y luego combinar con otro colectivo para Santa Rosa de Calamuchita.',
  },
}

export const travelAgencies = [
  {
    name: 'ATI-TOUR',
    phone: '3546-477120 / 03546-422398',
    web: 'www.asesoriaturistica.com.ar',
  },
  {
    name: 'FANTASIAS EVYT',
    phone: '3546-490748',
  },
  {
    name: 'QUINTEROS VIAJES',
    phone: '351 4659000',
    web: 'https://quinterosviajes.com/',
  },
  {
    name: 'ALTO RUMBO TURISMO ALTERNATIVO',
    phone: '351 2064061',
    web: 'https://altorumbo.tur.ar/',
  },
  {
    name: 'PLANISFERIO VIAJES',
    phone: '3546 453376',
    web: 'https://planisferioviajes.com/#!/hotel',
  },
]

export const contactInfo = {
  address: 'Av. Pedro Roasenda, Santa Rosa de Calamuchita, Córdoba, Argentina',
  phone: '03546 42-0262',
  email: 'turismo@santarosadecal.com.ar',
  schedule: 'Lunes a viernes de 09:00 a 18:00 hs.',
}

export const usefulPhones = [
  { category: 'Municipalidad', label: 'Municipalidad', number: '03546-429650 / 420667' },
  { category: 'Turismo', label: 'Secretaría de Turismo, Cultura y Deportes', number: '03546-429652 / 654' },
  { category: 'Turismo', label: 'WhatsApp Secretaría de Turismo', number: '3546 528914' },
  { category: 'Deportes', label: 'Centro de Formación Deportiva', number: '3546 561920' },
  { category: 'Turismo', label: 'Calidad y Fiscalización Turística', number: '3546 436907' },
  { category: 'Cultura', label: 'Dirección de Cultura', number: '3546 437057' },
  { category: 'Turismo', label: 'Oficina Regional de Turismo', number: '3546 571272' },
  { category: 'Cultura', label: 'Casa del Bicentenario', number: '03546-429653' },
  { category: 'Emergencias', label: 'D.I.S.P.O.', number: '3546 400190' },
  { category: 'Emergencias', label: 'Policía', number: '101 / 911' },
  { category: 'Emergencias', label: 'Patrulla Urbana', number: '3546 400190' },
  { category: 'Emergencias', label: 'Bomberos', number: '100 / 103 – 03546 421750' },
  { category: 'Emergencias', label: 'Hospital Regional Eva Perón', number: '107 / 03546-426681' },
  { category: 'Salud', label: 'Dispensario Santa Mónica', number: '03571 501603' },
  { category: 'Salud', label: 'WhatsApp Dispensario Santa Mónica', number: '3546 436894' },
  { category: 'Salud', label: 'Dispensario Villa Strada', number: '03546-422220 / WhatsApp 3546 409770' },
  { category: 'Salud', label: 'Dispensario Villa Río Santa Rosa', number: '03546-421110 / WhatsApp 3546 402339' },
  { category: 'Emergencias', label: 'S.E.M. (Servicio de Emergencias)', number: '03546-420434 / Celular 3546 430115' },
  { category: 'Emergencias', label: 'Ambulancia Cooperativa', number: '03546-421501' },
  { category: 'Emergencias', label: 'Cooperativa Guardia Internet', number: '3546 568400' },
  { category: 'Servicios', label: 'Cooperativa de Energía Eléctrica', number: '3546 405236' },
  { category: 'Servicios', label: 'Cooperativa de Agua', number: '3546 405228' },
  { category: 'Servicios', label: 'Banco de la Provincia de Córdoba', number: '351 4486600 / WhatsApp 3514140000' },
  { category: 'Servicios', label: 'Correo Argentino', number: '03546-420200' },
  { category: 'Servicios', label: 'Obras Privadas', number: '3546 546954' },
  { category: 'Servicios', label: 'Centro de Comercio (CENCO)', number: '3546 420921 / 3546 456585' },
  { category: 'Servicios', label: 'DEREA', number: '3546 400176' },
  { category: 'Servicios', label: 'Ojos en Alerta', number: '3546 40-6203' },
  { category: 'Salud', label: 'PAMI', number: '420365' },
  { category: 'Cultura', label: 'Casa de la Mujer', number: '3546 480809' },
]

export const usefulPhoneCategories = ['Emergencias', 'Salud', 'Turismo', 'Cultura', 'Deportes', 'Servicios']

export interface FAQ {
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    question: '¿En qué época es recomendable visitar Santa Rosa?',
    answer:
      'Este rincón serrano se consolida como un espacio ideal para compartir tanto en familia como con grupos de amigos, sin importar el calendario. Cada época del año aporta un encanto particular y despliega un abanico diferente de propuestas para los visitantes. Sin embargo, debido al relieve natural del entorno y el atractivo de sus cursos de aguas, el período de máxima concurrencia y popularidad se concentra durante los meses de verano.',
  },
  {
    question: '¿Qué se aconseja llevar para una caminata por las sierras?',
    answer:
      'Depende de la estación, pero la comodidad es siempre la prioridad. Si viajás en verano, llevá ropa liviana, zapatillas cómodas, anteojos de sol, gorra y protector solar. Para cuando baje el sol, sumá un abrigo liviano. Si viajás en invierno, la clave es vestirse en capas: pantalones largos, remeras (mangas cortas y largas), sweaters o buzos frizados y una buena campera de abrigo, manteniendo siempre un calzado cómodo. Sin importar la época, una mochila mediana es indispensable para llevar tus pertenencias durante el trekking.',
  },
  {
    question: '¿Dónde se encuentra el banco? ¿Hay casa de cambio?',
    answer:
      'El cambio de moneda se puede realizar en el banco o en las casas de cambio ubicadas en el centro de la ciudad.\n\nBanco Provincia de Córdoba\nDirección: Libertad 599\nHorario: de 8:00 a 13:00\nCajero Link\n\nVan Martin\nLibertad 610\n03546 421167 Celular 3546 511478\n\nDólar Cash\nLibertad 383',
  },
  {
    question: '¿Se puede ir a cualquier parte del río o solamente a los balnearios?',
    answer:
      'El río puede disfrutarse a lo largo de todo su recorrido, ofreciendo postales únicas en cada tramo. Sus balnearios, además de ser de acceso completamente libre y gratuito, están equipados con todos los servicios e infraestructura necesarios para garantizar una estadía cómoda, segura y placentera para toda la familia.',
  },
  {
    question: '¿Dónde contratar excursiones y paseos?',
    answer:
      'Para tu comodidad, tenés dos opciones principales: podés contratar las excursiones directamente en cualquier agencia de viajes autorizada de la zona, o bien realizar los paseos habilitados de manera autoguiada. Si tenés dudas o necesitás asesoramiento personalizado, te sugerimos comunicarte con las Oficinas de Información Turística, donde te brindarán todos los detalles necesarios para tu visita.',
  },
  {
    question: '¿Qué opciones de transporte hay en Santa Rosa?',
    answer:
      'Santa Rosa cuenta con servicio de transporte urbano durante el día que recorre los diferentes barrios de la ciudad. Otra opción es moverse en remis. Para visitar localidades vecinas, podés hacerlo con un colectivo de línea. La frecuencia depende del destino y puede ser cada una o dos horas. Lo podés tomar en la Terminal de Ómnibus o sobre Av. Costanera Roberto Giagetto.',
  },
  {
    question: '¿Cómo es el clima en Santa Rosa?',
    answer:
      'Santa Rosa te espera con un clima sumamente agradable durante todo el año, caracterizado por su gran amplitud térmica. Durante el invierno, los días se presentan secos y sin lluvias, con mañanas y noches muy frías que contrastan con tardes soleadas y templadas. En cambio, el verano ofrece días más largos e intensos, con temperaturas máximas que rondan los 35°C y noches frescas ideales para descansar al aire libre.',
  },
]
