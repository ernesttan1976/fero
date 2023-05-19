export interface IUser{
    email: string;
    password: string;
    role: 'User' | 'Admin';
    avatar?: string;
    created_at: Date;
    updated_at: Date;
  }