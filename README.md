// app/libraries/page.tsx
"use client";

import { useState, useRef } from "react";
import { Streamdown } from "streamdown";
import { SidebarProvider, SidebarInset, AppSidebar, FloatingMobileNav } from "@/components/layout";
import SiteHeader from "@/components/site-header";

// Your full README.md content as a string
const documentationContent = `
# @ageofai/vp-ui

![npm version](https://img.shields.io/npm/v/@ageofai/vp-ui)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/react->=18.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-supported-blue)

A beautiful, reusable voice interface component with real-time audio visualization, built for React and powered by Pipecat AI. Create engaging voice interactions with customizable styling and comprehensive event handling.

---

## Features

- 🔊 Real-time Voice Interaction
- 🎧 Dynamic Audio Visualization
- 📜 Live Transcript Display
- 💻 TypeScript Support
- 🎨 Customizable Styling
- 🌙 Theme Support (Dark/Light)
- 📱 Responsive Design
- ⚡ Event Handling
- 🔌 Modular Architecture

---

## Installation

\`\`\`bash:title=Using npm
npm install @ageofai/vp-ui
\`\`\`

\`\`\`bash:title=Using yarn
yarn add @ageofai/vp-ui
\`\`\`

\`\`\`bash:title=Using pnpm
pnpm add @ageofai/vp-ui
\`\`\`

---

## Quick Start

\`\`\`tsx:title=Basic Usage
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

---

## API Reference

### VoiceUI Component

#### \`serverUrl\` *(string)*
Pipecat server URL.

\`\`\`tsx
<VoiceUI serverUrl="http://localhost:8099" />
\`\`\`

#### \`systemPrompt\` *(string)*
System prompt for the AI agent.

\`\`\`tsx
<VoiceUI systemPrompt="You are a helpful assistant." />
\`\`\`

#### \`theme\` *('dark' | 'light')*
Color theme for the component.

\`\`\`tsx
<VoiceUI theme="light" />
\`\`\`

#### \`size\` *('sm' | 'md' | 'lg')*
Component size variant.

\`\`\`tsx
<VoiceUI size="lg" />
\`\`\`

#### \`className\` *(string)*
Additional CSS classes for root container.

\`\`\`tsx
<VoiceUI className="border rounded-lg shadow-lg" />
\`\`\`

#### \`orbClassName\` *(string)*
Additional CSS classes for the audio orb.

\`\`\`tsx
<VoiceUI orbClassName="ring-4 ring-blue-500" />
\`\`\`

#### \`controlsClassName\` *(string)*
Additional CSS classes for controls container.

\`\`\`tsx
<VoiceUI controlsClassName="gap-6" />
\`\`\`

#### \`transcriptClassName\` *(string)*
Additional CSS classes for transcript area.

\`\`\`tsx
<VoiceUI transcriptClassName="font-mono text-green-400" />
\`\`\`

#### \`showInfo\`, \`showShare\`, \`showTranscript\` *(boolean)*
Control visibility of UI buttons.

\`\`\`tsx
<VoiceUI showInfo={false} showShare={false} />
\`\`\`

#### \`onShare\`, \`onInfoClick\` *((() => void))*
Custom event handlers.

\`\`\`tsx
<VoiceUI
  onShare={() => navigator.clipboard.writeText('Check this out!')}
  onInfoClick={() => alert('Custom info!')}
/>
\`\`\`

---

### \`useAgeOfAiConnect\` Hook

Advanced hook for building custom voice interfaces.

\`\`\`tsx:title=Hook Usage
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

| Option | Type | Description |
|--------|------|-------------|
| \`serverUrl\` | string | Pipecat server URL |
| \`systemPrompt\` | string | AI system prompt |
| \`enableMic\` | boolean | Enable microphone |
| \`enableCam\` | boolean | Enable camera |
| \`debug\` | boolean | Enable debug logs |

---

## Advanced Usage

### Custom Styling

\`\`\`tsx:title=Styled VoiceUI
<VoiceUI
  serverUrl="http://localhost:8099"
  className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-8"
  orbClassName="shadow-2xl shadow-purple-500/50 ring-2 ring-purple-400"
  controlsClassName="gap-8 mt-6"
  transcriptClassName="bg-black/20 backdrop-blur-sm rounded-lg p-4 font-mono text-green-400"
  theme="dark"
  size="lg"
/>
\`\`\`

### Custom Implementation

\`\`\`tsx:title=Custom Voice Interface
import { useAgeOfAiConnect } from '@ageofai/vp-ui';

function CustomVoiceInterface() {
  const {
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
    <div className="space-y-4 p-6 bg-gray-100 rounded-lg">
      <button
        onClick={isConnected ? disconnect : connect}
        disabled={isConnecting}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
      </button>
      
      {transcript.length > 0 && (
        <div className="transcript mt-4 p-3 bg-black text-green-400 rounded font-mono text-sm max-h-60 overflow-y-auto">
          {transcript.map((msg, i) => (
            <div key={i} className={\`message \${msg.role}\`}>
              <strong>{msg.role}:</strong> {msg.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
\`\`\`

---

## Examples

### Minimal Setup

\`\`\`tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  showInfo={false}
  showShare={false}
  size="sm"
/>
\`\`\`

### Full-Featured Implementation

\`\`\`tsx
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
  onShare={() => alert('Shared!')}
/>
\`\`\`

### Next.js Integration

\`\`\`tsx:title=Next.js Page
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

---

## TypeScript Support

Full TypeScript definitions included.

\`\`\`ts
import { VoiceUIProps } from '@ageofai/vp-ui';

const props: VoiceUIProps = {
  serverUrl: 'http://localhost:8099',
  theme: 'dark',
  size: 'lg',
  onShare: () => console.log('shared')
};
\`\`\`

---

## Requirements

- **React**: 18.0.0+
- **Node.js**: 16.0.0+
- **Tailwind CSS** (recommended)
- Running **Pipecat Server** at \`serverUrl\`

---

## Support

- 🐛 [Issue Tracker](https://github.com/ageofai/vp-ui/issues)
- 💬 [Discussions](https://github.com/ageofai/vp-ui/discussions)
- 📧 Email: support@ageofai.com

---

## License

MIT License – see [LICENSE](LICENSE) for details.
`;

export default function LibrariesPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <FloatingMobileNav />
      <SidebarInset>
        <SiteHeader />
        <main className="flex-1 px-6 py-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            {/* Render full documentation with Streamdown */}
            <Streamdown
              children={documentationContent}
              // Optional: customize theme
              shikiTheme={["github-light", "github-dark"]}
              // Security: restrict image/link origins in production
              allowedImagePrefixes={["https://", "data:image/"]}
              allowedLinkPrefixes={["https://", "mailto:"]}
              // Enable incomplete Markdown parsing (great for streaming)
              parseIncompleteMarkdown={true}
              // Add custom className to wrapper
              className="prose prose-lg max-w-none"
              // Optional: add custom components
              components={{
                h1: (props) => <h1 {...props} className="text-4xl font-bold text-gray-900 mb-6" />,
                h2: (props) => <h2 {...props} className="text-3xl font-semibold text-gray-800 mt-10 mb-4" />,
                h3: (props) => <h3 {...props} className="text-2xl font-medium text-gray-800 mt-8 mb-3" />,
                p: (props) => <p {...props} className="text-gray-700 leading-relaxed" />,
                a: (props) => (
                  <a
                    {...props}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
                code: (props) => (
                  <code
                    {...props}
                    className="font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded text-red-600"
                  />
                ),
              }}
            />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}