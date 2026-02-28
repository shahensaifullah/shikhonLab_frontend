import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', {
  variants: {
    variant: {
      default: 'bg-primary/15 text-primary',
      secondary: 'bg-accent/15 text-accent',
      outline: 'border border-border text-foreground'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({className, variant, ...props}: BadgeProps) {
  return <div className={cn(badgeVariants({variant}), className)} {...props} />;
}
