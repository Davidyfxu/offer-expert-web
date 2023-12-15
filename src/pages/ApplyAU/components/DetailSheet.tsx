import React from "react";
import {
  Card,
  Descriptions,
  List,
  SideSheet,
  Space,
  Tag,
  Typography,
} from "@douyinfe/semi-ui";
import { DegreeMap, IAUCase, MarryMap } from "../types";
import { format } from "date-fns";
const { Text, Title } = Typography;
interface IDetailSheet {
  visible: boolean;
  onCancel: () => void;
  detail: IAUCase;
}
const DetailSheet = ({ visible, onCancel, detail }: IDetailSheet) => {
  console.log(detail);
  const STUDENT_INFO = [
    {
      key: "姓名",
      value: (
        <Space>
          <Text>{detail?.lastName}</Text>
          <Text>{detail?.firstName}</Text>
        </Space>
      ),
    },
    {
      key: "性别",
      value: detail?.sex === 1 ? <Tag>男</Tag> : <Tag color={"pink"}>女</Tag>,
    },
    { key: "生日", value: format((detail?.birth || 0) * 1000, "yyyy-MM-dd") },
    { key: "婚姻", value: MarryMap[detail?.marry] },
    { key: "邮箱", value: detail?.email },
    { key: "护照", value: detail?.passport },
    { key: "手机", value: detail?.phone },
    { key: "地址", value: detail?.location },
  ];
  const EDUCATION_INFO = [
    {
      key: "本科院校",
      value: detail?.bachelorSchool,
    },
    { key: "专业名称", value: detail?.major },
    { key: "GPA", value: detail?.GPA },
    { key: "学历", value: DegreeMap[detail?.degree] },
    {
      key: "就读日期",
      value: (detail?.period ?? [])
        .map((p) => format(Number(p) * 1000, "yyyy-MM-dd"))
        .join(" - "),
    },
    { key: "有无拒签历史", value: String(Boolean(detail?.visaReject)) },
  ];

  const TUTOR_INFO = [
    {
      key: "导师昵称",
      value: detail?.teacherName,
    },
    { key: "导师微信", value: detail?.teacherWechat },
    { key: "导师邮箱", value: detail?.teacherEmail },
  ];
  return (
    <SideSheet
      title="详情"
      width={640}
      bodyStyle={{ display: "flex", flexDirection: "column", gap: 8 }}
      visible={visible}
      onCancel={onCancel}
    >
      <div>
        <Title heading={3} style={{ marginBottom: 8 }}>
          学生信息
        </Title>
        <Descriptions data={STUDENT_INFO} />
      </div>
      <div>
        <Title heading={3} style={{ marginBottom: 8 }}>
          教育经历
        </Title>
        <Descriptions data={EDUCATION_INFO} />
      </div>
      <div>
        <Title heading={3} style={{ marginBottom: 8 }}>
          项目选择
        </Title>
        <List
          dataSource={detail?.colleges || []}
          renderItem={(item) => (
            <List.Item
              header={<Text strong>{item?.college}</Text>}
              main={
                <Descriptions
                  data={[
                    {
                      key: "专业名称",
                      value: item?.master,
                    },
                    { key: "学制", value: `${item?.learningPeriod}年` },
                    {
                      key: "入学时间",
                      value: format((item?.entryMonth || 0) * 1000, "yyyy-MMM"),
                    },
                    {
                      key: "专业链接",
                      value: (
                        <Text
                          copyable
                          ellipsis={{
                            showTooltip: {
                              opts: {
                                content: item?.programLink,
                              },
                            },
                          }}
                          style={{ maxWidth: 300 }}
                          link
                        >
                          {item?.programLink}
                        </Text>
                      ),
                    },
                    { key: "学制", value: `${item?.learningPeriod}年` },
                  ]}
                />
              }
            />
          )}
        />
      </div>
      <div>
        <Title heading={3} style={{ marginBottom: 8 }}>
          导师信息
        </Title>
        <Descriptions data={TUTOR_INFO} />
      </div>
    </SideSheet>
  );
};

export default DetailSheet;
