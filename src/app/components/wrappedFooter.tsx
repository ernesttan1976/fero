'use client';
 
import {Layout} from 'antd';
const {Footer} = Layout;

export default function WFooter(props: any) {
  return <Footer {...props}>{props?.children}</Footer>;
}