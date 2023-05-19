'use client';
 
//import { createContext } from 'react';
import { ConfigProvider } from 'antd';

//export const ThemeContext = createContext({});
 
export default function WConfigProvider(props: any) {
  return <ConfigProvider {...props}>{props?.children}</ConfigProvider>;
}