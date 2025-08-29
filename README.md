# @ageofai/vp-ui

[![npm version](https://img.shields.io/npm/v/@ageofai/vp-ui)](https://www.npmjs.com/package/@ageofai/vp-ui)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![React](https://img.shields.io/badge/react-%3E%3D18.0.0-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/typescript-supported-blue)]()

A beautiful, reusable voice interface component with real-time audio visualization, built for React and powered by Pipecat AI. Create engaging voice interactions with customizable styling and comprehensive event handling.

## Features

- Real-time Voice Interaction
- Dynamic Audio Visualization  
- Live Transcript Display
- TypeScript Support
- Customizable Styling
- Theme Support (Dark/Light)
- Responsive Design
- Event Handling
- Modular Architecture

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
      authToken="your-auth-token"
      theme="dark"
      size="md"
    />
  );
}
\`\`\`

## API Reference

### VoiceUI Component

The main voice interface component with audio visualization and controls.

\`\`\`tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  systemPrompt="You are a helpful assistant."
  theme="dark"
  size="lg"
  className="custom-voice-ui"
  onShare={() => console.log('Shared!')}
/>
\`\`\`

#### Core Connection Props
- **serverUrl** *(string)*  
  Pipecat server URL.  
  \`\`\`tsx
  <VoiceUI serverUrl="http://localhost:8099" />
  \`\`\`
- **systemPrompt** *(string)*  
  System prompt for the AI agent.  
  \`\`\`tsx
  <VoiceUI systemPrompt="You are a helpful assistant." />
  \`\`\`
- **authToken** *(string)*  
  Authentication token for secure connections.  
  \`\`\`tsx
  <VoiceUI authToken="your-auth-token" />
  \`\`\`
- **agentId** *(string)*  
  Specific agent ID to use.  
  \`\`\`tsx
  <VoiceUI agentId="agent-123" />
  \`\`\`

#### UI Customization Props
- **theme** *('dark' | 'light')*  
  Color theme for the component.  
  \`\`\`tsx
  <VoiceUI theme="light" />
  \`\`\`
- **size** *('sm' | 'md' | 'lg')*  
  Component size variant.  
  \`\`\`tsx
  <VoiceUI size="lg" />
  \`\`\`
- **className** *(string)*  
  Additional CSS classes for root container.  
  \`\`\`tsx
  <VoiceUI className="border rounded-lg shadow-lg" />
  \`\`\`
- **orbClassName** *(string)*  
  Additional CSS classes for the audio orb.  
  \`\`\`tsx
  <VoiceUI orbClassName="ring-4 ring-blue-500" />
  \`\`\`
- **controlsClassName** *(string)*  
  Additional CSS classes for controls container.  
  \`\`\`tsx
  <VoiceUI controlsClassName="gap-6" />
  \`\`\`
- **transcriptClassName** *(string)*  
  Additional CSS classes for transcript area.  
  \`\`\`tsx
  <VoiceUI transcriptClassName="font-mono text-green-400" />
  \`\`\`

#### Feature Toggle Props
- **showInfo** *(boolean)*  
  Show/hide info button.  
  \`\`\`tsx
  <VoiceUI showInfo={false} />
  \`\`\`
- **showShare** *(boolean)*  
  Show/hide share button.  
  \`\`\`tsx
  <VoiceUI showShare={false} />
  \`\`\`
- **showTranscript** *(boolean)*  
  Show/hide transcript button.  
  \`\`\`tsx
  <VoiceUI showTranscript={false} />
  \`\`\`

#### Event Handler Props
- **onShare** *(() => void)*  
  Custom share button handler.  
  \`\`\`tsx
  <VoiceUI onShare={() => navigator.clipboard.writeText('Check this out!')} />
  \`\`\`
- **onInfoClick** *(() => void)*  
  Custom info button handler.  
  \`\`\`tsx
  <VoiceUI onInfoClick={() => alert('Custom info!')} />
  \`\`\`

### useAgeOfAiConnect Hook

Advanced hook for custom voice interface implementations.

\`\`\`tsx
import { useAgeOfAiConnect } from '@ageofai/vp-ui';

const {
  client,
  isConnected,
  isConnecting,
  transcript,
  connect,
  disconnect
} = useAgeOfAiConnect({
  serverUrl: 'http://localhost:8099',
  systemPrompt: 'You are a helpful assistant.',
  debug: true
});
\`\`\`

#### Hook Options
- **serverUrl** *(string)*  
  Pipecat server URL.  
  \`\`\`tsx
  useAgeOfAiConnect({ serverUrl: 'http://localhost:8099' })
  \`\`\`
- **systemPrompt** *(string)*  
  System prompt for the AI.  
  \`\`\`tsx
  useAgeOfAiConnect({ systemPrompt: 'You are a helpful assistant.' })
  \`\`\`
- **enableMic** *(boolean)*  
  Enable microphone input.  
  \`\`\`tsx
  useAgeOfAiConnect({ enableMic: true })
  \`\`\`
- **enableCam** *(boolean)*  
  Enable camera input.  
  \`\`\`tsx
  useAgeOfAiConnect({ enableCam: false })
  \`\`\`
- **debug** *(boolean)*  
  Enable debug logging.  
  \`\`\`tsx
  useAgeOfAiConnect({ debug: true })
  \`\`\`

#### Hook Returns
- **client**: Pipecat client instance
- **isConnected**: Connection status boolean
- **isConnecting**: Connection loading state
- **transcript**: Live transcript array
- **connect()**: Function to establish connection
- **disconnect()**: Function to close connection
- **sendMessage()**: Function to send messages

## Advanced Usage

### Custom Styling with Tailwind

\`\`\`tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-8"
  orbClassName="shadow-2xl shadow-purple-500/50 ring-2 ring-purple-400"
  controlsClassName="gap-8 mt-6"
  transcriptClassName="bg-black/20 backdrop-blur-sm rounded-lg p-4"
  theme="dark"
  size="lg"
/>
\`\`\`

### Complete Custom Implementation

\`\`\`tsx
import { useAgeOfAiConnect } from '@ageofai/vp-ui';

function CustomVoiceInterface() {
  const {
    client,
    isConnected,
    isConnecting,
    transcript,
    connect,
    disconnect,
    sendMessage
  } = useAgeOfAiConnect({
    serverUrl: 'http://localhost:8099',
    systemPrompt: 'You are a helpful assistant.',
    enableMic: true,
    enableCam: false,
    debug: true
  });

  return (
    <div className="voice-interface">
      <button 
        onClick={isConnected ? disconnect : connect}
        disabled={isConnecting}
        className="connect-btn"
      >
        {isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
      </button>
      
      {transcript.length > 0 && (
        <div className="transcript">
          {transcript.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
        </div>
      )}
      
      <button onClick={() => sendMessage('Hello!')}>
        Send Test Message
      </button>
    </div>
  );
}
\`\`\`

### Error Handling

\`\`\`tsx
import { VoiceUI } from '@ageofai/vp-ui';

function App() {
  const handleConnectionError = (error: Error) => {
    console.error('Voice UI connection error:', error);
    // Handle error (show toast, retry, etc.)
  };

  return (
    <VoiceUI
      serverUrl="http://localhost:8099"
      systemPrompt="You are a helpful assistant."
      onError={handleConnectionError}
      // Fallback UI for connection issues
      fallback={<div>Voice interface unavailable</div>}
    />
  );
}
\`\`\`

## Examples

### Minimal Setup

\`\`\`tsx
import { VoiceUI } from '@ageofai/vp-ui';

export default function MinimalVoice() {
  return (
    <VoiceUI
      serverUrl="http://localhost:8099"
      showInfo={false}
      showShare={false}
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
    window.open('/docs', '_blank');
  };

  return (
    <VoiceUI
      serverUrl="http://localhost:8099"
      systemPrompt="You are a knowledgeable AI assistant."
      authToken={process.env.NEXT_PUBLIC_VP_API_KEY}
      theme="dark"
      size="lg"
      className="max-w-2xl mx-auto"
      orbClassName="ring-4 ring-blue-500/50"
      controlsClassName="gap-6"
      transcriptClassName="max-h-64 overflow-y-auto"
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

### Integration with Next.js

\`\`\`tsx
// pages/voice.tsx or app/voice/page.tsx
import { VoiceUI } from '@ageofai/vp-ui';

export default function VoicePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <VoiceUI
        serverUrl={process.env.NEXT_PUBLIC_PIPECAT_URL || 'http://localhost:8099'}
        systemPrompt="You are a helpful AI assistant."
        authToken={process.env.NEXT_PUBLIC_VP_API_KEY}
        theme="dark"
        size="lg"
        className="w-full max-w-lg"
      />
    </div>
  );
}
\`\`\`

## TypeScript Support

Full TypeScript definitions are included for all components and hooks.

\`\`\`typescript
import { VoiceUI, useAgeOfAiConnect, VoiceUIProps } from '@ageofai/vp-ui';

// Type-safe props
const voiceProps: VoiceUIProps = {
  serverUrl: 'http://localhost:8099',
  theme: 'dark',
  size: 'lg',
  onShare: () => void 0
};

// Type-safe hook usage
const connection = useAgeOfAiConnect({
  serverUrl: 'http://localhost:8099',
  enableMic: true,
  debug: false
});
\`\`\`

## Requirements

- **React**: 18.0.0 or higher
- **Node.js**: 16.0.0 or higher  
- **Tailwind CSS**: For styling (recommended)
- **Pipecat Server**: Running instance for voice processing

## Development

\`\`\`bash
# Clone the repository
git clone https://github.com/ageofai/vp-ui.git
cd vp-ui

# Install dependencies
npm install

# Build the package
npm run build

# Watch for changes during development
npm run dev

# Run tests
npm test
\`\`\`

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- 📖 [Documentation](https://docs.ageofai.com/vp-ui)
- 🐛 [Issue Tracker](https://github.com/ageofai/vp-ui/issues)
- 💬 [Discussions](https://github.com/ageofai/vp-ui/discussions)
- 📧 [Email Support](mailto:support@ageofai.com)

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release notes and version history.
