'use client';
 
import {Col} from 'antd';

export default function WCol(props: any) {
  return <Col {...props}>{props.children}</Col>;
}