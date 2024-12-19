import { Input } from "@/components/ui/input";

interface FileUploadProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  return (
    <Input
      type="file"
      accept=".har"
      onChange={onFileUpload}
      className="mb-4"
    />
  );
}; 