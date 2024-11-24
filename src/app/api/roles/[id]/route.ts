import { NextResponse } from 'next/server';
import prisma from '../../database';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const role = await prisma.role.findUnique({
    where: {
      id: parseInt(id)
    }
  });

  return NextResponse.json(
    { success: true, message: 'Success', data: role },
    { status: 200 }
  );
}
