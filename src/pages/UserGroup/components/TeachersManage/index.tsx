import { Collapse, Form, Modal, message, Input, Select } from "antd";
import React, { useRef, useState } from "react";
import { GroupMap, RoleMap } from "../../const";
import { edit_group_role } from "../../api";

const TeachersManage = (props: any) => {
  const { tutors, setRefresh } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  const handleOk = async () => {
    try {
      await form.validateFields();
      const { email, group, role } = form.getFieldsValue();
      const { updated } = await edit_group_role({
        email,
        group: Number(group),
        role: Number(role),
      });
      if (updated > 0) {
        message.success("导师分配成功");
        setRefresh((r) => r + 1);
        closeModal();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="my-2 px-2 w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
          <div className={"mb-4 flex justify-between items-center"}>
            <h2 className="text-gray-700 font-semibold">导师组管理</h2>
            <button className={"btn btn-outline btn-info"} onClick={showModal}>
              导师分组
            </button>
          </div>
          <Collapse
            className={"border-2 rounded-lg"}
            defaultActiveKey={Object.keys(GroupMap)}
            items={Object.keys(GroupMap).map((g, idx) => ({
              key: idx,
              children: (
                <div>
                  {tutors
                    .filter((t) => String(t.group) === g)
                    .map((t, idx) => (
                      <div key={`${g}-${idx}`}>{t?.name}</div>
                    ))}
                </div>
              ),
              label: GroupMap[g],
            }))}
          />
        </div>
      </div>
      <Modal
        title="导师分组"
        open={visible}
        onOk={handleOk}
        onCancel={closeModal}
        cancelButtonProps={{ className: "btn btn-outline" }}
        okButtonProps={{ className: "btn btn-outline btn-success" }}
      >
        <Form form={form}>
          <Form.Item
            label={"导师名称"}
            className={"w-full"}
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Select
              options={tutors.map((t) => ({
                label: t?.name,
                value: t?.email,
              }))}
              placeholder="请选择成员"
            />
          </Form.Item>
          <Form.Item
            name="group"
            label={"导师组"}
            className={"w-full"}
            rules={[{ required: true }]}
          >
            <Select
              options={Object.entries(GroupMap).map(([k, v]) => ({
                value: k,
                label: v,
              }))}
              placeholder="请选择成员"
            />
          </Form.Item>
          <Form.Item
            name="role"
            label={"导师权限"}
            className={"w-full"}
            rules={[{ required: true }]}
          >
            <Select
              options={Object.entries(RoleMap).map(([k, v]) => ({
                value: k,
                label: v,
              }))}
              placeholder="请选择导师身份"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default TeachersManage;
