import { Upload, File, Calendar, Trash2, Download, FileText, Image, FileIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  type: string;
}

export function AdminPage() {
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "sensor_data_2024_01.csv",
      size: "2.4 MB",
      uploadedAt: "2024-01-15 14:30:00",
      type: "text/csv"
    },
    {
      id: "2",
      name: "temperature_readings.xlsx",
      size: "1.8 MB",
      uploadedAt: "2024-01-12 09:15:00",
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
    {
      id: "3",
      name: "humidity_data.csv",
      size: "3.2 MB",
      uploadedAt: "2024-01-10 16:45:00",
      type: "text/csv"
    }
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Allowed file types
  const ALLOWED_TYPES = [
    'text/csv',
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  ];

  const ALLOWED_EXTENSIONS = ['.csv', '.xls', '.xlsx'];

  const isValidFileType = (file: File): boolean => {
    const fileName = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));
    const hasValidMimeType = ALLOWED_TYPES.includes(file.type);
    
    return hasValidExtension || hasValidMimeType;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    setUploadError("");
    
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    Array.from(fileList).forEach(file => {
      if (isValidFileType(file)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      setUploadError(
        `Invalid file type(s): ${invalidFiles.join(', ')}. Only CSV and Excel files (.csv, .xls, .xlsx) are allowed.`
      );
    }

    if (validFiles.length > 0) {
      const newFiles: UploadedFile[] = validFiles.map((file, index) => ({
        id: Date.now().toString() + index,
        name: file.name,
        size: formatFileSize(file.size),
        uploadedAt: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).replace(',', ''),
        type: file.type || 'text/csv'
      }));

      setFiles([...newFiles, ...files]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setFiles(files.filter(file => file.id !== id));
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <Image className="w-5 h-5 text-accent" />;
    } else if (type === 'application/pdf') {
      return <FileText className="w-5 h-5 text-destructive" />;
    } else if (type.includes('csv') || type.includes('excel') || type.includes('spreadsheet')) {
      return <File className="w-5 h-5 text-secondary" />;
    } else {
      return <FileIcon className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage research files and uploads
          </p>
        </div>

        {/* File Upload Section */}
        <Card className="p-8 mb-8 border-2 border-dashed border-border bg-card">
          <div className="mb-6">
            <h2 className="text-foreground mb-2">Upload New Files</h2>
            <p className="text-muted-foreground">
              Upload sensor data, research documents, images, and other files
            </p>
          </div>

          <div
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileInput}
              multiple
              accept=".csv,.xls,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              
              <div>
                <Label
                  htmlFor="file-upload"
                  className="text-primary hover:text-accent cursor-pointer"
                >
                  Click to upload
                </Label>
                <span className="text-muted-foreground"> or drag and drop</span>
              </div>
              
              <p className="text-muted-foreground">
                CSV and Excel files only (.csv, .xls, .xlsx)
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="bg-primary hover:bg-accent"
            >
              <Upload className="w-4 h-4 mr-2" />
              Select Files
            </Button>
          </div>

          {uploadError && (
            <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-destructive">{uploadError}</p>
            </div>
          )}
        </Card>

        {/* Uploaded Files List */}
        <Card className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-foreground mb-2">Uploaded Files</h2>
              <p className="text-muted-foreground">
                {files.length} file{files.length !== 1 ? 's' : ''} total
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {files.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <File className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No files uploaded yet</p>
              </div>
            ) : (
              files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                >
                  {/* File Icon */}
                  <div className="flex-shrink-0">
                    {getFileIcon(file.type)}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground truncate">{file.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-muted-foreground">{file.size}</span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{file.uploadedAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border hover:bg-accent/10"
                      onClick={() => alert(`Download ${file.name}`)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(file.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}