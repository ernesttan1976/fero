import { Button } from "antd";
import styles from "./complete.module.css";
export default function complete() {
  return (
    <>
      <div className={styles.page}>
        <img src="/FinancialLiteracy.svg"></img>
        <h1 className={styles.h1}>Great Job Peter</h1>
        {/* add real score from quiz */}
        <p className={styles.p}>You score 1/1 for the Quiz</p>
        <Button className={styles.button}>Done</Button>
      </div>
    </>
  );
}
