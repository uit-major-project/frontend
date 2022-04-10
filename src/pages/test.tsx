import { Form, Select, InputNumber, Switch, Slider, Button } from 'antd';

// Custom DatePicker that uses Day.js instead of Moment.js
import DatePicker from '../components/DatePicker';

import { SmileFilled } from '@ant-design/icons';

import Link from 'next/link';
import styled from '@emotion/styled';

const FormItem = Form.Item;
const Option = Select.Option;

const StyledDiv = styled.div`
  color: red;
  background: #efefef;
  width: 25em;
  text-align: center;
`;

const content = {
  marginTop: '100px',
};

export default function Test() {
  return (
    <div style={content}>
      <StyledDiv>This is a emotion styled div</StyledDiv>
      <div className="text-center mb-5">
        <Link href="#">
          <a href="w" className="logo mr-0">
            <SmileFilled
            // size={48}
            // strokeWidth={1}
            />
          </a>
        </Link>

        <p>Testing with antd and emotion</p>
      </div>
      <div>
        <Form layout="horizontal">
          <FormItem
            label="Input Number"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <InputNumber
              size="large"
              min={1}
              max={10}
              style={{ width: 100 }}
              defaultValue={3}
              name="inputNumber"
            />
          </FormItem>

          <FormItem
            label="Switch"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Switch
              defaultChecked
              // name="switch"
            />
          </FormItem>

          <FormItem
            label="Slider"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Slider defaultValue={70} />
          </FormItem>

          <FormItem
            label="Select"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Select
              size="large"
              defaultValue="lucy"
              style={{ width: 192 }}
              // name="select"
            >
              <Option value="jack">jack</Option>
              <Option value="lucy">lucy</Option>
              <Option value="disabled" disabled>
                disabled
              </Option>
              <Option value="yiminghe">yiminghe</Option>
            </Select>
          </FormItem>

          <FormItem
            label="DatePicker"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <DatePicker name="startDate" />
          </FormItem>
          <FormItem
            style={{ marginTop: 48 }}
            wrapperCol={{ span: 8, offset: 8 }}
          >
            <Button size="large" type="primary" htmlType="submit">
              OK
            </Button>
            <Button size="large" style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}
