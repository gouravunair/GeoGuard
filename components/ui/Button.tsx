import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20',
            secondary: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10',
            danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20',
            ghost: 'hover:bg-white/5 text-gray-300 hover:text-white',
        };

        const sizes = {
            sm: 'h-8 px-3 text-xs',
            md: 'rounded-xl px-6 py-3',
            lg: 'h-14 px-8 text-lg rounded-full',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';

export { Button };
