import './globals.css';

export const metadata = {
  title: 'StationeryHub - Office Supplies in Botswana',
  description: 'Your one-stop shop for quality stationery, office furniture, and business supplies in Botswana',
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
