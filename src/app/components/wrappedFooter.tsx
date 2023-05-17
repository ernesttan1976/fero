'use client';
 
import {Layout} from 'antd';
const {Footer} = Layout;

export default function WrappedFooter(props: any) {
  return <Footer {...props}>{props?.children}</Footer>;
}