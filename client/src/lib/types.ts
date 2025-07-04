export interface User {
  id: string;
  username?: string | undefined;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isSucces: boolean;
  registeruser: (newuser: User) => Promise<void>;
  loginUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export interface Budgets {
    id: string;
    _id: string;
    user: string | null;
    amount: number;
    category: string;
    month: number;
    year: number;
    isDeleted:boolean
}
export interface Budget {
    id:string,
    user: string | null;
    amount: number;
    category: string;
    month: number;
    year: number;
}

export interface budgetstate {
    budget: Budget | null;
    loading: boolean;
    error: string | null;
    isSucces: boolean;
    addBudget: (newBudget: Budget) => Promise<void>;
    deletebudget:(id:string)=>Promise<void>
}

export interface expenseData {

  note: string;
  amount: number;
  category: string;
  paymentMethord: string;
  user:string|undefined
}
export interface expenceData {
    id: string|null;
    note: string;
    amount: number;
    category: string;
    paymentMethord: string;
    user:string|undefined
  }

export interface edExpModalProps {
  open: boolean;
  onClose: () => void;
  expenseId: expenceData | null;
}

export interface budgetdata {
  category: string;
  amount: number;
  month: number;
  year: number;
}

export interface BudeditmodalProps {
    open: boolean;
    onClose: () => void;
    selectedbud: budgetdata | null

}

export interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  delay?: number;
  trend?: number | null;
}