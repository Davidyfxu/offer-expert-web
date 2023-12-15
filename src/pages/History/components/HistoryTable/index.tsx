import React from "react";

import { Popover, Tag } from "@douyinfe/semi-ui";
import ReactDiffViewer from "react-diff-viewer";
enum HistoryEnum {
  Create = "0",
  Edit = "1",
  Delete = "2",
}
const HistoryTypeMap = {
  [HistoryEnum.Create]: <Tag color="amber">创建</Tag>,
  [HistoryEnum.Edit]: <Tag color="violet">编辑</Tag>,
  [HistoryEnum.Delete]: <Tag>删除</Tag>,
};
const HistoryTable = (props: { dataSource: any[] }) => {
  const { dataSource } = props;
  const sortObject = (record: any) => {
    if (record) {
      const sortKeys = Object.keys(record).sort();
      let sortData: any = {};
      sortKeys.forEach((k) => (sortData[k] = record[k]));
      return sortData;
    }
    return {};
  };
  return (
    <div className="overflow-x-auto bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>变更记录</th>
            <th>变更类型</th>
            <th>变更时间</th>
            <th>变更详情</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((data, idx) => (
            <tr key={idx}>
              <th>{idx + 1}</th>
              <th>{data?._id}</th>
              <td>{HistoryTypeMap[data?.type as HistoryEnum]}</td>
              <td>{data?.createdAt}</td>
              <td>
                <Popover
                  content={
                    <div
                      style={{
                        width: 1000,
                        height: 500,
                        overflow: "auto",
                        padding: 16,
                      }}
                    >
                      <ReactDiffViewer
                        oldValue={JSON.stringify(
                          sortObject(data?.oldRecord),
                          null,
                          4,
                        )}
                        newValue={JSON.stringify(
                          sortObject(data?.newRecord),
                          null,
                          4,
                        )}
                        splitView={true}
                      />
                    </div>
                  }
                  position={"left"}
                >
                  <button className="btn btn-outline btn-info">详情</button>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
