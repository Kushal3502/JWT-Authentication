import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
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
