import nodemailer from "nodemailer";

const sendPinEmail = async (email, pin) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Login PIN",
    text: `Your login PIN is: ${pin}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendPinEmail;
