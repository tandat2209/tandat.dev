'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from './components/file-upload';
import { FilterInput } from './components/filter-input';
import { FilterList } from './components/filter-list';
import { RequestList } from './components/request-list';
import { parseHARFile, filterRequests, generateMermaidSequenceDiagram } from './utils/harProcessing';
import { MermaidDiagram } from './components/mermaid-diagram';
import { Har, HarEntry } from '@/types/har';

const HARViewer = () => {
  const [harData, setHarData] = useState<Har | null>(null);
  const [filteredEntries, setFilteredEntries] = useState<HarEntry[]>([]);
  const [filters, setFilters] = useState<Record<string, string[]>>({
    urlFilters: [],
    methodFilters: []
  });
  const [mermaidDiagram, setMermaidDiagram] = useState('');
  const [newUrlFilter, setNewUrlFilter] = useState('');
  const [newMethodFilter, setNewMethodFilter] = useState('');

  // Available HTTP methods
  const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const parsedHAR = await parseHARFile(file);
        setHarData(parsedHAR);

        // Initial filtering
        const initialFiltered = filterRequests(
          parsedHAR.log.entries,
          filters
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

  const addFilter = (filterType: string, newFilter: string) => {
    if (newFilter && !filters[filterType].includes(newFilter)) {
      const updatedFilters = {
        ...filters,
        [filterType]: [...filters[filterType], newFilter]
      };
      setFilters(updatedFilters);

      // Reapply filters
      const refiltered = filterRequests(
        harData?.log.entries || [],
        updatedFilters
      );
      setFilteredEntries(refiltered);

      // Regenerate diagram
      const newDiagram = generateMermaidSequenceDiagram(refiltered);
      setMermaidDiagram(newDiagram);

      // Reset input
      if (filterType === 'urlFilters') setNewUrlFilter('');
      if (filterType === 'methodFilters') setNewMethodFilter('');
    }
  };

  const removeFilter = (filterType: string, filterToRemove: string) => {
    const updatedFilters = {
      ...filters,
      [filterType]: filters[filterType].filter((f: string) => f !== filterToRemove)
    };
    setFilters(updatedFilters);

    // Reapply filters
    const refiltered = filterRequests(
      harData?.log.entries || [],
      updatedFilters
    );
    setFilteredEntries(refiltered);

    // Regenerate diagram
    const newDiagram = generateMermaidSequenceDiagram(refiltered);
    setMermaidDiagram(newDiagram);
  };

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

            <FilterInput
              value={newUrlFilter}
              onChange={setNewUrlFilter}
              onAdd={() => addFilter('urlFilters', newUrlFilter)}
              placeholder="Add URL filter (e.g. googleapis.com)"
              buttonText="Add URL Filter"
            />

            <FilterInput
              value={newMethodFilter}
              onChange={setNewMethodFilter}
              onAdd={() => addFilter('methodFilters', newMethodFilter)}
              placeholder="Select HTTP Method"
              buttonText="Add Method Filter"
              disabled={!newMethodFilter}
              options={HTTP_METHODS}
            />

            <div className="flex gap-4">
              <FilterList
                title="URL Filters"
                filters={filters.urlFilters}
                onRemove={(filter) => removeFilter('urlFilters', filter)}
              />
              <FilterList
                title="Method Filters"
                filters={filters.methodFilters}
                onRemove={(filter) => removeFilter('methodFilters', filter)}
              />
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
