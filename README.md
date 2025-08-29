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
      theme="dark"
      size="md"
    />
  );
}
\`\`\`

## API Reference

### VoiceUI Component

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

## Advanced Usage

### Custom Styling

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

### Custom Implementation

\`\`\`tsx
import { useAgeOfAiConnect } from '@ageofai/vp-ui';

function CustomVoiceInterface() {
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
    enableMic: true,
    debug: true
  });

  return (
    <div className="voice-interface">
      <button 
        onClick={isConnected ? disconnect : connect}
        disabled={isConnecting}
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
    </div>
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

  return (
    <VoiceUI
      serverUrl="http://localhost:8099"
      systemPrompt="You are a knowledgeable AI assistant."
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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <VoiceUI
        serverUrl={process.env.NEXT_PUBLIC_PIPECAT_URL || 'http://localhost:8099'}
        systemPrompt="You are a helpful AI assistant."
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

const voiceProps: VoiceUIProps = {
  serverUrl: 'http://localhost:8099',
  theme: 'dark',
  size: 'lg',
  onShare: () => void 0
};
\`\`\`

## Requirements

- **React**: 18.0.0 or higher
- **Node.js**: 16.0.0 or higher  
- **Tailwind CSS**: For styling (recommended)
- **Pipecat Server**: Running instance for voice processing

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
