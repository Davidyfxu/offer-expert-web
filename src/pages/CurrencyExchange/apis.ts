import { post } from "../../utils/fetch";

export const get_current = (p: any = {}) => post("/general/currency", p);
