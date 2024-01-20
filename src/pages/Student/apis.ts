import { post } from "../../utils/fetch";

export const get_case_detail = (p: any = {}) => post("/au/getCaseDetail", p);
