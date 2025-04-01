import { Element } from './elements';
import meteor from '@/assets/attacks/meteor.png'
import whipFire from '@/assets/attacks/whip_fire.jpg'
import iceSpear from '@/assets/attacks/ice_spear.jpg'
import waterJet from '@/assets/attacks/water_jet.png'
import stoneWave from '@/assets/attacks/stone_wave.jpg'
import rockColumn from '@/assets/attacks/rock_column.jpg'
import arrowOfLight from '@/assets/attacks/arrow_of_light.jpg'

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
    image: meteor,
    element: 'Fire'
  },
  {
    id: '2',
    name: 'Chicote de Fogo',
    damage: 50,
    image: whipFire,
    element: 'Fire'
  },
  {
    id: '3',
    name: 'Lança de Gelo',
    damage: 50,
    image: iceSpear,
    element: 'Water'
  },
  {
    id: '4',
    name: 'Jato de Água',
    damage: 50,
    image: waterJet,
    element: 'Water'
  },
  {
    id: '5',
    name: 'Onda de Pedra',
    damage: 50,
    image: stoneWave,
    element: 'Earth'
  },
  {
    id: '6',
    name: 'Coluna de Pedra',
    damage: 50,
    image: rockColumn,
    element: 'Earth'
  },
  {
    id: '7',
    name: 'Flecha de Luz',
    damage: 50,
    image: arrowOfLight,
    element: 'Air'
  },
]
