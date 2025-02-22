
import { useState } from "react";
import StoryForm, { StorySettings } from "@/components/StoryForm";
import StoryDisplay from "@/components/StoryDisplay";
import { useToast } from "@/components/ui/use-toast";

// First, we'll need the ElevenLabs API key
const Index = () => {
  const [story, setStory] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateStory = async (settings: StorySettings) => {
    setIsGenerating(true);
    try {
      // This would be replaced with actual API calls to OpenAI and ElevenLabs
      const mockStory = `Once upon a time in a ${settings.setting}, there was a ${settings.character} who loved to explore...`;
      setStory(mockStory);

      // Mock audio URL - this would be replaced with ElevenLabs API response
      setAudioUrl("https://example.com/audio.mp3");
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

        <main className="space-y-8">
          {!story ? (
            <StoryForm onGenerate={generateStory} isGenerating={isGenerating} />
          ) : (
            <StoryDisplay
              story={story}
              audioUrl={audioUrl}
              onReset={handleReset}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
