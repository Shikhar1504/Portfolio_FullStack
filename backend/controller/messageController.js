import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { senderName, email, message } = req.body;
  if (!senderName || !email || !message) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const data = await Message.create({ senderName, email, message });
  const subject = `New Portfolio Message from ${senderName}`;
  const emailMessage = `
You have received a new message from your portfolio site:

Name: ${senderName}
Email: ${email}

Message:
${message}
  `;

  // Use your reusable sendEmail function
  try {
    await sendEmail({
      email: process.env.SMTP_MAIL, // your email to receive it
      subject,
      message: emailMessage,
    });
    await sendEmail({
      email, // this is the sender's email
      subject: "Thanks for contacting me!",
      message: `
    Hi ${senderName},
    
    Thank you for reaching out! I’ve received your message and will get back to you as soon as possible.
    
    Best regards,  
    Shikhar Sinha
        `,
    });
  } catch (err) {
    console.error("Email send error:", err);
    return next(
      new ErrorHandler("Message saved but failed to send email.", 500)
    );
  }
  res.status(201).json({
    success: true,
    message: "Message Sent",
    data,
  });
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message Already Deleted!", 400));
  }
  await message.deleteOne();
  res.status(201).json({
    success: true,
    message: "Message Deleted",
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(201).json({
    success: true,
    messages,
  });
});
