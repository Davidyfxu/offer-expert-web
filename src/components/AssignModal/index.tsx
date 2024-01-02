import React, { useEffect, useRef, useState } from "react";
import { get_teachers } from "../../pages/UserGroup/api";
import { ArrayField, Button, Form, Modal, Toast } from "@douyinfe/semi-ui";
import { IconMinusCircle, IconPlusCircle } from "@douyinfe/semi-icons";
import { StatusCodes } from "http-status-codes";
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
  const ref = useRef();
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
    try {
      await ref.current?.validate();
      const params = ref.current?.getValues();
      const { code } = await handleSubmit(params);
      if (code === StatusCodes.OK) {
        Toast.success("导师分配成功");
        setTimeout(() => cancel(), 500);
      } else {
        Toast.success("导师分配失败");
      }
    } catch (e) {
      console.error("onOk", e);
    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={cancel}
      width={600}
    >
      <Form labelPosition="left" getFormApi={(api) => (ref.current = api)}>
        <ArrayField field="assignTutors" initValue={[]}>
          {({ add, arrayFields }) => (
            <React.Fragment>
              <Button onClick={add} icon={<IconPlusCircle />} theme="light">
                添加
              </Button>

              {arrayFields.map(({ field, key, remove }, i) => (
                <div
                  key={key}
                  className={"w-full flex justify-between items-center"}
                >
                  <Form.Select
                    label={"导师名称"}
                    field={`${field}[email]`}
                    placeholder="请选择成员"
                    optionList={tutors.map((t) => ({
                      label: t?.name,
                      value: t?.email,
                    }))}
                    rules={[
                      { required: true, type: "email", message: "必选项" },
                    ]}
                  />
                  <Form.Input field={`${field}[note]`} label={"备注"} />
                  <Button
                    type="danger"
                    theme="borderless"
                    icon={<IconMinusCircle />}
                    onClick={remove}
                  />
                </div>
              ))}
            </React.Fragment>
          )}
        </ArrayField>
      </Form>
    </Modal>
  );
};

export default AssignModal;
