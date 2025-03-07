export interface Creature {
  id: string;
  name: string;
  image: string;
  health: number;
  element: Element;
  power: number;
}

export interface Attack {
  id: string;
  name: string;
  image: string;
  damage: number;
  element: Element;
}

export type Element = 'Fire' | 'Water' | 'Earth' | 'Air';
