import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import prisma from '../../database';
import Utils from '@/utils/utils';
import {
  ACCESS_TOKEN_EXPIRATION,
  ACCESS_TOKEN_KEY
} from '@/constants/constants';

export async function POST(request: Request) {
  try {
    const { username, password, roleId } = await request.json();

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

    const token = await Utils.jwtSign({ uid: user.id, rid: user.roleId });

    const cookieStore = await cookies();

    if (ACCESS_TOKEN_KEY) {
      cookieStore.set(ACCESS_TOKEN_KEY, token, {
        sameSite: 'strict',
        maxAge: ACCESS_TOKEN_EXPIRATION
      });
    }

    return Response.json(
      { success: true, message: 'Successfully created user', token },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: 'Something went wrong', error },
      { status: 500 }
    );
  }
}
