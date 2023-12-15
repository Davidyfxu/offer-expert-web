import { post } from "../../utils/fetch";

export const get_au_case = (p: any = {}) => post("/AU/getCases", p);
export const delete_au_case = (p: any = {}) => post("/AU/deleteCase", p);
