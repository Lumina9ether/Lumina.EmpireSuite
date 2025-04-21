import React, { useEffect } from "react";

// Landing Page Component
export function LandingPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    window.botpressWebChat = {
      botId: "lumina-ai-sales-bot",
      hostUrl: "https://cdn.botpress.cloud/webchat/v1",
      messagingUrl: "https://messaging.botpress.cloud",
      clientId: "lumina-ai-sales-bot",
      enableConversationDeletion: true,
      showPoweredBy: false,
      containerWidth: "100%",
      layoutWidth: "400px",
      enableReset: true,
      stylesheet: "",
      themeName: "prism",
      botName: "Lumina",
      avatarUrl: "https://yourdomain.com/lumina-avatar.png",
      stylesheetOptions: {
        botMessageColor: "#6366f1",
        userMessageColor: "#a78bfa",
        backgroundColor: "#111827"
      }
    };

    const speakWithElevenLabs = async (text) => {
      const voiceId = "esS03uhmVhZENfQnh02Dy";
      const apiKey = "sk_b8d697e40ae1e86b221a8a4aaa9555de78dc841203d4a9bee";
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.7,
            similarity_boost: 0.85
          }
        })
      });
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    };

    const audioBtn = document.createElement("button");
    audioBtn.innerText = "🎙️ Talk to Lumina";
    Object.assign(audioBtn.style, {
      position: "fixed",
      bottom: "30px",
      right: "30px",
      zIndex: 10000,
      background: "#6366f1",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
    });
    document.body.appendChild(audioBtn);

    audioBtn.addEventListener("click", () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      speakWithElevenLabs("Hey love, I'm Lumina. How can I support your empire today?");

      if (!SpeechRecognition) {
        console.warn("Speech recognition not supported in this browser.");
        speakWithElevenLabs("Voice recognition is not supported in your browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.start();

      recognition.onresult = (event) => {
        const input = event.results[0][0].transcript;
        console.log("User said:", input);

        if (input.toLowerCase().includes("funnel")) {
          speakWithElevenLabs("Let's build a funnel together. Opening your templates.");
        } else if (input.toLowerCase().includes("email")) {
          speakWithElevenLabs("I'll write an email series for your brand. Here we go.");
        } else if (input.toLowerCase().includes("social")) {
          speakWithElevenLabs("Let's create a social post. What's your message?");
        } else {
          speakWithElevenLabs("Got it. I’ll keep listening for how I can help next.");
        }
      };

      recognition.onerror = (event) => {
        console.error("Voice recognition error:", event.error);
        speakWithElevenLabs("Hmm, I didn’t catch that. Try again when you're ready.");
      };
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-900 to-indigo-950 text-white p-8">
      <h1 className="text-4xl">Lumina Empire</h1>
    </div>
  );
}
