export async function GET() {
  return Response.json(
    { success: false, message: 'Not authenticated.' },
    {
      status: 401
    }
  );
}
