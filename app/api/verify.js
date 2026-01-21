import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { valid: false, error: "Certificate ID is required" },
      { status: 400 }
    );
  }

  const normalizedId = id.trim().toUpperCase();

  const { data, error } = await supabase
    .from("certificates")
    .select(
      `
      certificate_id,
      issuer,
      status,
      verification_id,
      verification_source,
      verified_at
      `
    )
    .eq("certificate_id", normalizedId)
    .single();

  if (error || !data) {
    return NextResponse.json(
      {
        certificateId: normalizedId,
        valid: false,
        message: "Certificate not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    certificateId: data.certificate_id,
    valid: data.status === "verified",
    issuer: data.issuer,
    verificationId: data.verification_id,
    verificationSource: data.verification_source,
    verifiedAt: data.verified_at,
  });
}


