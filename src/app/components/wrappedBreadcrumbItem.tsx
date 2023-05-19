'use client';
 
import {Breadcrumb} from 'antd';

export default function WBreadcrumbItem(props: any) {
  return <Breadcrumb.Item {...props}>{props?.children}</Breadcrumb.Item>;
}