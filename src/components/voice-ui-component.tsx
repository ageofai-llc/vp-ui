import React, { JSX, useEffect, useMemo, useRef, useState } from 'react';
import { RTVIEvent } from '@pipecat-ai/client-js';
import { PipecatClientProvider, PipecatClientAudio } from '@pipecat-ai/client-react';
import {useAgeOfAiConnect,UseAgentConnectOptions} from "../hooks/use-agent-connect"

// Icon components
function MicIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M5 11v1a7 7 0 0 0 14 0v-1" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 19v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function MicOffIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M5 11v1a7 7 0 0 0 14 0v-1" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 19v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M2 2l20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function InfoIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="7" r="1" fill="currentColor"/>
    </svg>
  );
}

function CCIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9.2 12.6c-.2.4-.6.7-1.2.7-1 0-1.7-.8-1.7-1.9s.7-1.9 1.7-1.9c.6 0 1 .3 1.2.7M17 12.6c-.2.4-.6.7-1.2.7-1 0-1.7-.8-1.7-1.9s.7-1.9 1.7-1.9c.6 0 1 .3 1.2.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function ShareIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 16V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M8 8l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

// Component props interface
export interface VoiceUIProps extends UseAgentConnectOptions {
  // Styling props
  className?: string;
  
  // UI behavior props
  showInfo?: boolean;
  showShare?: boolean;
  showTranscript?: boolean;
  
  // Custom styling overrides
  orbClassName?: string;
  controlsClassName?: string;
  transcriptClassName?: string;
  
  // Event handlers
  onShare?: () => void;
  onInfoClick?: () => void;
  
  // Customizable text
  infoTitle?: string;
  infoDescription?: string;
  
  // Size variants
  size?: 'sm' | 'md' | 'lg';
  
  // Theme variants
  theme?: 'dark' | 'light';
}

