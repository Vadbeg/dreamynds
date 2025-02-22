import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Story {
  id: number;
  name: string;
  text: string;
  audio_path: string;
  created_at: string;
}

interface StoryDisplayProps {
  story: string;
  audioUrl: string | null;
  onReset: () => void;
}

const StoryDisplay = ({ story, audioUrl, onReset }: StoryDisplayProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [storyData, setStoryData] = useState<Story | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadStoryAndAudio = async () => {
      try {
        // Load story data
        const storyResponse = await fetch("http://0.0.0.0:8000/stories/1");
        if (!storyResponse.ok) {
          throw new Error("Failed to fetch story");
        }
        const data = await storyResponse.json();
        setStoryData(data);

        // Load audio separately
        const audioResponse = await fetch(`http://0.0.0.0:8000/stories/1/audio`, {
          headers: {
            "Accept": "audio/mpeg"
          }
        });
        if (!audioResponse.ok) {
          throw new Error("Failed to fetch audio");
        }
        const audioBlob = await audioResponse.blob();
        const audioObjectUrl = URL.createObjectURL(audioBlob);
        
        // Setup audio element
        audioRef.current = new Audio(audioObjectUrl);
        audioRef.current.addEventListener("ended", () => setIsPlaying(false));
        audioRef.current.addEventListener("timeupdate", updateProgress);
        audioRef.current.addEventListener("loadedmetadata", () => {
          setDuration(audioRef.current?.duration || 0);
        });
      } catch (error) {
        console.error("Error loading story or audio:", error);
      }
    };

    loadStoryAndAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", () => setIsPlaying(false));
        audioRef.current.removeEventListener("timeupdate", updateProgress);
        audioRef.current.removeEventListener("loadedmetadata", () => {
          setDuration(audioRef.current?.duration || 0);
        });
      }
    };
  }, []);

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

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/50 backdrop-blur-sm border-[#D3E4FD]/20">
      <CardHeader className="flex flex-col space-y-4">
        {storyData && (
          <h2 className="text-xl font-semibold text-center">{storyData.name}</h2>
        )}
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {storyData && (
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
          </div>
        </div>
        <div className="space-y-2">
          <div 
            className="w-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <Progress 
              value={progress} 
              className="h-1 bg-[#E5DEFF]/30"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg max-w-none">
          {storyData && storyData.text.split("\n").map((paragraph, index) => (
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
