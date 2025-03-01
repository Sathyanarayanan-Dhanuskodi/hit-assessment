import { EModules, EPermissions, TMasterData } from '@/types/types';

export default class RBAC {
  private readonly data: TMasterData;

  constructor(data: TMasterData) {
    this.data = data;
  }

  checkEndpointPermission(url: string) {
    const isEditUrl = url.includes('/edit');
    const isAddUrl = url.includes('/add');

    let moduleId: number = 0;

    switch (true) {
      case url.startsWith('/employees'):
        moduleId = EModules.EMPLOYEES;
        break;
      case url.startsWith('/access'):
        moduleId = EModules.ACCESS_MANAGEMENT;
        break;
      case url.startsWith('/finance'):
        moduleId = EModules.FINANCE_MANAGEMENT;
        break;
    }

    if (!moduleId) {
      return true;
    }

    return this.data.currentUserPermissions
      ?.find((e) => e.moduleId === moduleId)
      ?.permissions.some((p) => {
        if (isAddUrl) {
          return p.name.toLowerCase() === EPermissions.CREATE.toLowerCase();
        }

        if (isEditUrl) {
          return p.name.toLowerCase() === EPermissions.EDIT.toLowerCase();
        }

        return true;
      });
  }
}
