import type { ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
};

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="phone-frame" aria-label="知音抖音子功能手机演示">
      {children}
      <div className="home-indicator" />
    </div>
  );
}
