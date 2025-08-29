# Voice UI Component

A beautiful, reusable voice interface component with real-time audio visualization, built for React and powered by Pipecat AI.

## Features

- 🎤 Real-time voice interaction
- 🌊 Dynamic audio visualization
- 📝 Live transcript display
- 🎨 Customizable styling with Tailwind CSS
- 🌙 Dark/Light theme support
- 📱 Responsive design
- 🔧 TypeScript support

## Installation

\`\`\`bash
npm install @ageofai/vp-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { VoiceUI } from '@ageofai/vp-ui';

function App() {
  return (
    <VoiceUI
      serverUrl="http://localhost:8099"
      systemPrompt="You are a helpful assistant."
      authToken="your-auth-token"
    />
  );
}
\`\`\`

## Props

### Core Connection Options
All `useAgeOfAiConnect` hook options are supported:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `serverUrl` | `string` | `'http://localhost:8099'` | Pipecat server URL |
| `systemPrompt` | `string` | - | System prompt for the AI |
| `authToken` | `string` | - | Authentication token |
| `agentId` | `string` | - | Agent ID to use |
| `enableMic` | `boolean` | `true` | Enable microphone |
| `enableCam` | `boolean` | `false` | Enable camera |
| `debug` | `boolean` | `false` | Enable debug logging |

### UI Customization

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes for root container |
| `orbClassName` | `string` | `''` | Additional CSS classes for the orb |
| `controlsClassName` | `string` | `''` | Additional CSS classes for controls |
| `transcriptClassName` | `string` | `''` | Additional CSS classes for transcript |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size variant |
| `theme` | `'dark' \| 'light'` | `'dark'` | Color theme |

### UI Features

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showInfo` | `boolean` | `true` | Show info button |
| `showShare` | `boolean` | `true` | Show share button |
| `showTranscript` | `boolean` | `true` | Show transcript button |

### Event Handlers

| Prop | Type | Description |
|------|------|-------------|
| `onShare` | `() => void` | Custom share handler |
| `onInfoClick` | `() => void` | Custom info click handler |

### Text Customization

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `infoTitle` | `string` | `'Voice UI Component'` | Info drawer title |
| `infoDescription` | `string` | Default description | Info drawer description |

## Examples

### Custom Styling

\`\`\`tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  className="border border-gray-300 rounded-lg"
  orbClassName="ring-4 ring-blue-500"
  theme="light"
  size="lg"
/>
\`\`\`

### Custom Event Handlers

\`\`\`tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  onShare={() => {
    navigator.clipboard.writeText('Check out this voice UI!');
  }}
  onInfoClick={() => {
    alert('Custom info handler!');
  }}
/>
\`\`\`

### Minimal Configuration

\`\`\`tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  showInfo={false}
  showShare={false}
  showTranscript={false}
  size="sm"
/>
\`\`\`

## Using the Hook Separately

You can also use the `useAgeOfAiConnect` hook independently:

\`\`\`tsx
import { useAgeOfAiConnect } from '@ageofai/vp-ui';

function MyComponent() {
  const {
    client,
    isConnected,
    isConnecting,
    transcript,
    connect,
    disconnect,
    sendMessage,
  } = useAgeOfAiConnect({
    serverUrl: 'http://localhost:8099',
    systemPrompt: 'You are a helpful assistant.',
    debug: true,
  });

  return (
    <div>
      <button onClick={connect} disabled={isConnecting}>
        {isConnected ? 'Connected' : 'Connect'}
      </button>
      {/* Your custom UI */}
    </div>
  );
}
\`\`\`

## Requirements

- React 18+
- Tailwind CSS (for styling)
- A Pipecat server running

## Development

\`\`\`bash
# Install dependencies
npm install

# Build the component
npm run build

# Watch for changes during development
npm run dev
\`\`\`

## License

MIT
