import React, { useEffect, useState } from "react";
import { Currencies } from "currencies-map";
import { get_current } from "./api";
import { Skeleton, Space } from "antd";
import dayjs from "dayjs";

const placeholder = (
  <div>
    <Skeleton.Image style={{ width: "70vw", height: "20vh" }} />
    <Skeleton.Title style={{ width: "70vw", height: "70vh", marginTop: 10 }} />
  </div>
);
const CurrencyExchange = () => {
  const [loading, setLoading] = useState(true);
  const [rates, setRates] = useState({});
  const [dates, setDates] = useState<{
    createTime: number;
    updateTime: number;
  }>();
  const getCurrency = async (currency: string) => {
    try {
      setLoading(true);
      const {
        conversion_rates = {},
        time_last_update_unix,
        time_next_update_unix,
      } = await get_current({ currency });
      setRates(conversion_rates);
      setDates({
        createTime: time_last_update_unix,
        updateTime: time_next_update_unix,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    void getCurrency("USD");
  }, []);
  return (
    <Skeleton placeholder={placeholder} loading={loading}>
      <Space vertical>
        <div className={"text-2xl font-bold"}>每日汇率</div>
        {dates && (
          <div className={"font-medium flex gap-8 text-xl"}>
            <div>
              当前汇率生成时间：
              {dayjs(dates?.createTime * 1000).format("YYYY-MM-DD")}
            </div>
            <div>
              下次汇率更新时间：
              {dayjs(dates?.updateTime * 1000).format("YYYY-MM-DD")}
            </div>
          </div>
        )}
        <div className={"flex flex-wrap"}>
          {Object.keys(rates).map((c, idx) => (
            <div key={idx} className="stat bg-base-100 w-1/4 min-w-min">
              <div className="stat-title">{c}</div>
              <div className="stat-value">
                {new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: c,
                }).format(String(rates[c]))}
              </div>
              <div className="stat-desc">{Currencies.names.get(c)}</div>
            </div>
          ))}
        </div>
      </Space>
    </Skeleton>
  );
};

export default CurrencyExchange;
