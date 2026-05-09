"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

export default function MemoWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, append, isLoading, error } = useChat({
    api: "/api/chat",
    onFinish: () => {
      if (!isOpen) setHasNewMessage(true);
    },
  });

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when widget opens
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = () => {
    if (input.trim() && !isLoading) {
      append({ role: "user", content: input.trim() });
      setInput("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Google Font: Cairo */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap");

        .memo-widget * {
          font-family: "Cairo", sans-serif !important;
          box-sizing: border-box;
        }

        .memo-widget {
          direction: rtl;
          text-align: right;
        }

        .memo-chat-window {
          animation: memoSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes memoSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .memo-bubble-btn {
          animation: memoPulse 2.5s ease-in-out infinite;
        }

        @keyframes memoPulse {
          0%,
          100% {
            box-shadow:
              0 0 0 0 rgba(99, 102, 241, 0.4),
              0 8px 32px rgba(0, 0, 0, 0.4);
          }
          50% {
            box-shadow:
              0 0 0 10px rgba(99, 102, 241, 0),
              0 8px 32px rgba(0, 0, 0, 0.4);
          }
        }

        .memo-message-in {
          animation: memoMsgIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes memoMsgIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .memo-typing-dot {
          animation: memoTyping 1.4s ease-in-out infinite;
        }

        .memo-typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .memo-typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes memoTyping {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }

        .memo-messages::-webkit-scrollbar {
          width: 4px;
        }

        .memo-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .memo-messages::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .memo-input:focus {
          outline: none;
        }

        .memo-send-btn:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .memo-send-btn:active:not(:disabled) {
          transform: scale(0.97);
        }

        .memo-badge {
          animation: memoBadgePop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes memoBadgePop {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>

      <div className="memo-widget fixed bottom-4 right-4 z-50">
        {/* Chat Window */}
        {isOpen && (
          <div
            className="memo-chat-window"
            style={{
              position: "absolute",
              bottom: "72px",
              right: "0",
              width: "360px",
              height: "520px",
              background:
                "linear-gradient(145deg, #0f0f1a 0%, #13131f 50%, #0f0f1a 100%)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 18px",
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 100%)",
                borderBottom: "1px solid rgba(99, 102, 241, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row-reverse",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 16px rgba(99,102,241,0.5)",
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={18} color="white" />
                </div>
                <div>
                  <div
                    style={{
                      color: "white",
                      fontWeight: "700",
                      fontSize: "15px",
                      lineHeight: "1.2",
                    }}
                  >
                    Memo AI
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      marginTop: "2px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#22c55e",
                        boxShadow: "0 0 6px rgba(34,197,94,0.8)",
                      }}
                    />
                    <span style={{ color: "#a1a1aa", fontSize: "11px" }}>
                      متصل الآن
                    </span>
                  </div>
                </div>
              </div>
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#a1a1aa",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "#a1a1aa";
                }}
                aria-label="إغلاق نافذة الدردشة"
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              className="memo-messages"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {/* Welcome message if no messages yet */}
              {messages.length === 0 && (
                <div
                  className="memo-message-in"
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <Bot size={14} color="white" />
                  </div>
                  <div
                    style={{
                      background: "rgba(99,102,241,0.12)",
                      border: "1px solid rgba(99,102,241,0.2)",
                      borderRadius: "4px 16px 16px 16px",
                      padding: "10px 14px",
                      color: "#e4e4f7",
                      fontSize: "13.5px",
                      lineHeight: "1.7",
                      maxWidth: "85%",
                    }}
                  >
                    👋 مرحباً! أنا <strong>ميمو</strong>، مساعدك الذكي على موقع
                    أسامة. كيف يمكنني مساعدتك اليوم؟
                  </div>
                </div>
              )}

              {/* Message List */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="memo-message-in"
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                    flexDirection:
                      message.role === "user" ? "row-reverse" : "row",
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background:
                        message.role === "user"
                          ? "linear-gradient(135deg, #374151, #4b5563)"
                          : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {message.role === "user" ? (
                      <User size={14} color="white" />
                    ) : (
                      <Bot size={14} color="white" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    style={{
                      background:
                        message.role === "user"
                          ? "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)"
                          : "rgba(99,102,241,0.12)",
                      border:
                        message.role === "user"
                          ? "none"
                          : "1px solid rgba(99,102,241,0.2)",
                      borderRadius:
                        message.role === "user"
                          ? "16px 4px 16px 16px"
                          : "4px 16px 16px 16px",
                      padding: "10px 14px",
                      color: message.role === "user" ? "white" : "#e4e4f7",
                      fontSize: "13.5px",
                      lineHeight: "1.75",
                      maxWidth: "85%",
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div
                  className="memo-message-in"
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Bot size={14} color="white" />
                  </div>
                  <div
                    style={{
                      background: "rgba(99,102,241,0.12)",
                      border: "1px solid rgba(99,102,241,0.2)",
                      borderRadius: "4px 16px 16px 16px",
                      padding: "12px 16px",
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="memo-typing-dot"
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "#6366f1",
                      }}
                    />
                    <div
                      className="memo-typing-dot"
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "#6366f1",
                      }}
                    />
                    <div
                      className="memo-typing-dot"
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "#6366f1",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div
                  style={{
                    textAlign: "center",
                    color: "#f87171",
                    fontSize: "12px",
                    padding: "8px 12px",
                    background: "rgba(239,68,68,0.1)",
                    borderRadius: "8px",
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  حدث خطأ. يرجى المحاولة مرة أخرى.
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div
              style={{
                padding: "12px 14px",
                borderTop: "1px solid rgba(99,102,241,0.12)",
                background: "rgba(0,0,0,0.2)",
              }}
            >
              <form
                onSubmit={handleFormSubmit}
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  flexDirection: "row-reverse",
                }}
              >
                <input
                  ref={inputRef}
                  className="memo-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="اكتب رسالتك هنا..."
                  disabled={isLoading}
                  autoComplete="off"
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    color: "white",
                    fontSize: "13.5px",
                    direction: "rtl",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(99,102,241,0.5)";
                    e.target.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(99,102,241,0.2)";
                    e.target.style.background = "rgba(255,255,255,0.05)";
                  }}
                  id="memo-chat-input"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="memo-send-btn"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "11px",
                    background:
                      isLoading || !input.trim()
                        ? "rgba(99,102,241,0.3)"
                        : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor:
                      isLoading || !input.trim() ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                    boxShadow:
                      isLoading || !input.trim()
                        ? "none"
                        : "0 4px 14px rgba(99,102,241,0.4)",
                  }}
                  aria-label="إرسال الرسالة"
                  id="memo-send-button"
                >
                  <Send
                    size={16}
                    color="white"
                    style={{ transform: "rotate(180deg)" }}
                  />
                </button>
              </form>
              <p
                style={{
                  color: "#52525b",
                  fontSize: "10.5px",
                  textAlign: "center",
                  marginTop: "8px",
                }}
              >
                ميمو يجيب فقط بناءً على معلومات الموقع
              </p>
            </div>
          </div>
        )}

        {/* Floating Bubble Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={isOpen ? "" : "memo-bubble-btn"}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: isOpen
              ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
              : "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: "2px solid rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            position: "relative",
          }}
          aria-label={isOpen ? "إغلاق ميمو" : "فتح ميمو للدردشة"}
          id="memo-toggle-button"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {isOpen ? (
            <X size={24} color="white" />
          ) : (
            <MessageCircle size={24} color="white" />
          )}

          {/* New message badge */}
          {hasNewMessage && !isOpen && (
            <div
              className="memo-badge"
              style={{
                position: "absolute",
                top: "-2px",
                left: "-2px",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "#ef4444",
                border: "2px solid #0f0f1a",
              }}
            />
          )}
        </button>
      </div>
    </>
  );
}
