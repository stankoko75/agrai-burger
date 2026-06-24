'use client';

interface LogoProps {
  size?: number;
  className?: string;
}

export function AgraiBurgerLogo({ size = 48, className = '' }: LogoProps) {
  return (
    <img
      src="/images/logo.png"
      alt="Agraï Burger"
      style={{ height: size, width: 'auto' }}
      className={className}
    />
  );
}
