import { Toast } from "@douyinfe/semi-ui";

const BASE_URL = "https://psqrszkvx9.us.aircode.run";
export const post = async (url: string, body: any) => {
  try {
    let response = await fetch(BASE_URL + url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (e: any) {
    console.error("Error:", e);
    Toast.error(e.toString());
  }
};
