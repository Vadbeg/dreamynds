
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StoryDisplayProps {
  story: string;
  audioUrl: string | null;
  onReset: () => void;
}

const StoryDisplay = ({ story, audioUrl, onReset }: StoryDisplayProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        // Fetch audio bytes from backend with CORS mode
        audioUrl = "http://0.0.0.0:8000/stories/1/audio";
        const response = await fetch(audioUrl || "", {
          headers: {
            "Accept": "audio/mpeg" // Specify expected audio type
          }
        });
        const audioBlob = await response.blob();
        
        // Create object URL from blob
        const audioObjectUrl = URL.createObjectURL(audioBlob);
        
        // Create and setup audio element
        audioRef.current = new Audio(audioObjectUrl);
        audioRef.current.addEventListener("ended", () => setIsPlaying(false));
        audioRef.current.addEventListener("timeupdate", updateProgress);
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    };

    if (audioUrl) {
      loadAudio();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", () => setIsPlaying(false));
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [audioUrl]);

  const updateProgress = () => {
    if (!audioRef.current) return;
    const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percent);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const percentClicked = (clickPosition / rect.width) * 100;
    const timeToSeek = (audioRef.current.duration * percentClicked) / 100;
    
    audioRef.current.currentTime = timeToSeek;
    setProgress(percentClicked);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/50 backdrop-blur-sm border-[#D3E4FD]/20">
      <CardHeader className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {audioUrl && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleAudio}
                className="bg-[#F1F0FB]/50 hover:bg-[#F1F0FB] border-[#F1F0FB]/20"
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
              className="bg-[#E5DEFF]/50 hover:bg-[#E5DEFF] border-[#E5DEFF]/20"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div 
          className="w-full cursor-pointer"
          onClick={handleProgressClick}
        >
          <Progress 
            value={progress} 
            className="h-1 bg-[#E5DEFF]/30"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg max-w-none">
          {story.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4 text-[#403E43] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryDisplay;
