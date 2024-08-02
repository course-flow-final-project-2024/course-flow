import jwt from "jsonwebtoken";

export const validationToken = async (req, res) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token has invalid format" });
  }
  const tokenWithoutBearer = token.split(" ")[1];

  const result = jwt.verify(
    tokenWithoutBearer,
    process.env.JWT_SECRET,
    (err, payload) => {
      if (err) {
        return res.status(401).json({ message: "Token is invalid" });
      }
      return payload;
    }
  );
  return result;
};
