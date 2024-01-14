import { Dayjs } from "dayjs";
import { Tag } from "antd";

export interface IAUCase {
  _id?: string;
  lastName: string;
  firstName: string;
  sex: SexEnum;
  birth: Dayjs;
  marry: MarryEnum;
  passport: string;
  email: string;
  phone: string;
  location: string;
  bachelorSchool: string;
  major: string;
  GPA: string;
  degree: DegreeEnum;
  period: Dayjs[];
  visaReject: VisaRejectEnum;
  colleges: College[];
  teacherName: string;
  teacherWechat: string;
  teacherEmail: string;
}

export interface College {
  college: string;
  master: string;
  learningPeriod: number;
  entryMonth: Dayjs;
  programLink: string;
  notes: string;
}
export enum SexEnum {
  Female,
  Male,
}
export enum MarryEnum {
  Single,
  Married,
  Other,
  Divorce,
}
export enum VisaRejectEnum {
  No,
  Yes,
}
export enum DegreeEnum {
  Bachelor,
  Master,
  PHD,
}
export const DegreeMap = {
  [DegreeEnum.Bachelor]: <Tag color={"light-green"}>Bachelor</Tag>,
  [DegreeEnum.Master]: <Tag color={"light-blue"}>Master</Tag>,
  [DegreeEnum.PHD]: <Tag>PHD</Tag>,
};

export const MarryMap = {
  [MarryEnum.Single]: <Tag color={"light-green"}>单身</Tag>,
  [MarryEnum.Married]: <Tag color={"light-blue"}>已婚</Tag>,
  [MarryEnum.Other]: <Tag color={"orange"}>其他</Tag>,
  [MarryEnum.Divorce]: <Tag>离婚</Tag>,
};
