import React from 'react';

interface HotelLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  showText?: boolean;
  textColor?: string;
  variant?: 'circle' | 'mark-only' | 'full';
}

export const HotelLogo: React.FC<HotelLogoProps> = ({
  className = 'w-10 h-10',
  size = 'custom',
  showText = false,
  textColor = 'text-white',
  variant = 'circle'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    custom: className
  }[size];

  const logoSvg = (
    <img
      src="/logo.svg"
      alt="Hotel Bridge Logo"
      className={`${sizeClasses} object-contain select-none shrink-0 drop-shadow-md`}
      loading="eager"
    />
  );

  if (!showText) {
    return logoSvg;
  }

  return (
    <div className="flex items-center gap-3">
      {logoSvg}
      <div className="flex flex-col">
        <span className={`font-serif tracking-[0.18em] uppercase text-sm font-bold ${textColor} leading-tight`}>
          HOTEL BRIDGE
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#C59B4B] font-semibold">
          UNNAO
        </span>
      </div>
    </div>
  );
};
