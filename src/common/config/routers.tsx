import React from "react";
import {
  IconCreditCard,
  IconHistogram,
  IconHistory,
  IconHome,
} from "@douyinfe/semi-icons";
import { NavItems } from "@douyinfe/semi-ui/lib/es/navigation";

export const routers: NavItems = [
  {
    itemKey: "applyAU",
    text: "澳洲申请",
    disabled: true,
    icon: <IconHome size="large" />,
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
  // {
  //   itemKey: "Setting",
  //   text: "设置",
  //   icon: <IconSetting size="large" />,
  // },
];
