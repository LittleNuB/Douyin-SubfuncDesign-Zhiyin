import type { MediaAsset } from "../types";

type MediaViewProps = {
  media: MediaAsset;
  className?: string;
  alt: string;
};

export function MediaView({ media, className, alt }: MediaViewProps) {
  if (media.type === "video") {
    return (
      <video
        className={className}
        src={media.src}
        poster={media.poster}
        muted
        autoPlay
        loop
        playsInline
        aria-label={alt}
      />
    );
  }

  return <img className={className} src={media.src} alt={alt} />;
}
