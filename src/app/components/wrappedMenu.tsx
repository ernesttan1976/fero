'use client';
 
import {Menu} from 'antd';

export default function WMenu(props:any) {
  return <Menu {...props}>{props?.children}</Menu>;
}