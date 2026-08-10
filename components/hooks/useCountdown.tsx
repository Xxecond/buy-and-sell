"use client";

import { useState, useRef, useEffect } from "react";

export default function useCountdown(initial = 60) {
  const [countdown, setCountdown] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);


  const startCountdown = () => {

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }


    setCountdown(initial);


    timerRef.current = setInterval(() => {

      setCountdown((prev) => {

        if (prev <= 1) {

          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }

          return 0;
        }


        return prev - 1;

      });

    }, 1000);

  };



  useEffect(() => {

    return () => {

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

    };

  }, []);



  return {
    countdown,
    startCountdown,
    canResend: countdown === 0,
  };
}