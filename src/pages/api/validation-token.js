import jwt from "jsonwebtoken";

export const validationToken = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (err) {
    return res.status(401).json({ message: "Token is invalid" });
  }
};
