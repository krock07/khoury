import '@fontsource-variable/inter-tight';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/jetbrains-mono';
import 'lenis/dist/lenis.css';
import '../styles/base.css';
import '../styles/layout.css';
import '../styles/sections.css';

const description =
  'Khoury Smith is an Atlanta-based Tech Lead Frontend Engineer and designer building fast, considered websites, apps and interfaces.';

export const metadata = {
  title: 'Khoury Smith — Tech Lead Frontend Engineer',
  description,
  openGraph: {
    title: 'Khoury Smith — Tech Lead Frontend Engineer',
    description,
    type: 'website',
  },
  twitter: { card: 'summary' },
};

export const viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
