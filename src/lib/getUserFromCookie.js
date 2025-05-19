import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function getUserFromCookie() {
  const cookieStore = cookies(); // already works, but for clarity
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}
