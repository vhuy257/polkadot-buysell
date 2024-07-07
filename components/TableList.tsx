"use client";
import React, { useState } from "react";
import DataTable from "./DataTable/DataTable";
import { columnBuyTable } from "@/lib/columns";

const TableList = ({ history_coin }: { history_coin: any[] }) => {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
  });

  return (
    <div className="overflow-x-auto w-full">
      <DataTable
        data={history_coin}
        columns={columnBuyTable}
        total={10}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default TableList;
