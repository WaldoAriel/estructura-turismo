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
  { label: 'Dónde Comer', href: 'https://guia-gastronomia.netlify.app' },
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
      href: '/hacer',
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
            { label: 'Reserva Natural La Cascada', href: '/visitar/naturaleza/reserva-natural-la-cascada' },
            { label: 'Desafío Aguarayba', href: '/visitar/naturaleza/desafio-aguarayba' },
            { label: 'Circuito del Arroyo Seco', href: '/visitar/naturaleza/circuito-del-arroyo-seco' },
            { label: 'Costanera y Balnearios', href: '/visitar/naturaleza/costanera-y-balnearios' },
          ],
        },
        {
          label: 'Cultura y Entretenimiento',
          children: [
          {
           label: 'Atractivos Culturales',
           href: '/visitar/cultura/atractivos-culturales',
          },
          {
            label: 'Esparcimiento',
            href: '/visitar/cultura/esparcimiento',
          },
         {
           label: 'Artesanos',
           href: '/visitar/cultura/artesanos',
         },
         {
           label: 'Camino del Productor',
           href: '/visitar/cultura/camino-del-productor',
         },
          ],
        },
         {
          label: 'Paseos / Lugares de Interés',
          children: [
            { label: 'Complejo La Estancia', href: '/visitar/paseos/complejo-la-estancia' },
            { label: 'Plazoleta del Tercer Milenio', href: '/visitar/paseos/plazoleta-del-tercer-milenio' },
            { label: 'Monumento a la Madre', href: '/visitar/paseos/monumento-a-la-madre' },
            { label: 'Monumento a Güemes', href: '/visitar/paseos/monumento-a-guemes' },
            { label: 'Mirador del Valle', href: '/visitar/paseos/mirador-del-valle' },
            { label: 'Paseo del Remanso', href: '/visitar/paseos/paseo-del-remanso' },
            { label: 'Paseo Las Higueras', href: '/visitar/paseos/paseo-las-higueras' },
            { label: 'Paseo Libertad', href: '/visitar/paseos/paseo-libertad' },
            { label: 'Paseo de la Historia', href: '/visitar/paseos/paseo-de-la-historia' },
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
