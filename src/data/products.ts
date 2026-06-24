export type Category = {
  id: string;
  name: string;
  icon: string;
  slug: string;
};

export type Supplement = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  available: boolean;
  popular?: boolean;
};

export const CATEGORIES: Category[] = [
  { id: 'burgers', name: 'Burgers', icon: '🍔', slug: 'burgers' },
  { id: 'menus', name: 'Menus', icon: '🍟', slug: 'menus' },
  { id: 'sides', name: 'Sides', icon: '🧅', slug: 'sides' },
  { id: 'desserts', name: 'Desserts', icon: '🍫', slug: 'desserts' },
  { id: 'drinks', name: 'Boissons', icon: '🥤', slug: 'drinks' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'integral', name: "L'Intégral", slug: 'lintegral', category: 'burgers', price: 9.00,
    description: 'Pain brioche, 2 steaks boucher, bacon américain, cheddar, oignons crispy, sauce chef.',
    image: '/images/products/l-integral.png', rating: 4.8, reviews: 1240, badge: '⭐ Incontournable', available: true, popular: true,
  },
  {
    id: 'looong-pastrami', name: 'Looong Pastrami', slug: 'looong-pastrami', category: 'burgers', price: 9.00,
    description: 'Pain viennois, 2 steaks boucher, double cheddar, pastrami, oignons crispy.',
    image: '/images/products/le-classic.png', rating: 4.7, reviews: 856, badge: '🔥 Signature', available: true, popular: true,
  },
  {
    id: 'sz-r', name: 'SZ-R', slug: 'sz-r', category: 'burgers', price: 8.00,
    description: 'Pain brioche, 2 steaks boucher, tomme de Savoie, pickles, sauce pepper.',
    image: '/images/products/le-smoky.png', rating: 4.6, reviews: 612, available: true, popular: true,
  },
  {
    id: 'le-jet', name: 'Le Jet', slug: 'le-jet', category: 'burgers', price: 8.00,
    description: 'Pain brioche, tenders de poulet croustillants, cheddar fondu, sauce du chef.',
    image: '/images/products/le-crispy.png', rating: 4.7, reviews: 923, available: true, popular: true,
  },
  {
    id: 'kiri', name: 'Kiri', slug: 'kiri', category: 'burgers', price: 6.00,
    description: '2 steaks de 45g, emmental / vache qui rit, sauce poivre ou moutarde miel.',
    image: '/images/products/le-double-cheese.png', rating: 4.4, reviews: 445, available: true,
  },
  {
    id: 'double-cheese', name: 'Double Cheese', slug: 'double-cheese', category: 'burgers', price: 6.00,
    description: 'Pain Big Mac, 2 steaks de 45g, double cheddar, sauce Big Mac, oignons, pickles.',
    image: '/images/products/le-double-cheese.png', rating: 4.5, reviews: 782, available: true,
  },
  {
    id: 'le-classic', name: 'Le Classic', slug: 'le-classic', category: 'burgers', price: 8.50,
    description: 'Pain brioche, steak boucher, cheddar, tomate, oignons rouges, laitue, sauce maison.',
    image: '/images/products/le-classic.png', rating: 4.5, reviews: 534, available: true,
  },
  {
    id: 'le-smoky', name: 'Le Smoky', slug: 'le-smoky', category: 'burgers', price: 9.50,
    description: 'Pain brioche, steak boucher, bacon fumé, cheddar, oignons crispy, sauce BBQ smoky.',
    image: '/images/products/le-smoky.png', rating: 4.8, reviews: 698, badge: '🔥 Nouveau', available: true,
  },
  {
    id: 'le-black', name: 'Le Black', slug: 'le-black', category: 'burgers', price: 10.00,
    description: 'Pain noir au charbon, steak wagyu, cheddar affiné, truffe, sauce noire.',
    image: '/images/products/le-black.png', rating: 4.9, reviews: 321, badge: '👑 Premium', available: true,
  },
  {
    id: 'le-crispy', name: 'Le Crispy', slug: 'le-crispy', category: 'burgers', price: 8.50,
    description: 'Pain brioche, poulet crispy XL, cheddar fondu, salade, sauce ranch maison.',
    image: '/images/products/le-crispy.png', rating: 4.6, reviews: 489, available: true,
  },
  {
    id: 'le-veggie', name: 'Le Veggie', slug: 'le-veggie', category: 'burgers', price: 8.00,
    description: 'Pain brioche, steak végétal, cheddar fondu, tomate, oignons, guacamole.',
    image: '/images/products/le-veggie.png', rating: 4.3, reviews: 267, available: true,
  },
  {
    id: 'le-wrap-crispy', name: 'Le Wrap Crispy', slug: 'le-wrap-crispy', category: 'burgers', price: 8.00,
    description: 'Wrap tortilla, poulet crispy, salade, tomate, sauce épicée maison.',
    image: '/images/products/le-wrap-crispy.png', rating: 4.4, reviews: 312, available: true,
  },
  // MENUS
  {
    id: 'menu-full', name: 'Menu Full', slug: 'menu-full', category: 'menus', price: 18.50,
    description: '1 Indispensable + 1 Classique au choix + 1 Boisson + 1 Dessert au choix.',
    image: '/images/products/l-integral.png', rating: 4.8, reviews: 445, badge: '💥 Best Deal', available: true, popular: true,
  },
  {
    id: 'menu-perso', name: 'Menu Perso', slug: 'menu-perso', category: 'menus', price: 12.00,
    description: '1 Big M + 1 Kiri + 1 Boisson au choix. La formule parfaite.',
    image: '/images/products/le-double-cheese.png', rating: 4.6, reviews: 312, available: true, popular: true,
  },
  // SIDES
  {
    id: 'frites-maison', name: 'Frites Maison', slug: 'frites-maison', category: 'sides', price: 3.00,
    description: 'Frites fraîches maison, cuites à la commande, croustillantes.',
    image: '/images/products/frites-maison.png', rating: 4.7, reviews: 1890, available: true, popular: true,
  },
  {
    id: 'cheese-bacon-fries', name: 'Cheese Bacon Fries', slug: 'cheese-bacon-fries', category: 'sides', price: 5.00,
    description: 'Frites maison recouvertes de sauce fromage et bacon croustillant.',
    image: '/images/products/cheese-bacon-fries.png', rating: 4.8, reviews: 723, badge: '🧀 Indulgent', available: true,
  },
  {
    id: 'oignons-crispy', name: 'Oignons Crispy', slug: 'oignons-crispy', category: 'sides', price: 4.00,
    description: 'Rondelles d\'oignons panées, croustillantes, servies avec sauce ranch.',
    image: '/images/products/oignons-crispy.png', rating: 4.5, reviews: 445, available: true,
  },
  {
    id: 'mozzarella-sticks', name: 'Mozzarella Sticks', slug: 'mozzarella-sticks', category: 'sides', price: 5.00,
    description: '6 bâtonnets de mozzarella fondante panée, sauce marinara.',
    image: '/images/products/mozzarella-sticks.png', rating: 4.6, reviews: 367, available: true,
  },
  {
    id: 'wings-spicy', name: 'Wings Spicy', slug: 'wings-spicy', category: 'sides', price: 6.50,
    description: '6 ailes de poulet marinées sauce épicée maison, ultra croustillantes.',
    image: '/images/products/wings-spicy.png', rating: 4.7, reviews: 534, badge: '🌶️ Piquant', available: true,
  },
  // DESSERTS
  {
    id: 'fondant-chocolat', name: 'Fondant au Chocolat', slug: 'fondant-chocolat', category: 'desserts', price: 4.90,
    description: 'Fondant au chocolat noir coulant, servi tiède.',
    image: '/images/products/fondant-chocolat.png', rating: 4.9, reviews: 445, available: true, popular: true,
  },
  {
    id: 'cheesecake', name: 'Cheesecake', slug: 'cheesecake', category: 'desserts', price: 4.90,
    description: 'Cheesecake crémeux sur base biscuitée, coulis de fruits rouges.',
    image: '/images/products/cheesecake.png', rating: 4.7, reviews: 312, available: true,
  },
  {
    id: 'mousse-chocolat', name: 'Mousse au Chocolat', slug: 'mousse-chocolat', category: 'desserts', price: 4.50,
    description: 'Mousse au chocolat noir onctueuse, légère et aérienne.',
    image: '/images/products/mousse-chocolat.png', rating: 4.6, reviews: 234, available: true,
  },
  {
    id: 'brownie', name: 'Brownie', slug: 'brownie', category: 'desserts', price: 4.50,
    description: 'Brownie moelleux aux pépites de chocolat, servi avec crème anglaise.',
    image: '/images/products/brownie.png', rating: 4.7, reviews: 389, available: true,
  },
  {
    id: 'cookie', name: 'Cookie', slug: 'cookie', category: 'desserts', price: 2.50,
    description: 'Cookie géant maison, chocolat noir et lait, encore tiède.',
    image: '/images/products/cookie.png', rating: 4.8, reviews: 678, available: true,
  },
  // DRINKS
  {
    id: 'coca-cola', name: 'Coca-Cola 33cl', slug: 'coca-cola', category: 'drinks', price: 2.00,
    description: 'Coca-Cola original en canette 33cl, bien frais.',
    image: '/images/products/coca-cola.png', rating: 4.9, reviews: 2340, available: true, popular: true,
  },
  {
    id: 'sprite', name: 'Sprite 33cl', slug: 'sprite', category: 'drinks', price: 2.00,
    description: 'Sprite citron-citron vert pétillant, canette 33cl.',
    image: '/images/products/sprite.png', rating: 4.7, reviews: 845, available: true,
  },
  {
    id: 'fanta', name: 'Fanta Orange 33cl', slug: 'fanta', category: 'drinks', price: 2.00,
    description: 'Fanta orange fruité et rafraîchissant, canette 33cl.',
    image: '/images/products/fanta.png', rating: 4.6, reviews: 567, available: true,
  },
  {
    id: 'eau', name: 'Eau Minérale 50cl', slug: 'eau', category: 'drinks', price: 1.50,
    description: 'Eau minérale naturelle Evian, bouteille 50cl.',
    image: '/images/products/eau.png', rating: 4.5, reviews: 234, available: true,
  },
  {
    id: 'ice-tea', name: 'Ice Tea Pêche 50cl', slug: 'ice-tea', category: 'drinks', price: 2.50,
    description: 'Ice Tea Lipton pêche, doux et rafraîchissant, bouteille 50cl.',
    image: '/images/products/ice-tea.png', rating: 4.7, reviews: 456, available: true,
  },
];

export const SUPPLEMENTS: Supplement[] = [
  { id: 'cheddar', name: 'Cheddar', price: 1.00, image: '🧀' },
  { id: 'bacon', name: 'Bacon', price: 1.50, image: '🥓' },
  { id: 'oignons-crispy-sup', name: 'Oignons crispy', price: 0.80, image: '🧅' },
  { id: 'sauce-spicy', name: 'Sauce spicy', price: 0.80, image: '🌶️' },
  { id: 'double-steak', name: 'Double steak', price: 2.00, image: '🥩' },
  { id: 'sauce-truffe', name: 'Sauce truffe', price: 1.50, image: '🍄' },
  { id: 'avocat', name: 'Avocat', price: 1.50, image: '🥑' },
  { id: 'oeuf', name: 'Oeuf au plat', price: 1.00, image: '🍳' },
];

export const DESSERT_OPTIONS = PRODUCTS.filter(p => p.category === 'desserts');
export const DRINK_OPTIONS = PRODUCTS.filter(p => p.category === 'drinks');
export const POPULAR_PRODUCTS = PRODUCTS.filter(p => p.popular);
