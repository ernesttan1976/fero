"use client"
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined, LeftOutlined } from '@ant-design/icons';
import { Steps, Button, Form, Input, DatePicker, InputNumber } from 'antd';
import {useState} from "react";
import dayjs from "dayjs";

const { Step } = Steps;
const { TextArea } = Input;
const requiredFlag = false;

const CalculatorPage: React.FC= () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState<Record<string, any>>({
      dob: dayjs("1990-01-01"),
      retirementAge: 55,
      grossMonthlyIncome: 3500,
      grossYearlyIncome: 42000,
      cpfOA: 20000,
    }); 
  
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
              <InputNumber/>
            </Form.Item>
            <Form.Item
              label="Gross Yearly Income $"
              name="grossYearlyIncome"
              >
              <InputNumber disabled={true}/>
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
        setFormData(values); // Update the form data state with the final form values
        console.log(formData); // Access the form data in the handleSubmit function
      });
    };

    const handleChange = (changedValues: any, allValues: any) => {
      setFormData(allValues); // Update the form data state with all the form values
      //alert(JSON.stringify(changedValues));
      if (Object.keys(changedValues)[0] === "grossMonthlyIncome") {
        const yearly = Object.values(changedValues)[0] * 12;
        form.setFieldsValue({ grossYearlyIncome: yearly }); // Update the value of grossYearIncome field
      }
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
          onValuesChange={handleChange}
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

