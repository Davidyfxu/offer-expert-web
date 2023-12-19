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
    itemKey: "history",
    text: "操作历史",
    icon: <IconHistory size="large" />,
  },
  {
    itemKey: "offersGPT",
    text: "留学GPT",
    icon: <IconHistogram size="large" />,
  },
  {
    itemKey: "currency",
    text: "实时汇率",
    icon: <IconCreditCard size="large" />,
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
];
