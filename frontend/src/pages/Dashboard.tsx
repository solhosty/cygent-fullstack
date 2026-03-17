import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TokenBalances } from "@/components/dashboard/TokenBalances";
import { WalletOverview } from "@/components/dashboard/WalletOverview";

export function Dashboard() {
  return (
    <section className="space-y-4">
      <WalletOverview />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TokenBalances />
        </div>
        <div className="space-y-4">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </section>
  );
}
