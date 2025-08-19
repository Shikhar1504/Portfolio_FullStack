import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { supabase } from "../utils/supabase.js"; // add this

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar and Resume are Required!", 400));
  }
  const { avatar, resume } = req.files;

  //POSTING AVATAR
  const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "PORTFOLIO AVATAR" }
  );
  if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForAvatar.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }

  //POSTING RESUME
  //   const cloudinaryResponseForResume = await cloudinary.uploader.upload(
  //     resume.tempFilePath,
  //     { folder: "PORTFOLIO RESUME" }
  //   );

  //   if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
  //     console.error(
  //       "Cloudinary Error:",
  //       cloudinaryResponseForResume.error || "Unknown Cloudinary error"
  //     );
  //     return next(new ErrorHandler("Failed to upload resume to Cloudinary", 500));
  //   }

  // SUPABASE: Upload downloadable resume
  console.log("Files received:", req.files);
  console.log("Resume tempFilePath:", resume?.tempFilePath);

  const fileBuffer = await fs.readFile(resume.tempFilePath);
  const fileExt = path.extname(resume.name);
  const fileName = `resume-${Date.now()}${fileExt}`;

  const { error: supabaseError } = await supabase.storage
    .from("resumes")
    .upload(fileName, fileBuffer, {
      contentType: resume.mimetype,
      upsert: false,
    });

  if (supabaseError) {
    return next(new ErrorHandler("Failed to upload resume to Supabase", 500));
  }

  const { data: publicURLData } = supabase.storage
    .from("resumes")
    .getPublicUrl(fileName);
  const supabaseResumeURL = publicURLData.publicUrl;

  const {
    fullName,
    email,
    phone,
    skills,
    aboutMe,
    aboutCards,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
    location,
    youtubeURL,
    leetcodeURL,
    codeforcesURL,
    codechefURL,
  } = req.body;
  const user = await User.create({
    fullName,
    email,
    phone,
    skills: skills.split(",").map((skill) => skill.trim()),
    aboutMe,
    aboutCards: aboutCards ? JSON.parse(aboutCards) : [],
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
    location,
    youtubeURL,
    leetcodeURL,
    codeforcesURL,
    codechefURL,
    avatar: {
      public_id: cloudinaryResponseForAvatar.public_id, // Set your cloudinary public_id here
      url: cloudinaryResponseForAvatar.secure_url, // Set your cloudinary secure_url here
    },
    // resume: {
    //   public_id: cloudinaryResponseForResume.public_id, // Set your cloudinary public_id here
    //   url: cloudinaryResponseForResume.secure_url, // Set your cloudinary secure_url here
    // },
    resume: {
      public_id: fileName,
      url: supabaseResumeURL,
      filename: resume.name,
    },
  });
  generateToken(user, "Registered Successfully!", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  generateToken(user, "User logged in successfully", 200, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .json({
      success: true,
      message: "User logged out successfully",
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    skills: req.body.skills
      ? req.body.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [],

    aboutMe: req.body.aboutMe,
    aboutCards: req.body.aboutCards
      ? (() => {
          try {
            return JSON.parse(req.body.aboutCards);
          } catch (e) {
            return [];
          }
        })()
      : undefined,
    githubURL: req.body.githubURL,
    instagramURL: req.body.instagramURL,
    portfolioURL: req.body.portfolioURL,
    facebookURL: req.body.facebookURL,
    twitterURL: req.body.twitterURL,
    linkedInURL: req.body.linkedInURL,
    location: req.body.location,
    youtubeURL: req.body.youtubeURL,
    leetcodeURL: req.body.leetcodeURL,
    codeforcesURL: req.body.codeforcesURL,
    codechefURL: req.body.codechefURL,
  };
  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);
    const profileImageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(profileImageId);
    const newProfileImage = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      {
        folder: "PORTFOLIO AVATAR",
      }
    );
    newUserData.avatar = {
      public_id: newProfileImage.public_id,
      url: newProfileImage.secure_url,
    };
  }

  //   if (req.files && req.files.resume) {
  //     const resume = req.files.resume;
  //     const user = await User.findById(req.user.id);
  //     const resumeFileId = user.resume.public_id;
  //     if (resumeFileId) {
  //       await cloudinary.uploader.destroy(resumeFileId);
  //     }
  //     const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
  //       folder: "PORTFOLIO RESUME",
  //     });

  //     newUserData.resume = {
  //       public_id: newResume.public_id,
  //       url: newResume.secure_url,
  //     };
  //   }

  // ✅ Supabase resume (PDF download)
  if (req.files && req.files.resume) {
    const pdfResume = req.files.resume;

    const fileBuffer = await fs.readFile(pdfResume.tempFilePath);
    const fileExt = path.extname(pdfResume.name);
    const fileName = `resume-${Date.now()}${fileExt}`;

    const { error: supabaseError } = await supabase.storage
      .from("resumes")
      .upload(fileName, fileBuffer, {
        contentType: pdfResume.mimetype,
        upsert: false,
      });

    if (supabaseError) {
      return next(new ErrorHandler("Failed to upload resume to Supabase", 500));
    }

    const { data: publicURLData } = supabase.storage
      .from("resumes")
      .getPublicUrl(fileName);

    newUserData.resume = {
      public_id: fileName,
      url: publicURLData.publicUrl,
      filename: pdfResume.name,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Profile Updated!",
    user,
  });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please Fill All Fields.", 400));
  }
  const isPasswordMatched = await user.comparePassword(currentPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect Current Password!"));
  }
  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler("New Password And Confirm New Password Do Not Match!")
    );
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Updated!",
  });
});

export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  const id = process.env.ID;
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Found!", 404));
  }
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

  const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl}  \n\n If 
    You've not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Personal Portfolio Dashboard Password Recovery`,
      message,
    });
    res.status(201).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired.",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password & Confirm Password do not match"));
  }
  user.password = await req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  generateToken(user, "Reset Password Successfully!", 200, res);
});
