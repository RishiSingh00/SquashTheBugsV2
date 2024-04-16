import React from 'react';
import { java } from '@codemirror/lang-java';
import CodeMirror from '@uiw/react-codemirror';

const CodeEditor = ({ code, updateQuestion,currIndex }) => {
  
  const handleChange = (value) => {
    if (currIndex>=0) {
      handleCodeChange(value);
      console.log(code);
    }
  };
  const handleCodeChange = (newCode) => {
    updateQuestion((prevQuestions) =>
      prevQuestions.map((question, index) =>
        index === currIndex ? { ...question, code: newCode } : question
        
      )
    );
  };
  
  return (
      <div className="h-full w-full text-base">
        <CodeMirror
          value={code || '// Enter your code here'}
          theme="dark"
          height="100%"
          extensions={[java()]}
          // options={{ fontSize: '20px' }} // Adjust the font size here
          lineNumbers
          lineWrapping // Enable line wrapping
          mode="javascript"
          onChange={handleChange} // Pass the handleChange function as onChange prop
        />
    </div>
  );
};

export default CodeEditor;
