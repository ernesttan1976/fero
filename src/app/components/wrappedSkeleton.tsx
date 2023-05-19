'use client';
 
import {Skeleton} from 'antd';

export default function WSkeleton(props: any) {
  return <Skeleton {...props}>{props.children}</Skeleton>;
}