import type { MediaAsset } from "../types";

type MediaViewProps = {
  media: MediaAsset;
  className?: string;
  alt: string;
  autoPlay?: boolean;
  preload?: "none" | "metadata" | "auto";
};

export function MediaView({ media, className, alt, autoPlay = true, preload = "metadata" }: MediaViewProps) {
  if (media.type === "video") {
    return (
      <video
        className={className}
        src={media.src}
        poster={media.poster}
        muted
        autoPlay={autoPlay}
        loop
        playsInline
        preload={preload}
        aria-label={alt}
      />
    );
  }

  return <img className={className} src={media.src} alt={alt} />;
}
