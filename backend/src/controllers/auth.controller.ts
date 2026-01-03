import { Request, Response } from "express";
import { loginAdmin } from "../services/auth.service";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    console.log("hwloo anurag")
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const data = await loginAdmin(email, password);


    res.cookie("admin_token", data.token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Login successful",
      admin: {
        id: data.admin._id,
        email: data.admin.email,
      },
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
