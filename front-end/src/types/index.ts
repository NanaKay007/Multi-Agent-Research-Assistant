export type AIMode = 'research' | 'summarization' | 'fact-checking';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface ChatState {
  messages: Message[];
  currentMode: AIMode;
  attachedFiles: AttachedFile[];
  isLoading: boolean;

  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => string;
  updateMessage: (id: string, content: string) => void;
  setMessageStreaming: (id: string, isStreaming: boolean) => void;
  setMode: (mode: AIMode) => void;
  attachFile: (file: File) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  setLoading: (loading: boolean) => void;
  clearChat: () => void;
}
