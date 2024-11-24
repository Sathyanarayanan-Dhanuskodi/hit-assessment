import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import prisma from '../database';
import Utils from '@/utils/utils';
import {
  ACCESS_TOKEN_EXPIRATION,
  ACCESS_TOKEN_KEY
} from '@/constants/constants';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });

    if (!user) {
      return Response.json(
        { success: false, message: 'Account not found' },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return Response.json(
        { success: false, message: 'Username or password entered is wrong' },
        { status: 401 }
      );
    }

    const token = await Utils.jwtSign({ uid: user.id, rid: user.roleId });

    const cookieStore = await cookies();

    if (ACCESS_TOKEN_KEY) {
      cookieStore.set(ACCESS_TOKEN_KEY, token, {
        sameSite: 'strict',
        maxAge: ACCESS_TOKEN_EXPIRATION
      });
    }

    return Response.json(
      { success: true, message: 'Success', token },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: 'Something went wrong', error },
      { status: 500 }
    );
  }
}
