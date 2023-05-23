"use client";
import React from "react";
import { Carousel, Button } from "antd";
import { Inter } from "next/font/google";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./index.module.css";
import Link from "next/link";

const contentStyle: React.CSSProperties = {
  // margin: 0,
  // height: "70vh",
  // width: "100vw",
  // color: "#fff",
  // lineHeight: "160px",
  // textAlign: "center",
  // background: "#3E92CC",
};
const inter = Inter({ subsets: ["latin"] });

const About: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <>
      <Carousel afterChange={onChange} style={{ zIndex: "6", height: "70vh" }}>
        <div className={styles.background}>
          <div className={styles.h1}>
            <p className={`${inter.className} ${styles.welcomeTo}`}>
              Welcome to
            </p>
            <img src="/FERO.svg" />
          </div>
        </div>
        <div>
          <div className={styles.background}>
            <div className={styles.h1}>
              <img src="/FinanceCalculator.svg" />
              <h1 className={`${inter.className} ${styles.heading}`}>
                Track Your Finances Better
              </h1>
              <p className={`${inter.className} ${styles.p}`}>
                Take control, secure your future with our advanced financial
                calculator—track, decide, optimize for financial health.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.background}>
            <div className={styles.h1}>
              <img src="/FinancialLiteracy.svg" />
              <h1 className={`${inter.className} ${styles.heading}`}>
                Tailored Investment Plans
              </h1>
              <p className={`${inter.className} ${styles.p}`}>
                Unlock personalised investment strategies designed to maximise
                returns and achieve your financial goals.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.background}>
            <div className={styles.h1}>
              <img src="/FinancialPlanning.svg" />
              <h1 className={`${inter.className} ${styles.heading}`}>
                Expenses At A Glance
              </h1>
              <p className={`${inter.className} ${styles.p}`}>
                Effortlessly manage and analyze your expenses with instant
                clarity for smarter financial decisions.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.background}>
            <div className={styles.h1}>
              <img src="/FinancialData.svg" />
              <h1 className={`${inter.className} ${styles.heading}`}>
                Access Your Financial Data At One Place
              </h1>
              <p className={`${inter.className} ${styles.p}`}>
                Effortlessly consolidate and access your entire financial data
                for a comprehensive overview in one convenient location.
              </p>
            </div>
          </div>
        </div>
      </Carousel>
      <div className={styles.user}>
        <Link href="/signup">
          <Button
          size="large"
          style={{
            marginTop: "20px",
            font: "Inter",
            height: "51px",
            width: "334px",
            background: "#2EC4B6",
            color: "white",
            marginBottom: "30px",
          }}
        >
          Create New Account
        </Button>
        </Link>
        <Link href="/signin">
        <Button
          size="large"
          style={{
            font: "Inter",
            height: "51px",
            width: "334px",
            color: "#2EC4B6",
            borderColor: "#2EC4B6",
            marginBottom: "30px",
          }}
        >
          Sign In
        </Button>
        </Link>
      </div>
    </>
  );
};

export default About;
