'use client';
 
import {Row} from 'antd';

export default function WRow(props: any) {
  return <Row {...props}>{props.children}</Row>;
}