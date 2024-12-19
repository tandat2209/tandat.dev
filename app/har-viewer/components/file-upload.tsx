interface FileUploadProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  return (
    <input 
      type="file" 
      accept=".har"
      onChange={onFileUpload}
      className="mb-4"
    />
  );
}; 