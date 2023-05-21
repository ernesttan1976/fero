"use client"
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Steps, Button, Form, Input, DatePicker, InputNumber, Space, Select } from 'antd';
import { useState } from "react";
import dayjs from "dayjs";

const { Step } = Steps;
const { TextArea } = Input;
const requiredFlag = false;
const { Option } = Select;

import styles from "./index.module.css";

const CalculatorPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<Record<string, any>>({
    dob: dayjs("1990-01-01"),
    retirementAge: 55,
    grossMonthlyIncome: 3500,
    grossYearlyIncome: 42000,
    cpfOA: 20000,
  });


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
    alert(JSON.stringify(changedValues));
    if (changedValues["grossMonthlyIncome"]) {
      const yearly = changedValues["grossMonthlyIncome"] * 12;
      form.setFieldsValue({ grossYearlyIncome: yearly }); // Update the value of grossYearIncome field
    }
    setFormData({...formData, ...allValues,...changedValues}); // Update the form data state with all the form values
    
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
          <Form.Item
            label="Gross Yearly Income $"
            name="grossYearlyIncome"
          >
            <InputNumber disabled={true} />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Step 2: Savings',
      content: (
        <>
          <Form.Item name="insuranceType" label="Insurance Type" rules={[{ required: true, message: 'Missing insurance type' }]}>
            <Select options={insuranceTypes} />
          </Form.Item>
          <Form.List name="insurancePlans">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space align="baseline" direction='vertical'>
                    <Space key={field.key} align="baseline" className={styles.row}>
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.insuranceTypes !== curValues.insurnaceTypes || prevValues.insurancePlans !== curValues.insurancePlans
                        }
                      >
                        {() => (
                          <Form.Item
                            {...field}
                            label="Insurance Plan"
                            name={[field.name, 'insurancePlan']}
                            rules={[{ required: true, message: 'Missing plan' }]}
                          >
                            <Select disabled={!form.getFieldValue('insurancePlans')} style={{ width: 130 }}>
                              {(insurancePlans[form.getFieldValue('insuranceType') as insurancePlansKeys] || []).map((item) => (
                                <Option key={item} value={item}>
                                  {item}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        )}
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="Monthly Contribution"
                        name={[field.name, 'monthlyContribution']}
                        rules={[{
                          required: requiredFlag,
                          message: 'Missing monthly contribution',
                          pattern: /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
                        }]}
                      >
                        <InputNumber />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  </Space>
                ))}
``
                <Form.Item>
                  <Button type="dashed" onClick={() => handleAdd(add)} block icon={<PlusOutlined />}>
                    Add Insurance Plans
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </>
      ),
    },
    {
      title: 'Step 3: Expenses',
      content: (
        <>
          <Form.Item
            label="expensesfield"
            name="expensesfield"
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




  return (
    <div>
      <Steps current={currentStep}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <Form
        form={form}
        name="calculator_form"
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

