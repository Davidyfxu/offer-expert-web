import { post } from "../../utils/fetch";

export const get_history = (p: any = {}) => post("/au/getHistory", p);
