export interface Transaction {
  id: string;
  date: string;
  description: string;
  value: number;
  type: 'income' | 'expense';
  category: string;
}
