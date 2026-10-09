export type CoffeeCategory = 'Espresso' | 'Fríos' | 'Matcha' | 'Pan dulce';

export class MenuItem {
  name!: string;
  image!: string;
  icon!: string;
  category!: CoffeeCategory;
  coffeeType!: string;
  price!: number;
  size!: string;
  description!: string;
  tone!: string;

  constructor(data: Omit<MenuItem, 'detail'>) {
    Object.assign(this, data);
  }

  get detail() {
    return `${this.coffeeType} · ${this.size}`;
  }
}

export const menuItems = [
  new MenuItem({ name: 'Latte de miel', image: '/coffee-hero.svg', icon: '☕', category: 'Espresso', coffeeType: 'Cremoso', price: 68, size: '12 oz', description: 'Espresso, leche vaporizada y miel de azahar.', tone: 'latte' }),
  new MenuItem({ name: 'Matcha nube', image: '/coffee-hero.svg', icon: '✦', category: 'Matcha', coffeeType: 'Suave', price: 74, size: '12 oz', description: 'Matcha ceremonial con espuma de vainilla.', tone: 'matcha' }),
  new MenuItem({ name: 'Cold brew naranja', image: '/coffee-hero.svg', icon: '◌', category: 'Fríos', coffeeType: 'Refrescante', price: 70, size: '16 oz', description: 'Cold brew de 18 horas y piel de naranja.', tone: 'cold' }),
  new MenuItem({ name: 'Capuccino de avena', image: '/coffee-hero.svg', icon: '☕', category: 'Espresso', coffeeType: 'Intenso', price: 62, size: '8 oz', description: 'Doble espresso y espuma de avena.', tone: 'latte' }),
  new MenuItem({ name: 'Tónica espresso', image: '/coffee-hero.svg', icon: '◌', category: 'Fríos', coffeeType: 'Brillante', price: 66, size: '12 oz', description: 'Espresso, tónica y cítricos frescos.', tone: 'cold' }),
];
