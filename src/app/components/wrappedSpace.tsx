'use client';
 
import {Space} from 'antd';

export default function WSpace(props: any) {
  return <Space {...props}>{props.children}</Space>;
}