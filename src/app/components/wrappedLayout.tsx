'use client';
 
import {Layout} from 'antd';

export default function WrappedLayout(props:any) {
  return <Layout {...props}>{props?.children}</Layout>;
}