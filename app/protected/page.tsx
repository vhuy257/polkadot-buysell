import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RowInput from "@/components/RowInput/RowInput";
import TableList from "@/components/TableList";
import Chart from "@/components/Chart/Chart";

export default async function ProtectedPage() {
  const supabase = createClient();
  const { data: history_coin, error }: any = await supabase
    .from("history_coin")
    .select(
      "dot_amount,dot_price,usdt_amount,usdt_price,total_vnd,type,created_at,updated_date"
    );

  if (error) {
    return error.message;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 bg-purple-950 text-center text-white text-sm">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-center h-16">
          <div className="w-full max-w-5xl flex justify-between items-center py-3 text-sm flex-wrap px-3 md:px-0">
            <DeployButton />
            <AuthButton />
          </div>
        </nav>
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-center gap-5 max-w-5xl">
        <div className="w-full md:w-1/3">
          <RowInput user={user} />
        </div>
        <div className="w-full md:w-2/3">
          <TableList history_coin={history_coin} />
        </div>
      </div>
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-md shadow-lg mb-10">
          <Chart data={history_coin} />
        </div>
      </div>
    </div>
  );
}
