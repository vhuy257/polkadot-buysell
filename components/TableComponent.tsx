import { createClient } from "@/utils/supabase/server";
import TableList from "./TableList";

export default async function TableComponent() { 
    const supabase = createClient();
  
    const { data: history_coin, error }: any = await supabase
    .from("history_coin")
    .select(
      "dot_amount,dot_price,usdt_amount,usdt_price,total_vnd,type,created_at,updated_date"
    );

    if (error) {
        return error.message;
    }

    return <TableList history_coin={history_coin} />;
}