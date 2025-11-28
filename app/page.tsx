'use client';

import Image from 'next/image';
import { useState } from 'react';
import CopyIcon from '@/components/CopyIcon';
import CheckIcon from '@/components/CheckIcon';
import { LayoutTransitionAnimation } from '@/components/LayoutTransitionAnimation';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const installCommand = 'npm install @meridian-ui/meridian';
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
      <main className="flex-1 flex flex-col items-center justify-center py-16">
        <div className="flex flex-col-reverse items-center justify-center">
          <div className="relative pt-[11vh] z-10 flex flex-col items-center">
            <div className="flex items-center gap-8 justify-center select-none">
              <Image
                src="/logo.svg"
                alt="Meridian"
                width={144}
                height={144}
                priority
              />
              <h1 className="text-9xl tracking-[-0.07em]">Meridian</h1>
            </div>
            <p className="mt-8">
              Malleable user interfaces for the real world.
            </p>
            <div className="mt-8 flex items-center gap-2 bg-foreground shadow-xl  rounded-xl  font-mono text-sm">
              <span className="text-background px-6 py-4">
                {installCommand}
              </span>
              <button
                onClick={handleCopy}
                className="ml-4 p-2 mr-2 hover:bg-background/10 cursor-pointer rounded transition-colors text-background"
                aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="relative">
                <span className="px-8 py-3 bg-foreground/40 text-background/70 rounded-xl font-medium shadow-lg cursor-not-allowed inline-block">
                  Documentation
                </span>
                <span className="absolute -top-2 -right-2 text-[10px] bg-foreground text-background px-2 py-0.5 rounded-full whitespace-nowrap">
                  Coming Soon!
                </span>
              </div>
              <div className="relative">
                <span className="px-8 py-3 border-2 border-foreground/40 text-foreground/40 rounded-xl font-medium cursor-not-allowed inline-block">
                  Examples
                </span>
                <span className="absolute -top-2 -right-2 text-[10px] bg-foreground text-background px-2 py-0.5 rounded-full whitespace-nowrap">
                  Coming Soon!
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
        <p>© 2025 The Meridian Team.</p>
        <p className="mt-1">
          Code – <span className="font-medium">MIT License</span>. Paper –{' '}
          <span className="font-medium">CC BY-NC-SA 4.0</span>.
        </p>
      </footer>
    </div>
  );
}
