import React from 'react';

// ==========================================
// 1. Pixel Button
// ==========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'accent' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const PixelButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyle = "font-pixel border-4 border-black text-center select-none transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-white shadow-pixel hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pixel-sm",
    secondary: "bg-secondary text-white shadow-pixel hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pixel-sm",
    danger: "bg-[#f43f5e] text-white shadow-pixel hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pixel-sm",
    accent: "bg-accent text-black shadow-pixel hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pixel-sm",
    success: "bg-success text-black shadow-pixel hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pixel-sm",
    ghost: "bg-transparent text-text border-transparent shadow-none hover:bg-surface/50 active:bg-surface"
  };

  const sizes = {
    sm: "text-[10px] px-3 py-1.5 border-2 active:translate-x-[2px] active:translate-y-[2px]",
    md: "text-xs px-5 py-3",
    lg: "text-sm px-7 py-4"
  };

  const finalVariant = variants[variant] || variants.primary;
  const finalSize = sizes[size] || sizes.md;

  return (
    <button
      className={`${baseStyle} ${finalVariant} ${finalSize} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ==========================================
// 2. Pixel Card
// ==========================================
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverShadow?: boolean;
  shadowVariant?: 'default' | 'primary' | 'accent';
}

export const PixelCard: React.FC<CardProps> = ({
  children,
  className = '',
  hoverShadow = true,
  shadowVariant = 'default',
  ...props
}) => {
  const shadows = {
    default: "shadow-pixel hover:shadow-pixel-lg",
    primary: "shadow-pixel-primary hover:shadow-pixel-lg",
    accent: "shadow-pixel-accent hover:shadow-pixel-lg"
  };

  const shadowClass = hoverShadow ? shadows[shadowVariant] : "border-4 border-black";

  return (
    <div
      className={`bg-surface border-4 border-black p-6 ${shadowClass} transition-shadow duration-150 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// ==========================================
// 3. Pixel Input
// ==========================================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PixelInput: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full text-left">
      {label && (
        <label className="font-pixel text-[10px] text-muted tracking-wider">
          {label.toUpperCase()}
        </label>
      )}
      <input
        className={`w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary placeholder:text-muted/60 ${className}`}
        {...props}
      />
      {error && (
        <span className="font-pixel text-[9px] text-[#f43f5e] mt-1">
          * {error.toUpperCase()}
        </span>
      )}
    </div>
  );
};

// ==========================================
// 4. Pixel Select
// ==========================================
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const PixelSelect: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full text-left">
      {label && (
        <label className="font-pixel text-[10px] text-muted tracking-wider">
          {label.toUpperCase()}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary appearance-none cursor-pointer ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none font-pixel text-[10px] text-white">
          ▼
        </div>
      </div>
      {error && (
        <span className="font-pixel text-[9px] text-[#f43f5e] mt-1">
          * {error.toUpperCase()}
        </span>
      )}
    </div>
  );
};

// ==========================================
// 5. Pixel Badge
// ==========================================
interface BadgeProps {
  tier: 'bronze' | 'silver' | 'gold' | 'verified' | 'match';
  className?: string;
}

export const PixelBadge: React.FC<BadgeProps> = ({ tier, className = '' }) => {
  const styles = {
    bronze: "bg-[#b87333] text-white border-2 border-black",
    silver: "bg-[#c0c0c0] text-black border-2 border-black",
    gold: "bg-accent text-black border-2 border-black animate-pulse",
    verified: "bg-success text-black border-2 border-black",
    match: "bg-primary text-white border-2 border-black"
  };

  const labels = {
    bronze: "BRONZE",
    silver: "SILVER",
    gold: "GOLD",
    verified: "VERIFIED",
    match: "MATCH"
  };

  return (
    <span className={`inline-block font-pixel text-[9px] px-2.5 py-1 select-none shadow-pixel-sm ${styles[tier]} ${className}`}>
      {labels[tier]}
    </span>
  );
};

// ==========================================
// 6. Pixel Avatar
// ==========================================
interface AvatarProps {
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  verified?: boolean;
  tier?: 'bronze' | 'silver' | 'gold';
  alt?: string;
  className?: string;
}

export const PixelAvatar: React.FC<AvatarProps> = ({
  src,
  size = 'md',
  verified = false,
  tier,
  alt = 'User Avatar',
  className = ''
}) => {
  const sizes = {
    sm: "w-12 h-12 border-2",
    md: "w-20 h-20 border-4",
    lg: "w-32 h-32 border-4",
    xl: "w-48 h-48 border-4"
  };

  const badgeSizes = {
    sm: "w-4 h-4 text-[6px]",
    md: "w-6 h-6 text-[8px]",
    lg: "w-7 h-7 text-[10px]",
    xl: "w-9 h-9 text-[12px]"
  };

  const tierBorders = {
    bronze: "border-[#b87333]",
    silver: "border-gray-400",
    gold: "border-accent"
  };

  const finalSize = sizes[size] || sizes.md;
  const borderStyle = tier ? tierBorders[tier] : "border-black";

  return (
    <div className={`relative inline-block ${finalSize} ${borderStyle} bg-secondary p-0.5 shadow-pixel-sm ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover select-none image-rendering-pixelated"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-3xl select-none">
          👤
        </div>
      )}
      {verified && (
        <div className={`absolute -bottom-2 -right-2 bg-success text-black border-2 border-black font-pixel flex items-center justify-center shadow-pixel-sm ${badgeSizes[size]}`}>
          ✓
        </div>
      )}
    </div>
  );
};

// ==========================================
// 7. Pixel Progress Bar
// ==========================================
interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  className?: string;
}

export const PixelProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  className = ''
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={`flex flex-col gap-1 w-full text-left ${className}`}>
      {label && (
        <div className="flex justify-between items-center font-pixel text-[9px] text-muted">
          <span>{label.toUpperCase()}</span>
          <span>{clampedValue}%</span>
        </div>
      )}
      <div className="w-full h-6 border-4 border-black bg-bg p-0.5 relative">
        <div
          className="h-full bg-primary border-r-2 border-black transition-all duration-300"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};

// ==========================================
// 8. Pixel Tabs
// ==========================================
interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const PixelTabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = ''
}) => {
  return (
    <div className={`flex border-b-4 border-black bg-surface overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`font-pixel text-[10px] px-6 py-4 cursor-pointer select-none border-r-4 border-black transition-all whitespace-nowrap ${
              isActive
                ? "bg-primary text-white border-b-4 border-primary translate-y-[2px]"
                : "bg-transparent text-text hover:text-white"
            }`}
          >
            {tab.label.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};
