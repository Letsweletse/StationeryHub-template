import './globals.css';

export const metadata = {
  title: 'StationeryHub — Enterprise Office Solutions Botswana',
  description: 'Premium stationery, cartridges, office furniture, print supplies and technology for Botswana businesses with fast WhatsApp ordering.',
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
