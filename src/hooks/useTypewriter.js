import { useState, useEffect } from 'react';

export const useTypewriter = (texts, options = {}) => {
  const {
    typeSpeed = 80,
    deleteSpeed = 40,
    pauseDelay = 2000,
    keepPrefix = false,
    customPauses = []
  } = options;

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index];
    let timeout;
    
    // If we're fully typing the first item but just starting, don't wait, just type
    if (isDeleting) {
      const nextText = texts[(index + 1) % texts.length];
      
      // If keepPrefix is true, stop deleting when the remaining text is a prefix of the next word.
      const shouldKeep = keepPrefix && text.length > 0 && nextText.startsWith(text);
      
      if (!shouldKeep && text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      } else {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (text.length < currentText.length) {
        timeout = setTimeout(() => setText(currentText.slice(0, text.length + 1)), typeSpeed);
      } else {
        // We finished typing the current text. Wait before deleting.
        const pause = (customPauses && customPauses[index]) ? customPauses[index] : pauseDelay;
        timeout = setTimeout(() => setIsDeleting(true), pause);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, texts, typeSpeed, deleteSpeed, pauseDelay, keepPrefix, customPauses]);

  return text;
};
