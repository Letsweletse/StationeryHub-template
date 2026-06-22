import './globals.css';
import SalesContactStrip from './components/SalesContactStrip';

export const metadata = {
  title: 'StationeryHub Botswana',
  description: 'Office supplies, cartridges, furniture and technology ordering in Botswana.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SalesContactStrip />
        {children}
      </body>
    </html>
  );
}
