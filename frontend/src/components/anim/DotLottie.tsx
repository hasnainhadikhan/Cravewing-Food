import { useEffect, useRef } from "react";
import { DotLottie as DotLottiePlayer } from "@lottiefiles/dotlottie-web";

interface DotLottieProps {
  /** URL to a .lottie or .json animation */
  src: string;
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Thin React wrapper around @lottiefiles/dotlottie-web. Renders a vector Lottie
 * animation onto a canvas. If the asset fails to load (e.g. offline), it simply
 * renders nothing rather than breaking the layout.
 */
export default function DotLottie({
  src,
  size = 120,
  loop = true,
  autoplay = true,
  className,
  style,
}: DotLottieProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let player: DotLottiePlayer | null = null;
    try {
      player = new DotLottiePlayer({ canvas, src, loop, autoplay });
    } catch {
      /* ignore — decorative only */
    }
    return () => {
      try {
        player?.destroy();
      } catch {
        /* noop */
      }
    };
  }, [src, loop, autoplay]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, ...style }}
    />
  );
}
