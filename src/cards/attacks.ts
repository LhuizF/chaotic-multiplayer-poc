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
    name: 'Chicote de Fogo',
    damage: 50,
    image: '/src/assets/attacks/whip_fire.jpg',
    element: 'Fire'
  },
  {
    id: '3',
    name: 'Lança de Gelo',
    damage: 50,
    image: '/src/assets/attacks/ice_spear.jpg',
    element: 'Water'
  },
  {
    id: '4',
    name: 'Jato de Água',
    damage: 50,
    image: '/src/assets/attacks/water_jet.png',
    element: 'Water'
  },
  {
    id: '5',
    name: 'Onda de Pedra',
    damage: 50,
    image: '/src/assets/attacks/stone_wave.jpg',
    element: 'Earth'
  },
  {
    id: '6',
    name: 'Coluna de Pedra',
    damage: 50,
    image: '/src/assets/attacks/rock_column.jpg',
    element: 'Earth'
  },
  {
    id: '7',
    name: '',
    damage: 50,
    image: '/src/assets/attacks/',
    element: ''
  },
  {
    id: '8',
    name: 'Flecha de Luz',
    damage: 50,
    image: '/src/assets/attacks/arrow_of_light.jpg',
    element: 'Air'
  },

]
