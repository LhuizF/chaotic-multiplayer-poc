import { Element } from './elements';

export interface Creature {
  id: string;
  name: string;
  image: string;
  health: number;
  element: Element;
  power: number;
}

export const creatures: Creature[] = [
  {
    id: '1',
    name: 'Dragão negro',
    element: 'Fire',
    health: 80,
    image: '/src/assets/creatures/dragon.png',
    power: 20
  },
  {
    id: '2',
    name: 'Lobisomem',
    element: 'Earth',
    health: 80,
    image: '/src/assets/creatures/werewolf.png',
    power: 20
  },
  {
    id: '3',
    name: 'Tartaruga',
    element: 'Water',
    health: 80,
    image: '/src/assets/creatures/turtle.png',
    power: 20
  },
  {
    id: '4',
    name: 'Águia',
    element: 'Air',
    health: 80,
    image: '/src/assets/creatures/eagle.png',
    power: 20
  },
  {
    id: '5',
    name: 'Esqueleto',
    element: 'Earth',
    health: 80,
    image: '/src/assets/creatures/skeleton.png',
    power: 20
  },
]
