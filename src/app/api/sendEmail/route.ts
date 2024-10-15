import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { formData, cart } = await request.json();
    console.log("Received data:", formData, cart);

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Transporter created");

    const mailOptions = {
      from: `"Your Company" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: "Order Confirmation - Thank You for Your Purchase!",
      html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; }
              h1, h2 { color: #444; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
              th { background-color: #f2f2f2; }
              .total { font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Order Confirmation</h1>
              <p>Dear ${formData.firstName} ${formData.lastName},</p>
              <p>Thank you for your order! We're excited to confirm that we've received your purchase and are processing it now.</p>
              
              <h2>Order Details:</h2>
              <table>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
                ${cart
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.product.title}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.product.price}</td>
                    <td>$${(
                      item.quantity * parseFloat(item.product.price)
                    ).toFixed(2)}</td>
                  </tr>
                `
                  )
                  .join("")}
                <tr class="total">
                  <td colspan="3">Total</td>
                  <td>$${cart
                    .reduce(
                      (total, item) =>
                        total + item.quantity * parseFloat(item.product.price),
                      0
                    )
                    .toFixed(2)}</td>
                </tr>
              </table>
              
              <h2>Shipping Information:</h2>
              <p>
                ${formData.firstName} ${formData.lastName}<br>
                ${formData.addressLine}<br>
                ${formData.city}, ${formData.province} ${
        formData.postalCode
      }<br>
                ${formData.country}
              </p>
              
              <h2>Contact Information:</h2>
              <p>Email: ${formData.email}</p>
              
              <p>We will process your order soon and send you a shipping confirmation email once your package is on its way.</p>
              
              <p>If you have any questions about your order, please don't hesitate to contact our customer service team.</p>
              
              <p>Thank you for choosing Your Company!</p>
              
              <p>Best regards,<br>The Your Company Team</p>
            </div>
          </body>
          </html>
        `,
    };

    console.log("Sending email with options:", mailOptions);

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error.message },
      { status: 500 }
    );
  }
}
