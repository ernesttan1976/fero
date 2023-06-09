import React, { createContext, useEffect, useState } from 'react';

// Create a context for the user
import { UserContext } from './components/userContext/UserContext';
import { IUser } from '../../models';

import "./globals.css"


export const metadata = {
  title: 'FERO',
  description: 'Financial Advisory App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [user, setUser] = useState<IUser | null>(null);


  useEffect(() => {
    // Read the user from the localStorage
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  return (
    <html lang="en">
      <body><UserContext.Provider value={{user, setUser}}>Testing{children}</UserContext.Provider></body>
    </html>
  )
}
