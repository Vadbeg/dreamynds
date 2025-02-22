
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
import { Wand2 } from "lucide-react";

interface StoryFormProps {
  onGenerate: (settings: StorySettings) => void;
  isGenerating: boolean;
}

export interface StorySettings {
  theme: string;
  setting: string;
  character: string;
  length: string;
}

const StoryForm = ({ onGenerate, isGenerating }: StoryFormProps) => {
  const [settings, setSettings] = useState<StorySettings>({
    theme: "",
    setting: "",
    character: "",
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
          <Label htmlFor="theme">Theme</Label>
          <Select
            value={settings.theme}
            onValueChange={(value) => setSettings({ ...settings, theme: value })}
          >
            <SelectTrigger id="theme">
              <SelectValue placeholder="Choose a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="science">Science & Technology</SelectItem>
              <SelectItem value="history">Historical Events</SelectItem>
              <SelectItem value="philosophy">Philosophy</SelectItem>
              <SelectItem value="culture">Cultural Analysis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="setting">Focus Area</Label>
          <Select
            value={settings.setting}
            onValueChange={(value) => setSettings({ ...settings, setting: value })}
          >
            <SelectTrigger id="setting">
              <SelectValue placeholder="Choose a focus area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern Implications</SelectItem>
              <SelectItem value="future">Future Prospects</SelectItem>
              <SelectItem value="analysis">Critical Analysis</SelectItem>
              <SelectItem value="impact">Societal Impact</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="character">Perspective</Label>
          <Select
            value={settings.character}
            onValueChange={(value) =>
              setSettings({ ...settings, character: value })
            }
          >
            <SelectTrigger id="character">
              <SelectValue placeholder="Choose a perspective" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="practical">Practical</SelectItem>
              <SelectItem value="innovative">Innovative</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
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
