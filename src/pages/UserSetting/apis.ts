import { post } from "../../utils/fetch";

export const updateUser = (p: any = {}) => post("/users/editTeacher", p);
