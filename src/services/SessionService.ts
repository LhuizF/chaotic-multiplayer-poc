class SessionService {
  saveUser(id: string, name: string) {
    localStorage.setItem('user', JSON.stringify({ id, name }));
  }

  getUser(): { id: string; name: string } | null {
    const user = localStorage.getItem('user');
    if (!user) return null;
    return JSON.parse(user);
  }
}

export const sessionService = new SessionService();
