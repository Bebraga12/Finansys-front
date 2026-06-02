import { Injectable, signal } from '@angular/core';
import { Transaction } from '../models/transaction';
import { User } from '../models/user';
import { Category } from '../models/category';
import { Goal } from '../models/goal';

@Injectable({ providedIn: 'root' })
export class FinancialService {
  readonly currentUser: User = {
    id: '1',
    name: 'Bernardo Braga',
    email: 'bernardo@finansys.com',
    joinedAt: '2024-01-15',
  };

  readonly categories: Category[] = [
    { id: '1',  name: 'Salário',           type: 'income'  },
    { id: '2',  name: 'Freelance',         type: 'income'  },
    { id: '3',  name: 'Investimentos',     type: 'income'  },
    { id: '4',  name: 'Outros (Receita)',  type: 'income'  },
    { id: '5',  name: 'Moradia',           type: 'expense' },
    { id: '6',  name: 'Alimentação',       type: 'expense' },
    { id: '7',  name: 'Transporte',        type: 'expense' },
    { id: '8',  name: 'Saúde',             type: 'expense' },
    { id: '9',  name: 'Educação',          type: 'expense' },
    { id: '10', name: 'Lazer',             type: 'expense' },
    { id: '11', name: 'Contas e Serviços', type: 'expense' },
    { id: '12', name: 'Vestuário',         type: 'expense' },
    { id: '13', name: 'Outros (Despesa)',  type: 'expense' },
  ];

