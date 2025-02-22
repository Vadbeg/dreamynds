
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ChevronUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface StoredStory {
  id: string;
  title: string;
  content: string;
  audioUrl: string | null;
  settings: {
    context: string;
    voice: string;
    length: string;
  };
  createdAt: Date;
}

interface StoryListProps {
  stories: StoredStory[];
  onSelect: (story: StoredStory) => void;
}

const StoryList = ({ stories, onSelect }: StoryListProps) => {
  return (
    <div className="min-h-screen snap-start bg-gradient-to-br from-[#F1F0FB]/50 via-[#D3E4FD]/50 to-[#E5DEFF]/50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-center mb-8">
          <ChevronUp className="w-8 h-8 text-gray-400 animate-bounce" />
        </div>
        <Card className="w-full bg-white/50 backdrop-blur-sm border-soft-blue/20">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Your Episodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stories.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No episodes created yet. Create your first episode!
                </p>
              ) : (
                stories.map((story) => (
                  <div
                    key={story.id}
                    onClick={() => onSelect(story)}
                    className="p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-200 border border-[#E5DEFF]/20 cursor-pointer transform hover:-translate-y-0.5 hover:shadow-md group"
                  >
                    <h3 className="font-medium text-[#403E43] group-hover:text-[#2D2B31] text-sm">
                      {story.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {formatDistanceToNow(story.createdAt, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoryList;
