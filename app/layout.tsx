import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/conditional-layout';

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: 'Paul Yoon',
  description: 'Stanford University Undergraduate studying Computer Science and Music',
  icons: {
    icon: [
      {
        url: '/icon-light.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">

        <head>
                <script
                    id="schema-person"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": "Paul Yoon",
                            "affiliation": {
                                "@type": "CollegeOrUniversity",
                                "name": "Stanford University"
                            },
                            "url": "https://paulyoon.com"
                        }),
                    }}
                />
            </head>
      <body className={`${_inter.variable} ${_playfair.variable} font-sans antialiased`}>
        <ConditionalLayout>
        {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}
