
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface StoredStory {
  id: string;
  title: string;
  content: string;
  audioUrl: string | null;
  settings: {
    theme: string;
    setting: string;
    character: string;
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
    <Card className="w-full bg-white/50 backdrop-blur-sm border-soft-blue/20">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Your Stories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stories.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No stories generated yet. Create your first story!
            </p>
          ) : (
            stories.map((story) => (
              <div
                key={story.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-colors border border-soft-purple/20"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{story.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {formatDistanceToNow(story.createdAt, { addSuffix: true })}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-soft-green/50 hover:bg-soft-green border-soft-green/20"
                  onClick={() => onSelect(story)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryList;
