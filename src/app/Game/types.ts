export interface GameMatch {
  id: string
  createdAt: string
  adversary: {
    id: string
    name: string
  }
  status: 'waiting' | 'playing' | 'finished'
  isYourTurn: boolean
}
