import { queryOptions } from "@tanstack/react-query";

import { getAccount } from "@/lib/account.functions";

export const accountQueryOptions = queryOptions({
  queryKey: ["account"],
  queryFn: () => getAccount(),
});
