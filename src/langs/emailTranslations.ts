import { LangType } from "@/i18n/request";

export const emailTranslations: Record<LangType, any> = {
  en: {
    subject: "MR LED | Your Custom LED Sign Inquiry 💡",
    title: "Your Custom LED Sign Inquiry",
    greeting: (name: string) => `Hey ${name},`,
    thankYouMessage: (_name: string) =>
      `Thanks for reaching out! We’re MR LED, and we’re stoked about your custom LED sign idea. We’ll review your details and get back to you soon with pricing and next steps. Keep an eye on your inbox (and spam folder, just in case).`,
    signDetails: "Project Breakdown:",
    budget: "Your Budget Range:",
    additionalInfo: "Extra Details:",
    regards: "Talk soon,",
    team: "The MR LED Team",
  },
  fr: {
    subject: "MR LED | Votre demande de panneau LED personnalisé 💡",
    title: "Votre demande de panneau LED personnalisé",
    greeting: (name: string) => `Salut ${name},`,
    thankYouMessage: (_name: string) =>
      `Merci de nous avoir contactés ! Nous sommes MR LED, et nous sommes ravis de votre idée de panneau LED personnalisé. Nous examinerons vos détails et vous répondrons bientôt avec les prix et les prochaines étapes. Surveillez votre boîte de réception (et peut-être votre dossier spam).`,
    signDetails: "Détails du projet :",
    budget: "Votre gamme de budget :",
    additionalInfo: "Détails supplémentaires :",
    regards: "À bientôt,",
    team: "L’équipe MR LED",
  },
};
