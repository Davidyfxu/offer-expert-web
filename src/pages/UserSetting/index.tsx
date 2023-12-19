import React from "react";
import UserSettingPage from "./page";
import { useUserStore } from "../../stores/userStore";

const UserSetting = () => {
  const email = useUserStore((state) => state.email);
  const name = useUserStore((state) => state.name);
  const avatar = useUserStore((state) => state.avatar);

  return <UserSettingPage email={email} name={name} avatar={avatar} />;
};

export default UserSetting;
