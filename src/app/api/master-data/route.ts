import { NextRequest } from 'next/server';
import prisma from '../database';

export async function GET(req: NextRequest) {
  const roles = req.nextUrl.searchParams.get('roles') ?? '';

  if (!roles) {
    return Response.json(
      { success: false, message: 'Role is required' },
      { status: 400 }
    );
  }

  const allRoles = await prisma.role.findMany({
    orderBy: {
      name: 'asc'
    }
  });
  const modules = await prisma.module.findMany({
    orderBy: {
      name: 'asc'
    }
  });
  const permissions = await prisma.permission.findMany({});

  const currentUserPermissions = await prisma.roleModulePermission.findMany({
    where: {
      roleId: {
        in: roles.split(',').map((e) => parseInt(e))
      }
    },
    select: {
      roleId: true,
      moduleId: true,
      module: true,
      permissions: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return Response.json(
    {
      success: true,
      message: 'Success',
      data: { roles: allRoles, modules, permissions, currentUserPermissions }
    },
    { status: 200 }
  );
}
