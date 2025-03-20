import { Element } from './elements';

export interface Attack {
  id: string;
  name: string;
  image: string;
  damage: number;
  element: Element;
}

export const attacks: Attack[] = [
  {
    id: '1',
    name: 'Meteoro',
    damage: 50,
    image: '/src/assets/attacks/meteor.png',
    element: 'Fire'
  },
  {
    id: '2',
    name: 'Meteoro 2',
    damage: 50,
    image: '/src/assets/attacks/meteor.png',
    element: 'Fire'
  },
  {
    id: '3',
    name: 'Meteoro 3',
    damage: 50,
    image: '/src/assets/attacks/meteor.png',
    element: 'Fire'
  },
  {
    id: '4',
    name: 'Meteoro 4',
    damage: 50,
    image: '/src/assets/attacks/meteor.png',
    element: 'Fire'
  },
  {
    id: '5',
    name: 'Meteoro 5',
    damage: 50,
    image: '/src/assets/attacks/meteor.png',
    element: 'Fire'
  },
  {
    id: '6',
    name: 'Meteoro 6',
    damage: 50,
    image: '/src/assets/attacks/meteor.png',
    element: 'Fire'
  },
  {
    id: '7',
    name: 'Meteoro 7',
    damage: 50,
    image: '/src/assets/attacks/meteor.png',
    element: 'Fire'
  },
  {
    id: '8',
    name: 'Meteoro 8',
    damage: 50,
    image: '/src/assets/attacks/meteor.png',
    element: 'Fire'
  },
  {
    id: '9',
    name: 'Meteoro 9',
    damage: 50,
    image: '/src/assets/attacks/meteor.png',
    element: 'Fire'
  },
  {
    id: '10',
    name: 'Meteoro 10',
    damage: 50,
    image: '/src/assets/attacks/meteor.png',
    element: 'Fire'
  }
]
