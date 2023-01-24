import crypto from "crypto";

// Database connection
import database from "../config/mysql.config.js";

// Util
import ErrorResponse from "../util/errorResponse.js";
import sendEmail from "../util/sendEmail.js";

// Helper
import { hashPassword, isValidPassword } from "../helper/passwordHelper.js";
import { signAccessToken } from "../helper/jwtHelper.js";

// @description     Sign up a user
// @route           POST /api/auth/register
// @access          Public

export const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      birthday,
      address,
      profilePic,
      isSuperAdmin,
    } = req.body;

    // Check if any of them is undefined
    if (!name || !email || !mobile || !password || !birthday || !address) {
      return next(new ErrorResponse("Please provide all the details", 400));
    }

    // Check if user already exists in our DB
    const [[userExists]] = await database.query(
      "SELECT * FROM user WHERE user.email = ?",
      [email]
    );

    if (userExists) {
      return next(new ErrorResponse("User already exists", 400));
    }

    const hashedPassword = await hashPassword(password); // Get hashed password
    const verificationToken = generateVerificationToken(); // Get verification token

    // Register and store the new user
    if (profilePic === undefined || profilePic.length === 0) {
      await database.query(
        "INSERT INTO user (name, email, mobile, password, birthday, address, verification_token) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          name,
          email,
          mobile,
          hashedPassword,
          birthday,
          address,
          verificationToken,
        ]
      );
    } else {
      await database.query(
        "INSERT INTO user (name, email, mobile, password, birthday, address, profilePic, verification_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          name,
          email,
          mobile,
          hashedPassword,
          birthday,
          address,
          profilePic,
          verificationToken,
        ]
      );
    }

    // If the user is super admin, update the entry
    if (isSuperAdmin) {
      await database.query(
        "UPDATE user SET user.is_super_admin = 1 WHERE user.email = ?",
        [email]
      );
    }

    // Reset password email template in HTML
    const verifyLink = `http://${req.headers.host}/api/auth/verify/${verificationToken}`;
    const html = `
      <h1>Hi ${name}</h1>
      <p>Please go to this <a href=${verifyLink} clicktracking=off>link</a> to verify your account:</p>
      <br>
      <p>Your login credentials:<p>
      <p>Email: ${email}<p>
      <p>Password: ${password}<p>
    `;

    // Send verification email
    await sendEmail({
      to: email,
      subject: "Account Verification Token",
      text: "Your account can be verified by clicking the link below",
      html,
    });

    return res.status(200).json({
      success: true,
      message: `A verification email has been sent to ${email}`,
    });
  } catch (error) {
    return next(error);
  }
};

// @description     Email verification
// @route           GET /api/auth/verify/:token
// @access          Public
export const verifyEmail = async (req, res, next) => {
  try {
    const token = req.params.token;

    // If token is not present
    if (!token) {
      return next(
        new ErrorResponse("We were unable to find a user for this token.", 400)
      );
    }

    // If we found a token, find a matching user
    const [[user]] = await database.query(
      "SELECT * FROM user WHERE user.verification_token = ?",
      [token]
    );

    // If matching user is not present
    if (!user) {
      return next(
        new ErrorResponse(
          "We were unable to find a valid token. Your token might have expired or user has already been verified.",
          400
        )
      );
    }

    // Update the user
    await database.query(
      "UPDATE user SET user.is_verified = 1, user.verification_token = null WHERE user.verification_token = ?",
      [token]
    );

    return res.status(200).json({
      success: true,
      message: "The account has been verified. Please log in.",
    });
  } catch (error) {
    return next(error);
  }
};

// @description     Log in a user
// @route           POST /api/auth/login
// @access          Public

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if any of them is undefined
    if (!email || !password) {
      return next(new ErrorResponse("Please provide email and password", 400));
    }

    // Get email and password of existing user
    const [[userExists]] = await database.query(
      "SELECT user.email, user.password FROM user WHERE user.email = ?",
      [email]
    );

    if (!userExists) {
      return next(new ErrorResponse("User not signed up", 403));
    }

    // Check if password matches or not
    const isPasswordMatch = await isValidPassword(
      password,
      userExists.password
    );

    if (!isPasswordMatch) {
      return next(new ErrorResponse("Invalid email/password", 401));
    }

    // If everything is good, get the user
    const [[user]] = await database.query(
      "SELECT * FROM user WHERE user.email = ?",
      [email]
    );

    return sendAuth(user, 200, res);
  } catch (error) {
    return next(error);
  }
};

function generateVerificationToken() {
  return crypto.randomBytes(20).toString("hex");
}

const sendAuth = (user, statusCode, res) => {
  return res.status(statusCode).json({
    success: true,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    birthday: user.birthday,
    address: user.address,
    profilePic: user.profilePic,
    isSuperAdmin: user.is_super_admin,
    accessToken: signAccessToken(user.email),
    expires_at: new Date(
      Date.now() + process.env.ACCESS_TOKEN_EXPIRE * 60 * 1000
    ),
  });
};
