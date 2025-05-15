import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const authParams = getUploadAuthParams({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    });
    return NextResponse.json(authParams, {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
