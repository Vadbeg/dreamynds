import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ChevronUp, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface StoredStory {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  audioDuration: number;
}

interface StoryListProps {
  stories: StoredStory[];
  onSelect: (story: StoredStory) => void;
  generatingStoryId?: string | null;
}

const StoryList = ({ stories, onSelect, generatingStoryId }: StoryListProps) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const parts = [];
    if (hours > 0) {
      parts.push(hours.toString().padStart(2, "0"));
    }
    parts.push(minutes.toString().padStart(2, "0"));
    parts.push(remainingSeconds.toString().padStart(2, "0"));

    return parts.join(":");
  };

  return (
    <div className="min-h-screen snap-start bg-gradient-to-br from-[#F1F0FB] via-[#D3E4FD] to-[#E5DEFF] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12 pt-8 left-0 right-0 flex flex-col items-center gap-2 animate-bounce">
          <ChevronUp className="w-6 h-6 text-gray-400" />
          <p className="text-gray-500 text-sm">Scroll to see your episodes</p>
        </div>
        <div className="flex justify-center">
          <Card className="w-full max-w-[600px] bg-white/50 backdrop-blur-sm border-soft-blue/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center font-semibold">
                Your Episodes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stories.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No episodes created yet. Create your first episode!
                  </p>
                ) : (
                  [...stories].sort((a, b) => parseInt(b.id) - parseInt(a.id)).map((story) => (
                    <div
                      key={story.id}
                      onClick={() => onSelect(story)}
                      className={`p-3 rounded-lg bg-white transition-all duration-200 border border-[#E5DEFF]/20 
                        ${story.id === generatingStoryId 
                          ? 'cursor-default opacity-80' 
                          : 'cursor-pointer hover:bg-white transform hover:-translate-y-0.5 hover:shadow-md'
                        } group`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-[#403E43] group-hover:text-[#2D2B31] text-sm">
                          {story.title}
                        </h3>
                        {story.id === generatingStoryId && (
                          <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {formatDistanceToNow(story.createdAt, { addSuffix: true })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span>{formatDuration(story.audioDuration)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoryList;
