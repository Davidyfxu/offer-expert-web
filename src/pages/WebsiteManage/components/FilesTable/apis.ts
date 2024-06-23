import { post } from "../../../../utils/fetch";

export const get_files = (p: any = {}) => post("/www/getFiles", p);
export const delete_file = (p: any = {}) => post("/www/deleteFiles", p);
