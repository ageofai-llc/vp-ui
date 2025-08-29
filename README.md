# @ageofai/vp-ui

[![npm version](https://badge.fury.io/js/%40ageofai%2Fvp-ui.svg)](https://badge.fury.io/js/%40ageofai%2Fvp-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A beautiful, reusable voice interface component for React applications. Features real-time audio visualization, transcript display, and seamless integration with Pipecat AI servers.

## Features

- 🎤 **Real-time Voice Interface** - Connect and communicate with AI agents via voice
- 🎨 **Audio Visualization** - Dynamic orb that responds to audio levels
- 📝 **Live Transcription** - Real-time display of conversation transcripts
- 🎯 **Highly Customizable** - Extensive styling and behavior options
- 🌙 **Theme Support** - Built-in dark and light themes
- 📱 **Responsive Design** - Works seamlessly across all device sizes
- 🔧 **TypeScript Ready** - Full type safety and IntelliSense support
- 🎛️ **Advanced Hook** - Use the underlying hook for custom implementations

## Installation

\`\`\`bash
# npm
npm install @ageofai/vp-ui

# yarn
yarn add @ageofai/vp-ui

# pnpm
pnpm add @ageofai/vp-ui
\`\`\`

## Quick Start

\`\`\`tsx
import { VoiceUI } from '@ageofai/vp-ui';

function App() {
  return (
    <VoiceUI
      serverUrl="http://localhost:8099"
      systemPrompt="You are a helpful assistant."
      theme="dark"
      size="md"
    />
  );
}
\`\`\`

## Basic Configuration

### Connection Settings

\`\`\`tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  systemPrompt="You are a helpful AI assistant."
  authToken="your-auth-token"
  agentId="your-agent-id"
  enableMic={true}
  enableCam={false}
  debug={true}
/>
\`\`\`

### Theme and Size Options

\`\`\`tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  theme="light"        // 'dark' | 'light'
  size="lg"           // 'sm' | 'md' | 'lg'
/>
\`\`\`

### UI Feature Controls

\`\`\`tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  showInfo={true}        // Show info button
  showShare={true}       // Show share button
  showTranscript={true}  // Show transcript toggle
/>
\`\`\`

## Advanced Styling

### Custom CSS Classes

\`\`\`tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  className="border border-gray-300 rounded-lg shadow-lg"
  orbClassName="ring-4 ring-blue-500 shadow-2xl"
  controlsClassName="gap-6 mt-4"
  transcriptClassName="bg-gray-100 rounded-lg p-4"
/>
\`\`\`

### Event Handlers

\`\`\`tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  onShare={() => {
    navigator.clipboard.writeText('Check out this amazing voice UI!');
    alert('Link copied to clipboard!');
  }}
  onInfoClick={() => {
    console.log('Custom info handler');
  }}
/>
\`\`\`

### Custom Info Content

\`\`\`tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  infoTitle="My Custom Voice Assistant"
  infoDescription="This is a custom voice interface powered by AI."
/>
\`\`\`

## Complete Examples

### Minimal Setup

\`\`\`tsx
import { VoiceUI } from '@ageofai/vp-ui';

export default function MinimalVoice() {
  return (
    <VoiceUI
      serverUrl="http://localhost:8099"
      showInfo={false}
      showShare={false}
      showTranscript={false}
      size="sm"
    />
  );
}
\`\`\`

### Full-Featured Implementation

\`\`\`tsx
import { VoiceUI } from '@ageofai/vp-ui';

export default function FullVoice() {
  const handleShare = () => {
    navigator.clipboard.writeText('Check out this amazing voice UI!');
    alert('Link copied to clipboard!');
  };

  const handleInfo = () => {
    console.log('Custom info handler');
  };

  return (
    <VoiceUI
      serverUrl="http://localhost:8099"
      systemPrompt="You are a knowledgeable AI assistant."
      authToken="your-auth-token"
      theme="dark"
      size="lg"
      className="max-w-2xl mx-auto border border-gray-700 rounded-2xl"
      orbClassName="ring-4 ring-blue-500/50 shadow-2xl shadow-blue-500/25"
      controlsClassName="gap-8 mt-6"
      transcriptClassName="max-h-64 overflow-y-auto bg-gray-900/50 rounded-lg p-4"
      showInfo={true}
      showShare={true}
      showTranscript={true}
      onShare={handleShare}
      onInfoClick={handleInfo}
      infoTitle="AI Voice Assistant"
      infoDescription="Powered by advanced AI technology for natural conversations."
    />
  );
}
\`\`\`

### Next.js Integration

\`\`\`tsx
// app/voice/page.tsx
import { VoiceUI } from '@ageofai/vp-ui';

export default function VoicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <VoiceUI
        serverUrl={process.env.NEXT_PUBLIC_PIPECAT_URL || 'http://localhost:8099'}
        systemPrompt="You are a helpful AI assistant."
        theme="dark"
        size="lg"
        className="w-full max-w-lg"
        orbClassName="shadow-2xl shadow-purple-500/30"
      />
    </div>
  );
}
\`\`\`

## Using the Hook Separately

For advanced use cases, use the `useAgeOfAiConnect` hook independently:

\`\`\`tsx
import { useAgeOfAiConnect } from '@ageofai/vp-ui';

function CustomVoiceInterface() {
  const {
    client,
    isConnected,
    isConnecting,
    transcript,
    isBotSpeaking,
    isUserSpeaking,
    connect,
    disconnect,
    sendMessage,
    sendVoiceMode,
    clearTranscript,
  } = useAgeOfAiConnect({
    serverUrl: 'http://localhost:8099',
    systemPrompt: 'You are a helpful assistant.',
    enableMic: true,
    enableCam: false,
    debug: true,
    authToken: 'your-auth-token',
    agentId: 'your-agent-id',
  });

  return (
    <div className="voice-interface">
      <button 
        onClick={isConnected ? disconnect : connect}
        disabled={isConnecting}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
      </button>
      
      <div className="status">
        <p>Bot Speaking: {isBotSpeaking ? 'Yes' : 'No'}</p>
        <p>User Speaking: {isUserSpeaking ? 'Yes' : 'No'}</p>
      </div>

      <button 
        onClick={() => sendMessage('Hello, how are you?')}
        disabled={!isConnected}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Send Message
      </button>

      <button 
        onClick={clearTranscript}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Clear Transcript
      </button>
      
      {transcript.length > 0 && (
        <div className="transcript mt-4">
          {transcript.map((msg, i) => (
            <div key={msg.id || i} className={`message p-2 mb-2 rounded ${
              msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <strong>{msg.role}:</strong> {msg.content}
              {!msg.final && <span className="text-xs text-gray-500 ml-2">(interim)</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
\`\`\`

## API Reference

### VoiceUI Props

All props from `useAgeOfAiConnect` options plus:

\`\`\`tsx
interface VoiceUIProps {
  // Connection & AI
  serverUrl?: string;           // Pipecat server URL
  systemPrompt?: string;        // AI system prompt
  authToken?: string;           // Authentication token
  agentId?: string;             // Agent identifier
  enableMic?: boolean;          // Enable microphone
  enableCam?: boolean;          // Enable camera
  debug?: boolean;              // Debug logging

  // Styling
  className?: string;           // Root container classes
  orbClassName?: string;        // Audio orb classes
  controlsClassName?: string;   // Controls container classes
  transcriptClassName?: string; // Transcript area classes

  // UI Features
  showInfo?: boolean;           // Show info button
  showShare?: boolean;          // Show share button
  showTranscript?: boolean;     // Show transcript toggle

  // Appearance
  size?: 'sm' | 'md' | 'lg';   // Component size
  theme?: 'dark' | 'light';    // Color theme

  // Event Handlers
  onShare?: () => void;         // Custom share handler
  onInfoClick?: () => void;     // Custom info handler

  // Content
  infoTitle?: string;           // Info drawer title
  infoDescription?: string;     // Info drawer description
}
\`\`\`

### useAgeOfAiConnect Hook

\`\`\`tsx
const {
  // State
  client,              // PipecatClient instance
  isConnected,         // Connection status
  isConnecting,        // Connecting status
  transportState,      // Transport state
  error,              // Error message
  transcript,         // Message array
  isBotSpeaking,      // Bot speaking status
  isUserSpeaking,     // User speaking status

  // Actions
  connect,            // Connect to server
  disconnect,         // Disconnect from server
  sendMessage,        // Send text message
  sendVoiceMode,      // Toggle voice mode
  clearTranscript,    // Clear transcript
} = useAgeOfAiConnect(options);
\`\`\`

### Transcript Message Format

\`\`\`tsx
interface TranscriptMessage {
  id: string;           // Unique message ID
  role: 'user' | 'assistant';  // Message sender
  content: string;      // Message content
  timestamp: Date;      // Message timestamp
  final?: boolean;      // Is final (not interim)
}
\`\`\`

## TypeScript Support

Full TypeScript definitions are included:

\`\`\`tsx
import { 
  VoiceUI, 
  useAgeOfAiConnect, 
  VoiceUIProps, 
  UseAgentConnectOptions,
  TranscriptMessage 
} from '@ageofai/vp-ui';

const voiceProps: VoiceUIProps = {
  serverUrl: 'http://localhost:8099',
  theme: 'dark',
  size: 'lg',
  onShare: () => console.log('Shared!')
};
\`\`\`

## Requirements

- **React**: 18.0.0 or higher
- **Node.js**: 16.0.0 or higher  
- **Tailwind CSS**: For styling (recommended)
- **Pipecat Server**: Running instance for voice processing

## Development

\`\`\`bash
# Install dependencies
npm install

# Build the component
npm run build

# Watch for changes during development
npm run dev

# Run tests
npm test
\`\`\`

## Contributing

We welcome contributions! Please see our Contributing Guide for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- 🐛 [Issue Tracker](https://github.com/ageofai/vp-ui/issues)
- 💬 [Discussions](https://github.com/ageofai/vp-ui/discussions)
- 📧 Email Support: support@ageofai.com

## License

MIT License - see the [LICENSE](LICENSE) file for details.
