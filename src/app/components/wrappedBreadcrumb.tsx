'use client';
 
import {Breadcrumb} from 'antd';

export default function WBreadcrumb(props: any) {
  return <Breadcrumb {...props}>{props.children}</Breadcrumb>;
}