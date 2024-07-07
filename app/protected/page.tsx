import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RowInput from "@/components/RowInput/RowInput";
import TableList from "@/components/TableList";
import { Suspense } from "react";

export default async function ProtectedPage() {
  const supabase = createClient();
  const { data: history_coin, error }: any = await supabase
    .from("history_coin")
    .select(
      "dot_amount,dot_price,usdt_amount,usdt_price,total_vnd,type,created_at"
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
      <RowInput user={user} />
      <div className="w-full max-w-5xl">
        <h1 className="py-2 text-lg font-semibold">History</h1>
        <TableList history_coin={history_coin} />
      </div>
    </div>
  );
}
