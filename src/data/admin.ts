export type Order = {
  id: string;
  number: string;
  customer: string;
  phone: string;
  address: string;
  type: 'Livraison' | 'À emporter';
  status: 'Nouvelle' | 'En préparation' | 'Prête' | 'En livraison' | 'Livrée' | 'Annulée';
  time: string;
  timeAgo: string;
  amount: number;
  items: { name: string; qty: number; price: number; options?: string }[];
  isNew?: boolean;
};

export const MOCK_ORDERS: Order[] = [
  {
    id: '1552', number: '#1552', customer: 'Thomas B.', phone: '06 12 34 56 78',
    address: '15 rue de la République, 69002 Lyon\nÉtage 2, Code 1234',
    type: 'Livraison', status: 'Nouvelle', time: '23:08', timeAgo: 'il y a 1 min',
    amount: 32.90, isNew: true,
    items: [
      { name: "L'Intégral", qty: 1, price: 9.00, options: 'Cheddar, Bacon' },
      { name: 'Frites Maison', qty: 1, price: 3.90, options: 'Sauce barbecue' },
    ],
  },
  {
    id: '1551', number: '#1551', customer: 'Sarah L.', phone: '06 23 45 67 89',
    address: '8 avenue Jean Jaurès, 75019 Paris', type: 'À emporter',
    status: 'Nouvelle', time: '23:07', timeAgo: 'il y a 2 min', amount: 18.50, isNew: true,
    items: [
      { name: 'Le Smoky', qty: 1, price: 9.50 },
      { name: 'Coca-Cola 33cl', qty: 2, price: 4.00 },
    ],
  },
  {
    id: '1550', number: '#1550', customer: 'Mike D.', phone: '06 34 56 78 90',
    address: '22 rue de la Paix, 75001 Paris', type: 'Livraison',
    status: 'En préparation', time: '23:06', timeAgo: 'il y a 3 min', amount: 27.40,
    items: [
      { name: "L'Intégral", qty: 2, price: 18.00 },
      { name: 'Cheese Bacon Fries', qty: 1, price: 5.00 },
    ],
  },
  {
    id: '1549', number: '#1549', customer: 'Julie R.', phone: '06 45 67 89 01',
    address: '5 place Victor Hugo, Lyon', type: 'À emporter',
    status: 'En préparation', time: '23:04', timeAgo: 'il y a 5 min', amount: 14.90,
    items: [
      { name: 'Menu Perso', qty: 1, price: 12.00 },
    ],
  },
  {
    id: '1548', number: '#1548', customer: 'Nassim K.', phone: '06 56 78 90 12',
    address: '12 rue Molière, 75001 Paris', type: 'Livraison',
    status: 'Prête', time: '23:02', timeAgo: 'il y a 7 min', amount: 43.80,
    items: [
      { name: 'Le Black', qty: 2, price: 20.00 },
      { name: 'Wings Spicy', qty: 2, price: 13.00 },
    ],
  },
  {
    id: '1547', number: '#1547', customer: 'Clara M.', phone: '06 67 89 01 23',
    address: '3 rue du Commerce, Paris', type: 'À emporter',
    status: 'Prête', time: '23:01', timeAgo: 'il y a 8 min', amount: 13.90,
    items: [
      { name: 'Le Jet', qty: 1, price: 8.00 },
      { name: 'Frites Maison', qty: 1, price: 3.00 },
    ],
  },
  {
    id: '1546', number: '#1546', customer: 'Alex P.', phone: '06 78 90 12 34',
    address: '78 boulevard Haussmann, Paris', type: 'Livraison',
    status: 'En livraison', time: '22:59', timeAgo: 'il y a 10 min', amount: 21.90,
    items: [
      { name: 'Menu Full', qty: 1, price: 18.50 },
    ],
  },
  {
    id: '1545', number: '#1545', customer: 'Léa D.', phone: '06 89 01 23 45',
    address: '45 rue Oberkampf, Paris 75011', type: 'Livraison',
    status: 'En livraison', time: '22:57', timeAgo: 'il y a 12 min', amount: 26.50,
    items: [
      { name: 'SZ-R', qty: 2, price: 16.00 },
      { name: 'Fondant au Chocolat', qty: 2, price: 9.80 },
    ],
  },
  {
    id: '1544', number: '#1544', customer: 'Rayan S.', phone: '06 90 12 34 56',
    address: '99 avenue Foch, Paris 75016', type: 'Livraison',
    status: 'Livrée', time: '22:51', timeAgo: 'il y a 18 min', amount: 27.40,
    items: [
      { name: "Looong Pastrami", qty: 2, price: 18.00 },
    ],
  },
  {
    id: '1543', number: '#1543', customer: 'Julie R.', phone: '06 01 23 45 67',
    address: '5 place Victor Hugo, Lyon', type: 'À emporter',
    status: 'Livrée', time: '22:45', timeAgo: 'il y a 26 min', amount: 13.90,
    items: [
      { name: 'Kiri', qty: 1, price: 6.00 },
      { name: 'Double Cheese', qty: 1, price: 6.00 },
    ],
  },
];

export const MOCK_REVIEWS = [
  { name: 'Sarah L.', rating: 5, text: 'Top comme toujours ! Burgers incroyables 🙌', time: 'Il y a 2h', avatar: 'SL' },
  { name: 'Mike D.', rating: 5, text: 'Livraison rapide et livreur sympa 👍', time: 'Il y a 4h', avatar: 'MD' },
  { name: 'Nassim K.', rating: 4, text: 'Très bon, juste les frites pourraient être plus chaudes.', time: 'Il y a 6h', avatar: 'NK' },
];

export const SALES_DATA = [
  { hour: '22h', amount: 0 },
  { hour: '23h', amount: 320 },
  { hour: '00h', amount: 680 },
  { hour: '01h', amount: 1100 },
  { hour: '02h', amount: 1580 },
  { hour: '03h', amount: 1890 },
  { hour: '04h', amount: 2100 },
  { hour: '05h', amount: 1950 },
  { hour: '06h', amount: 800 },
];

export const TOP_PRODUCTS = [
  { rank: 1, name: "L'Intégral", sold: 142, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&q=60' },
  { rank: 2, name: 'Le Jet', sold: 128, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=80&q=60' },
  { rank: 3, name: 'Looong Pastrami', sold: 96, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=80&q=60' },
  { rank: 4, name: 'Double Cheese', sold: 78, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=80&q=60' },
  { rank: 5, name: 'Kiri', sold: 62, image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&q=60' },
];
