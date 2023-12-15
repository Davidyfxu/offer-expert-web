import React, { useState } from "react";
import { Card } from "@douyinfe/semi-ui";
import { bigModel } from "./model";
import { ModelReq } from "./types";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import assistAvatar from "../../assets/assistAvatar.png";
// @ts-ignore
import userAvatar from "../../assets/userAvatar.png";
const getChatMessages = (messages: ModelReq) => {
  const users = messages.filter((m) => m.role === "user" && m.content);
  const assists = messages.filter((m) => m.role === "assistant" && m.content);
  const len = Math.max(users.length, assists.length);
  let res = [];
  for (let i = 0; i < len; i++) {
    users[i] && res.push(users[i]);
    assists[i] && res.push(assists[i]);
  }
  return res;
};
const OffersGPT = () => {
  const [answer, setAnswer] = useState("");
  const [list, setList] = useState<ModelReq>([]);
  const [value, setValue] = useState("");
  const onSearch = async (s: string) => {
    if (s) {
      bigModel.start(
        [...getChatMessages(list), { role: "user", content: s }],
        (r: string) => setAnswer(r),
      );
      setList([
        ...list,
        { role: "user", content: s },
        { role: "assistant", content: answer },
      ]);
    }
  };

  return (
    <div className={"flex flex-col gap-4 items-center"}>
      <div className={"w-full flex items-center"}>
        <input
          type="text"
          onChange={(v) => setValue(v.target.value)}
          placeholder="请输入想问GPT的内容"
          className="input input-bordered input-primary w-4/5 m-1"
        />
        <button className="btn btn-info w-1/6" onClick={() => onSearch(value)}>
          搜索
        </button>
      </div>
      <span className={"w-full"}>
        {getChatMessages(list).map((m, idx) => {
          const isUser = m.role === "user";
          return (
            <div
              key={idx}
              className={`chat ${isUser ? "chat-start" : "chat-end"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={isUser ? userAvatar : assistAvatar} />
                </div>
              </div>
              <div className="chat-bubble overflow-auto">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          );
        })}
      </span>
      <Card className={"w-full overflow-auto"}>
        <ReactMarkdown>{answer}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default OffersGPT;
