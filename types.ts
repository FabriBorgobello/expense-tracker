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

export type Method =
  | 'get'
  | 'delete'
  | 'head'
  | 'options'
  | 'post'
  | 'put'
  | 'patch'
  | 'purge'
  | 'link'
  | 'unlink';

export interface ReqOptions {
  method?: Method;
  params?: { [key: string]: any };
  immediate?: boolean;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}
