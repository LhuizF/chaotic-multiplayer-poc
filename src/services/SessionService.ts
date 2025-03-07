export interface User {
  id: string;
  playerName: string;
}

class SessionService {
  saveUser(user: User): void {
    localStorage.setItem('chaotic-user', JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem('chaotic-user');
    if (!user) return null;
    return JSON.parse(user);
  }
}

export const sessionService = new SessionService();
