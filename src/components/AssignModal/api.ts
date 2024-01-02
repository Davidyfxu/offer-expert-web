import { post } from "../../utils/fetch";

export const get_teachers = (p: any = {}) => post("/users/getAllTeachers", p);
