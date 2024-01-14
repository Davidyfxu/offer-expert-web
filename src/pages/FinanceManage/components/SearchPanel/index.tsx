import React, { useCallback, useEffect } from "react";
import { useFinanceStore } from "../../store";
import { debounce } from "lodash-es";
import { SyncOutlined } from "@ant-design/icons";

const SearchPanel = () => {
  const getTransactions = useFinanceStore((state) => state.getTransactions);
  const refresh = useFinanceStore((state) => state.refresh);
  const onChangeSearch = useFinanceStore((state) => state.onChangeSearch);
  const search = useFinanceStore((state) => state.search);
  const pagination = useFinanceStore((state) => state.pagination);
  const syncFinance = useFinanceStore((state) => state.syncFinance);

  const onSearch = useCallback(
    debounce((v) => onChangeSearch({ name: v?.target?.value }), 500),
    [],
  );

  useEffect(() => {
    void getTransactions();
  }, [search, pagination, refresh]);

  return (
    <div className={"flex justify-between items-center gap-2 mb-2"}>
      <div className="join">
        <select className="select select-bordered join-item">
          <option>学生姓名</option>
          <option>导师姓名</option>
        </select>
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search"
              onChange={onSearch}
            />
          </div>
        </div>
        <div className="ml-1">
          <button className="btn btn-info join-item">搜索</button>
        </div>
      </div>
      <button className={"btn btn-success"} onClick={syncFinance}>
        <SyncOutlined /> 一键同步
      </button>
    </div>
  );
};

export default SearchPanel;
