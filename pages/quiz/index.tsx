"use client";
import styles from "./index.module.css";
import { Button, Radio } from "antd";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Inter } from "next/font/google";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

interface Quiz {
  topic: string;
  question: string;
  options: {
    option1: string;
    option2: string;
    option3: string;
    option4: string;
  };
  correctAns: string;
  explanation: string;
}
// interface Quiz {

// }
export default function QuizPage() {
  const [correctAns, setCorrectAns] = useState<boolean>();
  const [selectedAns, setSelectedAns] = useState<String>();
  const [quiz, setQuiz] = useState<Array<Quiz>>([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [points, setPoints] = useState(0);

  const router = useRouter();

  const handleClickNext = () => {
    setActiveQuestion(activeQuestion + 1);
    if (quiz.length == activeQuestion + 1) router.push("/quiz/complete");
    setCorrectAns(undefined);
  };

  const handleSelect = (e: any) => {
    setSelectedAns(e.currentTarget.value);
  };

  const handleSubmit = () => {
    console.log(correctAns);
    if (selectedAns == quiz[activeQuestion].correctAns) {
      setPoints(points + 1);
      setCorrectAns(true);
    }
    setCorrectAns(false);
  };
  const getQuiz = async () => {
    try {
      const response = await fetch(`/api/quiz`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const questions = await response.json();
      setQuiz(questions.questions);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    getQuiz();
    console.log(quiz);
  }, []);

  //add check if answer is correct add points and display text
  return (
    <>
      <div className={styles.quiz}>
        <img src="/Revenue_Growth.svg"></img>
        <div className={`${inter.className} ${styles.header}`}>
          <h1 className={styles.h1}>Quiz Time!</h1>
          <h1 className={styles.question}>{quiz[activeQuestion]?.question}</h1>
        </div>
        <div className={styles.question}>
          <Button
            className={`${inter.className} ${styles.button}`}
            value="option1"
            onClick={handleSelect}
          >
            a){quiz[activeQuestion]?.options.option1}
          </Button>
          <Button
            className={`${inter.className} ${styles.button}`}
            value="option2"
            onClick={handleSelect}
          >
            b) {quiz[activeQuestion]?.options.option2}
          </Button>
          <Button
            className={`${inter.className} ${styles.button}`}
            value="option3"
            onClick={handleSelect}
          >
            c) {quiz[activeQuestion]?.options.option3}
          </Button>
          <Button
            className={`${inter.className} ${styles.button}`}
            value="option4"
            onClick={handleSelect}
          >
            d) {quiz[activeQuestion]?.options.option4}
          </Button>
          <h1 className={styles.result}>
            {correctAns === undefined
              ? ""
              : correctAns
              ? "Great Job! That is correct"
              : quiz[activeQuestion].explanation}
          </h1>
          <div className={`${styles.bottomButtons}`}>
            {correctAns === undefined ? (
              <Button
                className={`${inter.className} ${styles.button}`}
                onClick={handleSubmit}
              >
                Submit {correctAns}
              </Button>
            ) : (
              ""
            )}
            <Button
              className={`${inter.className} ${styles.button}`}
              onClick={handleClickNext}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
