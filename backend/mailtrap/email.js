import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import { client, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await client.send({
      from: sender,
      to: [{ email }],
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email verification",
    });

    console.log("Verification code sent", response);
  } catch (error) {
    console.log("Error sending verification code :: ", error);
  }
};

export const sendWelcomeEmail = async (name, email) => {
  try {
    const response = await client.send({
      from: sender,
      to: [{ email }],
      template_uuid: "c67c620a-33a8-48b4-87e2-7a2e521c8e50",
      template_variables: {
        company_info_name: "Roy Company",
        name,
      },
    });

    console.log("Welcome email sent", response);
  } catch (error) {
    console.log("Error sending welcome email :: ", error);
  }
};

export const sendPasswordResetEmail = async (email, url) => {
  try {
    const response = await client.send({
      from: sender,
      to: [{ email }],
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
      category: "Password reset",
    });

    console.log("Password reset email sent", response);
  } catch (error) {
    console.log("Error sending password reset mail :: ", error);
  }
};

export const sendPasswordResetSuccessEmail = async (email) => {
  try {
    const response = await client.send({
      from: sender,
      to: [{ email }],
      subject: "Password reset success",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password reset",
    });

    console.log("Password reset success email sent", response);
  } catch (error) {
    console.log("Error sending password reset success mail :: ", error);
  }
};
