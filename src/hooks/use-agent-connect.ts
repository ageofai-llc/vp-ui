"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { PipecatClient, type TransportState } from "@pipecat-ai/client-js"
import { SmallWebRTCTransport } from "@pipecat-ai/small-webrtc-transport"

interface UseAgentConnectOptions {
  serverUrl?: string
  systemPrompt?: string
  enableMic?: boolean
  enableCam?: boolean
  debug?: boolean
  authToken?: string | null
  agentId?: string | null
}

interface TranscriptMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  final?: boolean
}

interface AgentConnectState {
  client: PipecatClient | null
  isConnected: boolean
  isConnecting: boolean
  transportState: TransportState
  error: string | null
  transcript: TranscriptMessage[]
  isBotSpeaking: boolean
  isUserSpeaking: boolean
}

export function useAgeOfAiConnect(options: UseAgentConnectOptions = {}) {
  const {
    serverUrl = "http://localhost:8099"
    systemPrompt,
    enableCam = false,
    enableMic = false,
    debug = false,
    authToken,
    agentId,
  } = options

  const [state, setState] = useState<AgentConnectState>({
    client: null,
    isConnected: false,
    isConnecting: false,
    transportState: "disconnected" as TransportState,
    error: null,
    transcript: [],
    isBotSpeaking: false,
    isUserSpeaking: false,
  })

  const transcriptIdRef = useRef(0)
  const clientRef = useRef<PipecatClient | null>(null)
  const assistantStreamIdRef = useRef<string | null>(null)

  useEffect(() => {
    const client = new PipecatClient({
      transport: new SmallWebRTCTransport(),
      enableCam,
      enableMic,
      callbacks: {
        onConnected: () => {
          if (debug) console.log("[AgeOfAI] onConnected")
          setState((prev) => ({ ...prev, isConnected: true, isConnecting: false, error: null }))
        },
        onDisconnected: () => {
          if (debug) console.log("[AgeOfAI] onDisconnected")
          setState((prev) => ({
            ...prev,
            isConnected: false,
            isConnecting: false,
            isBotSpeaking: false,
            isUserSpeaking: false,
          }))
        },
        onTransportStateChanged: (transportState: TransportState) => {
          if (debug) console.log("[AgeOfAI] transportState")
          setState((prev) => ({ ...prev, transportState }))
        },
        onError: (msg: any) => {
          const text = (msg as any)?.data.message ?? (msg as any)?.message ?? "Something went wrong try again"
          if (debug) console.log("[AgeOfAI] onError: ", text)
          setState((prev) => ({ ...prev, error: text, isConnecting: false }))
        },
        onBotReady: (data: any) => {
          if (debug) console.log("[AgeOfAi] onBotReady")
          setState((prev) => ({ ...prev, isConnected: true, isConnecting: false }))
        },
        onUserTranscript: (data: any) => {
          if (debug) console.log("[AgeOfAi] onUserTranscript", data)
          const text: string = data?.text ?? data?.content ?? ""
          const isFinal: boolean = Boolean(data?.final ?? data?.is_final ?? data?.isFinal ?? false)
          if (!text) return

          setState((prev) => {
            const existingIndex = prev.transcript.findIndex((msg) => msg.role === "user" && !msg.final)

            const message = {
              id: isFinal ? `user-${++transcriptIdRef.current}` : "user-interim",
              role: "user" as const,
              content: text,
              timestamp: new Date(),
              final: isFinal,
            }

            if (existingIndex >= 0 && !isFinal) {
              const newTranscript = [...prev.transcript]
              newTranscript[existingIndex] = message
              return { ...prev, transcript: newTranscript }
            } else if (isFinal) {
              const filteredTranscript = prev.transcript.filter((msg) => !(msg.role === "user" && !msg.final))
              return {
                ...prev,
                transcript: [...filteredTranscript, message],
              }
            }
            return {
              ...prev,
              transcript: [...prev.transcript, message],
            }
          })
        },
        onBotStartedSpeaking: () => setState((prev) => ({ ...prev, isBotSpeaking: true })),
        onBotStoppedSpeaking: () => setState((prev) => ({ ...prev, isBotSpeaking: false })),
        onUserStartedSpeaking: () => setState((prev) => ({ ...prev, isUserSpeaking: true })),
        onUserStoppedSpeaking: () => setState((prev) => ({ ...prev, isUserSpeaking: false })),
        onBotLlmStarted: () => {
          if (debug) console.log("[AgeOfAi] onBotLlmStarted")
          const id = `asst-stream-${++transcriptIdRef.current}`
          assistantStreamIdRef.current = id
          setState((prev) => ({
            ...prev,
            transcript: [
              ...prev.transcript,
              { id, role: "assistant", content: "", timestamp: new Date(), final: false },
            ],
          }))
        },
        onBotLlmText: (data: any) => {
          if (debug) console.log("[AgeOfAi] onBotLlmtext:", data?.text)
          const id = assistantStreamIdRef.current
          const chunk: string = data?.text ?? ""

          if (!id || !chunk) return
          setState((prev) => {
            const idx = prev.transcript.findIndex((m) => m.id === id)
            if (idx === -1) return prev
            const updated = [...prev.transcript]
            const existing = updated[idx]
            updated[idx] = { ...existing, content: (existing.content || "") + chunk }
            return { ...prev, transcript: updated }
          })
        },
        onBotLlmStopped: () => {
          if (debug) console.log("[AgeOfAi] onBotLlmStopped")
          const id = assistantStreamIdRef.current
          if (!id) return
          assistantStreamIdRef.current = null

          setState((prev) => {
            const idx = prev.transcript.findIndex((m) => m.id === id)
            if (idx === -1) return prev
            const updated = [...prev.transcript]
            updated[idx] = { ...updated[idx], final: true }
            return { ...prev, transcript: updated }
          })
        },
      },
    })

    clientRef.current = client
    setState((prev) => ({ ...prev, client }))

    client.initDevices?.().catch(() => {})

    return () => {
      client.disconnect().catch(() => {})
    }
  }, [enableMic, enableCam, serverUrl])

  useEffect(() => {
    const c = clientRef.current as any
    try {
      c?.enableCam?.(enableCam)
    } catch {}
  }, [enableCam])

  const connect = useCallback(async () => {
    if (state.isConnecting) return
    const activeClient = clientRef.current ?? state.client

    if (!activeClient) {
      setState((prev) => ({ ...prev, error: "Client not Initialized", isConnecting: false }))
      return
    }
    setState((prev) => ({ ...prev, isConnecting: true, error: null, transcript: [] }))

    try {
      const requestData: any = {}
      if (authToken) requestData.auth_token = authToken
      if (agentId) requestData.agent_id = agentId
      if (systemPrompt) requestData.system_prompt = systemPrompt

      await activeClient.startBotAndConnect({
        endpoint: `${serverUrl}/api/start`,
        requestData: Object.keys(requestData).length > 0 ? requestData : undefined,
      })

      const st = (activeClient as any)?.transport?.state
      if (st === "connected" || st === "ready") {
        setState((prev) => ({ ...prev, isConnected: true, isConnecting: false }))
      }
    } catch (err: unknown) {
      const text =
        typeof err === "object" && err && "message" in err ? String((err as any).message) : "Failed to connect"
      setState((prev) => ({ ...prev, error: text, isConnecting: false }))
    }
  }, [state.client, state.isConnecting, serverUrl, systemPrompt, authToken, agentId])

  const disconnect = useCallback(async () => {
    if (!state.client) return
    try {
      await (state.client as any).disconnectBot?.()
    } catch {}
    await state.client.disconnect()
  }, [state.client])

  const sendMessage = useCallback(
    async (text: string) => {
      if (!state.client) return
      if (debug) console.log("[AgeOfAi] sendMessage appendToContext:", text)
      await state.client.appendToContext({
        role: "user",
        content: text,
        run_immediately: true,
      })
    },
    [state.client, state.isConnected, debug],
  )

  const sendVoiceMode = useCallback(
    async (isVoiceMode: boolean) => {
      if (!state.client) return
      if (debug) console.log("[AgeOfAi] sendVoiceMode:", isVoiceMode)

       state.client.sendClientMessage?.("voice_mode", { isVoiceMode })
    },
    [state.client, state.isConnected, debug],
  )

  return {
    ...state,
    transcripts: state.transcript,
    connect,
    disconnect,
    sendMessage,
    sendVoiceMode,
    clearTranscript: () => setState((prev) => ({ ...prev, transcript: [] })),
    clearTranscripts: () => setState((prev) => ({ ...prev, transcript: [] })),
  }
}

export type { UseAgentConnectOptions, TranscriptMessage }
