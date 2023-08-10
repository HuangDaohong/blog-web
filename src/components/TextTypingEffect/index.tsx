import React, { useState, useEffect } from 'react';

interface TextPoppingEffectProps {
  text: string;
  interval?: number;
}

export const TextTypingEffect: React.FC<TextPoppingEffectProps> = ({ text, interval = 100 }) => {
  const [displayText, setDisplayText] = useState<string>('');

  const myStyle: React.CSSProperties = {
    display: 'inline-block',
    animation: `${textPoppingKeyframes} 0.5s ease-in-out`
  };

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(prevText => prevText + text[currentIndex++]);
      } else {
        clearInterval(typingInterval);
      }
    }, Math.random() * interval + interval);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, interval]);

  return <div style={myStyle}>{displayText}</div>;
};

const textPoppingKeyframes = `
  @keyframes textPopping {
    0% {
      opacity: 0;
      transform: scale(0.2);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
