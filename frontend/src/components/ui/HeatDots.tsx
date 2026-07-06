import { RED } from "../../constants/brand";

interface HeatDotsProps {
  level: number;
}

export default function HeatDots({ level }: HeatDotsProps) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full transition-all"
          style={{ background: i <= level ? RED : "rgba(214,41,30,0.2)" }}
        />
      ))}
    </div>
  );
}
