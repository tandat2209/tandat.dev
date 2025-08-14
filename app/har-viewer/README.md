# HAR Viewer & Sequence Diagram Generator

A powerful tool for analyzing HTTP Archive (HAR) files and generating sequence diagrams to visualize API interactions and network flows.

## 🚀 Current Features

### Core Functionality

- **HAR File Parsing**: Upload and parse HAR files from browser DevTools
- **Request Filtering**: Advanced filtering by URL patterns, HTTP methods, and domains
- **Sequence Diagram Generation**: Automatic Mermaid sequence diagram creation
- **Real-time Updates**: Dynamic filtering with instant diagram regeneration

### Request Analysis

- **Method-based Color Coding**: Visual distinction between GET, POST, PUT, DELETE, PATCH
- **Status Code Highlighting**: Color-coded HTTP response statuses
- **Performance Metrics**: Response time display for each request
- **Request/Response Preview**: Click to view detailed request and response bodies

### Smart Filtering

- **Default Exclusions**: Automatically filters out common noise:
  - Analytics and tracking domains
  - Ad networks (doubleclick.net, googlesyndication.com)
  - Static assets (.gif, .jpg, .png)
  - CDN and infrastructure requests
- **Custom URL Filters**: Add domain patterns to exclude specific services
- **Method Filters**: Include only specific HTTP methods
- **Domain-based Filtering**: Filter by specific hostnames

### Sequence Diagram Features

- **Automatic Participant Detection**: Identifies services from request URLs
- **Request Flow Visualization**: Shows request/response patterns
- **Mermaid Integration**: Renders beautiful, interactive sequence diagrams
- **Raw Diagram View**: Toggle between rendered and source code views

## 🛠️ Technical Implementation

### Architecture

- **React-based UI**: Built with Next.js and TypeScript
- **Component-based Design**: Modular, reusable components
- **State Management**: React hooks for local state management
- **Real-time Processing**: Immediate updates on filter changes

### Data Processing

- **HAR Parser**: Robust JSON parsing with error handling
- **Filter Engine**: Efficient request filtering with multiple criteria
- **Diagram Generator**: Mermaid-compatible sequence diagram syntax
- **Type Safety**: Full TypeScript support with HAR format types

## 📋 Next Steps & Roadmap

### ✅ Completed (High Priority)

1. **Persistent Filter Storage** ✅

   - Save filter preferences to localStorage
   - Remember user's custom URL and method filters
   - Auto-restore filters on page reload
   - Added filter management buttons (Reset to Defaults, Clear All)

2. **Actor Merging & Consolidation** ✅

   - Merge similar domains (e.g., api.example.com + www.example.com)
   - Group related services by domain hierarchy
   - Configurable actor naming conventions
   - Handle subdomain variations intelligently
   - Smart naming for common APIs (Google API, GitHub API, etc.)

3. **Enhanced Request/Response Viewing** ✅
   - Full header display (request and response)
   - Formatted JSON/XML response rendering
   - Request payload inspection
   - Response body syntax highlighting
   - Copy-to-clipboard functionality
   - Collapsible sections for better organization
   - Performance metrics display
   - Query parameters and cookies viewing

### Medium Priority

4. **Advanced Filtering**

   - Status code filtering
   - Response time thresholds
   - Content type filtering
   - Custom filter presets

5. **Sequence Diagram Improvements**
   - Timeline-based sequencing
   - Request grouping by time windows
   - Error handling visualization

## 🔧 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Next.js project setup

### Installation

```bash
npm install
npm run dev
```

## 📊 HAR Format Support

The viewer supports the full HAR 1.2 specification including:

- Request/response headers and bodies
- Timing information
- Initiator stack traces
- Cookies and query parameters
- Performance metrics

## 🎯 Use Cases

- **API Development**: Analyze API interactions and flows
- **Performance Debugging**: Identify slow requests and bottlenecks
- **Security Analysis**: Review request/response patterns
- **Documentation**: Generate sequence diagrams for technical docs
- **Testing**: Validate API behavior and response formats
