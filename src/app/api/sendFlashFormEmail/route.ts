import { FlashFormData } from "@/components/reuse/Form/formTypes";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import routeStyles from "../routeStyle";

// Email translations
const emailTranslations = {
  fr: {
    subject: "🌸Réservation de Flash Tattoo🌸",
    title: "Votre réservation de Flash chez Adhenna!",
    greeting: (name: string) => `Cher/Chère ${name},`,
    thankYouMessage: (name: string) =>
      `Merci d’avoir réservé un flash avec Adhenna Tattoo! Un courriel vous sera envoyé sous peu pour fixer un rendez-vous. Surveillez votre boîte de réception (et vos pourriels, au besoin).😊`,
    flashDetails: "Flash sélectionné:",
    bodyPosition: "Position sur le corps:",
    availability: "Disponibilités:",
    additionalInfo: "Commentaires additionnels:",
    regards: "Cordialement,",
    team: "Alexia - Adhenna Tattoo",
  },
};

// Generate client email template based on locale
const generateClientEmailTemplate = (
  formData: FlashFormData,
  locale: "fr",
  currentUrl: string
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
        ${routeStyles}
      </style>
    </head>
    <body>
      <div class="container">
        <h1>${t.title}</h1>
        
        <div class="thank-you">
          <p>${t.greeting(formData.firstName)}</p>
          <p>${t.thankYouMessage(formData.firstName)}</p>
        </div>
        
        <div class="thank-you">
          <div class="detail-item">
            <span class="detail-label">${t.flashDetails}</span>
            <p>${
              formData.selectedFlash
            } - <a href="${currentUrl}">${currentUrl}</a></p>
          </div>

         
          
          <div class="detail-item">
            <span class="detail-label">${t.bodyPosition}</span>
            <p>${formData.bodyPosition}</p>
          </div>
          
          <div class="detail-item">
            <span class="detail-label">${t.availability}</span>
            <p>${formData.availabilities}</p>
          </div>
          
          ${
            formData.additionalComments
              ? `
          <div class="detail-item">
            <span class="detail-label">${t.additionalInfo}</span>
            <p>${formData.additionalComments}</p>
          </div>
          `
              : ""
          }
        </div>
        
         <span class="detail-label">${t.regards}<br>${t.team}</span>
        
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: Request) {
  try {
    const {
      formData,
      currentUrl,
    }: {
      formData: FlashFormData;
      currentUrl: string;
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

    const locale = "fr"; // Since the form is in French

    // Generate client email template
    const clientEmailTemplate = generateClientEmailTemplate(
      formData,
      locale,
      currentUrl
    );

    // Business email template
    const businessEmailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Flash Tattoo Request</title>
      <style>
        ${routeStyles}
      </style>
    </head>
    <body>
      <div class="container">
        <h1>New Flash Tattoo Request</h1>
        
        <div class="thank-you">
          <h2>Customer Information:</h2>
          <p>
             <strong>Name:</strong> ${formData.firstName} ${
      formData.lastName
    }<br>
             <strong>Email:</strong> ${formData.email}<br>
            <strong>Chosen Flash:</strong> ${currentUrl}<br>
          </p>
        </div>

        <div class="thank-you">
          <h2>Flash Tattoo Details:</h2>
          <p>
            <strong>Selected Flash:</strong> ${formData.selectedFlash}<br>
            <strong>Body Position:</strong> ${formData.bodyPosition}<br>
            <strong>Availability:</strong> ${formData.availabilities}
          </p>
          
          ${
            formData.additionalComments
              ? `
          <h2>Additional Comments:</h2>
          <p>${formData.additionalComments}</p>
          `
              : ""
          }
        </div>
      </div>
    </body>
    </html>
  `;

    // Send email to client
    await transporter.sendMail({
      from: `"Adhenna Tattoo" <${process.env.EMAIL_BUSINESS}>`,
      to: formData.email,
      subject: emailTranslations[locale].subject,
      html: clientEmailTemplate,
    });

    // Send email to business
    await transporter.sendMail({
      from: `"Adhenna Flash" <${process.env.EMAIL_BUSINESS}>`,
      to: process.env.EMAIL_BUSINESS,
      subject: `🌸Nouvelle réservation Flash - ${formData.firstName} ${formData.lastName}🌸`,
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
