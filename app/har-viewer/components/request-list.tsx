import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HarEntry } from '@/types/har';

interface RequestListProps {
  entries: HarEntry[];
}

export const RequestList = ({ entries }: RequestListProps) => {
  const getMethodColor = (method: string) => {
    const colors = {
      GET: 'bg-blue-100 text-blue-800',
      POST: 'bg-green-100 text-green-800',
      PUT: 'bg-orange-100 text-orange-800',
      DELETE: 'bg-red-100 text-red-800',
      PATCH: 'bg-yellow-100 text-yellow-800'
    };
    return colors[method as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 300 && status < 400) return 'text-blue-600';
    if (status >= 400 && status < 500) return 'text-orange-600';
    if (status >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

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
              className="border-b py-2 flex items-center gap-4 hover:bg-gray-50"
            >
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMethodColor(entry.request.method)}`}>
                {entry.request.method}
              </span>
              <span className="text-gray-600 truncate flex-1">
                {entry.request.url}
              </span>
              <span className={`font-medium ${getStatusColor(entry.response.status)}`}>
                {entry.response.status}
              </span>
              <span className="text-gray-500 text-sm w-20 text-right">
                {entry.time.toFixed(0)}ms
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 