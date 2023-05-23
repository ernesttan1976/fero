import { createContext, Dispatch, SetStateAction } from 'react';
import { IUser } from '../../../../models';

interface IUserContextValue {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

export const UserContext = createContext<IUserContextValue>({
  user: null,
  setUser: () => {},
});
