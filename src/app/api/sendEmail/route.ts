import { AddressFormData } from "@/components/reuse/Form/formTypes";
import { ICartProduct } from "@/data.d";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email translations
const emailTranslations = {
  en: {
    subject: "🌸Thank You for Your Order! - Order Confirmation🌸",
    title: "Thank You for Your Order!",
    greeting: (name: string) => `Dear ${name},`,
    thankYouMessage: (name: string) =>
      `Thank you for purchasing from Adhenna! I am excited to confirm that I've received your order and am processing it now. I'll make sure everything is perfect for you.`,
    orderDetails: "Order Details:",
    shippingInfo: "Shipping Information:",
    deliveryMethod: "Delivery Method:",
    yourMessage: "Your Message:",
    trackingInfo:
      "We'll send you another email with tracking information once your package is on its way.",
    questions:
      "If you have any questions about your order, please don't hesitate to contact our customer service team.",
    regards: "Best regards,",
    team: "The Team",
  },
  fr: {
    subject: "🌸Merci pour votre commande ! - Confirmation de commande🌸",
    title: "Merci pour votre commande !",
    greeting: (name: string) => `Cher/Chère ${name},`,
    thankYouMessage: (name: string) =>
      `Merci d'avoir acheté chez Adhenna ! Je suis ravie de confirmer que j'ai bien reçu votre commande et qu'elle est en cours de traitement. Je m'assurerai que tout soit parfait pour vous.`,
    orderDetails: "Détails de la commande :",
    shippingInfo: "Informations de livraison :",
    deliveryMethod: "Méthode de livraison :",
    yourMessage: "Votre message :",
    trackingInfo:
      "Nous vous enverrons un autre courriel avec les informations de suivi une fois que votre colis sera en route.",
    questions:
      "Si vous avez des questions concernant votre commande, n'hésitez pas à contacter notre service clientèle.",
    regards: "Cordialement,",
    team: "L'équipe",
  },
};

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

// Helper function to calculate order total
const calculateTotal = (cart: ICartProduct[]): number => {
  return cart.reduce(
    (total, item) => total + item.quantity * parseFloat(item.product.price),
    0
  );
};

// Generate the product table HTML
const generateProductTable = (cart: ICartProduct[]): string => {
  return `
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
          <td>${item.product.type} - ${item.product.title}</td>
          <td>${item.quantity}</td>
          <td>${formatCurrency(parseFloat(item.product.price))}</td>
          <td>${formatCurrency(
            item.quantity * parseFloat(item.product.price)
          )}</td>
        </tr>
      `
        )
        .join("")}
      <tr class="total">
        <td colspan="3">Total</td>
        <td>${formatCurrency(calculateTotal(cart))}</td>
      </tr>
    </table>
  `;
};

// Generate shipping information HTML
const generateShippingInfo = (formData: AddressFormData): string => {
  return `
    ${formData.firstName} ${formData.lastName}<br>
    ${formData.addressLine1}<br>
    ${formData.addressLine2 ? `${formData.addressLine2}<br>` : ""}
    ${formData.city}, ${formData.state} ${formData.postalCode}<br>
    ${formData.country}
  `;
};

// Generate client email template based on locale
const generateClientEmailTemplate = (
  formData: AddressFormData,
  cart: ICartProduct[],
  locale: "en" | "fr"
): string => {
  const t = emailTranslations[locale];

  return `
    <!DOCTYPE html>
    <html lang="${locale}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${t.title}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; }
        h1, h2 { color: #444; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { font-weight: bold; }
        .thank-you { background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>${t.title}</h1>
        
        <div class="thank-you">
          <p>${t.greeting(formData.firstName)}</p>
          <p>${t.thankYouMessage(formData.firstName)}</p>
        </div>
        
        <h2>${t.orderDetails}</h2>
        ${generateProductTable(cart)}
        
        <h2>${t.shippingInfo}</h2>
        <p>${generateShippingInfo(formData)}</p>
        
        <h2>${t.deliveryMethod}</h2>
        <p>${formData.delivery}</p>

        ${
          formData.message
            ? `<h2>${t.yourMessage}</h2>
               <p>${formData.message}</p>`
            : ""
        }
        
        <p>${t.trackingInfo}</p>
        
        <p>${t.questions}</p>
        
        <p>${t.regards}<br>${t.team}</p>
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: Request) {
  try {
    const {
      formData,
      cart,
      locale = "en",
    }: {
      formData: AddressFormData;
      cart: ICartProduct[];
      locale: "en" | "fr";
    } = await request.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_BUSINESS,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Generate client email template based on locale
    const clientEmailTemplate = generateClientEmailTemplate(
      formData,
      cart,
      locale
    );

    // Business Email Template (remains in English)
    const businessEmailTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order Received</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; }
          h1, h2 { color: #444; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          th { background-color: #f2f2f2; }
          .total { font-weight: bold; }
          .order-info { background-color: #f5f5f5; padding: 15px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Order Received</h1>
          
          <div class="order-info">
            <h2>Customer Information:</h2>
            <p>
              Name: ${formData.firstName} ${formData.lastName}<br>
              Email: ${formData.email}<br>
              Language: ${locale.toUpperCase()}<br>
            </p>
          </div>
          
          <h2>Order Summary:</h2>
          ${generateProductTable(cart)}
          
          <h2>Shipping Address:</h2>
          <p>${generateShippingInfo(formData)}</p>
          
          <h2>Delivery Method:</h2>
          <p>${formData.delivery}</p>

          ${
            formData.message
              ? `<h2>Customer Message:</h2>
                 <p>${formData.message}</p>`
              : ""
          }
        </div>
      </body>
      </html>
    `;

    // Send email to client
    await transporter.sendMail({
      from: `"Adhenna Order" <${process.env.EMAIL_BUSINESS}>`,
      to: formData.email,
      subject: emailTranslations[locale].subject,
      html: clientEmailTemplate,
    });

    // Send email to business
    await transporter.sendMail({
      from: `"Adhenna Cart Order" <${process.env.EMAIL_BUSINESS}>`,
      to: process.env.EMAIL_BUSINESS,
      subject: `🌸New Order - ${formData.firstName} ${
        formData.lastName
      } (${locale.toUpperCase()})🌸`,
      html: businessEmailTemplate,
    });

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to send emails", details: error.message },
      { status: 500 }
    );
  }
}
