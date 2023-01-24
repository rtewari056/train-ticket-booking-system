import JWT from "jsonwebtoken";

// Util
import ErrorResponse from "../util/errorResponse.js";

export const signAccessToken = (email) => {
  return JWT.sign({ email }, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: `${process.env.ACCESS_TOKEN_EXPIRE}m`, // In minutes
  });
};

// Verify access token middleware
export const verifyAccessToken = (req, res, next) => {
  // Check if authorization header present or not
  if (!req.headers["authorization"])
    return next(new ErrorResponse("Unauthorized", 401));

  const authHeader = req.headers["authorization"];
  const accessToken = authHeader.split(" ")[1];

  JWT.verify(
    accessToken,
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    (err, decoded) => {
      // If error verifying token
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return next(new ErrorResponse("Unauthorized", 401));
        } else {
          return next(new ErrorResponse(err.message, 401));
        }
      }

      // If everything is fine
      req.decoded = decoded;
      return next();
    }
  );
};
