"use client";
import React from "react";
import { Carousel, Button } from "antd";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./index.module.css";

const contentStyle: React.CSSProperties = {
  // margin: 0,
  // height: "70vh",
  // width: "100vw",
  // color: "#fff",
  // lineHeight: "160px",
  // textAlign: "center",
  // background: "#3E92CC",
};

const About: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <>
      <Carousel afterChange={onChange}>
        <div className={styles.background}>
          <div className={styles.h1}>
            <span className={styles.welcomeTo}>Welcome to</span>
            <h1 style={contentStyle}>FERO</h1>
          </div>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <div className={styles.user}>
        <Button
          size="large"
          style={{
            height: "51px",
            width: "334px",
            background: "#2EC4B6",
            color: "white",
          }}
        >
          Create an Account
        </Button>
        <Button
          size="large"
          style={{ height: "51px", width: "334px", color: "#2EC4B6" }}
        >
          Sign In
        </Button>
      </div>
    </>
    // <Container>
    //   <Row>
    //     <h1>About</h1>
    //   </Row>
    // </Container>
  );
};

export default About;
