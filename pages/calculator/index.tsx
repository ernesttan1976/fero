"use client"
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Steps, Button, Form, Input, DatePicker, InputNumber, Space, Select, Typography, Col } from 'antd';
import { useEffect, useRef, useState, useContext } from "react";
import dayjs from "dayjs";
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import styles from "./index.module.css";
import Image from 'next/image';
import { UserContext } from '../../src/app/components/userContext/UserContext';
import { IUser } from '../../models';
import Bar from '@/app/components/bar/bar';
import Link from 'next/link';
import jwt from 'jsonwebtoken';

const { Step } = Steps;
const { TextArea } = Input;
const requiredFlag = false;
const { Option } = Select;
const { Title } = Typography;

const CalculatorPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [barData, setBarData] = useState<any>({});
  const [celebrate, setCelebrate] = useState(false);
  const [recommendation, setRecommendation] = useState({ text1: "", text2: "", color: "green" });
  const [user, setUser ] = useState({name:"", email:""});

  const handleChange = (changedValues: any, allValues: any) => {

    const userString = localStorage.getItem("user") || "";
    const userData = JSON.parse(userString); 
    setUser(userData);
    setFormData({ ...formData, ...allValues, ...changedValues, email: userData.email }); // Update the form data state with all the form values
    //console.log(formData);
    calculate();
  };

  // const handleChange = () => {
  //   form.setFieldsValue({ insurancePlans: [] });
  // };

  function calculate() {
    setBarData({
      expenses: {
        title: "Expenses",
        value: formData.expenses_food + formData.expenses_transport + formData.expenses_parents + formData.expenses_bills + formData.expenses_loans + formData.expenses_entertainment + formData.expenses_miscellaneous,
        total: formData.grossMonthlyIncome,
      },
      cpf: {
        title: "CPF",
        value: formData.grossMonthlyIncome * 0.20,
        total: formData.grossMonthlyIncome,
      },
      insurance: {
        title: "Insurance",
        value: formData.grossMonthlyIncome * 0.10,
        total: formData.grossMonthlyIncome,
      },
      investment: {
        title: "Investment",
        value: formData.grossMonthlyIncome * 0.10,
        total: formData.grossMonthlyIncome,
      },
      longTermSavings: {
        title: "Long Term Savings",
        value: formData.grossMonthlyIncome * 0.10,
        total: formData.grossMonthlyIncome,
      },
      shortTermSavings: {
        title: "Short Term Savings",
        value: formData.grossMonthlyIncome * 0.10,
        total: formData.grossMonthlyIncome,
      },
    })
    //console.log(barData);
  }

  const handleAdd = (add: any) => {
    add();
    //alert('add was called');
  }

  function formatted(num: number) {
    return num ? num.toLocaleString(undefined, {
      style: 'currency',
      currency: 'SGD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) : ""
  }

  const steps = [
    {
      title: 'Your Monthly Salary',
      content: (
        <>
          <div className={styles.innerContent}>
            <Title className={styles.title} level={1}>BUDGET CALCULATOR</Title>
            <Image
              src='/Paycheck.svg'
              width={300}
              height={300}
              alt="Paycheck"
            />
            <Title className={styles.title} level={2}>Your Monthly Salary</Title>
            <Typography.Paragraph className={styles.text}>
              Key in your monthly salary to unlock a deeper understanding of your financial well-being with precise analysis and personalised insights</Typography.Paragraph>
            <Form.Item
              name="grossMonthlyIncome"
              rules={[{
                required: requiredFlag,
                message: 'Gross Monthly Income is required',
                pattern: /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
              }]}
            >

              <InputNumber
                className={styles.fields}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
          </div>
        </>
      ),
    },
    {
      title: 'Your Monthly Expenses',
      content: (
        <>
          <div className={styles.innerContent}>
            <Title className={styles.title} level={1} style={{ textAlign: "left" }}>BUDGET CALCULATOR</Title>
            <Image
              src='/CashPayments.svg'
              width={300}
              height={300}
              alt="Paycheck"
            />
            <Title className={styles.title} level={2}>Your Monthly Expenses</Title>
            <Typography.Paragraph className={styles.text}>
              Track and categorise your monthly expenses effortlessly to gain valuable insights and take control of your financial future.</Typography.Paragraph>
            <Form.Item
              label="Food"
              name="expenses_food"
              rules={[{
                required: requiredFlag,
                message: 'Expenses for food is required',
                pattern: /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
              }]}
            >
              <InputNumber
                className={styles.fieldsShort}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
            <Form.Item
              label="Transport"
              name="expenses_transport"
              rules={[{
                required: requiredFlag,
                message: 'Expenses for transport is required',
                pattern: /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
              }]}
            >
              <InputNumber
                className={styles.fieldsShort}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
            <Form.Item
              label="Parents"
              name="expenses_parents"
              rules={[{
                required: requiredFlag,
                message: 'Expenses for parents is required',
                pattern: /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
              }]}
            >
              <InputNumber
                className={styles.fieldsShort}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
            <Form.Item
              label="Bills"
              name="expenses_bills"
              rules={[{
                required: requiredFlag,
                message: 'Expenses for bills is required',
                pattern: /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
              }]}
            >
              <InputNumber
                className={styles.fieldsShort}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
            <Form.Item
              label="Loans/Mortgages"
              name="expenses_loans"
              rules={[{
                required: requiredFlag,
                message: 'Expenses for loans and mortgages is required',
                pattern: /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
              }]}
            >
              <InputNumber
                className={styles.fieldsShort}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
            <Form.Item
              label="Entertainment"
              name="expenses_entertainment"
              rules={[{
                required: requiredFlag,
                message: 'Expenses for entertainment is required',
                pattern: /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
              }]}
            >
              <InputNumber
                className={styles.fieldsShort}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
            <Form.Item
              label="Miscellaneous"
              name="expenses_miscellaneous"
              rules={[{
                required: requiredFlag,
                message: 'Expenses for miscellaneous is required',
                pattern: /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
              }]}
            >
              <InputNumber
                className={styles.fieldsShort}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
          </div>
        </>
      ),
    },
    {
      title: 'Calculating...',
      content: (
        <>
          <div className={styles.innerContent}>
            <Image
              src="/FinanceCalculatorSmall.svg"
              width={400}
              height={400}
              alt="Finance Calculator"
            />
            <Title className={styles.title} level={1} style={{ textAlign: "center" }}>Calculating...</Title>
            <Typography.Paragraph className={styles.text} style={{ textAlign: "center" }}>
              Ready to have a better plan for your budget</Typography.Paragraph>
          </div>
        </>
      ),
    },
    {
      title: 'Recommendation',
      content: (
        <>
          <div className={styles.innerContent}>
            <Title className={styles.title} level={1} style={{ textAlign: "left" }}>BUDGET CALCULATOR</Title>
            <Image
              src='/FinanceCalculatorIllustrationHealthy.svg'
              width={300}
              height={300}
              alt="Finance Calculator Result"
            />
            <Title className={styles.title} level={2}>{recommendation.text1}!</Title>
            <Typography.Paragraph className={styles.text}>
              {recommendation.text2}</Typography.Paragraph>
            <Bar data={barData.expenses} color={recommendation.color} />
            <Title className={styles.title} level={2}>Recommendations</Title>
            <Typography.Paragraph className={styles.text}>Based on Your Monthly Salary {formatted(formData.grossMonthlyIncome)}, below will be our recommended breakdown of the Budget Allocations. </Typography.Paragraph>

            <Bar data={barData.expenses} />
            <Bar data={barData.cpf} />
            <Bar data={barData.insurance} />
            <Bar data={barData.investment} />
            <Bar data={barData.longTermSavings} />
            <Bar data={barData.shortTermSavings} />
          </div>
        </>
      ),
    }
  ];

  async function getRecommendation() {

    try {

      const userString = localStorage.getItem("user") || "";
      const userData = JSON.parse(userString); 
      setUser(userData);

      const percentExpenditure = barData.expenses.value / formData.grossMonthlyIncome;
      // const token = localStorage.getItem("token") || "notfound";
      // if (token === "notfound") {
      //   console.log("Token not found")
      //   return
      // }
      // const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
      // const decodedToken = await jwt.verify(token, JWT_SECRET);


      // const userData = decodedToken || {};
      // console.log(token, decodedToken, userData)

      if (percentExpenditure <= 0.4) {
        //     Expenses: <40% -> Healthy
        setRecommendation({ text1: `Great Job ${userData.name}`, text2: "Great job! You currently practise healthy spending habits! Keep up the good work!", color: "green" })
      } else if (percentExpenditure > 0.4 && percentExpenditure <= 0.6) {
        // Expenses: 40 - 60% -> Caution
        setRecommendation({ text1: `Be careful ${userData.name}`, text2: "You should relook and cut down on unnecessary spendings!", color: "yellow" })
      } else if (percentExpenditure > 0.6) {
        // Expenses: > 60% -> Unhealthy
        setRecommendation({ text1: `Warning  ${userData.name}`, text2: "You are currently spending more than your means and is at risk of overspending!", color: "red" })
      } else {
        setRecommendation({ text1: "Please refresh", text2: "", color: "green" })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNext = () => {
    form.validateFields().then(() => {
      //recalculates if there are any changes
      if (currentStep === 1) {
        calculate()
        getRecommendation()
      }
      setCurrentStep(currentStep + 1);
    });
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      setFormData(formData); // Update the form data state with the final form values
      console.log(formData); // Access the form data in the handleSubmit function
      setCelebrate(true);

      setTimeout(() => {
        setCelebrate(false);
      }, 5000);

      const userString = localStorage.getItem("user") || "";
      const userData = JSON.parse(userString); 
      setUser(userData);
      // Make a POST request to the API endpoint
      fetch(`/api/calculator/${userData.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          // Handle the response
          if (response.ok) {
            // Handle the success case
            console.log('Request succeeded');
          } else {
            // Handle the error case
            console.log('Request failed');
          }
        })
        .catch((error) => {
          // Handle any error that occurs during the request
          console.error('Error:', error);
        });
    });

  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  // const formItemLayout = {
  //   layout="horizontal",
  //   labelCol={{
  //     span: 6
  //   }},
  //   wrapperCol={{
  //     span: 18
  //   }},
  //   labelAlign="right",
  // }

  return (
    <>
      <div className={styles.page} style={{ backgroundColor: currentStep === 2 ? "#3E92CC" : "white" }}>

        <Form
          {...formItemLayout}
          labelAlign="left"
          className={styles.form}
          form={form}
          name="calculator_form"
          onFinish={handleSubmit}
          onValuesChange={handleChange}
          style={{ marginTop: '2rem' }}
        >
          <div className={styles.topbutton} style={{ marginBottom: '2rem' }}>
            {currentStep > 0 && (
              <Button style={{ marginRight: '1rem' }} onClick={handlePrev}>
                <LeftOutlined />
              </Button>
            )}
          </div>
          {/* <Steps current={currentStep}>
            {steps.map((step) => (
              <Step key={step.title} title={step.title} />
            ))}
          </Steps> */}
          <div className={styles.content}>{steps[currentStep].content}</div>
          <div className={styles.bottom} style={{ marginTop: '2rem' }}>
            <Space direction="vertical">
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={handleNext} className={styles.button}>
                  {currentStep == 1 ? "Calculate" : currentStep == 2 ? "Show Results" : "Next"}<RightOutlined />
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  className={styles.button}
                >
                  Save Data
                </Button>
              )}
              {currentStep === steps.length - 1 && (<Link href="/quiz"><Button
                size="large"
                className={styles.buttonOutline}
              >
                Take A Quiz
              </Button></Link>)}
              {currentStep === 1 && (
                <Button style={{ marginRight: '1rem' }} onClick={handlePrev}>
                  <LeftOutlined />back
                </Button>
              )}
            </Space>

          </div>
        </Form>


      </div>
      {celebrate && <canvas className={styles.canvas} ref={canvasRef} id="myCanvas">
        {/* style={{ opacity: celebrate ?1:0}} */}
      </canvas>}
      {celebrate && <Confetti
        drawShape={(ctx: any) => {
          ctx.beginPath()
          for (let i = 0; i < 22; i++) {
            const angle = 0.35 * i
            const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
            const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
            ctx.lineTo(x, y)
          }
          ctx.stroke()
          ctx.closePath()
        }}
      />}
    </>
  );
};

export default CalculatorPage;

