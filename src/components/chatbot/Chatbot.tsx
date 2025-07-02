import React, { useState, useEffect, useRef } from 'react';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

// CSS content from Chatbot.module.css, embedded as a string
const chatbotStyles = `
/* Chatbot Button Styles */
.chatButton {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color:rgb(28, 105, 22);
  color: white;
  border: none;
  border-radius: 50px; /* Makes it circular or pill-shaped depending on padding */
  padding: 12px 20px; /* Adjusted padding for a better look */
  font-size: 24px; /* Larger icon/text */
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px; /* Fixed width */
  height: 60px; /* Fixed height for a circle */
}

.chatButton:hover {
  background-color:rgb(13, 102, 35);
  transform: scale(1.05); /* Slight zoom on hover */
}

/* Chat Window Styles */
.chatWindow {
  position: fixed;
  bottom: 90px; /* Position above the button */
  right: 20px;
  width: 360px; /* Slightly wider */
  height: 520px; /* Slightly taller */
  background-color: #ffffff;
  border-radius: 12px; /* Softer corners */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2); /* More pronounced shadow */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font stack */
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Chat Header Styles */
.chatHeader {
  background: linear-gradient(135deg,rgb(36, 136, 27),rgb(20, 100, 16)); /* Gradient background */
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.chatHeader h2 {
  margin: 0;
  font-size: 1.1em; /* Relative font size */
  font-weight: 600;
}

.closeButtonIcon {
  /* Renamed from closeButton to avoid conflict if any */
  background: none;
  border: none;
  color: white;
  font-size: 22px; /* Slightly larger close icon */
  cursor: pointer;
  padding: 5px;
  line-height: 1;
}

.closeButtonIcon:hover {
  opacity: 0.8;
}

/* Chat Messages Area Styles */
.chatMessages {
  flex-grow: 1;
  padding: 20px; /* More padding */
  overflow-y: auto;
  background-color: #f7f9fc; /* Lighter, softer background */
  display: flex;
  flex-direction: column;
  gap: 12px; /* Space between messages */
}

/* Scrollbar styling for webkit browsers */
.chatMessages::-webkit-scrollbar {
  width: 6px;
}

.chatMessages::-webkit-scrollbar-thumb {
  background-color:rgb(11, 67, 17);
  border-radius: 3px;
}

.chatMessages::-webkit-scrollbar-track {
  background-color: #e0e0e0;
}

.message {
  padding: 10px 15px;
  border-radius: 18px; /* More rounded messages */
  max-width: 85%; /* Slightly more width for messages */
  word-wrap: break-word;
  line-height: 1.4;
  font-size: 0.95em;
}

.message.user {
  background-color:rgb(16, 85, 24);
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 6px; /* Differentiated corner */
}

.message.bot {
  background-color: #e9eaf0; /* Softer bot message background */
  color: #2c3e50; /* Darker text for better contrast */
  align-self: flex-start;
  border-bottom-left-radius: 6px; /* Differentiated corner */
}

/* Chat Input Area Styles */
.chatInput {
  display: flex;
  padding: 15px;
  border-top: 1px solid #dde1e7; /* Softer border */
  background-color: #ffffff;
  align-items: center; /* Align items vertically */
}

.chatInput input {
  flex-grow: 1;
  padding: 12px 18px; /* More padding in input */
  border: 1px solid #ced4da;
  border-radius: 25px; /* Pill-shaped input */
  margin-right: 10px;
  font-size: 0.95em;
  outline: none; /* Remove default outline */
  transition: border-color 0.2s ease;
}

.chatInput input:focus {
  border-color:rgb(17, 98, 24); /* Highlight focus */
  box-shadow: 0 0 0 0.2rem rgb(21, 81, 9); /* Subtle glow on focus */
}

.chatInput button {
  background-color:rgb(10, 91, 32);
  color: white;
  border: none;
  border-radius: 50%; /* Circular send button */
  width: 48px; /* Fixed width for circle */
  height: 48px; /* Fixed height for circle */
  font-size: 1.2em; /* Larger send icon/text */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chatInput button:hover {
  background-color:rgb(11, 97, 25);
  transform: scale(1.05);
}

/* Add a simple send icon (using text or an SVG later) */
.chatInput button::after {
  content: '➤'; /* Simple arrow, consider SVG for better icon */
  font-size: 16px;
  line-height: 1;
}
`;

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    // Updated websiteContext with details about programming courses, video courses, and certificates
    const websiteContext = `
        This website offers a variety of programming courses, including both free and paid options,
        designed to help users learn and advance their skills in various tech domains.

        All our courses are delivered via high-quality video lectures, allowing for flexible learning.

        Here is a list of our current courses:
        - AWS Certified Solutions Architect
        - Introduction to Machine Learning with Python
        - React - The Complete Guide (incl Hooks, React Router, Redux)
        - DevOps Masterclass: Docker, Kubernetes, Jenkins
        - Azure Fundamentals (AZ-900) Certification Prep
        - Advanced Deep Learning with TensorFlow 2.x
        - Node.js, Express, MongoDB & More: The Masterclass
        - Google Cloud Platform (GCP) Fundamentals
        - Natural Language Processing (NLP) with Python
        - Complete Web Development Bootcamp 2024
        - Certified Ethical Hacker (CEH) v12
        - Python for Data Science and Machine Learning
        - iOS App Development with Swift 5 and SwiftUI
        - SQL & Database Design for Developers
        - Linux Command Line Basics

        Upon successful completion of any course, including our free courses, users are eligible to receive an online certificate.
        We aim to provide high-quality educational content for aspiring and experienced developers.
        For specific details on course content, pricing, or enrollment, please refer to the course pages on our website.
        If you have questions about a specific course, feel free to ask!
        
        Contact: For support or further inquiries, please email support@yourprogrammingcourses.com or visit our contact page.
    `;


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const getGeminiResponse = async (prompt: string) => {
        setIsLoading(true);
        try {
            let chatHistory = [];
            // Prepend the website context to the user's prompt
            chatHistory.push({ role: "user", parts: [{ text: `Here is information about the website: ${websiteContext}\n\nBased on this information, please answer the following question:\n${prompt}` }] });

            const payload = { contents: chatHistory };
            const apiKey = "AIzaSyBZBAGwi67hP_1u1ZObnw045ccPHo0ANZI"; // Make sure your actual API key is here
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                return text;
            } else {
                console.error("Unexpected API response structure:", result);
                if (result.error && result.error.message) {
                    return `Error from AI: ${result.error.message}`;
                }
                return "Sorry, I couldn't get a response from the AI.";
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            return "There was an error connecting to the AI. Please try again.";
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return;

        const userMessage: Message = { text: inputValue, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputValue('');

        const botResponseText = await getGeminiResponse(inputValue);
        const botMessage: Message = { text: botResponseText, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !isLoading) {
            handleSendMessage();
        }
    };

    return (
        <>
            <style>{chatbotStyles}</style>

            <button className="chatButton" onClick={toggleChat}>
                {isOpen ? '✕' : 'Ask'}
            </button>
            {isOpen && (
                <div className="chatWindow">
                    <div className="chatHeader">
                        <h2>AI Chatbot</h2>
                        <button onClick={toggleChat} className="closeButtonIcon">✕</button>
                    </div>
                    <div className="chatMessages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className={`message bot`}>
                                Thinking...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chatInput">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder={isLoading ? "Waiting for response..." : "Type a message..."}
                            disabled={isLoading}
                        />
                        <button onClick={handleSendMessage} disabled={isLoading}></button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
