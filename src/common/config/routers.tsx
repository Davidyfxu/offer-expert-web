import React from "react";
import {
  IconApartment,
  IconCreditCard,
  IconHistogram,
  IconHistory,
  IconHome,
  IconUserGroup,
  IconUserSetting,
} from "@douyinfe/semi-icons";
import { NavItems } from "@douyinfe/semi-ui/lib/es/navigation";

export const routers: NavItems = [
  {
    itemKey: "applyAU",
    text: "澳洲申请",
    icon: <IconHome size="large" />,
  },
  {
    itemKey: "applyManage",
    text: "申请管理",
    icon: <IconApartment size="large" />,
  },
  {
    itemKey: "userGroup",
    text: "导师管理",
    icon: <IconUserGroup size="large" />,
  },
  {
    itemKey: "userSetting",
    text: "用户设置",
    icon: <IconUserSetting size="large" />,
  },
  {
    itemKey: "finance",
    text: "财务管理",
    icon: <IconCreditCard size="large" />,
  },
  // {
  //   itemKey: "history",
  //   text: "操作历史",
  //   icon: <IconHistory size="large" />,
  // },
  // {
  //   itemKey: "offersGPT",
  //   text: "留学GPT",
  //   icon: <IconHistogram size="large" />,
  // },
  // {
  //   itemKey: "currency",
  //   text: "实时汇率",
  //   icon: <IconHistogram size="large" />,
  // },
];
export const routers2 = [
  {
    key: "applyAU",
    label: "澳洲申请",
    icon: <IconHome size="large" />,
  },
  {
    key: "applyManage",
    label: "申请管理",
    icon: <IconApartment size="large" />,
  },
  {
    key: "userGroup",
    label: "导师管理",
    icon: <IconUserGroup size="large" />,
  },
  {
    key: "userSetting",
    label: "用户设置",
    icon: <IconUserSetting size="large" />,
  },
  {
    key: "finance",
    label: "财务管理",
    icon: <IconCreditCard size="large" />,
  },
];
