
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Wand2, Voicemail } from "lucide-react";
import { Input } from "@/components/ui/input";

interface StoryFormProps {
  onGenerate: (settings: StorySettings) => void;
  isGenerating: boolean;
}

export interface StorySettings {
  context: string;
  voice: string;
  length: string;
}

const StoryForm = ({ onGenerate, isGenerating }: StoryFormProps) => {
  const [settings, setSettings] = useState<StorySettings>({
    context: "",
    voice: "",
    length: "",
  });

  const handleGenerate = () => {
    onGenerate(settings);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/50 backdrop-blur-sm border-soft-blue/20">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-semibold">
          Create Your Episode
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="context">Research Context</Label>
          <Input
            id="context"
            placeholder="What would you like to research? Be as specific as you'd like..."
            value={settings.context}
            onChange={(e) =>
              setSettings({ ...settings, context: e.target.value })
            }
            className="min-h-[100px] resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="voice" className="flex items-center gap-2">
            <Voicemail className="w-4 h-4" />
            Voice
          </Label>
          <Select
            value={settings.voice}
            onValueChange={(value) => setSettings({ ...settings, voice: value })}
          >
            <SelectTrigger id="voice">
              <SelectValue placeholder="Choose a voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sarah">Sarah - Professional</SelectItem>
              <SelectItem value="daniel">Daniel - Academic</SelectItem>
              <SelectItem value="emily">Emily - Conversational</SelectItem>
              <SelectItem value="james">James - Authoritative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="length">Episode Length</Label>
          <Select
            value={settings.length}
            onValueChange={(value) => setSettings({ ...settings, length: value })}
          >
            <SelectTrigger id="length">
              <SelectValue placeholder="Choose length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (15 min)</SelectItem>
              <SelectItem value="medium">Medium (30 min)</SelectItem>
              <SelectItem value="long">Long (45 min)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full bg-[#E5DEFF] hover:bg-[#D3E4FD] text-[#403E43]"
          onClick={handleGenerate}
          disabled={isGenerating || !Object.values(settings).every(Boolean)}
        >
          {isGenerating ? (
            "Creating your episode..."
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Episode
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoryForm;
