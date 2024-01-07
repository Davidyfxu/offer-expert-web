import React, { useEffect, useRef, useState } from "react";
import {
  ArrayField,
  Button,
  Col,
  Form,
  Modal,
  Row,
  SideSheet,
  Table,
  Tag,
} from "@douyinfe/semi-ui";
import { useFinanceStore } from "../../store";
import { IconMinusCircle, IconPlusCircle } from "@douyinfe/semi-icons";

const FinanceTable = () => {
  const { loading, transactions, total, pagination, onChangePagination } =
    useFinanceStore();
  const ref = useRef({});
  const [paidV, setPaidV] = useState(false);
  const [detailV, setDetailV] = useState(false);
  const columns = [
    {
      title: "学生姓名",
      dataIndex: "name",
      render: (text: string) => text,
    },
    {
      title: "负责导师",
      dataIndex: "assignTutor",
      render: (text: any, record: any) => {
        const { avatar = "", name } = record?.assignTutor || {};
        return (
          <Tag avatarSrc={avatar} avatarShape="circle" size="large">
            {name}
          </Tag>
        );
      },
    },
    {
      title: "更新日期",
      dataIndex: "updateTime",
    },
    {
      title: "操作",
      dataIndex: "operate",
      render: () => (
        <div className="join">
          <button
            className="btn btn-outline join-item"
            onClick={() => setDetailV(true)}
          >
            资金往来
          </button>
          <button
            className="btn btn-outline btn-primary join-item"
            onClick={() => setPaidV(true)}
          >
            支付费用
          </button>
          <button
            className="btn btn-outline btn-error join-item"
            onClick={() => console.log("一键提醒")}
          >
            一键提醒
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={transactions}
        pagination={{
          ...pagination,
          total,
          onChange: onChangePagination,
        }}
      />
      <Modal
        title="付费"
        visible={paidV}
        width={800}
        onOk={() => {
          console.log(ref.current.getValues());
          setPaidV(false);
        }}
        onCancel={() => setPaidV(false)}
      >
        <Form getFormApi={(api) => (ref.current = api)}>
          <ArrayField field="salaries" initValue={[]}>
            {({ add, arrayFields }) => (
              <React.Fragment>
                <Button onClick={add} icon={<IconPlusCircle />} theme="light">
                  添加
                </Button>

                {arrayFields.map(({ field, key, remove }, i) => (
                  <div
                    key={key}
                    className={"w-full flex justify-between items-center gap-2"}
                  >
                    <Form.TagInput
                      className={"w-full"}
                      initValue={["文书", "项管", "网申", "选校"]}
                      field={`${field}[jobs]`}
                      label="工作项"
                      placeholder="请输入工作内容"
                    />
                    <Form.InputNumber
                      field={`${field}[salary]`}
                      initValue={100}
                      min={0}
                      precision={0}
                      suffix={"￥"}
                      label="工资金额"
                      rules={[{ required: true }]}
                      style={{ width: "100%" }}
                    />
                    <Form.DatePicker
                      field={`${field}[date]`}
                      label="付费日期"
                      showClear={false}
                      initValue={new Date()}
                      placeholder="请选择生效日期"
                    />

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
      <SideSheet
        title="资金往来"
        visible={detailV}
        onCancel={() => setDetailV(false)}
      >
        <Form getFormApi={(api) => (ref.current = api)}>
          <Row>
            <Col span={16}>
              <Form.TagInput
                initValue={["文书", "项管", "网申", "选校"]}
                field="jobs"
                label="工作项"
                placeholder="请输入工作内容"
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={7} offset={1}>
              <Form.InputNumber
                field="owner"
                initValue={100}
                min={0}
                precision={0}
                suffix={"￥"}
                label="工资金额"
                rules={[{ required: true }]}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </Form>
      </SideSheet>
    </>
  );
};

export default FinanceTable;