  private readonly _transactions = signal<Transaction[]>([
    // ── Janeiro ──────────────────────────────────────────
    { id: '101', date: '2026-01-02', description: 'Salário Janeiro',         value: 15000, type: 'income',  category: 'Salário'           },
    { id: '102', date: '2026-01-03', description: 'Aluguel',                  value: 2500,  type: 'expense', category: 'Moradia'            },
    { id: '103', date: '2026-01-05', description: 'Supermercado Extra',       value: 680,   type: 'expense', category: 'Alimentação'        },
    { id: '104', date: '2026-01-07', description: 'Conta de Água',            value: 85,    type: 'expense', category: 'Contas e Serviços'  },
    { id: '105', date: '2026-01-08', description: 'Energia Elétrica',         value: 210,   type: 'expense', category: 'Contas e Serviços'  },
    { id: '106', date: '2026-01-10', description: 'Freelance — Landing Page', value: 3200,  type: 'income',  category: 'Freelance'          },
    { id: '107', date: '2026-01-12', description: 'Plano de Saúde',           value: 450,   type: 'expense', category: 'Saúde'              },
    { id: '108', date: '2026-01-14', description: 'Combustível',              value: 190,   type: 'expense', category: 'Transporte'         },
    { id: '109', date: '2026-01-15', description: 'Rendimento Tesouro Direto',value: 420,   type: 'income',  category: 'Investimentos'      },
    { id: '110', date: '2026-01-18', description: 'Academia',                 value: 120,   type: 'expense', category: 'Saúde'              },
    { id: '111', date: '2026-01-20', description: 'Internet',                 value: 110,   type: 'expense', category: 'Contas e Serviços'  },
    { id: '112', date: '2026-01-22', description: 'Restaurante Sushi',        value: 220,   type: 'expense', category: 'Alimentação'        },
    { id: '113', date: '2026-01-25', description: 'Roupas Esportivas',        value: 340,   type: 'expense', category: 'Vestuário'          },
    { id: '114', date: '2026-01-28', description: 'Dividendos — FII',         value: 380,   type: 'income',  category: 'Investimentos'      },

    // ── Fevereiro ─────────────────────────────────────────
    { id: '201', date: '2026-02-02', description: 'Salário Fevereiro',        value: 15000, type: 'income',  category: 'Salário'           },
    { id: '202', date: '2026-02-03', description: 'Aluguel',                  value: 2500,  type: 'expense', category: 'Moradia'            },
    { id: '203', date: '2026-02-05', description: 'Mercado Zona Sul',         value: 510,   type: 'expense', category: 'Alimentação'        },
    { id: '204', date: '2026-02-07', description: 'Uber',                     value: 145,   type: 'expense', category: 'Transporte'         },
    { id: '205', date: '2026-02-10', description: 'Consulta Médica',          value: 280,   type: 'expense', category: 'Saúde'              },
    { id: '206', date: '2026-02-12', description: 'Freelance — App Mobile',   value: 5500,  type: 'income',  category: 'Freelance'          },
    { id: '207', date: '2026-02-14', description: 'Jantar Dia dos Namorados', value: 310,   type: 'expense', category: 'Lazer'              },
    { id: '208', date: '2026-02-15', description: 'Rendimento Fundo DI',      value: 310,   type: 'income',  category: 'Investimentos'      },
    { id: '209', date: '2026-02-18', description: 'Energia Elétrica',         value: 195,   type: 'expense', category: 'Contas e Serviços'  },
    { id: '210', date: '2026-02-20', description: 'Academia',                 value: 120,   type: 'expense', category: 'Saúde'              },
    { id: '211', date: '2026-02-22', description: 'Internet',                 value: 110,   type: 'expense', category: 'Contas e Serviços'  },
    { id: '212', date: '2026-02-25', description: 'Show de Rock',             value: 180,   type: 'expense', category: 'Lazer'              },

    // ── Março ─────────────────────────────────────────────
    { id: '301', date: '2026-03-02', description: 'Salário Março',            value: 15000, type: 'income',  category: 'Salário'           },
    { id: '302', date: '2026-03-03', description: 'Aluguel',                  value: 2500,  type: 'expense', category: 'Moradia'            },
    { id: '303', date: '2026-03-04', description: 'Supermercado',             value: 720,   type: 'expense', category: 'Alimentação'        },
    { id: '304', date: '2026-03-06', description: 'Freelance — Sistema Web',  value: 8000,  type: 'income',  category: 'Freelance'          },
    { id: '305', date: '2026-03-08', description: 'Plano de Saúde',           value: 450,   type: 'expense', category: 'Saúde'              },
    { id: '306', date: '2026-03-10', description: 'Combustível',              value: 210,   type: 'expense', category: 'Transporte'         },
    { id: '307', date: '2026-03-12', description: 'Dividendos — Ações',       value: 750,   type: 'income',  category: 'Investimentos'      },
    { id: '308', date: '2026-03-14', description: 'Notebook Novo',            value: 5800,  type: 'expense', category: 'Outros (Despesa)'   },
    { id: '309', date: '2026-03-16', description: 'Energia Elétrica',         value: 230,   type: 'expense', category: 'Contas e Serviços'  },
    { id: '310', date: '2026-03-18', description: 'Academia',                 value: 120,   type: 'expense', category: 'Saúde'              },
    { id: '311', date: '2026-03-20', description: 'Internet',                 value: 110,   type: 'expense', category: 'Contas e Serviços'  },
    { id: '312', date: '2026-03-22', description: 'Restaurante',              value: 195,   type: 'expense', category: 'Alimentação'        },
    { id: '313', date: '2026-03-25', description: 'Rendimento CDB',           value: 480,   type: 'income',  category: 'Investimentos'      },
    { id: '314', date: '2026-03-28', description: 'Tênis Esportivo',          value: 420,   type: 'expense', category: 'Vestuário'          },

    // ── Abril ─────────────────────────────────────────────
    { id: '401', date: '2026-04-01', description: 'Salário Abril',            value: 15000, type: 'income',  category: 'Salário'           },
    { id: '402', date: '2026-04-02', description: 'Aluguel',                  value: 2500,  type: 'expense', category: 'Moradia'            },
    { id: '403', date: '2026-04-04', description: 'Mercado',                  value: 640,   type: 'expense', category: 'Alimentação'        },
    { id: '404', date: '2026-04-07', description: 'Plano de Saúde',           value: 450,   type: 'expense', category: 'Saúde'              },
    { id: '405', date: '2026-04-09', description: 'Curso TypeScript Avançado',value: 499,   type: 'expense', category: 'Educação'           },
    { id: '406', date: '2026-04-11', description: 'Freelance — Consultoria',  value: 4000,  type: 'income',  category: 'Freelance'          },
    { id: '407', date: '2026-04-13', description: 'Combustível',              value: 185,   type: 'expense', category: 'Transporte'         },
    { id: '408', date: '2026-04-15', description: 'Dividendos — FII',         value: 420,   type: 'income',  category: 'Investimentos'      },
    { id: '409', date: '2026-04-17', description: 'Energia Elétrica',         value: 205,   type: 'expense', category: 'Contas e Serviços'  },
    { id: '410', date: '2026-04-19', description: 'Academia',                 value: 120,   type: 'expense', category: 'Saúde'              },
    { id: '411', date: '2026-04-21', description: 'Internet',                 value: 110,   type: 'expense', category: 'Contas e Serviços'  },
    { id: '412', date: '2026-04-23', description: 'Ingresso — Teatro',        value: 160,   type: 'expense', category: 'Lazer'              },
    { id: '413', date: '2026-04-26', description: 'Restaurante',              value: 210,   type: 'expense', category: 'Alimentação'        },

    // ── Maio ──────────────────────────────────────────────
    { id: '501', date: '2026-05-02', description: 'Salário Maio',             value: 15000, type: 'income',  category: 'Salário'           },
    { id: '502', date: '2026-05-02', description: 'Aluguel',                  value: 2500,  type: 'expense', category: 'Moradia'            },
    { id: '503', date: '2026-05-04', description: 'Supermercado',             value: 695,   type: 'expense', category: 'Alimentação'        },
    { id: '504', date: '2026-05-06', description: 'Freelance — E-commerce',   value: 6500,  type: 'income',  category: 'Freelance'          },
    { id: '505', date: '2026-05-08', description: 'Plano de Saúde',           value: 450,   type: 'expense', category: 'Saúde'              },
    { id: '506', date: '2026-05-10', description: 'Manutenção do Carro',      value: 780,   type: 'expense', category: 'Transporte'         },
    { id: '507', date: '2026-05-12', description: 'Rendimento Tesouro',       value: 510,   type: 'income',  category: 'Investimentos'      },
    { id: '508', date: '2026-05-14', description: 'Energia Elétrica',         value: 225,   type: 'expense', category: 'Contas e Serviços'  },
    { id: '509', date: '2026-05-16', description: 'Academia',                 value: 120,   type: 'expense', category: 'Saúde'              },
    { id: '510', date: '2026-05-18', description: 'Internet',                 value: 110,   type: 'expense', category: 'Contas e Serviços'  },
    { id: '511', date: '2026-05-20', description: 'Ingresso Show',            value: 240,   type: 'expense', category: 'Lazer'              },
    { id: '512', date: '2026-05-22', description: 'Restaurante',              value: 175,   type: 'expense', category: 'Alimentação'        },
    { id: '513', date: '2026-05-24', description: 'Livros Técnicos',          value: 210,   type: 'expense', category: 'Educação'           },
    { id: '514', date: '2026-05-26', description: 'Dividendos — Ações',       value: 620,   type: 'income',  category: 'Investimentos'      },
    { id: '515', date: '2026-05-28', description: 'Camisa Polo',              value: 150,   type: 'expense', category: 'Vestuário'          },

    // ── Junho ─────────────────────────────────────────────
    { id: '601', date: '2026-06-01', description: 'Salário Junho',            value: 15000, type: 'income',  category: 'Salário'           },
    { id: '602', date: '2026-06-02', description: 'Aluguel',                  value: 2500,  type: 'expense', category: 'Moradia'            },
    { id: '603', date: '2026-06-03', description: 'Supermercado',             value: 780,   type: 'expense', category: 'Alimentação'        },
    { id: '604', date: '2026-06-04', description: 'Freelance — Design UI',    value: 4000,  type: 'income',  category: 'Freelance'          },
    { id: '605', date: '2026-06-05', description: 'Combustível',              value: 200,   type: 'expense', category: 'Transporte'         },
    { id: '606', date: '2026-06-06', description: 'Plano de Saúde',           value: 450,   type: 'expense', category: 'Saúde'              },
    { id: '607', date: '2026-06-08', description: 'Energia Elétrica',         value: 220,   type: 'expense', category: 'Contas e Serviços'  },
    { id: '608', date: '2026-06-09', description: 'Internet',                 value: 110,   type: 'expense', category: 'Contas e Serviços'  },
    { id: '609', date: '2026-06-10', description: 'Rendimento Fundo DI',      value: 320,   type: 'income',  category: 'Investimentos'      },
    { id: '610', date: '2026-06-11', description: 'Academia',                 value: 120,   type: 'expense', category: 'Saúde'              },
    { id: '611', date: '2026-06-12', description: 'Restaurante Italiano',     value: 180,   type: 'expense', category: 'Alimentação'        },
    { id: '612', date: '2026-06-14', description: 'Curso Angular Avançado',   value: 299,   type: 'expense', category: 'Educação'           },
    { id: '613', date: '2026-06-15', description: 'Freelance — Backend API',  value: 3500,  type: 'income',  category: 'Freelance'          },
    { id: '614', date: '2026-06-17', description: 'Farmácia',                 value: 95,    type: 'expense', category: 'Saúde'              },
    { id: '615', date: '2026-06-18', description: 'Cinema',                   value: 80,    type: 'expense', category: 'Lazer'              },
    { id: '616', date: '2026-06-19', description: 'Uber',                     value: 65,    type: 'expense', category: 'Transporte'         },
    { id: '617', date: '2026-06-20', description: 'Mercado',                  value: 310,   type: 'expense', category: 'Alimentação'        },
    { id: '618', date: '2026-06-22', description: 'Dividendos — FII',         value: 500,   type: 'income',  category: 'Investimentos'      },
    { id: '619', date: '2026-06-24', description: 'Calça Jeans',              value: 180,   type: 'expense', category: 'Vestuário'          },
    { id: '620', date: '2026-06-25', description: 'Assinatura Streaming',     value: 55,    type: 'expense', category: 'Lazer'              },
    { id: '621', date: '2026-06-26', description: 'Manutenção Notebook',      value: 250,   type: 'expense', category: 'Outros (Despesa)'   },
    { id: '622', date: '2026-06-28', description: 'Almoço de Negócios',       value: 145,   type: 'expense', category: 'Alimentação'        },
  ]);

