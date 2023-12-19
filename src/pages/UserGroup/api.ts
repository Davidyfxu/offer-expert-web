import { post } from "../../utils/fetch";

export const get_teachers = (p: any = {}) => post("/users/getAllTeachers", p);
export const edit_group_role = (p: any = {}) => post("/users/editGroupRole", p);
