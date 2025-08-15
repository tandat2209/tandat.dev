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

export const filterRequests = (
  entries: HarEntry[],
  filters: Record<string, string[]>
): HarEntry[] => {
  return entries.filter((entry) => {
    const url = entry.request.url.toLowerCase();
    const method = entry.request.method.toLowerCase();
    const domain = new URL(url).hostname.toLowerCase();

    // Destructure filters
    const {
      urlFilters = [],
      methodFilters = [],
      domainFilters = [],
      defaultFilterPatterns = [
        "doubleclick.net",
        "googlesyndication.com",
        "adnxs.com",
        "tracking.",
        "analytics.",
        "ads.",
        ".gif",
        ".jpg",
        ".png",
        "analytics",
        "cdn-cgi",
      ],
    } = filters;

    // Combine default and user-defined filters
    const allUrlFilterPatterns = [...defaultFilterPatterns, ...urlFilters];

    // Check filters
    const isUrlFiltered = !allUrlFilterPatterns.some((pattern) =>
      url.includes(pattern.toLowerCase())
    );

    const isMethodFiltered =
      methodFilters.length === 0 ||
      methodFilters.some((m: string) => method.includes(m.toLowerCase()));

    const isDomainFiltered =
      domainFilters.length === 0 ||
      domainFilters.some((d: string) => domain.includes(d.toLowerCase()));

    return isUrlFiltered && isMethodFiltered && isDomainFiltered;
  });
};

// Helper function to extract and normalize domain names
const extractDomainInfo = (url: string) => {
  try {
    const hostname = new URL(url).hostname.toLowerCase();

    // Remove www. prefix
    const cleanHostname = hostname.replace(/^www\./, "");

    // Split into parts
    const parts = cleanHostname.split(".");

    if (parts.length >= 2) {
      const domain = parts.slice(-2).join(".");
      const subdomain = parts.length > 2 ? parts[0] : null;
      const service = parts.length > 2 ? parts[1] : null;

      return {
        full: cleanHostname,
        domain,
        subdomain,
        service,
        parts,
      };
    }

    return {
      full: cleanHostname,
      domain: cleanHostname,
      subdomain: null,
      service: null,
      parts,
    };
  } catch {
    return {
      full: url,
      domain: url,
      subdomain: null,
      service: null,
      parts: [url],
    };
  }
};

// Function to generate a consistent actor name for similar domains
const generateActorName = (
  domainInfo: ReturnType<typeof extractDomainInfo>,
  existingActors: Set<string>
): string => {
  const { domain, subdomain, service } = domainInfo;

  // If it's a common API domain, use a friendly name
  if (domain === "googleapis.com") {
    return subdomain ? `${subdomain} API` : "Google API";
  }

  if (domain === "github.com") {
    return subdomain ? `${subdomain} GitHub` : "GitHub";
  }

  if (domain === "api.github.com") {
    return "GitHub API";
  }

  // For subdomains, try to create meaningful names
  if (subdomain && service) {
    const actorName = `${subdomain} ${service}`;
    if (!existingActors.has(actorName)) {
      return actorName;
    }
  }

  if (subdomain) {
    const actorName = `${subdomain} ${domain}`;
    if (!existingActors.has(actorName)) {
      return actorName;
    }
  }

  // Fallback to domain name
  return domain;
};

export const generateMermaidSequenceDiagram = (filteredEntries: HarEntry[]) => {
  const participants = new Set(["Frontend"]);
  const interactions: string[] = [];
  const actorMap = new Map<string, string>(); // Maps domain to actor name

  filteredEntries.forEach((entry) => {
    const { method, url } = entry.request;
    const { status } = entry.response;

    // Extract domain information
    const domainInfo = extractDomainInfo(url);
    const originalDomain = domainInfo.full;

    // Generate consistent actor name
    let actorName = actorMap.get(originalDomain);
    if (!actorName) {
      actorName = generateActorName(domainInfo, participants);
      actorMap.set(originalDomain, actorName);
      participants.add(actorName);
    }

    // Create sequence diagram interaction
    const pathname = new URL(url).pathname;

    interactions.push(
      `Frontend->>+${actorName}: ${method} ${pathname}\n` +
        `${actorName}-->>-Frontend: ${status} Response`
    );
  });

  return `sequenceDiagram
${[...participants].map((p) => `participant ${p}`).join("\n")}

${interactions.join("\n")}`;
};
