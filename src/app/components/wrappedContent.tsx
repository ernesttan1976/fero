'use client';
 
import {Layout} from 'antd';
const {Content} = Layout;

export default function WContent(props: any) {
  return <Content {...props}>{props?.children}</Content>;
}