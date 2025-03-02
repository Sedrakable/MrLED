import {
  ContactFormData,
  EncodedFileType,
} from "@/components/reuse/Form/formTypes";
import { LangType } from "@/i18n/request";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import routeStyles from "../routeStyle";

// Prepare images as attachments and link them via CID
const prepareAttachments = (attachments: EncodedFileType[]) => {
  return attachments.map((attach) => ({
    filename: attach.name,
    content: Buffer.from(attach.data, "base64"),
    contentType: attach.type, // Use the file name as the CID for each image
  }));
};

// Email translations
const emailTranslations = {
  fr: {
    subject: "🌸Confirmation de rendez-vous🌸",
    title: "Votre rendez-vous chez Adhenna!",
    greeting: (name: string) => `Cher/Chère ${name},`,
    thankYouMessage: (name: string) =>
      `Merci d’avoir contacté Adhenna Tattoo pour votre prochain projet de henné ou de tatouage permanent ! Nous vous enverrons bientôt un courriel pour fixer une date afin de réaliser votre œuvre. Surveillez votre boîte de réception (et vos pourriels, au besoin). 😊`,
    serviceDetails: "Détails du service:",
    dimensions: "Dimensions demandées:",
    availability: "Disponibilités:",
    additionalInfo: "Informations supplémentaires:",
    regards: "Cordialement,",
    team: "Alexia - Adhenna Tattoo",
  },
};

// Generate client email template based on locale
const generateClientEmailTemplate = (
  formData: ContactFormData,
  locale: LangType
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
            <span class="detail-label">${t.serviceDetails}</span>
            <p>${formData.plan}</p>
          </div>
          
          <div class="detail-item">
            <span class="detail-label">${t.dimensions}</span>
            <p>${formData.width}" x ${formData.length}"</p>
          </div>
          
          <div class="detail-item">
            <span class="detail-label">${t.availability}</span>
            <p>${formData.availabilities}</p>
          </div>
          
          ${
            formData.info
              ? `
          <div class="detail-item">
            <span class="detail-label">${t.additionalInfo}</span>
            <p>${formData.info}</p>
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
  console.log("sending email");
  try {
    const {
      formData,
      locale,
    }: {
      formData: ContactFormData;
      locale: LangType;
    } = await request.json();

    const attachments = prepareAttachments(formData.uploads); // Prepare attachments

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_BUSINESS,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Generate client email template
    const clientEmailTemplate = generateClientEmailTemplate(formData, locale);

    // Business email template
    const businessEmailTemplate = `
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>New Consultation Request</title>
      <style>
        ${routeStyles}
      </style>
   </head>
   <body>
     <div class="container">
       <h1>New Consultation Request</h1>
       
       <div class="thank-you">
         <h2>Customer Information:</h2>
         <p>
           Name: ${formData.firstName} ${formData.lastName}<br>
           Email: ${formData.email}<br>
           Language: ${locale.toUpperCase()}<br>
         </p>
       </div>

       <div class="thank-you">
         <h2>Service Details:</h2>
         <p>
           Service: ${formData.service}<br>
           Plan: ${formData.plan}<br>
           Dimensions: ${formData.width}" x ${formData.length}"<br>
           Availability: ${formData.availabilities}
         </p>
         
         ${
           formData.info
             ? `
         <h2>Additional Information:</h2>
         <p>${formData.info}</p>
         `
             : ""
         }
         
        
       </div>
     </div>
   </body>
   </html>
 `;

    await transporter.sendMail({
      from: `"Adhenna Tattoo" <${process.env.EMAIL_BUSINESS}>`,
      to: formData.email,
      subject: emailTranslations[locale].subject,
      html: clientEmailTemplate,
      attachments,
    });

    // Send email to business
    await transporter.sendMail({
      from: `"Adhenna Randez-vous" <${process.env.EMAIL_BUSINESS}>`,
      to: process.env.EMAIL_BUSINESS,
      subject: `🌸Nouveau rendez-vous - ${formData.firstName} ${
        formData.lastName
      } (${locale.toUpperCase()})🌸`,
      html: businessEmailTemplate,
      attachments,
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
