import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("token");
  return new Response(
    JSON.stringify({ success: true, message: "Logged out" }),
    { status: 200 }
  );
}
