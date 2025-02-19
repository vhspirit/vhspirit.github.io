export interface Game {
  id: string;
  title: string;
  imageUrl: string;
  subtitle: string;
  size: string;
  price: number;
}

export interface AdminCredentials {
  username: string;
  password: string;
}