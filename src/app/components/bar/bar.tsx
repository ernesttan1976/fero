import React from 'react'
import styles from "./bar.module.css";

import { IBarData } from '../../../../models';

// export interface IBarData{
//   title: String;
//   value: number;
//   targetValue: number;
// }

export default function Bar(data: IBarData) {


  const formattedValue = data.value ? data.value.toLocaleString(undefined,{
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) : '';

  const formattedTotal = data.total ? data.total.toLocaleString(undefined,{
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) : '';


  const percent = ""+(data.value/data.total*100).toFixed(0)+"%"

  console.log(formattedValue, data.total, percent);
  console.log(`${Math.floor(data.value/data.total*400)}px`);

  return (
    <div className={styles.box}>
      <div className={styles.topRow}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.target}>{`${formattedValue} (${percent})`}</div>
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.bar} style={{width: 400 }}/>
        <div className={styles.value} style={{width: `${Math.floor(data.value/data.total*400)}px`}}></div>
      </div>
    </div>
  )
}
