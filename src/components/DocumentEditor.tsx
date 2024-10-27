// src/components/DocumentEditor.tsx

import React, { useEffect, useRef, useState } from 'react';
import './DocumentEditor.css'; // Add your CSS file for styling

const DocumentEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>(() => {
    // Load content from local storage
    const savedContent = localStorage.getItem('documentContent');
    return savedContent ? savedContent : '<p>Your text here...</p>';
  });

  useEffect(() => {
    // Save content to local storage on every change
    localStorage.setItem('documentContent', content);
  }, [content]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Implement keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case 'b':
          event.preventDefault();
          document.execCommand('bold');
          break;
        case 'i':
          event.preventDefault();
          document.execCommand('italic');
          break;
        case 'u':
          event.preventDefault();
          document.execCommand('underline');
          break;
        case 'ArrowUp':
          event.preventDefault();
          document.execCommand('increaseFontSize');
          break;
        case 'ArrowDown':
          event.preventDefault();
          document.execCommand('decreaseFontSize');
          break;
        default:
          break;
      }
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="document-editor">
      <h1>Document Editor</h1>
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: content }} // Set initial content
      />
      <div className="toolbar">
        <button onClick={() => document.execCommand('bold')}>B</button>
        <button onClick={() => document.execCommand('italic')}>I</button>
        <button onClick={() => document.execCommand('underline')}>U</button>
        <button onClick={() => document.execCommand('insertUnorderedList')}>List</button>
      </div>
    </div>
  );
};

export default DocumentEditor;
