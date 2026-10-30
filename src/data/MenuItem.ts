export type CoffeeCategory = 'Espresso' | 'Iced' | 'Matcha';

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
  new MenuItem({ name: 'Honey oat latte', image: '', icon: '', category: 'Espresso', coffeeType: 'Smooth & golden', price: 68, size: '12 oz', description: 'Espresso, steamed oat milk, and orange blossom honey.', tone: 'latte' }),
  new MenuItem({ name: 'Cloud matcha', image: '', icon: '', category: 'Matcha', coffeeType: 'Soft & creamy', price: 74, size: '12 oz', description: 'Ceremonial matcha finished with vanilla foam.', tone: 'matcha' }),
  new MenuItem({ name: 'Orange cold brew', image: '', icon: '', category: 'Iced', coffeeType: 'Bright & bold', price: 70, size: '16 oz', description: 'Slow brewed coffee with a twist of orange.', tone: 'cold' }),
  new MenuItem({ name: 'Oat cappuccino', image: '', icon: '', category: 'Espresso', coffeeType: 'Rich & cozy', price: 62, size: '8 oz', description: 'Double espresso with silky oat foam.', tone: 'latte' }),
  new MenuItem({ name: 'Espresso tonic', image: '', icon: '', category: 'Iced', coffeeType: 'Crisp & lively', price: 66, size: '12 oz', description: 'Espresso, sparkling tonic, and fresh citrus.', tone: 'cold' }),
];
