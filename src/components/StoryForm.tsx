
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
          Create Your Story
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
              <SelectItem value="fantasy">Fantasy</SelectItem>
              <SelectItem value="animals">Animals</SelectItem>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="space">Space</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="setting">Setting</Label>
          <Select
            value={settings.setting}
            onValueChange={(value) => setSettings({ ...settings, setting: value })}
          >
            <SelectTrigger id="setting">
              <SelectValue placeholder="Choose a setting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="forest">Enchanted Forest</SelectItem>
              <SelectItem value="castle">Magical Castle</SelectItem>
              <SelectItem value="ocean">Deep Ocean</SelectItem>
              <SelectItem value="mountains">Mountains</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="character">Main Character</Label>
          <Select
            value={settings.character}
            onValueChange={(value) =>
              setSettings({ ...settings, character: value })
            }
          >
            <SelectTrigger id="character">
              <SelectValue placeholder="Choose a character" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="child">Child</SelectItem>
              <SelectItem value="animal">Friendly Animal</SelectItem>
              <SelectItem value="magical">Magical Creature</SelectItem>
              <SelectItem value="robot">Robot</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="length">Story Length</Label>
          <Select
            value={settings.length}
            onValueChange={(value) => setSettings({ ...settings, length: value })}
          >
            <SelectTrigger id="length">
              <SelectValue placeholder="Choose length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (2-3 min)</SelectItem>
              <SelectItem value="medium">Medium (4-5 min)</SelectItem>
              <SelectItem value="long">Long (6-8 min)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full bg-soft-purple hover:bg-soft-purple/90 text-purple-900"
          onClick={handleGenerate}
          disabled={isGenerating || !Object.values(settings).every(Boolean)}
        >
          {isGenerating ? (
            "Creating your story..."
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Story
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoryForm;
