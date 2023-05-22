"use client"
import { LeftOutlined, MinusCircleOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Steps, Button, Form, Input, DatePicker, InputNumber, Space, Select, Typography, Col } from 'antd';
import { useEffect, useRef, useState, useContext } from "react";
import dayjs from "dayjs";
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import styles from "./index.module.css";
import Image from 'next/image';
import {UserContext} from "../../src/app/layout";
import { IUser } from '../../models';

const { Step } = Steps;
const { TextArea } = Input;
const requiredFlag = false;
const { Option } = Select;
const { Title } = Typography;

const CalculatorPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<Record<string, any>>({
    dob: dayjs("1990-01-01"),
    retirementAge: 55,
    grossMonthlyIncome: 3500,
    // grossYearlyIncome: 42000,
    // cpfOA: 20000,
  });
  // const { width, height } = useWindowSize()
  const [celebrate, setCelebrate] = useState(false);
  const user = useContext(UserContext) as IUser;
  if (user) alert(user);
  //form.setFieldsValue({ insurancePlans: [] });
  const insuranceTypes = [
    { label: 'Life', value: 'Life' },
    { label: 'Accident', value: 'Accident' },
    { label: 'Term', value: 'Term' },
  ];

  const insurancePlans = {
    Life: ['NTUC Income Life Insurance', 'Prudential Life Insurance', 'Great Eastern Life Insurance'],
    Accident: ['NTUC Accident Insurance', 'Prudential Accident Insurance', 'Great Eastern Accident Insurance'],
    Term: ['NTUC Term Insurance', 'Prudential Term Insurance', 'Great Eastern Term Insurance'],
  };

  type insurancePlansKeys = keyof typeof insurancePlans;

  const handleChange = (changedValues: any, allValues: any) => {
    //alert(JSON.stringify(changedValues));
    if (changedValues["grossMonthlyIncome"]) {
      const yearly = changedValues["grossMonthlyIncome"] * 12;
      form.setFieldsValue({ grossYearlyIncome: yearly }); // Update the value of grossYearIncome field
    }
    const userEmail = user ? user.email : "not@defined.com"
    setFormData({ ...formData, ...allValues, ...changedValues, email: userEmail }); // Update the form data state with all the form values

  };

  // const handleChange = () => {
  //   form.setFieldsValue({ insurancePlans: [] });
  // };

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
    // {
    //   title: 'Step 2: Savings',
    //   content: (
    //     <>
    //       <Form.Item name="insuranceType" label="Insurance Type" rules={[{ required: true, message: 'Missing insurance type' }]}>
    //         <Select options={insuranceTypes} />
    //       </Form.Item>
    //       <Form.List name="insurancePlans">
    //         {(fields, { add, remove }) => (
    //           <>
    //             {fields.map((field) => (
    //               <Space align="baseline" direction='vertical'>
    //                 <Space key={field.key} align="baseline" className={styles.row}>
    //                   <Form.Item
    //                     noStyle
    //                     shouldUpdate={(prevValues, curValues) =>
    //                       prevValues.insuranceTypes !== curValues.insurnaceTypes || prevValues.insurancePlans !== curValues.insurancePlans
    //                     }
    //                   >
    //                     {() => (
    //                       <Form.Item
    //                         {...field}
    //                         label="Insurance Plan"
    //                         name={[field.name, 'insurancePlan']}
    //                         rules={[{ required: true, message: 'Missing plan' }]}
    //                       >
    //                         <Select disabled={!form.getFieldValue('insurancePlans')} style={{ width: 130 }}>
    //                           {(insurancePlans[form.getFieldValue('insuranceType') as insurancePlansKeys] || []).map((item) => (
    //                             <Option key={item} value={item}>
    //                               {item}
    //                             </Option>
    //                           ))}
    //                         </Select>
    //                       </Form.Item>
    //                     )}
    //                   </Form.Item>
    //                   <Form.Item
    //                     {...field}
    //                     label="Monthly Contribution"
    //                     name={[field.name, 'monthlyContribution']}
    //                     rules={[{
    //                       required: requiredFlag,
    //                       message: 'Missing monthly contribution',
    //                       pattern: /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
    //                     }]}
    //                   >
    //                     <InputNumber />
    //                   </Form.Item>
    //                   <MinusCircleOutlined onClick={() => remove(field.name)} />
    //                 </Space>
    //               </Space>
    //             ))}
    //             ``
    //             <Form.Item>
    //               <Button type="dashed" onClick={() => handleAdd(add)} block icon={<PlusOutlined />}>
    //                 Add Insurance Plans
    //               </Button>
    //             </Form.Item>
    //           </>
    //         )}
    //       </Form.List>
    //     </>
    //   ),
    // },
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
    }
  ];

  const handleNext = () => {
    form.validateFields().then(() => {
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
      const email = user ? user.email: "not@defined.com";
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
              Next<RightOutlined />
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
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

