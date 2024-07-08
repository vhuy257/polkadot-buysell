"use client";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable/DataTable";
import { columnBuyTable } from "@/lib/columns";
import { dataHistory } from "@/lib/atom";
import { useAtom } from "jotai";
import { Skeleton } from "./ui/skeleton";

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
    <div className="md:w-2/3 w-full">
      <h1 className="pb-2 text-lg font-semibold px-3 md:px-0">History</h1>
      {historyData.length ? (
        <DataTable
          data={historyData}
          columns={columnBuyTable}
          total={10}
          pagination={pagination}
          setPagination={setPagination}
        />
      ) : (
        <Skeleton className="bg-slate-100 w-full h-96 rounded-md" />
      )}
    </div>
  );
};

export default TableList;
