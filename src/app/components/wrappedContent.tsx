'use client';
 
import {Layout} from 'antd';
const {Content} = Layout;

export default function WrappedContent(props: any) {
  return <Content {...props}>{props?.children}</Content>;
}