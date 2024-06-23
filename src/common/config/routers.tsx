import React from "react";
import {
  ApartmentOutlined,
  FileDoneOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

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
  {
    key: "websiteManage",
    label: "官网管理",
    icon: <FileDoneOutlined />,
  },
];
