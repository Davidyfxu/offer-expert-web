import { post } from "../../utils/fetch";

export const get_transactions = (p: any = {}) =>
  post("/finance/getTransactions", p);
export const sync_finance = (p: any = {}) => post("/finance/syncBoth", p);
export const update_transaction = (p: any = {}) =>
  post("/finance/updateTransaction", p);
