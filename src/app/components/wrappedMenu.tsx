'use client';
 
import {Menu} from 'antd';

export default function WrappedMenu(props:any) {
  return <Menu {...props}>{props?.children}</Menu>;
}