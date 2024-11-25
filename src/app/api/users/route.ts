import bcrypt from 'bcrypt';
import prisma from '../database';

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      role: true
    }
  });

  return Response.json(
    { success: true, message: 'Success', data: users },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  const { username, password, roleId } = await req.json();

  if (!username || !password || !roleId) {
    return Response.json(
      { success: false, message: 'Enter all the fields' },
      { status: 400 }
    );
  }

  const availableUser = await prisma.user.findUnique({
    where: {
      username
    }
  });

  if (availableUser) {
    return Response.json(
      { success: false, message: 'User already exists' },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      roleId
    }
  });

  return Response.json(
    { success: true, message: 'Success', data: user },
    { status: 200 }
  );
}
