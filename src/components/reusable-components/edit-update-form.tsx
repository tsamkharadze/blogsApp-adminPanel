import { Form, Button, Input } from "antd";

interface UserFormProps {
  initialValues?: {
    email?: string;
    phone?: string;
  };
  onSubmit: (values: { email: string; phone: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialValues, onSubmit }) => {
  return (
    <Form
      name="userForm"
      labelCol={{ flex: "110px" }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={false}
      style={{ maxWidth: 600 }}
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        label="User Email"
        name="email"
        rules={[
          { required: true, message: "Please enter the email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="Enter Email" />
      </Form.Item>

      <Form.Item
        label="User Phone"
        name="phone"
        rules={[{ required: true, message: "Please enter the phone number" }]}
      >
        <Input placeholder="Enter Phone" />
      </Form.Item>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
