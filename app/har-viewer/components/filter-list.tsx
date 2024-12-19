import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FilterListProps {
  title: string;
  filters: string[];
  onRemove: (filter: string) => void;
}

export const FilterList = ({ title, filters, onRemove }: FilterListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
          <div 
            key={filter} 
            className="bg-gray-100 p-2 rounded flex items-center"
          >
            {filter}
            <Button 
              onClick={() => onRemove(filter)}
              className="ml-2 text-red-500"
            >
              ✖
            </Button>
          </div>
        ))}
        </div>
      </CardContent>
    </Card>
  );
}; 