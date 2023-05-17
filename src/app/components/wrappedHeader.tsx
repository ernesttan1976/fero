'use client';
 
import {Layout} from 'antd';
const { Header} = Layout;

export default function WrappedHeader(props: any) {
  return <Header {...props}>{props?.children}</Header>;
}