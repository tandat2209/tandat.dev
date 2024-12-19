'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from './components/file-upload';
import { RequestList } from './components/request-list';
import { parseHARFile, filterRequests, generateMermaidSequenceDiagram } from './utils/harProcessing';
import { MermaidDiagram } from './components/mermaid-diagram';
import { Har, HarEntry } from '@/types/har';
import { InputTags } from '@/components/ui/input-tags';


const HARViewer = () => {
  const [harData, setHarData] = useState<Har | null>(null);
  const [filteredEntries, setFilteredEntries] = useState<HarEntry[]>([]);
  const [urlFilters, setUrlFilters] = useState<string[]>([]);
  const [methodFilters, setMethodFilters] = useState<string[]>(["GET", "POST", "PUT", "DELETE", "PATCH"]);
  const [mermaidDiagram, setMermaidDiagram] = useState('');

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

            <InputTags
              value={urlFilters}
              onChange={setUrlFilters}
              placeholder="Add URL filter (e.g. googleapis.com) to exclude"
            />

            <InputTags
              value={methodFilters}
              onChange={setMethodFilters}
              placeholder="Add HTTP Method filter (e.g. GET) to include"
            />

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
