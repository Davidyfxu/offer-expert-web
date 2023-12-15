import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { Home, Landing, Error } from "./common";
import { LazyRouter } from "./components";
const CurrencyExchange = LazyRouter(() => import("./pages/CurrencyExchange"));
const OffersGPT = LazyRouter(() => import("./pages/OffersGPT"));
const ApplyAU = LazyRouter(() => import("./pages/ApplyAU"));
const ApplyOthers = LazyRouter(() => import("./pages/ApplyOthers"));
const History = LazyRouter(() => import("./pages/History"));
import * as ChannelService from "@channel.io/channel-web-sdk-loader";

ChannelService.loadScript();
ChannelService.boot({
  pluginKey: "44dd7788-cf74-40c8-85ef-0b2594daa01f", // fill your plugin key
});
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<Home />}>
        <Route path={"applyAU"} element={<ApplyAU />} />
        <Route path={"history"} element={<History />} />
        <Route path={"applyOthers"} element={<ApplyOthers />} />
        <Route path={"offersGPT"} element={<OffersGPT />} />
        <Route path={"currency"} element={<CurrencyExchange />} />
        <Route path="*" element={<Error />} />
      </Route>
      <Route path="/landing" element={<Landing />} />
    </Routes>
  </BrowserRouter>
);

export default App;
