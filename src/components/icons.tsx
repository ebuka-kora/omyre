export function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconBag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 8h12l-1 12H7L6 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V7a3 3 0 0 1 6 0v1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconHeart({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden>
      <path
        d="M12 20s-7-4.4-7-9.2C5 8 6.8 6.5 9 6.5c1.3 0 2.4.6 3 1.5.6-.9 1.7-1.5 3-1.5 2.2 0 4 1.5 4 4.3C19 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconUser({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M5.5 19c.8-3.2 3.3-5 6.5-5s5.7 1.8 6.5 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.33 4.94L2 22l5.38-1.4a10 10 0 0 0 4.66 1.12h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm0 17.95h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.19.83.85-3.1-.2-.32a8.16 8.16 0 0 1-1.26-4.37c0-4.5 3.69-8.16 8.23-8.16 4.54 0 8.23 3.66 8.23 8.16 0 4.5-3.69 8.16-8.17 8.16Zm4.5-6.12c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.17.21-.58.21-1.07.14-1.17-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16.7" cy="7.3" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function IconMinus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconPlus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function LogoMark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/logo-mark.png" alt="" className={className} />
  );
}
