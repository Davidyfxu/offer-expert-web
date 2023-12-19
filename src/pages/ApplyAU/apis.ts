import { post } from "../../utils/fetch";

export const get_au_case = (p: any = {}) => post("/au/getCases", p);
export const delete_au_case = (p: any = {}) => post("/au/deleteCase", p);
export const assign_au_case = (p: any = {}) => post("/au/assign", p);
