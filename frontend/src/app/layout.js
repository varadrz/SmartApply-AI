import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata = {
  title: 'Obsidian AI | Executive Career Intelligence',
  description: 'AI-powered professional networking and opportunity intelligence core.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-body bg-surface text-on-surface min-h-screen antialiased selection:bg-tertiary/30 selection:text-tertiary-container`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-64 bg-surface min-h-screen relative flex flex-col">
            <Header />
            <div className="pt-16 min-h-screen w-full flex flex-col">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
