export interface MenuItem {
  label: string
  href?: string
  children?: MenuItem[]
}

export interface TopMenuItem extends MenuItem {
  hasDropdown?: boolean
  useCards?: boolean
  image?: string
}

export interface MenuCardItem extends MenuItem {
  image?: string
}

export const topMenuItems: TopMenuItem[] = [
  { label: 'Eventos', href: '/eventos' },
  { label: 'Dónde Comer', href: '/comer' },
  { label: 'Dónde Dormir', href: 'https://alojamientos-src.netlify.app/' },
  { label: 'Imperdibles', href: '/imperdibles' },
  { label: 'Experiencias', href: '/experiencias' },
  { label: 'Clima' },
]

export const drawerMenuSections: MenuItem[][] = [
  [
    {
      label: 'Información',
      children: [
        { label: 'Sobre Santa Rosa', href: '/informacion/sobre-santa-rosa' },
        { label: 'Cómo llegar', href: '/informacion/como-llegar' },
        { label: 'Mapas y planos', href: '/informacion/mapas' },
        { label: 'Agencias de viajes', href: '/informacion/agencias' },
        { label: 'Teléfonos útiles', href: '/informacion/telefonos' },
        { label: 'Galería Fotográfica', href: '/informacion/galeria' },
        { label: 'Preguntas frecuentes', href: '/informacion/faq' },
        { label: 'Contacto', href: '/informacion/contacto' },
      ],
    },
  ],
  [
    {
      label: 'Qué Hacer',
      children: [
        { label: 'Cicloturismo', href: '/hacer/cicloturismo' },
        { label: 'Cabalgatas', href: '/hacer/cabalgatas' },
        { label: 'Senderismo', href: '/hacer/senderismo' },
        { label: 'Nuestra Historia', href: '/hacer/historia' },
      ],
    },
  ],
  [
    {
      label: 'Qué Visitar',
      children: [
        {
          label: 'Descubrí la naturaleza',
          children: [
            { label: 'Cerro Vía Crucis', href: '/visitar/naturaleza/cerro-via-crucis' },
            { label: 'Reserva Natural La Cascada', href: '/visitar/naturaleza/reserva-la-cascada' },
            { label: 'Desafío Aguarayba', href: '/visitar/naturaleza/desafio-aguarayba' },
            { label: 'Circuito Arroyo Seco', href: '/visitar/naturaleza/circuito-arroyo-seco' },
            { label: 'Costanera y Balnearios', href: '/visitar/naturaleza/costanera-balnearios' },
          ],
        },
        {
          label: 'Cultura y Entretenimiento',
          children: [
            {
              label: 'Atractivos Culturales',
              children: [
                { label: 'Calicanto Jesuita', href: '/visitar/cultura/calicanto' },
                { label: 'Puente Colgante', href: '/visitar/cultura/puente-colgante' },
                { label: 'Escalera de los Inmigrantes', href: '/visitar/cultura/escalera-inmigrantes' },
                { label: 'Falla Geológica', href: '/visitar/cultura/falla-geologica' },
                { label: 'Museo Estanislao Baños', href: '/visitar/cultura/museo-estanislao-banos' },
                { label: 'Museo de Arte Religioso Santa Rosa de Lima', href: '/visitar/cultura/museo-arte-religioso' },
              ],
            },
{
  label: 'Esparcimiento',
  children: [
    { label: 'Sass', href: '/visitar/cultura/esparcimiento/sass' },
    { label: 'Bowling', href: '/visitar/cultura/esparcimiento/bowling' },
    { label: 'Arca de Noé', href: '/visitar/cultura/esparcimiento/arca-de-noe' },
    { label: 'Cutulecita', href: '/visitar/cultura/esparcimiento/cutulecita' },
    {
      label: 'Cabalgatas',
      children: [
        { label: 'El Chulengo', href: '/visitar/cultura/esparcimiento/club-hipico' },
        { label: 'Dafne Tribu Serrana', href: '/visitar/cultura/esparcimiento/dafne' },
        { label: 'Alquiler de Caballos', href: '/visitar/cultura/esparcimiento/alquiler-caballos' },
      ],
    },
    { label: 'Cine Teatro', href: '/visitar/cultura/esparcimiento/cine-teatro' },
  ],
},
            {
              label: 'Artesanos',
              children: [
                { label: 'Paseo de artesanos', href: '/visitar/cultura/artesanos/paseo-artesanos' },
                { label: 'Manos calamuchitanas', href: '/visitar/cultura/artesanos/manos-calamuchitanas' },
                { label: 'Hanceres Ancestrales', href: '/visitar/cultura/artesanos/hanceres-ancestrales' },
              ],
            },
            {
              label: 'Camino del Productor',
              children: [
                { label: 'Almacén del Mate', href: '/visitar/cultura/camino-productor/almacen-del-mate' },
                { label: 'Esencias naturales De La Meca', href: '/visitar/cultura/camino-productor/esencias-la-meca' },
                { label: 'Establecimiento Apícola Yullin', href: '/visitar/cultura/camino-productor/yullin' },
                { label: 'Galería de Artes Quiroga', href: '/visitar/cultura/camino-productor/galeria-quiroga' },
                { label: 'Orfebre Caminitti y Aguaribú Cerámica', href: '/visitar/cultura/camino-productor/orfebre-caminitti' },
                { label: 'Cervecería Artesanal Emily Brau', href: '/visitar/cultura/camino-productor/emily-brau' },
                { label: 'La Isabelina', href: '/visitar/cultura/camino-productor/la-isabelina' },
              ],
            },
          ],
        },
        {
          label: 'Paseos / Lugares de Interés',
          children: [
            { label: 'Complejo La Estancia', href: '/visitar/paseos/complejo-la-estancia' },
            { label: 'Plazoleta del Tercer Milenio', href: '/visitar/paseos/plazoleta-tercer-milenio' },
            { label: 'Monumento a la madre', href: '/visitar/paseos/monumento-madre' },
            { label: 'Monumento a Güemes', href: '/visitar/paseos/monumento-guemes' },
            { label: 'Mirador del Valle', href: '/visitar/paseos/mirador-valle' },
            { label: 'Paseo del Remanso', href: '/visitar/paseos/paseo-remanso' },
            { label: 'Paseo Las Higueras', href: '/visitar/paseos/paseo-las-higueras' },
            { label: 'Paseo Libertad', href: '/visitar/paseos/paseo-libertad' },
            { label: 'Paseo de la Historia', href: '/visitar/paseos/paseo-historia' },
            { label: 'Chau Sostenido', href: '/visitar/paseos/chau-sostenido' },
          ],
        },
      ],
    },
  ],
]

export const dondeComerItems: MenuItem[] = [
  { label: 'Restaurantes', href: '/comer/restaurantes' },
  { label: 'Pizzerías', href: '/comer/pizzerias' },
  { label: 'Bares y Pubs', href: '/comer/bares-pubs' },
  { label: 'Rotiserías', href: '/comer/rotiserias' },
  { label: 'Comidas para llevar', href: '/comer/llevar' },
]

export const eventosItems: MenuItem[] = [
  { label: 'Verano', href: '/eventos/verano' },
  { label: 'Otoño', href: '/eventos/otono' },
  { label: 'Invierno', href: '/eventos/invierno' },
  { label: 'Primavera', href: '/eventos/primavera' },
]
