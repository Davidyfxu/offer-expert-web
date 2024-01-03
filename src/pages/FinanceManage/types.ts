export interface ITransaction {
  _id: string;
  name: string;
  fin_id: string;
  assignTutor: IAssignTutor;
  timestamp: number;
  salaries: ISalary[];
}
export interface ISalary {
  note: string[];
  fee: number;
  timestamp: number;
}
export interface IAssignTutor {
  name: string;
  email: string;
  avatar?: string;
}
