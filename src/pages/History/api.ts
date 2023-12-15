import { post } from "../../utils/fetch";

export const get_history = (p: any = {}) => post("/AU/getHistory", p);
