import { ACCESS_TOKEN_KEY } from '@/constants/constants';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_KEY);

  return Response.json(
    { success: true, message: 'Successfully logged out' },
    { status: 200 }
  );
}
