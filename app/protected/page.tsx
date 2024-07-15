import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RowInput from "@/components/RowInput/RowInput";
import TableComponent from "@/components/TableComponent";
import Chart from "@/components/Chart/Chart";
import { Suspense } from "react";

export default async function ProtectedPage() {
  const supabase = createClient();
  
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
      <div className="flex flex-wrap md:flex-nowrap items-center gap-5 max-w-5xl w-full px-3 md:px-0 whitespace-nowrap">
        <div className="w-full md:w-1/3">
          <RowInput user={user} />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
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
