import { createClient } from "@/utils/supabase/server";
import React, { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "@/lib/format";

const TableList = async () => {
  const supabase = createClient();

  const classHeader = "text-sm font-medium text-base-content/80";

  let { data: history_coin, error }: any = await supabase
    .from("history_coin")
    .select(
      "dot_amount,dot_price,usdt_amount,usdt_price,total_vnd,email,created_at"
    );

  if (error) {
    return error.message;
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>
              <span className={classHeader}>ID</span>
            </th>
            <th>
              <span className={classHeader}>Buy Date</span>
            </th>
            <th>
              <span className={classHeader}>Polkadot Amount</span>
            </th>
            <th>
              <span className={classHeader}>1 Polkadot/USDT</span>{" "}
            </th>
            <th>
              <span className={classHeader}>Amount USDT</span>
            </th>
            <th>
              <span className={classHeader}>1 USDT/VND</span>
            </th>
            <th>
              <span className={classHeader}>Total VND</span>
            </th>
            <th>
              <span className={classHeader}>Email</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {history_coin.map((k: any, key: number) => {
            const {
              dot_amount,
              dot_price,
              usdt_amount,
              usdt_price,
              total_vnd,
              email,
              created_at,
            } = k;

            return (
              <tr key={key}>
                <td>
                  <div className="font-medium whitespace-nowrap"># {key + 1}</div>
                </td>
                <td>
                  <div className="font-medium">{formatDate(created_at)}</div>
                </td>
                <td>
                  <div className="font-medium">{dot_amount}</div>
                </td>
                <td>
                  <div className="font-medium">{dot_price}</div>
                </td>
                <td>
                  <div className="font-medium">{usdt_amount} $</div>
                </td>
                <td>
                  <div className="font-medium">
                    {formatCurrency(usdt_price)}
                  </div>
                </td>
                <td>
                  <div className="font-medium">{formatCurrency(total_vnd)}</div>
                </td>
                <td>
                  <div className="font-medium">{email}</div>
                </td>
              </tr>
            );
          })}
          {/* row 1 */}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
