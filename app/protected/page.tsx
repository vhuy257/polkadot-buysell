import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import RowInput from "@/components/RowInput/RowInput";
import TableList from "@/components/TableList";

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
      <RowInput user={user} />
      <div className="w-full max-w-5xl">
        <TableList />
      </div>
    </div>
  );
}
