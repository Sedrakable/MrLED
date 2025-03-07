// hooks/useGoogleEvent.js
"use client";
import { usePathname } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";

export const useGoogleEvent = () => {
  const pathname = usePathname();

  const sendEvent = (event: string, pathTo: string) => {
    const eventString = `${event} - from ${pathname}`;
    console.log(`sendGoogleEvent | '${eventString}' to '${pathTo}'`);
    sendGAEvent(eventString, { value: pathTo });
  };

  return sendEvent;
};
