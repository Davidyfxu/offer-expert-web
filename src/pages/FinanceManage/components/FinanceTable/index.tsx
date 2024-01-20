import React, { useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  Drawer,
  Spin,
  Table,
  Tag,
  Input,
  message,
  InputNumber,
  DatePicker,
} from "antd";
import { useFinanceStore } from "../../store";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { ITransaction } from "../../types";

const FinanceTable = () => {
  const {
    loading,
    transactions,
    total,
    pagination,
    onChangePagination,
    updateTransaction,
    refreshTrans,
    confirmLoading,
  } = useFinanceStore();
  const [form] = Form.useForm();

  const ref = useRef({});
  const [paidV, setPaidV] = useState(false);
  const [selectCase, setSelectCase] = useState<ITransaction>(
    {} as ITransaction,
  );
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
      render: (text: any, record: any) => (
        <div className="join">
          <button
            className="btn btn-outline join-item"
            onClick={() => {
              setDetailV(true);
              setSelectCase(record);
            }}
          >
            资金往来
          </button>
          <button
            className="btn btn-outline btn-primary join-item"
            onClick={() => {
              setSelectCase(record);
              setPaidV(true);
            }}
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
  const submitPay = async () => {
    try {
      const params = {
        fin_id: selectCase?.fin_id,
        salaries: form.getFieldValue("salaries").map((s) => ({
          ...s,
          timestamp: new Date(s.timestamp).getTime(),
        })),
      };
      await updateTransaction(params);
      message.success("更新成功");
      setTimeout(() => {
        setPaidV(false);
        refreshTrans();
      }, 500);
    } catch (e) {
      console.error("submitPay", e);
    }
  };
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
        open={paidV}
        width={800}
        onOk={() => {
          void submitPay();
        }}
        onCancel={() => setPaidV(false)}
      >
        <Spin spinning={confirmLoading}>
          <Form name={"form"} form={form} initValues={selectCase}>
            <Form.List name="salaries">
              {(fields, { add, remove }) => (
                <>
                  <Button onClick={() => add()} icon={<PlusCircleOutlined />}>
                    添加
                  </Button>
                  {fields.map((field, idx) => (
                    <div
                      key={idx}
                      className={
                        "w-full flex justify-between items-center gap-2"
                      }
                    >
                      <Form.Item
                        className={"w-full"}
                        name={[field.name, "notes"]}
                        label="工作项"
                      >
                        <Input placeholder="请输入工作内容"></Input>
                      </Form.Item>
                      <Form.Item
                        label="工资金额"
                        rules={[{ required: true }]}
                        className={"w-full"}
                        name={[field.name, "fee"]}
                      >
                        <InputNumber
                          min={0}
                          precision={0}
                          suffix={"￥"}
                          placeholder="请输入工作内容"
                        />
                      </Form.Item>
                      <Form.Item
                        label="付费日期"
                        rules={[{ required: true }]}
                        className={"w-full"}
                        name={[field.name, "timestamp"]}
                      >
                        <DatePicker placeholder="请选择生效日期" />
                      </Form.Item>

                      <Button
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(idx)}
                      />
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Form>
        </Spin>
      </Modal>
      <Drawer title="资金往来" open={detailV} onClose={() => setDetailV(false)}>
        {/*<Form getFormApi={(api) => (ref.current = api)}>*/}
        {/*  <Row>*/}
        {/*    <Col span={16}>*/}
        {/*      <Form.TagInput*/}
        {/*        initValue={["文书", "项管", "网申", "选校"]}*/}
        {/*        name="jobs"*/}
        {/*        label="工作项"*/}
        {/*        placeholder="请输入工作内容"*/}
        {/*        style={{ width: "100%" }}*/}
        {/*      />*/}
        {/*    </Col>*/}
        {/*    <Col span={7} offset={1}>*/}
        {/*      <Form.InputNumber*/}
        {/*        name="owner"*/}
        {/*        initValue={100}*/}
        {/*        min={0}*/}
        {/*        precision={0}*/}
        {/*        suffix={"￥"}*/}
        {/*        label="工资金额"*/}
        {/*        rules={[{ required: true }]}*/}
        {/*        style={{ width: "100%" }}*/}
        {/*      />*/}
        {/*    </Col>*/}
        {/*  </Row>*/}
        {/*</Form>*/}
      </Drawer>
    </>
  );
};

export default FinanceTable;
