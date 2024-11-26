import bcrypt from 'bcrypt';
import prisma from '../database';
import Utils from '@/utils/utils';

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      roles: true
    }
  });

  return Response.json(
    { success: true, message: 'Success', data: users },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  const { username, password, roles } = await req.json();

  if (!username || !password || !roles) {
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

  if (!/^[a-z]+$/.test(username)) {
    return Response.json(
      {
        success: false,
        message: 'Username must contain only lowercase letters'
      },
      { status: 400 }
    );
  }

  const passwordCheck = Utils.isStrongPassword(password);

  if (!passwordCheck.isValid) {
    return Response.json(
      { success: false, message: passwordCheck.message },
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
      roles: {
        connect: roles.map((role: number) => ({ id: role }))
      }
    }
  });

  return Response.json(
    { success: true, message: 'Success', data: user },
    { status: 200 }
  );
}
