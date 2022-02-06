export interface Account {
  id: number;
  name: string;
  balance: number;
  currency: string;
  backgroundColor: string;
  color: string;
  price: number;
  img: string;
}
export interface Operation {
  id: number;
  accountId: number;
  date: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
}
