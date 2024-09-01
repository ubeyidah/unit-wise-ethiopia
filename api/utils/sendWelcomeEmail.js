import nodemailer from "nodemailer";

export const sendWelcomeEmail = async ({ email, res, name }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: "unitwiseethiopia@gmail.com",
      to: email,
      subject: `Welcome to Unit Wise Ethiopia`, // Subject line
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Unit Wise Ethiopia</title>
    <style>
        /* General Styles */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .header img {
            max-width: 160px;
            margin-bottom: 10px;
            border-radius: 50%;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
            color: #333333;
        }
        .content h2 {
            font-size: 20px;
            margin-bottom: 20px;
        }
        .content p {
            font-size: 16px;
            margin-bottom: 20px;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            font-size: 16px;
            color: #fff !important;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #45a049;
        }
        .footer {
            padding: 10px 20px;
            text-align: center;
            background-color: #f4f4f4;
            color: #777777;
            font-size: 14px;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header with Logo -->
        <div class="header">
            <img src="https://lh3.googleusercontent.com/-Cqu0NVw-lsI/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfknAiMT03u3iZmg2HQbwJ3PlGZQSZA/photo.jpg?sz=46" alt="Unit Wise Ethiopia Logo" class="logo">
            <h1>Welcome to Unit Wise Ethiopia!</h1>
        </div>

        <!-- Content Section -->
        <div class="content">
            <h2>Your Account is Verified!</h2>
            <p>Dear ${name},</p>
            <p>We're excited to welcome you to <strong>Unit Wise Ethiopia</strong>. Your account has been successfully verified, and your payment is confirmed. You can now access all the features of our platform.</p>
            <p>To get started, simply click the button below to visit your dashboard.</p>
            
            <!-- Button -->
            <a href="${process.env.CLIENT_URL}/dashboard" class="button">Go to Dashboard</a>

            <p>If you have any questions or need assistance, feel free to <a href="mailto:uwe.ethiopia@gmail.com">contact our support team</a>.</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Thank you for choosing Unit Wise Ethiopia. We wish you the best in your educational journey!</p>
            <p>&copy; 2024 Unit Wise Ethiopia. All rights reserved.</p>
            <p><a href="${process.env.CLIENT_URL}">Visit our website</a></p>
        </div>
    </div>
</body>
</html>
`,
    });
  } catch (error) {
    console.log("error while sending welcome email: ", error.message);
    res.status(400).json({
      message: "Unable to send email. please check your internet",
      success: false,
    });
  }
};
