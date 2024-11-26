import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import prisma from '../../database';
import Utils from '@/utils/utils';
import {
  ACCESS_TOKEN_EXPIRATION,
  ACCESS_TOKEN_KEY
} from '@/constants/constants';
import { ERoles } from '@/types/types';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return Response.json(
        { success: false, message: 'Enter all the fields' },
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
          connect: {
            id: ERoles.ADMIN
          }
        }
      }
    });

    const token = await Utils.jwtSign({ uid: user.id, rid: [ERoles.ADMIN] });

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
