import Product from "./page";

export default function ModalLayout({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) {
  return (
    <div>
      <Product params={Promise.resolve({ slug })} />
      {children}
    </div>
  );
}
