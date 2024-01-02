import { Toast } from "@douyinfe/semi-ui";

export const BASE_URL = "https://cpvg7c.laf.dev";
export const post = async (url: string, body: any) => {
  try {
    let response = await fetch(BASE_URL + url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    return await response.json();
  } catch (e: any) {
    console.error("Error:", e);
    Toast.error(e.toString());
  }
};
