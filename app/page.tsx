import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import RowInput from "@/components/RowInput/RowInput";
import TableComponent from "@/components/TableComponent";
import Chart from "@/components/Chart/Chart";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  const supabase = createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center h-16">
        <div className="w-full max-w-5xl flex justify-between items-center py-3 text-sm">
          <DeployButton />
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="flex flex-wrap md:flex-nowrap items-center gap-5 max-w-5xl w-full px-3 md:px-0 whitespace-nowrap">
        <div className="w-full md:w-1/4">
          <RowInput user={user} />
        </div>
        <Suspense
          fallback={
            <Skeleton className="bg-slate-100 w-full h-96 rounded-md" />
          }
        >
          <TableComponent />
        </Suspense>
      </div>
      <div className="w-full max-w-5xl">
        <div className="mb-10">
          <Chart />
        </div>
      </div>
    </div>
  );
}
