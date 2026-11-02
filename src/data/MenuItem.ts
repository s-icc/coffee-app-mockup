export type CoffeeCategory = 'Espresso' | 'Iced' | 'Matcha' | 'Bakery' | 'Food' | 'Chai' | 'Refreshers' | 'Extras';
export type MenuType = 'Hot' | 'Iced' | 'Food' | 'Add-on';

export class MenuItem {
  name!: string;
  image!: string;
  icon!: string;
  category!: CoffeeCategory;
  coffeeType!: string;
  price!: number;
  size!: string;
  type!: MenuType;
  description!: string;
  tone!: string;

  constructor(data: Omit<MenuItem, 'detail' | 'priceOptions'>) {
    Object.assign(this, data);
  }

  get detail() {
    return `${this.coffeeType} · ${this.size}`;
  }

  get priceOptions() {
    if (this.type === 'Food' || this.type === 'Add-on') return [{ size: 'One size', price: this.price }];
    const base = this.size === '8 oz' ? 8 : this.size === '16 oz' ? 16 : 12;
    const sizes = this.type === 'Iced' ? [12, 16] : [8, 12, 16];
    return sizes.map((ounces) => ({ size: `${ounces} oz`, price: this.price + (ounces - base) * 2 }));
  }
}

export const menuItems = [
  new MenuItem({ name: 'Honey oat latte', image: '', icon: '', category: 'Espresso', type: 'Hot', coffeeType: 'Smooth & golden', price: 68, size: '12 oz', description: 'Espresso, steamed oat milk, and orange blossom honey.', tone: 'latte' }),
  new MenuItem({ name: 'Cloud matcha', image: '', icon: '', category: 'Matcha', type: 'Iced', coffeeType: 'Soft & creamy', price: 74, size: '12 oz', description: 'Ceremonial matcha finished with vanilla foam.', tone: 'matcha' }),
  new MenuItem({ name: 'Orange cold brew', image: '', icon: '', category: 'Iced', type: 'Iced', coffeeType: 'Bright & bold', price: 70, size: '16 oz', description: 'Slow brewed coffee with a twist of orange.', tone: 'cold' }),
  new MenuItem({ name: 'Oat cappuccino', image: '', icon: '', category: 'Espresso', type: 'Hot', coffeeType: 'Rich & cozy', price: 62, size: '8 oz', description: 'Double espresso with silky oat foam.', tone: 'latte' }),
  new MenuItem({ name: 'Espresso tonic', image: '', icon: '', category: 'Iced', type: 'Iced', coffeeType: 'Crisp & lively', price: 66, size: '12 oz', description: 'Espresso, sparkling tonic, and fresh citrus.', tone: 'cold' }),
  new MenuItem({ name: 'Double espresso', image: '', icon: '', category: 'Espresso', type: 'Hot', coffeeType: 'Short & bold', price: 48, size: '8 oz', description: 'Two shots of our house espresso.', tone: 'latte' }),
  new MenuItem({ name: 'Strawberry matcha', image: '', icon: '', category: 'Matcha', type: 'Iced', coffeeType: 'Fruity & fresh', price: 78, size: '16 oz', description: 'Matcha, milk, and strawberry.', tone: 'matcha' }),
  new MenuItem({ name: 'Dirty chai', image: '', icon: '', category: 'Chai', type: 'Hot', coffeeType: 'Spiced & cozy', price: 72, size: '12 oz', description: 'Chai with a shot of espresso.', tone: 'latte' }),
  new MenuItem({ name: 'Berry tonic', image: '', icon: '', category: 'Refreshers', type: 'Iced', coffeeType: 'Sparkling & bright', price: 64, size: '16 oz', description: 'Berries, citrus, and tonic.', tone: 'cold' }),
  new MenuItem({ name: 'New York roll', image: '', icon: '', category: 'Bakery', type: 'Food', coffeeType: 'Flaky & sweet', price: 58, size: 'One size', description: 'A buttery pastry for the coffee break.', tone: 'latte' }),
  new MenuItem({ name: 'Pistachio cookie', image: '', icon: '', category: 'Bakery', type: 'Food', coffeeType: 'Nutty & crisp', price: 42, size: 'One size', description: 'A little something on the side.', tone: 'matcha' }),
  new MenuItem({ name: 'Pesto sandwich', image: '', icon: '', category: 'Food', type: 'Food', coffeeType: 'Savory & fresh', price: 96, size: 'One size', description: 'A satisfying lunch companion.', tone: 'latte' }),
  new MenuItem({ name: 'Vanilla syrup', image: '', icon: '', category: 'Extras', type: 'Add-on', coffeeType: 'Add a little sweetness', price: 12, size: 'One size', description: 'Make your cup your own.', tone: 'latte' }),
];
