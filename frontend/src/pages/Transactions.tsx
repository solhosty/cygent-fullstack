import { useState } from "react";
import { ListChecks } from "lucide-react";
import { useChainId } from "wagmi";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TransactionList } from "@/components/transactions/TransactionList";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";

export function Transactions() {
  const [page, setPage] = useState(1);
  const chainId = useChainId();
  const { data, isLoading } = useTransactionHistory(page, 12);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-2xl font-semibold">
          <ListChecks className="h-5 w-5 text-primarySoft" />
          Transaction history
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      </div>
      <Card>
        <CardContent className="pt-5">
          <div className="mb-3 text-sm text-muted-foreground">Page {page}</div>
          <TransactionList chainId={chainId} transactions={data ?? []} isLoading={isLoading} />
        </CardContent>
      </Card>
    </section>
  );
}
