import React, { useState } from 'react';
import { HarEntry } from '@/types/har';
import { Copy, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface RequestDetailModalProps {
  entry: HarEntry;
  trigger: React.ReactNode;
}

export const RequestDetailModal = ({ entry, trigger }: RequestDetailModalProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const isSectionExpanded = (section: string) => {
    return expandedSections.has(section);
  };

  const formatBody = (content: string | null, mimeType?: string) => {
    if (!content) return 'No content';

    try {
      if (mimeType?.includes('application/json')) {
        return JSON.stringify(JSON.parse(content), null, 2);
      }
      if (mimeType?.includes('application/xml') || mimeType?.includes('text/xml')) {
        return content.replace(/></g, '>\n<');
      }
      if (mimeType?.includes('text/html')) {
        return content;
      }
      return content;
    } catch {
      return content;
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.warn('Failed to copy to clipboard:', error);
    }
  };

  const renderHeaders = (headers: Array<{ name: string; value: string }>) => {
    if (!headers || headers.length === 0) {
      return <div className="text-gray-500 italic">No headers</div>;
    }

    return (
      <div className="space-y-1">
        {headers.map((header, index) => (
          <div key={index} className="flex text-sm">
            <span className="font-mono font-medium text-blue-600 w-32 flex-shrink-0">
              {header.name}:
            </span>
            <span className="font-mono text-gray-800 break-all">
              {header.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderQueryParams = (queryParams: Array<{ name: string; value: string }>) => {
    if (!queryParams || queryParams.length === 0) {
      return <div className="text-gray-500 italic">No query parameters</div>;
    }

    return (
      <div className="space-y-1">
        {queryParams.map((param, index) => (
          <div key={index} className="flex text-sm">
            <span className="font-mono font-medium text-green-600 w-32 flex-shrink-0">
              {param.name}:
            </span>
            <span className="font-mono text-gray-800 break-all">
              {param.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderCookies = (cookies: Array<{ name?: string; value?: string; domain?: string; path?: string }>) => {
    if (!cookies || cookies.length === 0) {
      return <div className="text-gray-500 italic">No cookies</div>;
    }

    return (
      <div className="space-y-1">
        {cookies.map((cookie, index) => (
          <div key={index} className="text-sm">
            <div className="flex">
              <span className="font-mono font-medium text-purple-600 w-32 flex-shrink-0">
                {cookie.name || 'unnamed'}:
              </span>
              <span className="font-mono text-gray-800 break-all">
                {cookie.value || 'no value'}
              </span>
            </div>
            {(cookie.domain || cookie.path) && (
              <div className="ml-32 text-xs text-gray-500">
                {cookie.domain && `Domain: ${cookie.domain}`}
                {cookie.domain && cookie.path && ' | '}
                {cookie.path && `Path: ${cookie.path}`}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="truncate">{entry.request.url}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(entry.request.url)}
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy URL
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Request Section */}
          <div className="border rounded-lg">
            <button
              className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 flex items-center justify-between"
              onClick={() => toggleSection('request')}
            >
              <h3 className="font-semibold">Request Details</h3>
              {isSectionExpanded('request') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {isSectionExpanded('request') && (
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Headers</h4>
                  <div className="bg-gray-50 p-3 rounded border">
                    {renderHeaders(entry.request.headers)}
                  </div>
                </div>

                {entry.request.queryString && entry.request.queryString.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Query Parameters</h4>
                    <div className="bg-gray-50 p-3 rounded border">
                      {renderQueryParams(entry.request.queryString)}
                    </div>
                  </div>
                )}

                {entry.request.cookies && entry.request.cookies.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Cookies</h4>
                    <div className="bg-gray-50 p-3 rounded border">
                      {renderCookies(entry.request.cookies)}
                    </div>
                  </div>
                )}

                {entry.request.postData && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">
                      Request Body ({entry.request.postData.mimeType})
                    </h4>
                    <div className="bg-gray-50 p-3 rounded border">
                      <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                        {formatBody(entry.request.postData.text, entry.request.postData.mimeType)}
                      </pre>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(entry.request.postData.text || '')}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy Body
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Response Section */}
          <div className="border rounded-lg">
            <button
              className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 flex items-center justify-between"
              onClick={() => toggleSection('response')}
            >
              <h3 className="font-semibold">Response Details</h3>
              {isSectionExpanded('response') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {isSectionExpanded('response') && (
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Headers</h4>
                  <div className="bg-gray-50 p-3 rounded border">
                    {renderHeaders(entry.response.headers)}
                  </div>
                </div>

                {entry.response.cookies && entry.response.cookies.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Cookies</h4>
                    <div className="bg-gray-50 p-3 rounded border">
                      {renderCookies(entry.response.cookies)}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">
                    Response Body ({entry.response.content.mimeType})
                  </h4>
                  <div className="bg-gray-50 p-3 rounded border">
                    <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                      {formatBody(entry.response.content.text, entry.response.content.mimeType)}
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => copyToClipboard(entry.response.content.text || '')}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Body
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Performance Section */}
          <div className="border rounded-lg">
            <button
              className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 flex items-center justify-between"
              onClick={() => toggleSection('performance')}
            >
              <h3 className="font-semibold">Performance Metrics</h3>
              {isSectionExpanded('performance') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {isSectionExpanded('performance') && (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Total Time:</span>
                    <span className="ml-2">{entry.time.toFixed(2)}ms</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Blocked:</span>
                    <span className="ml-2">{entry.timings.blocked.toFixed(2)}ms</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">DNS:</span>
                    <span className="ml-2">{entry.timings.dns.toFixed(2)}ms</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Connect:</span>
                    <span className="ml-2">{entry.timings.connect.toFixed(2)}ms</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Send:</span>
                    <span className="ml-2">{entry.timings.send.toFixed(2)}ms</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Wait:</span>
                    <span className="ml-2">{entry.timings.wait.toFixed(2)}ms</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Receive:</span>
                    <span className="ml-2">{entry.timings.receive.toFixed(2)}ms</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 