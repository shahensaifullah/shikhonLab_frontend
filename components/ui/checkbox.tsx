import type React from 'react';
import {cn} from '@/lib/utils';

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onCheckedChange'> & {
  onCheckedChange?: (checked: boolean) => void;
};

export function Checkbox({className, onChange, onCheckedChange, ...props}: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn('h-4 w-4 rounded border-input text-primary focus:ring-ring', className)}
      onChange={(event) => {
        onChange?.(event);
        onCheckedChange?.(event.target.checked);
      }}
      {...props}
    />
  );
}
