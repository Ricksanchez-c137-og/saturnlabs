'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Command Console Component
function CommandConsole() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleExecute = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
      const data = await res.json();
      if (res.ok) {
        setOutput(data.output);
        setError('');
      } else {
        setError(`Error: ${data.error}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
    setCommand('');
  };

  return (
    <div className="bg-gray-800 p-4 mt-6 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-semibold mb-4">Command Console</h2>
      <form onSubmit={handleExecute} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter command"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="w-full text-gray-300 bg-gray-700"
          required
        />
        <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-white">
          Execute
        </Button>
      </form>
      {output && (
        <div className="mt-4 p-4 bg-gray-900 rounded text-gray-200">
          <h3 className="text-lg font-semibold">Output:</h3>
          <pre>{output}</pre>
        </div>
      )}
      {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
  );
}

// Dashboard Component
export default function Dashboard() {
  const [files, setFiles] = useState([]); // Initialize files as an empty array
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/files');
      const data = await res.json();
      setFiles(data.files || []); // Ensure files is always an array
      setError('');
    } catch (error) {
      setError('Error fetching files');
    } finally {
      setLoading(false); // Set loading to false once fetch is complete
    }
  };

  const handleDelete = async (fileName) => {
    try {
      await fetch(`/api/files/${fileName}`, { method: 'DELETE' });
      fetchFiles(); // Refresh the file list after deletion
      setError('');
    } catch (error) {
      setError('Error deleting file');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Dashboard</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}
        
        {loading ? (
          <p className="text-center text-gray-400">Loading files...</p>
        ) : (
          <ul className="space-y-2">
            {files.map((file) => (
              <li key={file.name} className="flex justify-between bg-gray-700 p-2 rounded">
                <span>{file.name}</span>
                <Button onClick={() => handleDelete(file.name)} className="bg-red-600 hover:bg-red-700">
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}

        {/* Include the Command Console component below the file list */}
        <CommandConsole />
      </div>
    </div>
  );
}
