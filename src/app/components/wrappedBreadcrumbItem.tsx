'use client';
 
import {Breadcrumb} from 'antd';

export default function WrappedBreadcrumbItem(props: any) {
  return <Breadcrumb.Item {...props}>{props?.children}</Breadcrumb.Item>;
}