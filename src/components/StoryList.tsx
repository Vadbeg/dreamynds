
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Headphones, ChevronUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div 
        className={cn(
          "transition-transform duration-300 ease-in-out transform",
          isExpanded ? "translate-y-0" : "translate-y-[calc(100%-60px)]"
        )}
      >
        {/* Collapse/Expand Handle */}
        <div 
          className="bg-white/50 backdrop-blur-sm cursor-pointer flex items-center justify-center h-[60px] rounded-t-xl border-t border-x border-[#E5DEFF]/20"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronUp className={cn(
            "w-6 h-6 text-gray-500 transition-transform duration-300",
            isExpanded ? "rotate-180" : ""
          )} />
          <span className="ml-2 font-medium text-gray-700">
            {isExpanded ? "Hide Episodes" : "View Episodes"}
          </span>
        </div>

        {/* Episodes List */}
        <Card className="rounded-t-none bg-white/50 backdrop-blur-sm border-soft-blue/20 max-h-[70vh] overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Your Episodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stories.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No episodes created yet. Create your first episode!
                </p>
              ) : (
                stories.map((story) => (
                  <div
                    key={story.id}
                    onClick={() => onSelect(story)}
                    className="group relative p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-200 border border-[#E5DEFF]/20 cursor-pointer transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-[#403E43] group-hover:text-[#2D2B31]">
                          {story.title}
                        </h3>
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
                        className="bg-[#D3E4FD]/50 hover:bg-[#D3E4FD] border-[#D3E4FD]/20 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Headphones className="w-4 h-4 mr-2" />
                        Listen
                      </Button>
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
