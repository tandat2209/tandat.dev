import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Entry } from '@/types/har';

interface RequestListProps {
  entries: Entry[];
}

export const RequestList = ({ entries }: RequestListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtered Requests ({entries.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-64 overflow-y-auto">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="border-b py-2 flex justify-between"
            >
              <span className="font-bold">{entry.request.method}</span>
              <span className="text-gray-600 truncate max-w-md">
                {entry.request.url}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 