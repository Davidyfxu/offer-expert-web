import { Toast } from "@douyinfe/semi-ui";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const BASE_URL = "https://cpvg7c.laf.dev";

class HttpClient {
  private api: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {
    this.api = axios.create({
      ...config,
      headers: {
        Authorization: localStorage.getItem("token"),
        ...config.headers,
      },
    });

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error) => {
        // Add more error handling logic here.
        throw error;
      },
    );
  }

  public get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.api.get(url, config);
  }

  public post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.api.post(url, data, config);
  }

  // Add more methods (PUT, DELETE)...
}

// Now we can create an instance of HttpClient
const httpClient = new HttpClient({
  baseURL: BASE_URL,
});

export const post = async (url: string, body: any): Promise<any> => {
  try {
    const { data } = await httpClient.post(url, body);
    return data;
  } catch (e: any) {
    console.error("Error:", e);
    Toast.error(e.toString());
  }
};
