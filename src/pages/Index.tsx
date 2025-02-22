
import { useState, useEffect } from "react";
import StoryForm, { StorySettings } from "@/components/StoryForm";
import StoryDisplay from "@/components/StoryDisplay";
import StoryList, { StoredStory } from "@/components/StoryList";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [story, setStory] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [stories, setStories] = useState<StoredStory[]>([]);
  const { toast } = useToast();

  // Load stories from localStorage on mount
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
      // This would be replaced with actual API calls to OpenAI and ElevenLabs
      const mockStory = `Once upon a time in a ${settings.setting}, there was a ${settings.character} who loved to explore...`;
      setStory(mockStory);

      // Mock audio URL - this would be replaced with ElevenLabs API response
      const mockAudioUrl = "https://example.com/audio.mp3";
      setAudioUrl(mockAudioUrl);

      // Create and save the new story
      const newStory: StoredStory = {
        id: Date.now().toString(),
        title: `${settings.character}'s Adventure in the ${settings.setting}`,
        content: mockStory,
        audioUrl: mockAudioUrl,
        settings,
        createdAt: new Date(),
      };

      const updatedStories = [newStory, ...stories];
      setStories(updatedStories);
      localStorage.setItem("stories", JSON.stringify(updatedStories));

      toast({
        title: "Success",
        description: "Your story has been created and saved!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setStory(null);
    setAudioUrl(null);
  };

  const handleSelectStory = (selectedStory: StoredStory) => {
    setStory(selectedStory.content);
    setAudioUrl(selectedStory.audioUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue via-soft-pink to-soft-purple p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Magical Story Creator
          </h1>
          <p className="text-lg text-gray-600">
            Create enchanting stories for your little ones
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {!story ? (
              <StoryForm onGenerate={generateStory} isGenerating={isGenerating} />
            ) : (
              <StoryDisplay
                story={story}
                audioUrl={audioUrl}
                onReset={handleReset}
              />
            )}
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
