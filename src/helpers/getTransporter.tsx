import nodemailer from "nodemailer";
export function getTransporter(): nodemailer.Transporter {
  const isDev = process.env.NODE_ENV === "development";
  console.log("isDev", process.env.NODE_ENV);
  // const transporter = nodemailer.createTransport(
  //   isDev
  //     ? {
  //         host: "smtp.gmail.com",
  //         port: 465,
  //         secure: true,
  //         auth: {
  //           user: process.env.EMAIL_BUSINESS,
  //           pass: process.env.EMAIL_PASS,
  //         },
  //       }
  //     : {
  //         host: "node19-ca.n0c.com",
  //         port: 587,
  //         secure: false,
  //         auth: {
  //           user: process.env.EMAIL_BUSINESS,
  //           pass: process.env.EMAIL_PASS,
  //         },
  //       }
  // );
  // const setoTransporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: process.env.EMAIL_BUSINESS,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });
  const mrLedTransporter = nodemailer.createTransport({
    host: "node19-ca.n0c.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_BUSINESS,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  return mrLedTransporter;
}
