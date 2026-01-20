export default function handler(req, res) {
  const { id } = req.query;

  // Temporary hardcoded data (we'll replace with DB later)
  const records = {
    CERT123: {
      name: "Aarav Shah",
      course: "Backend Development",
      valid: true,
    },
    CERT456: {
      name: "Tanmay Anand",
      course: "Web Development",
      valid: true,
    },
  };

  if (!id) {
    return res.status(400).json({
      error: "Certificate ID is required",
    });
  }

  const record = records[id];

  if (!record) {
    return res.status(404).json({
      valid: false,
      message: "Certificate not found",
    });
  }

  return res.status(200).json(record);
}
