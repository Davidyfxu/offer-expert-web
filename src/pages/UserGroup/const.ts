export enum GroupEnum {
  arts, // 人文社科
  business, // 商科
  engineering, // 工科
  others,
}

export enum RoleEnum {
  admin, // 超级管理员
  manager, // 管理员
  member, // 成员
}

export const GroupMap: { [k in GroupEnum]: string } = {
  [GroupEnum.arts]: "人文社科",
  [GroupEnum.business]: "商科",
  [GroupEnum.engineering]: "工科",
  [GroupEnum.others]: "其他",
};
export const RoleMap: { [k in RoleEnum]: string } = {
  [RoleEnum.admin]: "超级管理员",
  [RoleEnum.manager]: "管理员",
  [RoleEnum.member]: "成员",
};
