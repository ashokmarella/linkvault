import "./globals.css";
export const metadata = {
  title: "LinkVault",
  description: "Smart Link Sharing Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}