  readonly transactions = this._transactions.asReadonly();

  private readonly _goals = signal<Goal[]>([
    { id: '1', title: 'Reserva de Emergência',    targetAmount: 50000, currentAmount: 32000, deadline: '2026-12-31', status: 'active'    },
    { id: '2', title: 'Viagem para Europa',        targetAmount: 20000, currentAmount: 8500,  deadline: '2027-06-01', status: 'active'    },
    { id: '3', title: 'Notebook Novo',             targetAmount: 7000,  currentAmount: 7000,  deadline: '2026-03-01', status: 'completed' },
    { id: '4', title: 'Pós-Graduação em TI',       targetAmount: 15000, currentAmount: 4800,  deadline: '2026-09-01', status: 'active'    },
    { id: '5', title: 'Carro 0km',                 targetAmount: 80000, currentAmount: 12000, deadline: '2028-01-01', status: 'active'    },
    { id: '6', title: 'Fundo de Investimentos',    targetAmount: 30000, currentAmount: 30000, deadline: '2026-01-01', status: 'completed' },
    { id: '7', title: 'Reforma do Apartamento',    targetAmount: 25000, currentAmount: 6200,  deadline: '2027-03-01', status: 'active'    },
    { id: '8', title: 'Equipamento Home Office',   targetAmount: 5000,  currentAmount: 5000,  deadline: '2025-12-01', status: 'completed' },
  ]);

