export interface ITeacher {
  name?: string;
  email: string;
  password?: string;
  avatar?: string;
  group?: GroupEnum;
  role?: RoleEnum;
}

export enum GroupEnum {
  arts, // 人文社科
  business, // 商科
  engineering, // 工科
}
export enum RoleEnum {
  admin, // 超级管理员
  manager, // 管理员
  member, // 成员
}
