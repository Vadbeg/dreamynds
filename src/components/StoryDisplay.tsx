
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface StoryDisplayProps {
  story: string;
  audioUrl: string | null;
  onReset: () => void;
}

const StoryDisplay = ({ story, audioUrl, onReset }: StoryDisplayProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, [audioUrl]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/50 backdrop-blur-sm border-soft-pink/20 animate-fade-in">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex space-x-4">
          {audioUrl && (
            <Button
              variant="outline"
              size="icon"
              onClick={toggleAudio}
              className="bg-soft-yellow/50 hover:bg-soft-yellow border-soft-yellow/20"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={onReset}
            className="bg-soft-green/50 hover:bg-soft-green border-soft-green/20"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg max-w-none">
          {story.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryDisplay;
