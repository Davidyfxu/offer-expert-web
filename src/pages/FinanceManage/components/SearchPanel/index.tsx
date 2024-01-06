import React, { useCallback, useEffect } from "react";
import { Button, Input, Space } from "@douyinfe/semi-ui";
import { IconCamera, IconSearch, IconSync } from "@douyinfe/semi-icons";
import { useFinanceStore } from "../../store";
import { debounce } from "lodash-es";

const SearchPanel = () => {
  const getTransactions = useFinanceStore((state) => state.getTransactions);
  const onChangeSearch = useFinanceStore((state) => state.onChangeSearch);
  const search = useFinanceStore((state) => state.search);
  const pagination = useFinanceStore((state) => state.pagination);
  const syncFinance = useFinanceStore((state) => state.syncFinance);

  const onSearch = useCallback(
    debounce((v) => onChangeSearch({ name: v }), 500),
    [],
  );

  useEffect(() => {
    void getTransactions();
  }, [search, pagination]);

  return (
    <div className={"flex justify-between items-center gap-2 mb-2"}>
      <Input prefix={<IconSearch />} showClear onChange={onSearch}></Input>
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
            />
          </div>
        </div>
        <div className="indicator ml-1">
          <button className="btn btn-info join-item">搜索</button>
        </div>
      </div>
      <button className={"btn btn-success"} onClick={syncFinance}>
        <IconSync /> 一键同步
      </button>
    </div>
  );
};

export default SearchPanel;
