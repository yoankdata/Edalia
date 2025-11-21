import type { SVGProps } from 'react';

export const Logo = (props: SVGProps<HTMLDivElement>) => (
    <div className="flex items-center gap-2" {...props}>
         <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M12 0L20.6603 14L12 28L3.33975 14L12 0Z" fill="hsl(var(--accent))"/>
            <path d="M3.33975 14L0 7.99999H12L3.33975 14Z" fill="hsl(var(--primary))"/>
            <path d="M3.33975 14L12 28H0L3.33975 14Z" fill="hsl(var(--primary))" fillOpacity="0.7"/>
        </svg>
        <span className="font-headline text-3xl font-normal text-primary">Edalia</span>
    </div>
);
