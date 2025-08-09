import React, { useEffect, useRef } from 'react';

type VideoItem = {
  srcMp4: string;
  srcWebm?: string;
  caption?: string;
};

interface VideoFeedProps {
  videos: VideoItem[];
}

// A vertical, TikTok-like video feed with snap scrolling and auto play/pause
const VideoFeed: React.FC<VideoFeedProps> = ({ videos }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const videosEls = Array.from(container.querySelectorAll('video')) as HTMLVideoElement[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            // Attempt to play when at least 75% visible
            const p = video.play();
            if (p && typeof (p as Promise<void>).catch === 'function') {
              (p as Promise<void>).catch(() => {
                // ignore autoplay failures
              });
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    videosEls.forEach((v) => io.observe(v));

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[80vh] rounded-2xl overflow-y-auto snap-y snap-mandatory no-scrollbar ring-1 ring-black/5 bg-black/90"
      aria-label="شريط فيديوهات قصيرة"
    >
      {videos.map((vid, idx) => (
        <div key={idx} className="relative snap-start min-h-[80vh] flex items-center justify-center">
          <div className="relative w-full max-w-[420px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              controls={false}
              aria-label={vid.caption || `فيديو رقم ${idx + 1}`}
            >
              {vid.srcWebm && <source src={vid.srcWebm} type="video/webm" />}
              <source src={vid.srcMp4} type="video/mp4" />
            </video>
            {vid.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm leading-snug">{vid.caption}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
