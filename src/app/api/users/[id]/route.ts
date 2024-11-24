import prisma from '../../database';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id)
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

  const { username, password, roleId } = await req.json();

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

  const body: { [key: string]: string | number } = { username, role: roleId };

  if (password) body['password'] = password;

  await prisma.user.update({
    where: {
      id: parseInt(id)
    },
    data: {
      username,
      password,
      roleId
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
