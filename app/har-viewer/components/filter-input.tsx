import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  placeholder: string;
  buttonText: string;
  disabled?: boolean;
  options?: string[];
}

export const FilterInput = ({ 
  value, 
  onChange, 
  onAdd, 
  placeholder, 
  buttonText,
  disabled,
  options 
}: FilterInputProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      {options ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
      <Button 
        onClick={onAdd} 
        disabled={disabled}
        className="sm:w-auto"
      >
        {buttonText}
      </Button>
    </div>
  );
}; 