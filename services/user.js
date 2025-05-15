"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

class UserService {
  constructor() {
    this.db = db;
  }

  async createUser({ firstName, lastName, email, password }) {
    try {
      if (!firstName || !lastName || !email || !password) {
        throw new Error("All fields are required");
      }
      const user = await this.db.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
        },
      });

      return user;
    } catch (error) {
      if (error?.code === "P2002") {
        throw new Error("Email already exists");
      }
      throw new Error(error.message);
    }
  }
  async login({ email, password }) {
    try {
      const user = await this.db.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new Error("Invalid email or password!");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password!");
      }

      const token = jwt.sign(
        { id: user.id, expiresIn: "1y" },
        process.env.JWT_SECRET
      );
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async me({ token }) {
    try {
      if (!token) {
        return null;
      }
      const id = jwt.verify(token, process.env.JWT_SECRET)?.id;
      if (!id) {
        return null;
      }
      const user = await this.db.user.findUnique({
        where: { id: Number(id) },
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async resetPasswordEmail({ email }) {
    try {
      const user = await this.db.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new Error(`User not found with ${email}`);
      }
      const token = Math.random().toString(36).slice(2);
      const alreadyExists = await this.db.resetPassword.findFirst({
        where: { userId: Number(user.id) },
      });
      if (alreadyExists) {
        await this.db.resetPassword.delete({
          where: { id: Number(alreadyExists.id) },
        });
      }
      const resetPassword = await this.db.resetPassword.create({
        data: {
          userId: Number(user.id),
          token,
          expiredAt: new Date(Date.now() + 15 * 60 * 1000),
        },
      });
      this.sendMail({
        to: user.email,
        link: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetPassword?.token}&tokenId=${resetPassword?.id}`,
      });
      return resetPassword?.token ? true : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async sendMail({ to, link }) {
    let sendData;
    const expiredAt = new Date(
      Date.now() + 15 * 60 * 1000
    ).toLocaleTimeString();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject: `Reset your ChicHut password.`,
      html: `<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                            <br />
                                            <br />
                                            <span style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                This link will expire at <span style="font-weight:bold;color:#58b56e">${expiredAt}</span>.
                                            </span>
                                        </p>
                                        <a href="${link}"
                                            target="_blank"
                                            style="background:#58b56e;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    
</body>

</html>`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error:", error);
      } else {
        sendData = info;
      }
    });
  }
  async isValidResetUrl({ token, tokenId }) {
    try {
      const resetPassword = await this.db.resetPassword.findUnique({
        where: { id: Number(tokenId) },
      });
      if (!resetPassword) {
        return false;
      }
      if (token !== resetPassword?.token) {
        return false;
      }
      if (Date.now() > resetPassword?.expiredAt) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async resetPassword({ token, tokenId, password }) {
    try {
      const resetPassword = await this.db.resetPassword.findUnique({
        where: { id: Number(tokenId) },
      });
      if (!resetPassword) {
        throw new Error("Invalid reset password token");
      }
      if (token !== resetPassword?.token) {
        throw new Error("Invalid reset password token");
      }
      if (Date.now() > resetPassword?.expiredAt) {
        throw new Error("Reset password link has expired");
      }
      const pwHash = await bcrypt.hash(password, 10);
      const user = await this.db.user.update({
        where: { id: Number(resetPassword?.userId) },
        data: { password: pwHash },
      });
      await this.db.resetPassword.delete({
        where: { id: Number(tokenId) },
      });
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async otpMail({ to, otp, firstName }) {
    let sendData;
    const expiredAt = new Date(Date.now() + 5 * 60 * 1000).toLocaleTimeString();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject: `OTP for your ChicHut account verification`,
      html: `<section style="max-width: 42rem; padding: 2rem 1.5rem; margin: 0 auto; background-color: white; color: #1a202c;">


    <main style="margin-top: 2rem;">
        <h2 style="color: #4a5568;">Hi ${firstName},</h2>

        <p style="margin-top: 0.5rem; line-height: 1.75; color: #718096;">
            This is your verification code:
        </p>

        <div style="color: #58b56e; font-size: 2rem; font-weight: bold; margin-top: 1rem; line-height: 1.75;">${otp?.toString()}</div>

        <p style="margin-top: 1rem; line-height: 1.75; color: #718096;">
            This code will only be valid for the <span style="font-weight: bold; color: #58b56e;">${expiredAt}</span>. If the code does not work, you can generate a new one.
        </p>

        <p style="margin-top: 2rem; color: #718096;">
            Thanks, <br>
            ChicHut team
        </p>
    </main>

    <footer style="margin-top: 2rem;">
      

        <p style="margin-top: 0.75rem; color: #a0aec0;">© ${new Date().getFullYear()} ChicHut. All Rights Reserved.</p>
    </footer>
</section>
`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error:", error);
      } else {
        sendData = info;
      }
    });
  }
  async sendOtp({ firstName, lastName, email, password }) {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const userAlreadyExists = await this.db.user.findFirst({
        where: { email },
      });
      if (userAlreadyExists) {
        throw new Error("User already exists");
      }
      const alreadyExists = await this.db.otp.findFirst({
        where: { email },
      });
      if (alreadyExists) {
        const pwHash = await bcrypt.hash(password, 10);
        await this.db.otp.update({
          where: { id: Number(alreadyExists.id) },
          data: {
            firstName,
            lastName,
            email,
            password: pwHash,
            otp,
            expiredAt: new Date(Date.now() + 5 * 60 * 1000),
          },
        });
        this.otpMail({ to: email, otp, firstName });
        return alreadyExists?.id;
      } else {
        const pwHash = await bcrypt.hash(password, 10);
        const createdOtp = await this.db.otp.create({
          data: {
            firstName,
            lastName,
            email,
            password: pwHash,
            otp,
            expiredAt: new Date(Date.now() + 5 * 60 * 1000),
          },
        });
        this.otpMail({ to: email, otp, firstName });
        return createdOtp?.id;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async isValidOtpUrl({ id }) {
    try {
      const otp = await this.db.otp.findUnique({
        where: { id: Number(id) },
      });
      if (!otp) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  async verifyOtp({ id, otp }) {
    try {
      const otpFromDb = await this.db.otp.findUnique({
        where: { id: Number(id) },
      });
      if (!otpFromDb) {
        throw new Error("OTP not found");
      }
      if (
        otpFromDb?.otp?.toString() !== otp?.toString() ||
        Date.now() > otpFromDb?.expiredAt
      ) {
        throw new Error("Invalid OTP or OTP has expired");
      }
      this.createUser({
        firstName: otpFromDb?.firstName,
        lastName: otpFromDb?.lastName,
        email: otpFromDb?.email,
        password: otpFromDb?.password,
      });
      await this.db.otp.delete({
        where: { id: Number(id) },
      });
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async regenerateOtp({ id }) {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpFromDb = await this.db.otp.findUnique({
        where: { id: Number(id) },
      });
      if (!otpFromDb) {
        throw new Error("OTP not found");
      }
      await this.db.otp.update({
        where: { id: Number(id) },
        data: {
          otp,
          expiredAt: new Date(Date.now() + 5 * 60 * 1000),
        },
      });
      this.otpMail({
        to: otpFromDb?.email,
        otp,
        firstName: otpFromDb?.firstName,
      });
      return otpFromDb?.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async isAuthenticated({ token }) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded?.id) {
        throw new Error("Unauthorized");
      }
      const user = await this.db.user.findUnique({
        where: { id: Number(decoded?.id) },
      });
      if (!user) {
        throw new Error("Unauthorized");
      }
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Unauthorized");
    }
  }
}

export default UserService;
