import { create } from "zustand";
import { message } from "antd";
import { init, login, register } from "../../common/api";
import { isEmpty } from "lodash-es";
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
      set(() => ({ loading: true }));
      const { user, token } = await register({
        ...props,
        password: btoa(props.password),
      });
      set(() => ({
        ...user,
        loading: false,
      }));

      localStorage.setItem("token", `Bearer ${token}`);
      message.success("注册成功，跳转中");
    } catch (e) {
      message.error("注册失败");
      console.error("registerUser", e);
    }
  },
  loginUser: async (props): Promise<any> => {
    try {
      set((state) => ({ loading: true }));
      const { user, token } = await login({
        ...props,
        password: btoa(props.password),
      });
      set(() => ({
        ...user,
        loading: false,
      }));

      localStorage.setItem("token", `Bearer ${token}`);
      message.success("登录成功，跳转中");
    } catch (e) {
      console.error("loginUser", e);
      message.error("登录失败 ");
    }
  },
  init: async (): Promise<any> => {
    try {
      set(() => ({ loading: true }));
      const res = await init({});

      set(() => ({
        ...res?.user,
        loading: false,
      }));
      return { redirect: isEmpty(res) };
    } catch (e) {
      console.error("loginUser", e);
      set(() => ({
        loading: false,
      }));
      return { redirect: true };
    }
  },
}));
