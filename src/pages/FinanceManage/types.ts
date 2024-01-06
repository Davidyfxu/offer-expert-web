export interface ITransaction {
  _id: string;
  name: string;
  fin_id: string;
  assignTutor: IAssignTutor;
}
export interface IAssignTutor {
  name: string;
  email: string;
  avatar?: string;
}
