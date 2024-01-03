import { create } from "zustand";
import { ITransaction, ISalary } from "../types";
import { get_transactions, sync_finance, update_transaction } from "../apis";

interface IFinanceStoreState {
  transactions: ITransaction[];
  loading: boolean;
  confirmLoading: boolean;
  total: number;
  refresh: number;
  search: any;
  pagination: { currentPage: number; pageSize: number };
  onChangeSearch: (props: any) => void;
  onChangePagination: (currentPage: number, pageSize: number) => void;
  getTransactions: () => Promise<any>;
  syncFinance: () => Promise<any>;
  refreshTrans: () => void;
  updateTransaction: (props: {
    fin_id: string;
    salaries: ISalary[];
  }) => Promise<any>;
}
export const useFinanceStore = create<IFinanceStoreState>()(
  (set, getState) => ({
    transactions: [],
    total: 0,
    loading: false,
    confirmLoading: false,
    refresh: 0,
    search: {},
    pagination: { currentPage: 1, pageSize: 10 },
    refreshTrans: () => set((state) => ({ refresh: state.refresh + 1 })),
    onChangeSearch: (props) =>
      set((state) => ({ search: { ...state.search, ...props } })),
    onChangePagination: (currentPage, pageSize) =>
      set(() => ({ pagination: { currentPage, pageSize } })),
    getTransactions: async () => {
      try {
        const { pagination, search } = getState();
        set(() => ({ loading: true }));
        const { count, transactions } = await get_transactions({
          ...search,
          ...pagination,
        });
        set(() => ({
          transactions,
          total: count,
          loading: false,
        }));
      } catch (e) {
        console.error("getTransactions", e);
      }
    },
    syncFinance: async () => {
      try {
        set(() => ({ loading: true }));
        await sync_finance();
        set(() => ({
          search: {},
          loading: false,
        }));
      } catch (e) {
        console.error("getTransactions", e);
      }
    },
    updateTransaction: async (props) => {
      try {
        set(() => ({ confirmLoading: true }));
        await update_transaction(props);
        set(() => ({ confirmLoading: false }));
      } catch (e) {
        console.error("getTransactions", e);
      }
    },
  }),
);
