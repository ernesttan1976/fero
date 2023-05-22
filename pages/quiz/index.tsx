"use client";
import styles from "./index.module.css";
import { Button, Radio } from "antd";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Inter } from "next/font/google";

import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
export default function QuizPage() {
  const [correctAns, setCorrectAns] = useState();

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.currentTarget.style.backgroundColor = "blue";
  };
  return (
    <>
      <div className={styles.quiz}>
        <h1>Quiz Time!</h1>
        <p>50pts</p>
        <h1>What is long-term savings about?</h1>
        <div className={styles.question}>
          <Button
            className={`${inter.className} ${styles.button}`}
            onClick={() => handleSelect}
          >
            a) Generating consistent income from investments
          </Button>
          <Button className={`${inter.className} ${styles.button}`}>
            b) Earning returns on the initial investment and accumulated
            earnings over time
          </Button>
          <Button className={`${inter.className} ${styles.button}`}>
            c) Investing in high-risk assets for quick gains
          </Button>
          <Button className={`${inter.className} ${styles.button}`}>
            d) Reinvesting dividends to maximise investment growth
          </Button>
          <h1>
            {correctAns === undefined
              ? ""
              : correctAns
              ? "Great Job! That is correct"
              : "Explanation"}
          </h1>
          <Button className={`${inter.className} ${styles.button}`}>
            Next
          </Button>
        </div>
      </div>
      <></>
    </>
  );
}
