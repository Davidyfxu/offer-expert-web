import React, { useEffect, useRef, useState } from "react";
import { get_teachers } from "../../pages/UserGroup/api";
import { Button, Form, Input, Modal, Select } from "antd";
import { StatusCodes } from "http-status-codes";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
interface IAssignTutor {
  email: string;
  name: string;
  note: string;
}

interface IAssignModal {
  title: string;
  visible: boolean;
  handleSubmit: (params: {
    assignTutors: Array<IAssignTutor>;
  }) => Promise<{ code: StatusCodes }>;
  cancel: () => void;
}

const AssignModal = (props: IAssignModal) => {
  const { visible, handleSubmit, cancel, title } = props;
  const [tutors, setTutors] = useState([]);
  const [form] = Form.useForm();
  const getAllTeachers = async () => {
    try {
      const { teachers = [] } = await get_teachers({});
      setTutors(teachers);
    } catch (e) {
      console.error("getAllTeachers", e);
    }
  };

  useEffect(() => {
    void getAllTeachers();
  }, []);

  const onOk = async () => {
    await form.validateFields();
    const params = form.getFieldsValue();
    await handleSubmit(params);
    setTimeout(() => cancel(), 500);
  };

  return (
    <Modal
      title={title}
      open={visible}
      onOk={onOk}
      onCancel={cancel}
      width={600}
    >
      <Form form={form} labelPosition="left">
        <Form.List name="assignTutors" initValue={[]}>
          {(fields, { add, remove }) => (
            <React.Fragment>
              <Button onClick={add} icon={<PlusCircleOutlined />}>
                添加
              </Button>

              {fields.map((field, i) => (
                <div
                  key={i}
                  className={"w-full flex justify-between items-center"}
                >
                  <Form.Item
                    className={"w-full"}
                    name={[field.name, "email"]}
                    label="导师名称"
                    rules={[
                      { required: true, type: "email", message: "必选项" },
                    ]}
                  >
                    <Select
                      placeholder="请选择成员"
                      options={tutors.map((t) => ({
                        label: t?.name,
                        value: t?.email,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item
                    className={"w-full"}
                    name={[field.name, "note"]}
                    label="备注"
                  >
                    <Input placeholder="请输入备注" />
                  </Form.Item>
                  <Button
                    icon={<MinusCircleOutlined />}
                    onClick={() => remove(i)}
                  />
                </div>
              ))}
            </React.Fragment>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AssignModal;
