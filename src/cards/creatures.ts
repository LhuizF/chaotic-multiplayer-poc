import { Element } from './elements';
import dragonImage from '@/assets/creatures/dragon.png';
import werewolfImage from '@/assets/creatures/werewolf.png';
import turtleImage from '@/assets/creatures/turtle.png';
import eagleImage from '@/assets/creatures/eagle.png';
import skeletonImage from '@/assets/creatures/skeleton.png';

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
    image: dragonImage,
    power: 20
  },
  {
    id: '2',
    name: 'Lobisomem',
    element: 'Earth',
    health: 80,
    image: werewolfImage,
    power: 20
  },
  {
    id: '3',
    name: 'Tartaruga',
    element: 'Water',
    health: 80,
    image: turtleImage,
    power: 20
  },
  {
    id: '4',
    name: 'Águia',
    element: 'Air',
    health: 80,
    image: eagleImage,
    power: 20
  },
  {
    id: '5',
    name: 'Esqueleto',
    element: 'Earth',
    health: 80,
    image: skeletonImage,
    power: 20
  },
]
