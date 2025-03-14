import { useState, useEffect } from "react";
import { BatterBanner } from "../components/BatterBanner";

interface ShowBannerProps {
  condition: boolean;
  text: string;
}

export const useShowBanner = ({ condition, text }: ShowBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!condition) return;

    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 3000);

    return () => clearTimeout(timer);
  }, [condition]);

  return isVisible ? <BatterBanner text={text} /> : null;
};
