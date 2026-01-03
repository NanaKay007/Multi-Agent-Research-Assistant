import { useChatStore } from '../store/useChatStore';
import type { AIMode } from '../types';

const modes: { value: AIMode; label: string; icon: string }[] = [
  { value: 'research', label: 'Research', icon: '🔍' },
  { value: 'summarization', label: 'Summarize', icon: '📝' },
  { value: 'fact-checking', label: 'Fact Check', icon: '✓' },
];

export function ModeSelector() {
  const { currentMode, setMode } = useChatStore();

  return (
    <div className="flex gap-2 p-2 bg-gray-100 rounded-lg">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => setMode(mode.value)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all
            ${
              currentMode === mode.value
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          <span>{mode.icon}</span>
          <span>{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
