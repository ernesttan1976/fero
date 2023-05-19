"use client"
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined, LeftOutlined } from '@ant-design/icons';
import { Steps, Button, Form, Input, DatePicker, InputNumber } from 'antd';
import {useState} from "react";

const { Step } = Steps;
const { TextArea } = Input;
const requiredFlag = false;

const CalculatorPage: React.FC= () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();
  
    const steps = [
      {
        title: 'Step 1: Income and Age',
        content: (
          <>
            <Form.Item
              label="Date of Birth (DD-MM-YYYY)"
              name="dob"
              rules={[{ required: requiredFlag, message: 'Date of Birth is required' }]}
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              label="Retirement Age"
              name="retirementAge"
              rules={[{ required: requiredFlag, message: 'Retirement age is required' }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Gross Monthly Income $"
              name="grossMonthlyIncome"
              rules={[{ 
                required: requiredFlag, 
                message: 'Gross Monthly Income is required',
                pattern: /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/ 
            }]}>
              <InputNumber />
            </Form.Item>
          </>
        ),
      },
      {
        title: 'Step 2: Savings',
        content: (
          <>
            <Form.Item
              label="Field 3"
              name="field3"
              rules={[{ required: requiredFlag, message: 'Field 3 is required' }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </>
        ),
      },
      {
        title: 'Step 3: Expenses',
        content: (
          <>
            <Form.Item
              label="Field 3"
              name="field3"
              rules={[{ required: requiredFlag, message: 'Field 3 is required' }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </>
        ),
      },
      {
        title: 'Step 4: Your Financial Health',
        content: (
          <>
            <Form.Item
              label="Field 3"
              name="field3"
              rules={[{ required: requiredFlag, message: 'Field 3 is required' }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </>
        ),
      },
      // Add more steps as needed
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
        // Handle form submission with all the form data
        console.log(values);
      });
    };
  
    return (
      <div>
        <Steps current={currentStep}>
          {steps.map((step) => (
            <Step key={step.title} title={step.title} />
          ))}
        </Steps>
        <Form
          form={form}
          onFinish={handleSubmit}
          style={{ marginTop: '2rem' }}
        >
          <div>{steps[currentStep].content}</div>
          <div style={{ marginTop: '2rem' }}>
            {currentStep > 0 && (
              <Button style={{ marginRight: '1rem' }} onClick={handlePrev}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </div>
        </Form>
      </div>
    );
  };
  
export default CalculatorPage;