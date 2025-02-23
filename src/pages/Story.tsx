
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StoryDisplay from "@/components/StoryDisplay";
import { StoredStory } from "@/components/StoryList";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Story = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState<StoredStory | null>(null);

  useEffect(() => {
    const savedStories = localStorage.getItem("stories");
    if (savedStories) {
      const stories: StoredStory[] = JSON.parse(savedStories).map(
        (story: StoredStory) => ({
          ...story,
          createdAt: new Date(story.createdAt),
        })
      );
      const foundStory = stories.find((s) => s.id === id);
      if (foundStory) {
        setStory(foundStory);
      }
    }
  }, [id]);

  const handleBack = () => {
    navigate("/");
    // Wait for navigation to complete before scrolling
    requestAnimationFrame(() => {
      const storiesSection = document.querySelector('.snap-mandatory');
      if (storiesSection) {
        storiesSection.scrollTo({
          top: window.innerHeight,
        });
      }
    });
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue via-soft-pink to-soft-purple p-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-600">Story not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue via-soft-pink to-soft-purple p-6">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="outline"
          className="mb-6 bg-white/50 backdrop-blur-sm"
          onClick={handleBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Stories
        </Button>
        <StoryDisplay
          story={story.content}
          id={parseInt(id || "0")}
          onReset={handleBack}
        />
      </div>
    </div>
  );
};

export default Story;
