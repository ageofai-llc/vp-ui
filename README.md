# @ageofai/vp-ui

✨ **@ageofai/vp-ui** is a beautiful, reusable **voice interface component** for React applications.  
It features **real-time audio visualization**, **live transcription**, and **seamless integration** with AI voice servers.

---

## 🚀 Features

- 🎤 **Real-time Voice Interface** – Connect and communicate with AI agents via voice  
- 🎨 **Audio Visualization** – Dynamic orb that responds to audio levels  
- 📝 **Live Transcription** – Real-time display of conversation transcripts  
- 🎯 **Highly Customizable** – Style and behavior flexibility  
- 🌙 **Theme Support** – Dark and light mode out of the box  
- 📱 **Responsive Design** – Works on mobile, tablet, and desktop  
- 🔧 **TypeScript Ready** – Full type safety and IntelliSense support  
- 🎛️ **Advanced Hook** – Use `useAgeOfAiConnect` for custom implementations  

---

## 📦 Installation

```bash
npm install @ageofai/vp-ui
```

---

## ⚡ Quick Start

```tsx
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
```

---

## ⚙️ Configuration

### Basic Setup

```tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  systemPrompt="You are a helpful AI assistant."
  authToken="your-auth-token"
  agentId="your-agent-id"
  enableMic={true}
  enableCam={false}
  debug={true}
/>
```

### Theme & Size Options

```tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  theme="light"        // 'dark' | 'light'
  size="lg"            // 'sm' | 'md' | 'lg'
/>
```

### UI Controls

```tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  showInfo={true}        // Show info button
  showShare={true}       // Show share button
  showTranscript={true}  // Show transcript toggle
/>
```

---

## 🎨 Styling

### Custom CSS Classes

```tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  className="border border-gray-300 rounded-lg shadow-lg"
  orbClassName="ring-4 ring-blue-500 shadow-2xl"
  controlsClassName="gap-6 mt-4"
  transcriptClassName="bg-gray-100 rounded-lg p-4"
/>
```

### Event Handlers

```tsx
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
```

### Custom Info Content

```tsx
<VoiceUI
  serverUrl="http://localhost:8099"
  infoTitle="My Custom Voice Assistant"
  infoDescription="This is a custom voice interface powered by AI."
/>
```

---

## 🔥 Examples

### Minimal Setup

```tsx
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
```

### Full-Featured Implementation

```tsx
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
```

---

## 🛠️ Using the Hook Separately

For custom implementations, use the `useAgeOfAiConnect` hook:

```tsx
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
            <div
              key={msg.id || i}
              className={`message p-2 mb-2 rounded ${
                msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              <strong>{msg.role}:</strong> {msg.content}
              {!msg.final && (
                <span className="text-xs text-gray-500 ml-2">(interim)</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 📖 API Reference

### VoiceUI Props

```tsx
interface VoiceUIProps {
  // Connection & AI
  serverUrl?: string;
  systemPrompt?: string;
  authToken?: string;
  agentId?: string;
  enableMic?: boolean;
  enableCam?: boolean;
  debug?: boolean;

  // Styling
  className?: string;
  orbClassName?: string;
  controlsClassName?: string;
  transcriptClassName?: string;

  // UI Features
  showInfo?: boolean;
  showShare?: boolean;
  showTranscript?: boolean;

  // Appearance
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';

  // Event Handlers
  onShare?: () => void;
  onInfoClick?: () => void;

  // Content
  infoTitle?: string;
  infoDescription?: string;
}
```

### useAgeOfAiConnect Hook

```tsx
const {
  // State
  client,
  isConnected,
  isConnecting,
  transportState,
  error,
  transcript,
  isBotSpeaking,
  isUserSpeaking,

  // Actions
  connect,
  disconnect,
  sendMessage,
  sendVoiceMode,
  clearTranscript,
} = useAgeOfAiConnect(options);
```

### Transcript Message Format

```tsx
interface TranscriptMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  final?: boolean;
}
```

---

## 🔧 Troubleshooting

### Common Issues

**Microphone not working:**
```tsx
// Check permissions
navigator.permissions.query({ name: 'microphone' })
  .then(result => console.log('Mic permission:', result.state));
```

**Connection failures:**
```bash
# Test server connectivity
curl -X GET http://localhost:8099/health
```

**Debug mode:**
```tsx
<VoiceUI debug={true} /> // Enables detailed console logging
```

---

## 📘 TypeScript Support

```tsx
import { 
  VoiceUI, 
  useAgeOfAiConnect, 
  VoiceUIProps, 
  TranscriptMessage 
} from '@ageofai/vp-ui';

const voiceProps: VoiceUIProps = {
  serverUrl: 'http://localhost:8099',
  theme: 'dark',
  size: 'lg',
  onShare: () => console.log('Shared!')
};
```

---

## 📋 Requirements

- **React**: `18.0.0+`  
- **Node.js**: `16.0.0+`  
- **Tailwind CSS**: (Recommended for styling)  

---

## 🤝 Contributing

1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add amazing feature'`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request  

---

## 🆘 Support

- 🐛 [Issue Tracker](https://github.com/ageofai/vp-ui/issues)  
- 💬 [Discussions](https://github.com/ageofai/vp-ui/discussions)  
- 📧 Email: **support@ageofai.com**  

---

## 📄 License

MIT License – see the [LICENSE](LICENSE) file for details.