  readonly goals = this._goals.asReadonly();

  get incomes(): Transaction[] {
    return this._transactions().filter(t => t.type === 'income');
  }

  get expenses(): Transaction[] {
    return this._transactions().filter(t => t.type === 'expense');
  }

  get totalIncomes(): number {
    return this.currentMonthTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.value, 0);
  }

  get totalExpenses(): number {
    return this.currentMonthTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.value, 0);
  }

  get balance(): number {
    return this.totalIncomes - this.totalExpenses;
  }

  get currentMonthTransactions(): Transaction[] {
    return this._transactions().filter(t => t.date.startsWith('2026-06'));
  }

  addTransaction(t: Omit<Transaction, 'id'>): void {
    this._transactions.update(list => [{ ...t, id: Date.now().toString() }, ...list]);
  }

  deleteTransaction(id: string): void {
    this._transactions.update(list => list.filter(t => t.id !== id));
  }

  updateTransaction(updated: Transaction): void {
    this._transactions.update(list => list.map(t => t.id === updated.id ? updated : t));
  }

  addGoal(g: Omit<Goal, 'id'>): void {
    this._goals.update(list => [...list, { ...g, id: Date.now().toString() }]);
  }

  deleteGoal(id: string): void {
    this._goals.update(list => list.filter(g => g.id !== id));
  }

  expensesByCategory(): { category: string; total: number; percent: number }[] {
    return this._buildCategoryBreakdown(
      this.currentMonthTransactions.filter(t => t.type === 'expense')
    );
  }

  allExpensesByCategory(): { category: string; total: number; percent: number }[] {
    return this._buildCategoryBreakdown(
      this._transactions().filter(t => t.type === 'expense')
    );
  }

  private _buildCategoryBreakdown(txs: Transaction[]): { category: string; total: number; percent: number }[] {
    const map = new Map<string, number>();
    txs.forEach(e => map.set(e.category, (map.get(e.category) ?? 0) + e.value));
    const total = txs.reduce((s, t) => s + t.value, 0);
    if (total === 0) return [];
    return Array.from(map.entries())
      .map(([category, t]) => ({ category, total: t, percent: Math.round((t / total) * 100) }))
      .sort((a, b) => b.total - a.total);
  }

  monthlyReport(): { month: string; income: number; expense: number; balance: number }[] {
    const months = [
      { key: '2026-01', label: 'Jan' },
      { key: '2026-02', label: 'Fev' },
      { key: '2026-03', label: 'Mar' },
      { key: '2026-04', label: 'Abr' },
      { key: '2026-05', label: 'Mai' },
      { key: '2026-06', label: 'Jun' },
    ];
    return months.map(m => {
      const txs = this._transactions().filter(t => t.date.startsWith(m.key));
      const income  = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.value, 0);
      const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.value, 0);
      return { month: m.label, income, expense, balance: income - expense };
    });
  }
}
