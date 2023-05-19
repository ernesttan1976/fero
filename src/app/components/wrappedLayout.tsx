'use client';
 
import {Layout} from 'antd';

export default function WLayout(props:any) {
  return <Layout {...props}>{props?.children}</Layout>;
}