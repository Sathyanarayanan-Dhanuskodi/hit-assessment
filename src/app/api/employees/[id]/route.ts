import prisma from '../../database';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id)
    },
    select: {
      id: true,
      username: true,
      roles: {
        select: {
          id: true,
          code: true,
          name: true
        }
      }
    }
  });

  return Response.json(
    { success: true, message: 'Success', data: user },
    { status: 200 }
  );
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const { username, password, roles } = await req.json();

  if (!username || !roles) {
    return Response.json(
      { success: false, message: 'Enter all the fields' },
      { status: 400 }
    );
  }

  if (roles.length === 0) {
    return Response.json(
      { success: false, message: 'Select at least one role' },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id)
    },
    select: {
      id: true,
      username: true,
      roles: {
        select: {
          id: true
        }
      }
    }
  });

  if (!user) {
    return Response.json(
      { success: false, message: 'User not found' },
      { status: 404 }
    );
  }

  const body: { [key: string]: string | number } = { username };

  if (password) body['password'] = password;

  const rolesToConnect = roles.map((role: number) => ({ id: role }));
  const rolesToDisconnect = user.roles
    .filter((role) => !roles.includes(role.id))
    .map((r) => ({ id: r.id }));

  await prisma.user.update({
    where: {
      id: parseInt(id)
    },
    data: {
      ...body,
      roles: {
        connect: rolesToConnect,
        disconnect: rolesToDisconnect
      }
    }
  });

  return Response.json(
    { success: true, message: 'Success', data: user },
    { status: 200 }
  );
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id)
    }
  });

  if (!user) {
    return Response.json(
      { success: false, message: 'User not found' },
      { status: 404 }
    );
  }

  await prisma.user.delete({
    where: {
      id: parseInt(id)
    }
  });

  return Response.json({ success: true, message: 'Success' }, { status: 200 });
}
