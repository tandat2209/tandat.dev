import { Har, HarEntry } from "@/types/har";

// Utility functions for HAR processing
export const parseHARFile = (file: File): Promise<Har> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const harData = JSON.parse(e.target?.result as string) as Har;
        resolve(harData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

export const filterRequests = (entries: HarEntry[], filters) => {
  return entries.filter(entry => {
    const url = entry.request.url.toLowerCase();
    const method = entry.request.method.toLowerCase();
    const domain = new URL(url).hostname.toLowerCase();
    
    // Destructure filters
    const {
      urlFilters = [],
      methodFilters = [],
      domainFilters = [],
      defaultFilterPatterns = [
        'doubleclick.net',
        'googlesyndication.com',
        'adnxs.com',
        'tracking.',
        'analytics.',
        'ads.',
        '.gif',
        '.jpg',
        '.png',
        "analytics",
        "cdn-cgi"
      ]
    } = filters;

    // Combine default and user-defined filters
    const allUrlFilterPatterns = [...defaultFilterPatterns, ...urlFilters];

    // Check filters
    const isUrlFiltered = !allUrlFilterPatterns.some(pattern => 
      url.includes(pattern.toLowerCase())
    );

    const isMethodFiltered = methodFilters.length === 0 || 
      methodFilters.some((m: string) => method.includes(m.toLowerCase()));

    const isDomainFiltered = domainFilters.length === 0 || 
      domainFilters.some((d: string) => domain.includes(d.toLowerCase()));

    return isUrlFiltered && isMethodFiltered && isDomainFiltered;
  });
};

export const generateMermaidSequenceDiagram = (filteredEntries: HarEntry[]) => {
  const participants = new Set(['Frontend']);
  const interactions: string[] = [];

  filteredEntries.forEach((entry) => {
    const { method, url } = entry.request;
    const { status } = entry.response;
    
    // Extract domain as participant
    const participantName = new URL(url).hostname
      .replace('www.', '')
      .split('.')[0];
    participants.add(participantName);

    // Create sequence diagram interaction
    interactions.push(
      `Frontend->>+${participantName}: ${method} ${new URL(url).pathname}\n` +
      `${participantName}-->>-Frontend: ${status} Response`
    );
  });

  return `sequenceDiagram
${[...participants].map(p => `participant ${p}`).join('\n')}

${interactions.join('\n')}`;
};