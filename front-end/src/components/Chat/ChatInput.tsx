import { useState, useRef } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { sendMessage } from '../../services/mockApi';

export function ChatInput() {
  const [input, setInput] = useState('');
  const {
    isLoading,
    addMessage,
    updateMessage,
    setMessageStreaming,
    setLoading,
    clearFiles
  } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    addMessage({
      role: 'user',
      content: userMessage,
    });

    // Clear attached files after sending
    clearFiles();

    // Create assistant message placeholder
    const assistantId = addMessage({
      role: 'assistant',
      content: '',
      isStreaming: true,
    });

    setLoading(true);

    // Stream the response (mode is auto-detected)
    let content = '';
    await sendMessage(
      userMessage,
      (chunk) => {
        content += chunk;
        updateMessage(assistantId, content);
      },
      () => {
        setMessageStreaming(assistantId, false);
        setLoading(false);
      }
    );

    // Focus back on input
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white p-4">
      <div className="flex gap-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything... I'll research, summarize, or fact-check based on your question"
          disabled={isLoading}
          rows={1}
          className="
            flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500
          "
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="
            px-6 py-3 bg-blue-600 text-white rounded-lg font-medium
            hover:bg-blue-700 transition-colors
            disabled:bg-gray-300 disabled:cursor-not-allowed
          "
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-1">
              <span className="animate-spin">⏳</span>
            </span>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </form>
  );
}
