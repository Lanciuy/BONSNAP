import { useState, useCallback } from 'react';
import { MascotMood } from '../shared/Mascot/Mascot';
import { generateMascotResponse } from '../../infrastructure/services/groqService';

export const useMascotAI = (
  userPersona: string, 
  isMecha: boolean, 
  defaultMsg: string, 
  defaultMood: MascotMood = "happy"
) => {
  const [msg, setMsg] = useState(defaultMsg);
  const [mood, setMood] = useState<MascotMood>(defaultMood);

  // Overpower Token Optimization: Instant fallback UI + Async AI Cache Fetch
  const handleHover = useCallback((template: string, fallbackMood: MascotMood) => {
    // 1. Instantly set static template to prevent lag
    setMsg(template);
    setMood(fallbackMood);

    // 2. Fetch AI rewritten version asynchronously (will hit cache instantly if available)
    generateMascotResponse(template, userPersona, isMecha).then((res) => {
      setMsg(res.message);
      // Ensure the returned mood is valid, otherwise use fallback
      setMood((res.mood as MascotMood) || fallbackMood);
    }).catch(console.error);
  }, [userPersona, isMecha]);

  const resetMascot = useCallback(() => {
    setMsg(defaultMsg);
    setMood(defaultMood);
  }, [defaultMsg, defaultMood]);

  return { msg, setMsg, mood, setMood, handleHover, resetMascot };
};
