import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'outcome' | 'income';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const reducerIncome = (stack: number, actual: Transaction) => {
      if (actual.type === 'income') return stack + actual.value;
      return stack;
    };

    const reducerOutcome = (stack: number, actual: Transaction) => {
      if (actual.type === 'outcome') return stack + actual.value;
      return stack;
    };

    const income = this.transactions.reduce(reducerIncome, 0);
    const outcome = this.transactions.reduce(reducerOutcome, 0);
    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
