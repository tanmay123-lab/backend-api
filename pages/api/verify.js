export default function handler(req, res) {
  const { id } = req.query;

  // 1️⃣ Validate input
  if (!id) {
    return res.status(400).json({
      valid: false,
      error: "Certificate ID is required",
    });
  }

  // 2️⃣ Normalize ID (case-insensitive)
  const normalizedId = String(id).trim().toUpperCase();

  // 3️⃣ Temporary hardcoded records (DB later)
  const records = {
    CERT123: {
      name: "Aarav Shah",
      course: "Backend Development",
    },
    CERT456: {
      name: "Tanmay Anand",
      course: "Web Development",
    },
  };

  const record = records[normalizedId];

  // 4️⃣ Not found
  if (!record) {
    return res.status(404).json({
      id: normalizedId,
      valid: false,
      message: "Certificate not found",
      verifiedAt: new Date().toISOString(),
    });
  }

  // 5️⃣ Success response
  return res.status(200).json({
    id: normalizedId,
    valid: true,
    name: record.name,
    course: record.course,
    verifiedAt: new Date().toISOString(),
  });
}
