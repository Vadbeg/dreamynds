import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StoryForm, { StorySettings } from "@/components/StoryForm";
import StoryList, { StoredStory } from "@/components/StoryList";
import { useToast } from "@/components/ui/use-toast";
import { ChevronDown } from "lucide-react";

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [stories, setStories] = useState<StoredStory[]>([]);
  const [generatingStoryId, setGeneratingStoryId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const storiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("http://0.0.0.0:8000/stories");
        if (!response.ok) {
          throw new Error("Failed to fetch stories");
        }
        const backendStories = await response.json();
        
        const transformedStories: StoredStory[] = backendStories.map((story: any) => ({
          id: story.id.toString(),
          title: story.name,
          content: story.text,
          createdAt: new Date(story.created_at),
          audioDuration: story.duration_seconds
        }));

        setStories(transformedStories);
        localStorage.setItem("stories", JSON.stringify(transformedStories));
        console.log(transformedStories);
      } catch (error) {
        console.error("Error fetching stories:", error);
        toast({
          title: "Error",
          description: "Failed to load stories. Please try again later.",
          variant: "destructive"
        });
      }
    };

    fetchStories();
  }, [toast]);

  const scrollToStories = () => {
    requestAnimationFrame(() => {
      const storiesSection = document.querySelector('.snap-mandatory');
      if (storiesSection) {
        storiesSection.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    });
  };
  const generateStory = async (settings: StorySettings) => {
    setIsGenerating(true);
    const tempId = Date.now().toString();
    const loadingStory: StoredStory = {
      id: tempId,
      title: `Generating podcast about ${settings.context.slice(0, 30)}...`,
      content: "Generating your podcast...", 
      createdAt: new Date(),
      audioDuration: 0
    };

    setGeneratingStoryId(tempId);
    const updatedStories = [loadingStory, ...stories];
    setStories(updatedStories);
    localStorage.setItem("stories", JSON.stringify(updatedStories));
    
    scrollToStories();

    try {
      const getLengthInMinutes = (length: string): number => {
        switch (length) {
          case "short":
            return 2;
          case "medium":
            return 5;
          case "long":
            return 10;
          default:
            return 2;
        }
      };
      const response = await fetch("http://0.0.0.0:8000/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context: settings.context,
          voice: settings.voice,
          length: getLengthInMinutes(settings.length)
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate story");
      }

      const storyData = await response.json();

      const finalStory: StoredStory = {
        id: storyData.id.toString(),
        title: storyData.name,
        content: storyData.text,
        createdAt: new Date(storyData.created_at),
        audioDuration: storyData.duration_seconds
      };

      const newStories = [finalStory, ...stories.filter(story => story.id !== tempId)];
      
      setStories(newStories);
      localStorage.setItem("stories", JSON.stringify(newStories));

      toast({
        title: "Success",
        description: "Your podcast has been created!",
      });
    } catch (error) {
      console.error("Error generating story:", error);
      toast({
        title: "Error",
        description: "Failed to generate podcast. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
      setGeneratingStoryId(null);
    }
  };

  const handleSelectStory = (selectedStory: StoredStory) => {
    if (selectedStory.id === generatingStoryId) return;
    navigate(`/story/${selectedStory.id}`);
  };

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <div className="relative min-h-screen snap-start bg-gradient-to-br from-[#F1F0FB] via-[#D3E4FD] to-[#E5DEFF] p-6">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-[#403E43] mb-4">
              Podcastly
            </h1>
            <p className="text-lg text-gray-600">
              Create in-depth, well-researched podcast episodes on any topic
            </p>
          </header>

          <main className="flex justify-center">
            <div className="w-full max-w-md">
              <StoryForm onGenerate={generateStory} isGenerating={isGenerating} />
            </div>
          </main>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 animate-bounce">
          <p className="text-gray-500 text-sm">Scroll to see your episodes</p>
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      <div ref={storiesRef}>
        <StoryList 
          stories={stories} 
          onSelect={handleSelectStory} 
          generatingStoryId={generatingStoryId} 
        />
      </div>
    </div>
  );
};

export default Index;
