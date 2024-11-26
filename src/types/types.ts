export type TMasterData = {
  roles: {
    name: string;
    id: number;
    code: string;
  }[];
  modules: {
    name: string;
    id: number;
  }[];
  permissions: {
    name: string;
    id: number;
  }[];
  currentUserPermissions:
    | {
        id: number;
        roleId: number;
        moduleId: number;
        module: {
          id: number;
          name: string;
        };
        permissions: {
          id: number;
          name: string;
        }[];
      }[]
    | null;
};

export interface IRoleModulePermission {
  id: number;
  roleId: number;
  moduleId: number;
  role: Role;
  module: Module;
  permissions: Module[];
}

export interface Module {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  code: string;
}

export enum EPermissions {
  CREATE = 'create',
  READ = 'read',
  EDIT = 'edit',
  DELETE = 'delete'
}

export enum EModules {
  EMPLOYEES = 1,
  ACCESS_MANAGEMENT = 2,
  FINANCE_MANAGEMENT = 3
}

export enum ERoles {
  HRM = 1,
  FM = 2,
  ADMIN = 3,
  HR = 4
}
