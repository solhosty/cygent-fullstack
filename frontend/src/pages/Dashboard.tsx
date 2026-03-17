import { QuickActions } from "@/components/dashboard/QuickActions";
import { TokenBalances } from "@/components/dashboard/TokenBalances";
import { WalletOverview } from "@/components/dashboard/WalletOverview";

export function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <WalletOverview />
      <QuickActions />
      <div className="md:col-span-2">
        <TokenBalances />
      </div>
    </div>
  );
}
