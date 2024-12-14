import { AnimatePresence, motion } from "framer-motion";
import { Loader, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/utils";

const SiteChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const buttonRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = { text: inputMessage, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/ask-vit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, there was an error processing your request.", isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to convert URLs into clickable links
  const renderMessageWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g; // Regular expression to detect URLs
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 w-[420px] rounded-lg shadow-lg bg-white overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#22409A] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">VIT helper</h3>
                  <p className="text-white/80 text-sm">How can I help you?</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white bg-transparent border-none p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-50 rounded-lg shadow-inner">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "max-w-[80%] rounded-lg p-3 mb-3 shadow-md",
                      message.isUser ? "bg-blue-600 text-white ml-auto" : "bg-gray-300 text-black"
                    )}
                  >
                    {renderMessageWithLinks(message.text)}
                  </motion.div>
                ))}
                {/* {isLoading && (
                  <div className="flex justify-center">
                    <Loader className="w-6 h-6 animate-spin text-blue-500" />
                  </div>
                )} */}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </div>
            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <button disabled={isLoading} type="submit" className="p-2 bg-blue-600 text-white rounded-lg">
                  {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : "Send"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#22409A] shadow-lg flex items-center justify-center"
        ref={buttonRef}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
};

export default SiteChatbot;
