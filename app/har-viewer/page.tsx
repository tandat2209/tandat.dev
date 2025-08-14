'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from './components/file-upload';
import { RequestList } from './components/request-list';
import { parseHARFile, filterRequests, generateMermaidSequenceDiagram } from './utils/harProcessing';
import { MermaidDiagram } from './components/mermaid-diagram';
import { Har, HarEntry } from '@/types/har';
import { InputTags } from '@/components/ui/input-tags';
import { Button } from '@/components/ui/button';

// Local storage keys
const STORAGE_KEYS = {
  URL_FILTERS: 'har-viewer-url-filters',
  METHOD_FILTERS: 'har-viewer-method-filters',
};

const HARViewer = () => {
  const [harData, setHarData] = useState<Har | null>(null);
  const [filteredEntries, setFilteredEntries] = useState<HarEntry[]>([]);
  const [urlFilters, setUrlFilters] = useState<string[]>([]);
  const [methodFilters, setMethodFilters] = useState<string[]>(["GET", "POST", "PUT", "DELETE", "PATCH"]);
  const [mermaidDiagram, setMermaidDiagram] = useState('');

  // Load filters from localStorage on component mount
  useEffect(() => {
    try {
      const savedUrlFilters = localStorage.getItem(STORAGE_KEYS.URL_FILTERS);
      const savedMethodFilters = localStorage.getItem(STORAGE_KEYS.METHOD_FILTERS);

      if (savedUrlFilters) {
        setUrlFilters(JSON.parse(savedUrlFilters));
      }
      if (savedMethodFilters) {
        setMethodFilters(JSON.parse(savedMethodFilters));
      }
    } catch (error) {
      console.warn('Failed to load filters from localStorage:', error);
    }
  }, []);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.URL_FILTERS, JSON.stringify(urlFilters));
    } catch (error) {
      console.warn('Failed to save URL filters to localStorage:', error);
    }
  }, [urlFilters]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.METHOD_FILTERS, JSON.stringify(methodFilters));
    } catch (error) {
      console.warn('Failed to save method filters to localStorage:', error);
    }
  }, [methodFilters]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const parsedHAR = await parseHARFile(file);
        setHarData(parsedHAR);

        // Initial filtering
        const initialFiltered = filterRequests(
          parsedHAR.log.entries,
          { urlFilters, methodFilters }
        );
        setFilteredEntries(initialFiltered);

        // Generate initial sequence diagram
        const initialDiagram = generateMermaidSequenceDiagram(initialFiltered);
        setMermaidDiagram(initialDiagram);
      } catch (error) {
        console.error('Error parsing HAR file:', error);
      }
    }
  };

  // Effect to handle filter changes
  useEffect(() => {
    if (!harData?.log.entries) return;

    const refiltered = filterRequests(
      harData.log.entries,
      { urlFilters, methodFilters }
    );
    setFilteredEntries(refiltered);

    const newDiagram = generateMermaidSequenceDiagram(refiltered);
    setMermaidDiagram(newDiagram);
  }, [harData, urlFilters, methodFilters]);

  return (
    <div className="w-full max-w-[100vw] p-4">
      <h1 className="text-2xl font-bold mb-4">HAR Viewer & Sequence Diagram Generator</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column */}
        <Card>
          <CardHeader>
            <CardTitle>HAR Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload onFileUpload={handleFileUpload} />

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">URL Filters (exclude patterns)</label>
              <InputTags
                value={urlFilters}
                onChange={setUrlFilters}
                placeholder="Add URL filter (e.g. googleapis.com) to exclude"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">HTTP Method Filters (include only)</label>
              <InputTags
                value={methodFilters}
                onChange={setMethodFilters}
                placeholder="Add HTTP Method filter (e.g. GET) to include"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setUrlFilters([]);
                  setMethodFilters(["GET", "POST", "PUT", "DELETE", "PATCH"]);
                }}
              >
                Reset to Defaults
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setUrlFilters([]);
                  setMethodFilters([]);
                }}
              >
                Clear All Filters
              </Button>
            </div>

            {filteredEntries && <RequestList entries={filteredEntries} />}
          </CardContent>
        </Card>

        {/* Right Column */}
        <Card>
          <CardHeader>
            <CardTitle>Sequence Diagram</CardTitle>
          </CardHeader>
          <CardContent>
            {mermaidDiagram && (
              <div className="sticky top-4">
                <MermaidDiagram
                  chart={mermaidDiagram}
                  title="Sequence Diagram"
                  showRaw={true}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HARViewer;
