'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from './components/file-upload';
import { FilterInput } from './components/filter-input';
import { FilterList } from './components/filter-list';
import { RequestList } from './components/request-list';
import { parseHARFile, filterRequests, generateMermaidSequenceDiagram } from './utils/harProcessing';
import { MermaidDiagram } from './components/mermaid-diagram';
import { Har } from '@/types/har';

const HARViewer = () => {
  const [harData, setHarData] = useState<Har | null>(null);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filters, setFilters] = useState({
    urlFilters: [],
    methodFilters: []
  });
  const [mermaidDiagram, setMermaidDiagram] = useState('');
  const [newUrlFilter, setNewUrlFilter] = useState('');
  const [newMethodFilter, setNewMethodFilter] = useState('');

  // Available HTTP methods
  const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
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

  const addFilter = (filterType, newFilter) => {
    if (newFilter && !filters[filterType].includes(newFilter)) {
      const updatedFilters = {
        ...filters,
        [filterType]: [...filters[filterType], newFilter]
      };
      setFilters(updatedFilters);

      // Reapply filters
      const refiltered = filterRequests(
        harData.log.entries,
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

  const removeFilter = (filterType, filterToRemove) => {
    const updatedFilters = {
      ...filters,
      [filterType]: filters[filterType].filter(f => f !== filterToRemove)
    };
    setFilters(updatedFilters);

    // Reapply filters
    const refiltered = filterRequests(
      harData.log.entries,
      updatedFilters
    );
    setFilteredEntries(refiltered);

    // Regenerate diagram
    const newDiagram = generateMermaidSequenceDiagram(refiltered);
    setMermaidDiagram(newDiagram);
  };

  return (
    <div className="w-full max-w-[100vw] px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>HAR Viewer & Sequence Diagram Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
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
            </div>

            {/* Right Column */}
            <div className="h-full">
              {mermaidDiagram && (
                <div className="sticky top-4">
                  <MermaidDiagram
                    chart={mermaidDiagram}
                    title="Sequence Diagram"
                    showRaw={true}
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HARViewer;
