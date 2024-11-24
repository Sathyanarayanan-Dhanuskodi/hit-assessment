export const RBAC: { [key: number]: string[] } = {
  // 1: ADMIN
  1: ['ALL'],

  // 2: EDITOR
  2: ['/', '/users'],

  // 3: VIEWER
  3: ['/', '/users']
};
