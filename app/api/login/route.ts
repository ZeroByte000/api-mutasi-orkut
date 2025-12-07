// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { makeOrderkuotaRequest } from "../../../lib/orderkuota";

interface LoginRequestBody {
  username: string;
  password: string; // Bisa password atau OTP
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: LoginRequestBody = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username dan password/OTP diperlukan" },
        { status: 400 }
      );
    }

    const loginData = {
      username: username,
      password: password, // API akan menerima password atau OTP
      app_reg_id: "",
      phone_android_version: "15",
      app_version_code: "251029",
      phone_uuid: "",
      app_version_name: "25.10.29",
      auth_token: "", // Selalu kosong untuk percobaan login
      ui_mode: "dark",
      phone_model: "23124RA7EO",
    };

    const response = await makeOrderkuotaRequest("/api/v2/login", loginData);
    
    return NextResponse.json(response.body, { status: response.status });

  } catch (error: unknown) {
    console.error("Login Error:", error);
    let errorMessage = 'Terjadi kesalahan pada server';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage, error: errorMessage }, { status: 500 });
  }
}