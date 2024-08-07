import { NextRequest } from 'next/server';

export function isAuthValid(request: NextRequest): boolean {
  const token = request.cookies.get("access_token");
  return Boolean(token);
}
