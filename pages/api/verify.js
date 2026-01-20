import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      valid: false,
      error: 'Certificate ID is required',
    });
  }

  const normalizedId = String(id).trim().toUpperCase();

  const { data, error } = await supabase
    .from('certificates')   // MUST be lowercase
    .select('*')
    .eq('certificate_id', normalizedId);

  console.log('Supabase data:', data);
  console.log('Supabase error:', error);

  if (error || !data || data.length === 0) {
    return res.status(404).json({
      certificateId: normalizedId,
      valid: false,
      message: 'Certificate not found',
    });
  }

  const record = data[0];

  return res.status(200).json({
    certificateId: record.certificate_id,
    valid: record.status === 'verified',
    issuer: record.issuer,
    verificationId: record.verification_id,
    verificationSource: record.verification_source,
    verifiedAt: record.verified_at,
  });
}



