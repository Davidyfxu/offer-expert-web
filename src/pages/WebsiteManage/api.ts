import { post } from "../../utils/fetch";

export const getWebsiteData = (p: any = {}) => post("/www/getAllData", p);
export const updateWebsiteData = (p: any = {}) => post("/www/updateAllData", p);
