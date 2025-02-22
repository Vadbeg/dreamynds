
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoryForm, { StorySettings } from "@/components/StoryForm";
import StoryList, { StoredStory } from "@/components/StoryList";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [stories, setStories] = useState<StoredStory[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const savedStories = localStorage.getItem("stories");
    if (savedStories) {
      const parsedStories = JSON.parse(savedStories).map((story: StoredStory) => ({
        ...story,
        createdAt: new Date(story.createdAt),
      }));
      setStories(parsedStories);
    }
  }, []);

  const generateStory = async (settings: StorySettings) => {
    setIsGenerating(true);
    try {
      // This would be replaced with actual API calls
      const mockStory = `A deep dive into ${settings.context}, narrated with our ${settings.voice} voice...`;

      // Mock audio URL - this would be replaced with actual API response
      const mockAudioUrl = "https://example.com/audio.mp3";

      const newStory: StoredStory = {
        id: Date.now().toString(),
        title: `Research: ${settings.context.slice(0, 50)}...`,
        content: mockStory,
        audioUrl: mockAudioUrl,
        settings: settings,
        createdAt: new Date(),
      };

      const updatedStories = [newStory, ...stories];
      setStories(updatedStories);
      localStorage.setItem("stories", JSON.stringify(updatedStories));

      toast({
        title: "Success",
        description: "Your podcast has been created!",
      });

      navigate(`/story/${newStory.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate podcast. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectStory = (selectedStory: StoredStory) => {
    navigate(`/story/${selectedStory.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] via-[#D3E4FD] to-[#E5DEFF] p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-[#403E43] mb-4">
            Deep Research Podcast Creator
          </h1>
          <p className="text-lg text-gray-600">
            Create in-depth, well-researched podcast episodes on any topic
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <StoryForm onGenerate={generateStory} isGenerating={isGenerating} />
          </div>
          <div>
            <StoryList stories={stories} onSelect={handleSelectStory} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
