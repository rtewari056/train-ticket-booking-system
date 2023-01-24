// Database connection
import database from "../config/mysql.config.js";

// Util
import ErrorResponse from "../util/errorResponse.js";

// @description     Get all agent
// @route           GET /api/agent
// @access          Private (Super Admin)

export const getAllAgent = async (req, res, next) => {
  try {
    const superAdminEmail = req.decoded.email;

    // Check if 'superAdminEmail' have the permission to get all agents
    const [[isSuperAdmin]] = await database.query(
      "SELECT user.is_super_admin FROM user WHERE user.email = ?",
      [superAdminEmail]
    );

    if (!isSuperAdmin.is_super_admin) {
      return next(
        new ErrorResponse("You do not have permission to get the data", 403)
      );
    }

    // If everything is good, get all agents
    const [data] = await database.query(
      "SELECT user.name, user.email, user.mobile, user.birthday, user.address, user.profilePic FROM user WHERE user.is_super_admin = 0"
    );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return next(error);
  }
};

// @description     Delete an agent
// @route           DELETE /api/agent
// @access          Private (Super Admin)

export const deleteAgent = async (req, res, next) => {
  try {
    const { email } = req.body;
    const superAdminEmail = req.decoded.email;

    // Check if email is undefined
    if (!email) {
      return next(new ErrorResponse("Please provide email of the agent", 400));
    }

    // Check if the email exist or not
    const [[emailExists]] = await database.query(
      "SELECT user.email FROM user WHERE user.email = ?",
      [email]
    );
    if (!emailExists) {
      return next(new ErrorResponse("User not present in database", 400));
    }

    // Check if 'superAdminEmail' have the permission to delete the agent
    const [[isSuperAdmin]] = await database.query(
      "SELECT user.is_super_admin FROM user WHERE user.email = ?",
      [superAdminEmail]
    );

    if (!isSuperAdmin.is_super_admin) {
      return next(
        new ErrorResponse("You do not have permission to delete agents", 403)
      );
    }

    // If everything is good, delete the agent
    await database.query("DELETE FROM user WHERE user.email = ?", [email]);

    return res.status(200).json({
      success: true,
      message: `${email} has been deleted`,
    });
  } catch (error) {
    return next(error);
  }
};
