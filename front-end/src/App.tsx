import { ModeSelector } from './components/ModeSelector';
import { FileUpload } from './components/FileUpload';
import { ChatContainer } from './components/Chat';
import { useChatStore } from './store/useChatStore';

function App() {
  const { clearChat, messages } = useChatStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto h-screen flex flex-col p-4 gap-4">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Research Assistant
          </h1>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear Chat
            </button>
          )}
        </header>

        {/* Mode Selector */}
        <ModeSelector />

        {/* File Upload */}
        <FileUpload />

        {/* Chat Area */}
        <div className="flex-1 min-h-0">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
