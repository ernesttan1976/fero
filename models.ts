export interface IUser{
    name: string;
    email: string;
    password: string;
    role?: 'User' | 'Admin';
    avatar?: string;
  }

  export interface ICalculator{
    email: string;
    dob: Date;
    retirementAge: number;
    grossMonthlyIncome: number;
    cpfOA: number;
    expenses_food: number;
    expenses_transport: number;
    expenses_parents: number;
    expenses_bills: number;
    expenses_loans: number;
    expenses_entertainment: number;
    expenses_miscellaneous: number;
    created_at: Date;
    updated_at: Date;
  }