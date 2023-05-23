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
  const {user, setUser} = useContext(UserContext);

  const handleChange = (changedValues: any, allValues: any) => {

    const userEmail = user ? user.email : "not@defined.com"
    setFormData({ ...formData, ...allValues, ...changedValues, email: userEmail }); // Update the form data state with all the form values
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
    console.log(barData);
  }

  const handleAdd = (add: any) => {
    add();
    //alert('add was called');
  }

  const steps = [
    {
      title: 'Your Monthly Salary',
      content: (
        <>
          <div className={styles.innerContent}>
            <Title level={1}>BUDGET CALCULATOR</Title>
            <Image
              src='/Paycheck.svg'
              width={300}
              height={300}
              alt="Paycheck"
            />
            <Title level={2}>Your Monthly Salary</Title>
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
            <Title level={1} style={{ textAlign: "left" }}>BUDGET CALCULATOR</Title>
            <Image
              src='/CashPayments.svg'
              width={300}
              height={300}
              alt="Paycheck"
            />
            <Title level={2}>Your Monthly Expenses</Title>
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
                className={styles.fields}
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
                className={styles.fields}
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
                className={styles.fields}
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
                className={styles.fields}
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
                className={styles.fields}
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
                className={styles.fields}
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
                className={styles.fields}
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
          <div className={styles.blueInnerContent}>
            <Title level={1} style={{ textAlign: "left" }}>Calculating...</Title>
            <Image
              src="/FinanceCalculator.svg"
              width={300}
              height={300}
              alt="Finance Calculator"
            />
            {/* <Title level={2}>Your Monthly Expenses</Title> */}
            <Typography.Paragraph className={styles.text}>
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
            <Title level={1} style={{ textAlign: "left" }}>BUDGET CALCULATOR</Title>
            <Image
              src='/FinanceCalculatorIllustrationHealthy.svg'
              width={300}
              height={300}
              alt="Finance Calculator Result"
            />
            <Title level={2}>Great Job Peter!</Title>
            <Typography.Paragraph className={styles.text}>
              Great job! You currently practise healthy spending habits! Keep up the good work!</Typography.Paragraph>
            <Bar {...barData.expenses} />
            <Bar {...barData.cpf} />
            <Bar {...barData.insurance} />
            <Bar {...barData.investment} />
            <Bar {...barData.longTermSavings} />
            <Bar {...barData.shortTermSavings} />
          </div>
        </>
      ),
    }
  ];

  const handleNext = () => {
    form.validateFields().then(() => {
      //recalculates if there are any changes
      if (currentStep === 1) calculate()
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

      // const email = "abc@xyz.com";
      const email = user ? user.email : "not@defined.com";
      // Make a POST request to the API endpoint
      fetch(`/api/calculator/${email}`, {
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

  return (
    <>
      <div className={styles.page}>

        <Form
          className={styles.form}
          form={form}
          name="calculator_form"
          onFinish={handleSubmit}
          onValuesChange={handleChange}
          style={{ marginTop: '2rem' }}
          {...formItemLayout}
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}

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
        </Form>
        <div className={styles.bottom} style={{ marginTop: '2rem' }}>
          <Space>
            {currentStep > 0 && (
              <Button style={{ marginRight: '1rem' }} onClick={handlePrev}>
                <LeftOutlined />Back
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNext} >
                {currentStep==1 ? "Calculate": "Next"}<RightOutlined />
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" onClick={handleSubmit}>
                Save
              </Button>
            )}
            <Link href="/quiz"><Button
              size="large"
              className={styles.buttonOutline}
            >
              Take A Quiz
            </Button></Link>
          </Space>

        </div>

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

