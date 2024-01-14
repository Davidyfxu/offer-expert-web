import React from "react";
import {
  ApartmentOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

export const routers = [
  {
    itemKey: "applyAU",
    text: "澳洲申请",
    icon: <HomeOutlined />,
  },
  {
    itemKey: "applyManage",
    text: "申请管理",
    icon: <ApartmentOutlined />,
  },
  {
    itemKey: "userGroup",
    text: "导师管理",
    icon: <UsergroupAddOutlined />,
  },
  {
    itemKey: "userSetting",
    text: "用户设置",
    icon: <UserSwitchOutlined />,
  },
  {
    itemKey: "finance",
    text: "财务管理",
    icon: <MoneyCollectOutlined />,
  },
];
export const routers2 = [
  {
    key: "applyAU",
    label: "澳洲申请",
    icon: <HomeOutlined />,
  },
  {
    key: "applyManage",
    label: "申请管理",
    icon: <ApartmentOutlined />,
  },
  {
    key: "userGroup",
    label: "导师管理",
    icon: <UsergroupAddOutlined />,
  },
  {
    key: "userSetting",
    label: "用户设置",
    icon: <UserSwitchOutlined />,
  },
  {
    key: "finance",
    label: "财务管理",
    icon: <MoneyCollectOutlined />,
  },
];
