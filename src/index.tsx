import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { Home, Landing, Error, Register } from "./common";
import { LazyRouter, ProtectedRoute } from "./components";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import * as process from "process";

const CurrencyExchange = LazyRouter(() => import("./pages/CurrencyExchange"));
const OffersGPT = LazyRouter(() => import("./pages/OffersGPT"));
const ApplyAU = LazyRouter(() => import("./pages/ApplyAU"));
const ApplyOthers = LazyRouter(() => import("./pages/ApplyOthers"));
const History = LazyRouter(() => import("./pages/History"));
const UserGroup = LazyRouter(() => import("./pages/UserGroup"));
const UserSetting = LazyRouter(() => import("./pages/UserSetting"));
const ApplyManage = LazyRouter(() => import("./pages/ApplyManage"));

if (process.env.NODE_ENV === "production") {
  ChannelService.loadScript();
  ChannelService.boot({
    pluginKey: "44dd7788-cf74-40c8-85ef-0b2594daa01f",
  });
}
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={"/"}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route path={"applyAU"} element={<ApplyAU />} />
        <Route path={"applyManage"} element={<ApplyManage />} />
        <Route path={"applyOthers"} element={<ApplyOthers />} />
        <Route path={"history"} element={<History />} />
        <Route path={"offersGPT"} element={<OffersGPT />} />
        <Route path={"currency"} element={<CurrencyExchange />} />
        <Route path={"userGroup"} element={<UserGroup />} />
        <Route path={"userSetting"} element={<UserSetting />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);

export default App;
