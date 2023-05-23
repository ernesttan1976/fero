import React, { createContext, useEffect, useState } from 'react';

// Create a context for the user
export const UserContext = createContext<[null | {}, React.Dispatch<React.SetStateAction<null | {}>>]>([null, () => {}]);



// export const metadata = {
//   title: 'FERO',
//   description: 'Financial Advisory App',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Read the user from the localStorage
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  return (
    <html lang="en">
      <body><UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider></body>
    </html>
  )
}
