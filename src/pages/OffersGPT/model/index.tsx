import CryptoJS from "crypto-js";
import { ModelReq } from "../types";
const APPID = "e9e6f1fb";
const API_SECRET = "ZmY4ZDZhOTYyZGE0MGIxYTQzM2E2MTlj";
const API_KEY = "6a3df7af42e13f352f02425bfc7a1b88";

let total_res = "";
function getWebsocketUrl(): Promise<string> {
  return new Promise((resolve) => {
    const apiKey = API_KEY;
    const apiSecret = API_SECRET;
    const host = location.host;
    const date = new Date().toGMTString();
    const algorithm = "hmac-sha256";
    const headers = "host date request-line";
    const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
    const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    const signature = CryptoJS.enc.Base64.stringify(signatureSha);
    const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    const authorization = btoa(authorizationOrigin);
    const url = `wss://spark-api.xf-yun.com/v1.1/chat?authorization=${authorization}&date=${date}&host=${host}`;
    resolve(url);
  });
}

class TTSRecorder {
  private readonly appId: string;
  private ttsWS: WebSocket | undefined;
  constructor({ appId = APPID } = {}) {
    this.appId = appId;
  }

  // 连接websocket
  async connectWebSocket(inputV: any, func: any) {
    let url = await getWebsocketUrl();
    let ttsWS = new WebSocket(url);
    this.ttsWS = ttsWS;
    ttsWS.onopen = (e) => {
      this.webSocketSend(inputV);
    };
    ttsWS.onmessage = (e) => {
      this.result(e.data, func);
    };
    ttsWS.onerror = (e) => {
      alert("WebSocket报错，请f12查看详情");
      console.error(`详情查看：${encodeURI(url.replace("wss:", "https:"))}`);
    };
    ttsWS.onclose = (e) => {
      console.log(e);
    };
  }

  // websocket发送数据
  webSocketSend(text: ModelReq) {
    const params = {
      header: {
        app_id: this.appId,
        uid: "fd3f47e4-d",
      },
      parameter: {
        chat: {
          domain: "general",
          temperature: 0.5,
          max_tokens: 1024,
        },
      },
      payload: {
        message: {
          text: text,
        },
      },
    };
    this.ttsWS?.send(JSON.stringify(params));
  }

  start(text: ModelReq, func: any) {
    total_res = ""; // 请空回答历
    this.connectWebSocket(text, func);
  }

  // websocket接收数据的处理
  result(resultData: any, func: any) {
    const { payload, header } = JSON.parse(resultData);
    total_res =
      total_res +
      (payload?.choices?.text || []).map((t) => t?.content).join("");

    typeof func === "function" && func(total_res);
    // console.log(resultData)
    // 提问失败
    if (header.code !== 0) {
      console.error(`${header.code}:${header.message}`);
      return;
    }
    if (header.code === 0 && header.status === 2) {
      this.ttsWS?.close();
    }
  }
}

export const bigModel = new TTSRecorder();
