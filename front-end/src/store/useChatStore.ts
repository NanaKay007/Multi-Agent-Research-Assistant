import { create } from 'zustand';
import type { ChatState, AIMode, AttachedFile } from '../types';

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentMode: 'research',
  attachedFiles: [],
  isLoading: false,

  addMessage: (message) => {
    const id = crypto.randomUUID();
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id,
          timestamp: new Date(),
        },
      ],
    }));
    return id;
  },

  updateMessage: (id, content) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content } : msg
      ),
    }));
  },

  setMessageStreaming: (id, isStreaming) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, isStreaming } : msg
      ),
    }));
  },

  setMode: (mode: AIMode) => {
    set({ currentMode: mode });
  },

  attachFile: (file: File) => {
    const attachedFile: AttachedFile = {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
    };
    set((state) => ({
      attachedFiles: [...state.attachedFiles, attachedFile],
    }));
  },

  removeFile: (id: string) => {
    set((state) => ({
      attachedFiles: state.attachedFiles.filter((f) => f.id !== id),
    }));
  },

  clearFiles: () => {
    set({ attachedFiles: [] });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  clearChat: () => {
    set({ messages: [], attachedFiles: [] });
  },
}));
