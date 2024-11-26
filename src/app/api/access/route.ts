import prisma from '../database';

export async function GET() {
  const roleModulePermission = await prisma.roleModulePermission.findMany({
    include: {
      role: true,
      module: true,
      permissions: true
    }
  });

  return Response.json(
    { success: true, message: 'Success', data: roleModulePermission },
    { status: 200 }
  );
}

export async function PUT(request: Request) {
  try {
    const {
      checked,
      roleId,
      moduleId,
      permissions
    }: {
      checked: boolean;
      roleId: number;
      moduleId: number;
      permissions: number[];
    } = await request.json();

    if (!roleId || !moduleId || !permissions) {
      return Response.json(
        { success: false, message: 'Enter all the fields' },
        { status: 400 }
      );
    }

    const roleModule = await prisma.roleModulePermission.findFirst({
      where: {
        roleId,
        moduleId
      }
    });

    if (roleModule) {
      const permissionKey = checked ? 'connect' : 'disconnect';

      await prisma.roleModulePermission.update({
        where: {
          id: roleModule.id
        },
        data: {
          permissions: {
            [permissionKey]: permissions.map((id) => ({ id }))
          }
        }
      });

      return Response.json(
        { success: true, message: 'Success' },
        { status: 200 }
      );
    }

    await prisma.roleModulePermission.create({
      data: {
        roleId,
        moduleId,
        permissions: {
          connect: permissions.map((id) => ({ id }))
        }
      }
    });

    return Response.json(
      { success: true, message: 'Success' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: 'Something went wrong', error },
      { status: 500 }
    );
  }
}
