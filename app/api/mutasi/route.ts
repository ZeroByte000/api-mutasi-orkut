// app/api/mutasi/route.ts
import { NextRequest, NextResponse } from "next/server";
import { makeOrderkuotaRequest } from "../../../lib/orderkuota";

interface MutasiRequestBody {
  username: string;
  token: string; // Format: "accountId:actualToken"
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: MutasiRequestBody = await request.json();
    const { username, token } = body;

    if (!username || !token) {
      return NextResponse.json(
        { message: "username dan token diperlukan" },
        { status: 400 }
      );
    }

    // Pisahkan accountId dan token asli dari string auth_token
    // Contoh: "2057644:MN1BHYLER5xfjvcCS024eAgInDh8PmUp"
    const tokenParts = token.split(":");

    // Validasi format token
    if (tokenParts.length !== 2) {
      return NextResponse.json(
        {
          message:
            "Format auth_token tidak valid. Harus 'accountId:actualToken'.",
        },
        { status: 400 }
      );
    }

    const [accountId, _] = tokenParts; // Kita hanya butuh accountId untuk URL

    const requestParams = {
      app_reg_id:
        "feWAyrROTHe_RYH3Sbruw8:APA91bFbdiCCuyMLLTtieOr4W5fiSlzPHwUOe9w75UwmiHt7zywlgKi_zlKi5WUSq6pJdqHNkRD7J98p2hU7UBKK5R2wh5xcOQRhLoyb9PNWXTDiFmjrua4",
      phone_uuid: "feWAyrROTHe_RYH3Sbruw8",
      phone_model: "23124RA7EO",
      "requests[qris_history][keterangan]": "",
      "requests[qris_history][jumlah]": "",
      phone_android_version: "15",
      app_version_code: "251029",
      auth_username: username,
      "requests[qris_history][page]": "1",
      // PERUBAHAN DI SINI: Gunakan auth_token yang LENGKAP, bukan yang sudah dipisah
      auth_token: token,
      app_version_name: "25.10.29",
      ui_mode: "light",
      "requests[0]": "account",
      "requests[qris_history][dari_tanggal]": "",
      "requests[qris_history][ke_tanggal]": "",
    };

    // Gunakan accountId yang sudah diekstrak untuk URL
    const response = await makeOrderkuotaRequest(
      `/api/v2/qris/mutasi/${accountId}`,
      requestParams
    );
    return NextResponse.json(response.body, { status: response.status });
  } catch (error: unknown) {
    console.error("Mutasi Error:", error);
    let errorMessage = "Terjadi kesalahan pada server";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: errorMessage, error: errorMessage },
      { status: 500 }
    );
  }
}
