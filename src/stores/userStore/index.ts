import { create } from "zustand";
import { Toast } from "@douyinfe/semi-ui";
import { StatusCodes } from "http-status-codes";
import { init, login, register } from "../../common/api";
interface IUserStoreState {
  name: string;
  email: string;
  avatar: string;
  // setUser: (props: { name: string; email: string }) => void;
  loading: boolean;
  registerUser: (props: {
    name: string;
    email: string;
    password: string;
  }) => Promise<any>;
  loginUser: (props: { email: string; password: string }) => Promise<any>;
  init: () => Promise<any>;
}
export const useUserStore = create<IUserStoreState>()((set) => ({
  name: "",
  email: "",
  avatar: "",
  loading: false,
  // setUser: (props) => set({ ...props }),
  registerUser: async (props): Promise<any> => {
    try {
      set((state) => ({ loading: true }));
      const { StatusCode, user, token, error } = await register({
        ...props,
        password: btoa(props.password),
      });
      set((state) => ({
        ...user,
        loading: false,
      }));
      if (StatusCode === StatusCodes.CREATED) {
        localStorage.setItem("token", `Bearer ${token}`);
        Toast.success("注册成功，跳转中");
      } else {
        Toast.error("注册失败" + error);
      }
    } catch (e) {
      console.error("registerUser", e);
    }
  },
  loginUser: async (props): Promise<any> => {
    try {
      set((state) => ({ loading: true }));
      const { StatusCode, user, token, error } = await login({
        ...props,
        password: btoa(props.password),
      });
      set((state) => ({
        ...user,
        loading: false,
      }));
      if (StatusCode === StatusCodes.OK) {
        localStorage.setItem("token", `Bearer ${token}`);
        Toast.success("登录成功，跳转中");
      } else {
        Toast.error("登录失败 " + error);
      }
    } catch (e) {
      console.error("loginUser", e);
    }
  },
  init: async (): Promise<any> => {
    try {
      set((state) => ({ loading: true }));
      const { user, StatusCode } = await init({});
      set((state) => ({
        ...user,
        loading: false,
      }));
      if (StatusCode !== StatusCodes.OK) {
        return { redirect: true };
      }
      return { redirect: false };
    } catch (e) {
      console.error("loginUser", e);
    }
  },
}));
