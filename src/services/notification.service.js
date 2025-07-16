const { createError } = require("../configs/errorConfig.js");
const { Notification } = require("../models/index.js");
const { ObjectId } = require("mongodb");
const {
  resetPasswordEmail,
  otpEmailTemplate,
} = require("../utils/emailTemplates.js");
const { emailConnect } = require("../configs/emailConfig.js");

// Add New Notification Settings
const createNotification = async (body) => {
  let payload = {
    title: body.title,
    type: body.type,
    description: body.description,
    data: body.data,
  };
  if (body?.branch_id) {
    payload[branch_id] = new ObjectId(body.branch_id);
  }
  if (body?.user_id) {
    payload[body?.user_id] = new ObjectId(body.user_id);
  }

  try {
    const notificationRsp = new Notification(payload);
    return await notificationRsp.save();
  } catch (error) {
    throw new Error(error);
  }
};

const sendEmail = async (payload, template) => {
  try {
    const transporter = await emailConnect(); // ✅ Await the transporter

    let info = await transporter.sendMail({
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      html: template,
    });

    console.log("Email sent successfully!");
    // console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(error);
  }
};

const resetPasswordlink = async (to, body) => {
  return await Promise.all([
    createNotification({
      title: "reset password link",
      type: "email",
      description: "Link has been sent to your email to reset your password.",
      data: body,
      user_id: body.user_id,
    }),
    sendEmail(
      {
        from: `"TumaRide"<${process.env.SMTP_EMAIL_ID}>`,
        to: to,
        subject: "Reset Password Notification",
      },
      resetPasswordEmail(body)
    ),
  ]);
};

const sendOTPemail = async (to, body) => {
  return await Promise.all([
    createNotification({
      title: "OTP verification",
      type: "email",
      description: "OTP has been sent for verification",
      data: body,
      user_id: body.user_id,
    }),
    sendEmail(
      {
        from: `"TumaRide"<${process.env.SMTP_EMAIL_ID}>`,
        to: to,
        subject: "OTP Verification code",
      },
      otpEmailTemplate(body)
    ),
  ]);
};

module.exports = {
  createNotification,
  resetPasswordlink,
  sendOTPemail,
};