export function VoiceUI({
  className = '',
  showInfo = true,
  showShare = true,
  showTranscript: showTranscriptProp = true,
  orbClassName = '',
  controlsClassName = '',
  transcriptClassName = '',
  onShare,
  onInfoClick,
  infoTitle = 'Voice UI Component',
  infoDescription = 'A reusable voice interface component with real-time audio visualization and transcript display.',
  size = 'md',
  theme = 'dark',
  ...pipecatOptions
}: VoiceUIProps): JSX.Element {
  const [showInfoDrawer, setShowInfoDrawer] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [botAudioTrack, setBotAudioTrack] = useState<MediaStreamTrack | null>(null);
  
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const {
    client,
    isConnected,
    isConnecting,
    transportState,
    transcript,
    connect,
    disconnect,
    sendMessage,
  } = useAgeOfAiConnect({
    enableMic: isMicOn,
    enableCam: false,
    debug: true,
    ...pipecatOptions,
  });

  // Derive transcript lines
  const lines = useMemo(() => {
    if (!Array.isArray(transcript)) return [];
    return transcript
      .map((t: any) => {
        const role = t?.role ?? 'assistant';
        const text = t?.content ?? t?.text ?? '';
        const final = t?.final ?? true;
        return text ? { role, text, final } : null;
      })
      .filter(Boolean) as any[];
  }, [transcript]);

  // Auto-scroll transcript
  useEffect(() => {
    if (!showTranscript) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [showTranscript, transcript]);

  // Get bot audio track
  useEffect(() => {
    if (!client) {
      setBotAudioTrack(null);
      return;
    }

    const updateBotTrack = () => {
      try {
        const tracks = client.tracks();
        const track = tracks?.bot?.audio;
        
        if (track && track !== botAudioTrack) {
          setBotAudioTrack(track);
        } else if (!track && botAudioTrack) {
          setBotAudioTrack(null);
        }
      } catch (error) {
        console.warn('Could not access bot audio track:', error);
      }
    };

    updateBotTrack();
    const interval = setInterval(updateBotTrack, 1000);
    return () => clearInterval(interval);
  }, [client, botAudioTrack]);

  // Audio analysis for visualization
  useEffect(() => {
    if (!isBotSpeaking) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      setAudioLevel(0);
      return;
    }

    const startAnalysis = () => {
      if (botAudioTrack) {
        try {
          if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
          }
          const audioContext = audioContextRef.current;
          
          const source = audioContext.createMediaStreamSource(new MediaStream([botAudioTrack]));
          const analyser = audioContext.createAnalyser();
          
          analyser.fftSize = 1024;
          analyser.smoothingTimeConstant = 0.2;
          
          source.connect(analyser);
          analyserRef.current = analyser;
          mediaSourceRef.current = source;
          
          const frequencyData = new Uint8Array(analyser.frequencyBinCount);
          let smoothValue = 0;
          
          const loop = () => {
            if (!analyserRef.current || !isBotSpeaking) {
              setAudioLevel(0);
              return;
            }
            
            analyserRef.current.getByteFrequencyData(frequencyData);
            
            const startIndex = Math.floor(frequencyData.length * 0.05);
            const endIndex = Math.floor(frequencyData.length * 0.85);
            const slice = frequencyData.slice(startIndex, endIndex);
            const average = slice.reduce((sum, val) => sum + val, 0) / slice.length;
            
            const smoothingFactor = 0.2;
            if (average < 1) {
              smoothValue = Math.max(smoothValue - smoothingFactor * 5, 0);
            } else {
              smoothValue = smoothValue + (average - smoothValue) * smoothingFactor;
            }
            
            const normalizedLevel = Math.max(0, Math.min(smoothValue / 255, 1));
            setAudioLevel(normalizedLevel);
            
            animationFrameRef.current = requestAnimationFrame(loop);
          };
          
          animationFrameRef.current = requestAnimationFrame(loop);
          return;
          
        } catch (error) {
          console.warn('Bot track analysis failed:', error);
        }
      }
      
      // Fallback simulation
      const simulate = () => {
        if (!isBotSpeaking) {
          setAudioLevel(0);
          return;
        }
        
        const t = Date.now();
        const base = 0.3 + 0.2 * Math.sin(t * 0.008);
        const syllable = 0.15 * Math.sin(t * 0.015 + 1.2);
        const emphasis = 0.1 * Math.sin(t * 0.004 + 2.8) * Math.sin(t * 0.025);
        const randomSpike = Math.random() > 0.87 ? Math.random() * 0.25 : 0;
        
        const simulatedLevel = Math.max(0, Math.min(1, base + syllable + emphasis + randomSpike));
        setAudioLevel(simulatedLevel);
        
        animationFrameRef.current = requestAnimationFrame(simulate);
      };
      
      animationFrameRef.current = requestAnimationFrame(simulate);
    };

    startAnalysis();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (mediaSourceRef.current) {
        try {
          mediaSourceRef.current.disconnect();
        } catch {}
        mediaSourceRef.current = null;
      }
      analyserRef.current = null;
    };
  }, [isBotSpeaking, botAudioTrack]);

  // Listen to Pipecat events
  useEffect(() => {
    const c: any = client;
    if (!c?.on) return;
    
    const onBotStartedSpeaking = () => setIsBotSpeaking(true);
    const onBotStoppedSpeaking = () => setIsBotSpeaking(false);
    
    c.on(RTVIEvent.BotStartedSpeaking, onBotStartedSpeaking);
    c.on(RTVIEvent.BotStoppedSpeaking, onBotStoppedSpeaking);
    
    return () => {
      c.off?.(RTVIEvent.BotStartedSpeaking, onBotStartedSpeaking);
      c.off?.(RTVIEvent.BotStoppedSpeaking, onBotStoppedSpeaking);
    };
  }, [client]);

  // Cleanup audio context
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch {}
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      try { mediaSourceRef.current?.disconnect(); } catch {}
      analyserRef.current = null;
      mediaSourceRef.current = null;
    };
  }, []);

  // Handle share functionality
  const handleShare = async () => {
    if (onShare) {
      onShare();
      return;
    }

    try {
      const { toBlob } = await import('html-to-image');
      if (!rootRef.current) return;
      const blob = await toBlob(rootRef.current, { 
        pixelRatio: 2, 
        backgroundColor: theme === 'dark' ? '#000' : '#fff' 
      });
      if (!blob) return;
      const file = new File([blob], 'voice-ui.png', { type: 'image/png' });
      const nav: any = navigator;
      if (nav.share && nav.canShare?.({ files: [file] })) {
        await nav.share({ files: [file], title: 'Voice UI' });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'voice-ui.png'; a.click();
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.log('Share/screenshot not available, falling back to text share', e);
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Voice UI',
            text: `Voice conversation with ${lines.length} messages`,
            url: window.location.href,
          });
        } else {
          const transcriptText = lines.map(l => `${l.role}: ${l.text}`).join('\n');
          await navigator.clipboard.writeText(transcriptText || 'No transcript available');
        }
      } catch (fallbackError) {
        console.log('All share methods failed', fallbackError);
      }
    }
  };

  // Handle info click
  const handleInfoClick = () => {
    if (onInfoClick) {
      onInfoClick();
    } else {
      setShowInfoDrawer(true);
    }
  };

  // Mic button behavior
  const onMicClick = async () => {
    try {
      if (!isConnected) {
        await connect();
        setIsMicOn(true);
        (client as any)?.enableMic?.(true);
      } else {
        const next = !isMicOn;
        setIsMicOn(next);
        (client as any)?.enableMic?.(next);
      }
    } catch (e) {
      console.error('Mic click error', e);
    }
  };

  // Stop button
  const onStop = async () => {
    try {
      await disconnect();
      setIsMicOn(false);
    } catch (e) {
      console.error('Disconnect error', e);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: {
      orb: showTranscript ? 'w-32 h-32' : 'w-48 h-48',
      controls: 'h-10 w-10',
      icon: 'h-4 w-4',
      text: 'text-sm'
    },
    md: {
      orb: showTranscript ? 'w-[min(24vmin,220px)] h-[min(24vmin,220px)]' : 'w-[min(44vmin,360px)] h-[min(44vmin,360px)]',
      controls: 'h-12 w-12',
      icon: 'h-5 w-5',
      text: 'text-[clamp(14px,2.1vmin,18px)]'
    },
    lg: {
      orb: showTranscript ? 'w-80 h-80' : 'w-[min(50vmin,420px)] h-[min(50vmin,420px)]',
      controls: 'h-14 w-14',
      icon: 'h-6 w-6',
      text: 'text-lg'
    }
  };

  // Theme classes
  const themeClasses = {
    dark: {
      bg: 'bg-black text-white',
      orb: 'bg-white',
      button: 'border-white/40 bg-white text-black hover:bg-white/95',
      transcript: 'text-zinc-200',
      drawer: 'bg-black'
    },
    light: {
      bg: 'bg-white text-black',
      orb: 'bg-black',
      button: 'border-black/40 bg-black text-white hover:bg-black/95',
      transcript: 'text-gray-800',
      drawer: 'bg-white'
    }
  };

  const currentSize = sizeClasses[size];
  const currentTheme = themeClasses[theme];

  return (
    <div 
      ref={rootRef} 
      className={`relative min-h-dvh w-full overflow-hidden ${currentTheme.bg} ${className}`}
    >
      {/* Audio output */}
      {client ? (
        <PipecatClientProvider client={client}>
          <PipecatClientAudio />
        </PipecatClientProvider>
      ) : null}

      {/* Top controls */}
      {(showInfo || showShare || showTranscriptProp) && (
        <div className="fixed inset-x-0 top-3 z-20 flex items-center justify-center gap-3 text-zinc-300">
          {showInfo && (
            <button 
              aria-label="Info" 
              onClick={handleInfoClick} 
              className="rounded p-1.5 hover:text-zinc-100"
            >
              <InfoIcon className={currentSize.icon} />
            </button>
          )}
          {showTranscriptProp && (
            <button 
              aria-label="Transcript" 
              onClick={() => setShowTranscript(v => !v)} 
              className="rounded p-1.5 hover:text-zinc-100"
            >
              <CCIcon className={currentSize.icon} />
            </button>
          )}
          {showShare && (
            <button 
              aria-label="Share" 
              onClick={handleShare} 
              className="rounded p-1.5 hover:text-zinc-100"
            >
              <ShareIcon className={currentSize.icon} />
            </button>
          )}
        </div>
      )}

      {/* Connection status */}
      <div className="fixed left-3 top-3 z-20">
        <div className="text-xs text-zinc-400">
          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 ${
            isConnected ? 'border-emerald-400/50 text-emerald-300' : isConnecting ? 'border-yellow-300/40 text-yellow-200' : 'border-zinc-600 text-zinc-400'
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-emerald-400' : isConnecting ? 'bg-yellow-300' : 'bg-zinc-500'}`} />
            {isConnected ? 'Connected' : isConnecting ? 'Connecting…' : 'Disconnected'}
          </span>
          <div className="mt-1 text-[10px] text-zinc-500">
            {lines.length} messages
          </div>
        </div>
      </div>

      {/* Main stage */}
      <div className={`absolute inset-0 grid place-items-center transition-[grid-template-rows,padding] duration-300 ease-out ${
        showTranscript ? 'grid-rows-[minmax(200px,42vh)_1fr] pt-14' : 'grid-rows-1'
      }`}>
        {/* Audio-responsive orb */}
        <div className="relative select-none" aria-hidden>
          <div
            className={`relative rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.08)] transition-transform duration-60 ease-out ${
              !isBotSpeaking ? 'animate-[orbPulse_2.2s_ease-in-out_infinite]' : ''
            } ${currentTheme.orb} ${currentSize.orb} ${orbClassName}
            bg-[radial-gradient(60%_60%_at_50%_65%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.85)_40%,rgba(255,255,255,0.75)_60%,rgba(255,255,255,0.6)_75%),radial-gradient(50%_70%_at_50%_80%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_70%)]`}
            style={{
              transform: isBotSpeaking 
                ? `scale(${1 + (audioLevel * 0.32)})` 
                : undefined,
              boxShadow: isBotSpeaking 
                ? `0 0 ${18 + (audioLevel * 90)}px ${6 + (audioLevel * 22)}px rgba(255,255,255,${0.08 + (audioLevel * 0.24)})`
                : undefined
            }}
          />
          <div 
            className={`pointer-events-none absolute inset-0 -z-10 rounded-full border border-white/30 transition-all duration-60 ease-out ${
              !isBotSpeaking ? 'animate-[ring_2.2s_ease-out_infinite]' : ''
            } ${currentSize.orb}`}
            style={{
              transform: isBotSpeaking 
                ? `scale(${1.18 + (audioLevel * 0.28)})` 
                : 'scale(1.18)',
              opacity: isBotSpeaking 
                ? 0.28 + (audioLevel * 0.45)
                : undefined
            }}
          />
        </div>

        {/* Transcript */}
        {showTranscript && (
          <div className={`relative mx-auto w-[min(90vw,840px)] ${transcriptClassName}`}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/90 to-transparent blur-md" />
            <div
              ref={scrollRef}
              role="region"
              aria-label="Conversation transcript"
              className="h-[44vh] overflow-y-auto px-5 py-7 scrollbar-none [mask-image:linear-gradient(to_bottom,transparent_0%,black_7%,black_93%,transparent_100%)]"
            >
              {lines.length === 0 && (
                <p className={`mb-3 leading-relaxed text-zinc-400 ${currentSize.text}`}>
                  No transcript yet. Tap the mic to start talking.
                </p>
              )}
              {lines.map((l, i) => (
                <p key={i} className={`mb-3 leading-relaxed ${currentSize.text}`}>
                  <span className={`mr-2 rounded px-1.5 py-0.5 text-[12px] align-middle ${
                    l.role === 'user' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-200'
                  }`}>
                    {l.role === 'user' ? 'You' : 'Assistant'}
                  </span>
                  <span className={currentTheme.transcript}>{l.text}</span>
                  {!l.final && <span className="ml-2 text-xs text-zinc-500 italic">(interim)</span>}
                </p>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-black/90 to-transparent blur-md" />
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="fixed inset-x-0 bottom-6 z-10 flex justify-center">
        <div className={`flex items-center gap-3 ${controlsClassName}`}>
          <button
            aria-label={isConnected ? (isMicOn ? 'Mute microphone' : 'Unmute microphone') : 'Connect & start talking'}
            onClick={onMicClick}
            className={`grid place-items-center rounded-full border shadow-md transition-all duration-200 ${currentSize.controls} ${
              !isConnected 
                ? currentTheme.button
                : isMicOn 
                ? 'border-green-500/60 bg-green-500 text-white hover:bg-green-600 shadow-green-500/25'
                : 'border-red-500/60 bg-red-500 text-white hover:bg-red-600 shadow-red-500/25'
            }`}
          >
            {!isConnected ? (
              <MicIcon className={currentSize.icon} />
            ) : isMicOn ? (
              <MicIcon className={currentSize.icon} />
            ) : (
              <MicOffIcon className={currentSize.icon} />
            )}
          </button>
          <button
            aria-label="Stop and disconnect"
            onClick={onStop}
            className={`grid place-items-center rounded-full border shadow-md transition-colors ${currentSize.controls} ${
              isConnected 
                ? 'border-red-500/60 bg-red-500 text-white hover:bg-red-600' 
                : currentTheme.button
            }`}
          >
            <XIcon className={currentSize.icon} />
          </button>
        </div>
      </div>

      {/* Info drawer */}
      {showInfoDrawer && (
        <>
          <div 
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm" 
            onClick={() => setShowInfoDrawer(false)} 
          />
          <div className={`fixed inset-x-0 bottom-0 z-40 translate-y-full animate-[drawerUp_.24s_ease-out_forwards] rounded-t-2xl p-4 shadow-[0_-10px_60px_rgba(0,0,0,0.6)] ${currentTheme.drawer}`}>
            <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-zinc-700" />
            <h3 className="mb-2 text-zinc-100">{infoTitle}</h3>
            <p className="text-sm leading-relaxed text-zinc-300">
              {infoDescription}
            </p>
            <div className="mt-3 flex justify-center">
              <button 
                onClick={() => setShowInfoDrawer(false)} 
                className="h-9 rounded-md bg-white px-3 text-sm font-medium text-black hover:bg-zinc-100"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}

      {/* Global styles */}
      <style>
        {`
          @keyframes orbPulse { 
            0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,.22) } 
            50% { transform: scale(1.06); box-shadow: 0 0 60px 10px rgba(255,255,255,.10) } 
          }
          @keyframes ring { 
            0% { transform: scale(1); opacity: .45 } 
            60%,100% { transform: scale(1.25); opacity: 0 } 
          }
          @keyframes drawerUp { 
            from { transform: translateY(100%) } 
            to { transform: translateY(0) } 
          }
          .scrollbar-none { 
            scrollbar-width: none; 
          }
          .scrollbar-none::-webkit-scrollbar { 
            display: none; 
          }
        `}
      </style>
    </div>
  );
}
