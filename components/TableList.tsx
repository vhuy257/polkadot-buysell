"use client";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable/DataTable";
import { columnBuyTable } from "@/lib/columns";
import { dataHistory } from "@/lib/atom";
import { useAtom } from "jotai";

const TableList = ({ history_coin }: { history_coin: any[] }) => {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
  });

  const [historyData, setHistory]: any = useAtom(dataHistory);
 
  useEffect(() => {
    if (!historyData.length)
      setHistory(history_coin)
  }, [history_coin])

  return (
    <div className="overflow-x-auto w-full">
      <h1 className="pb-2 text-lg font-semibold px-3 md:px-0">History</h1>
      {historyData.length ? (
        <DataTable
          data={historyData}
          columns={columnBuyTable}
          total={10}
          pagination={pagination}
          setPagination={setPagination}
        />
      ) : null}
    </div>
  );
};

export default TableList;
