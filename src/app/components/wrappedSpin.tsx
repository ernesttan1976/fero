'use client';
 
import {Spin} from 'antd';

export default function WSpin(props: any) {
  return <Spin {...props}>{props.children}</Spin>;
}