import styles from "./layout.module.scss";
import "@/styles/Main.css";
import "@/styles/index.scss";
import PixelCorner from "@/assets/vector/PixelCorner.svg";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang={"fr"}>
        <head></head>
        <body>
          <div id="root">
            {/* <span className={styles.glow} /> */}
            <span className={styles.border} />

            <div className={styles.corners}>
              <PixelCorner />
              <PixelCorner />
              <PixelCorner />
              <PixelCorner />
            </div>
            <div className={styles.app}>{children}</div>
          </div>
        </body>
      </html>
    </>
  );
}
