'use client';
 
import {Breadcrumb} from 'antd';

export default function WrappedBreadcrumb(props: any) {
  return <Breadcrumb {...props}>{props.children}</Breadcrumb>;
}