'use client';

import Image from 'next/image';
import { useState } from 'react';
import CopyIcon from '@/components/CopyIcon';
import CheckIcon from '@/components/CheckIcon';
import { LayoutTransitionAnimation } from '@/components/LayoutTransitionAnimation';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const installCommand = 'npm install meridian-ui';
  const contactEmail = 'bdmin@ucsd.edu';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailCopy = async () => {
    await navigator.clipboard.writeText(contactEmail);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3d4f3a 1px, transparent 1px),
            linear-gradient(to bottom, #3d4f3a 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.04,
        }}
      />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16">
        <div className="flex flex-col-reverse items-center justify-center w-full gap-6 sm:gap-12">
          <div className="relative pt-[5vh] md:pt-[8vh] z-10 flex flex-col justify-center items-center w-full max-w-4xl">
            <div className="flex flex-col items-center justify-center text-center gap-4 select-none md:flex-row md:text-left md:gap-8">
              <Image
                src="/logo.svg"
                alt="Meridian"
                width={144}
                height={144}
                className="w-24 h-24 md:w-36 md:h-36"
                priority
                sizes="(max-width: 768px) 96px, 144px"
              />
              <h1 className="font-medium text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-[-0.07em] leading-[0.95]">
                Meridian
              </h1>
            </div>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-center md:text-left max-w-2xl">
              Make overview-detail interfaces malleable.
            </p>
            <div className="mt-8 max-w-2xl flex flex-col sm:flex-row sm:items-center sm:rounded-xl sm:overflow-hidden bg-foreground shadow-xl rounded-xl font-mono text-xs sm:text-sm">
              <span className="text-background px-4 py-4 text-center sm:text-left break-all">
                {installCommand}
              </span>
              <button
                onClick={handleCopy}
                className="px-4 py-2 hover:bg-background/10 cursor-pointer transition-colors text-background border-t border-background/20 sm:border-t-0 sm:border-l"
                aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a
                href="https://github.com/meridian-ui/meridian"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3 border-2 border-foreground text-foreground rounded-xl font-medium hover:bg-foreground/10 transition-colors"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://dl.acm.org/doi/full/10.1145/3746059.3747654"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3 border-2 border-foreground text-foreground rounded-xl font-medium hover:bg-foreground/10 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
                Paper
              </a>
              <div className="relative overflow-visible">
                <span className="block text-center px-8 py-3 border-2 border-foreground/40 text-foreground/40 rounded-xl font-medium cursor-not-allowed">
                  Documentation
                </span>
                <span className="absolute -top-2 -right-2 text-[10px] bg-foreground text-background px-2 py-0.5 rounded-full whitespace-nowrap pointer-events-none">
                  Coming Soon
                </span>
              </div>
              <div className="relative overflow-visible">
                <span className="block text-center px-8 py-3 border-2 border-foreground/40 text-foreground/40 rounded-xl font-medium cursor-not-allowed">
                  Examples
                </span>
                <span className="absolute -top-2 -right-2 text-[10px] bg-foreground text-background px-2 py-0.5 rounded-full whitespace-nowrap pointer-events-none">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
          <LayoutTransitionAnimation />
        </div>
      </main>
      <footer className="py-8 text-center text-sm text-foreground/60">
        <button
          onClick={handleEmailCopy}
          className="mb-3 px-4 py-2 border border-foreground/30 rounded-lg hover:bg-foreground/10 transition-colors cursor-pointer flex items-center gap-2 mx-auto"
        >
          {emailCopied ? (
            <>
              <CheckIcon />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <span>Contact Us</span>
              <CopyIcon />
            </>
          )}
        </button>
        <p>© 2026 The Meridian Team.</p>
        <p className="mt-1">
          Code – <span className="font-medium">MIT License</span>.
        </p>
      </footer>
    </div>
  );
}
