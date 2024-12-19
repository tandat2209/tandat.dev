import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Initialize mermaid with default config
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  sequence: {
    showSequenceNumbers: true,
    actorMargin: 50,
  },
  // Disable clicks to avoid navigation issues
  securityLevel: 'strict',
});

interface MermaidDiagramProps {
  chart: string;
  title?: string;
  showRaw?: boolean;
  className?: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  chart,
  title = "Sequence Diagram",
  showRaw = true,
  className = "w-full",
}) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (mermaidRef.current && chart) {
        try {
          mermaidRef.current.innerHTML = chart;
          const { svg } = await mermaid.render(`mermaid-${Date.now()}`, chart);
          mermaidRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Failed to render mermaid diagram:', error);
          mermaidRef.current.innerHTML = 'Failed to render diagram';
        }
      }
    };

    renderDiagram();
  }, [chart]);

  if (!chart) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-hidden">
          <div 
            ref={mermaidRef} 
            className="mermaid-diagram touch-pan-x touch-pan-y" 
            style={{ touchAction: 'pan-x pan-y' }}
          />
          {showRaw && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
                Show Raw Diagram
              </summary>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto min-w-full whitespace-pre-wrap break-all text-sm mt-2">
                {chart}
              </pre>
            </details>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 