import React, { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import {
  backgroundConfig,
  getBackgroundConfig,
} from "@/config/backgroundConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomBackgroundExample: React.FC = () => {
  const [currentTheme, setCurrentTheme] =
    useState<keyof typeof backgroundConfig.themes>("aurora");
  const [speed, setSpeed] = useState(1.0);
  const [mouseEnabled, setMouseEnabled] = useState(true);

  const config = getBackgroundConfig(currentTheme);

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <AnimatedBackground
        tint={config.tint}
        speed={speed}
        mouse={mouseEnabled}
      />

      {/* Content */}
      <div className="relative z-10 p-8">
        <Card className="max-w-2xl mx-auto backdrop-blur-md bg-white/90">
          <CardHeader>
            <CardTitle>Animated Background Demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color Themes</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(backgroundConfig.themes).map((theme) => (
                  <Button
                    key={theme}
                    variant={currentTheme === theme ? "default" : "outline"}
                    onClick={() =>
                      setCurrentTheme(
                        theme as keyof typeof backgroundConfig.themes,
                      )
                    }
                    className="capitalize"
                  >
                    {theme}
                  </Button>
                ))}
              </div>
            </div>

            {/* Speed Control */}
            <div>
              <h3 className="font-semibold mb-3">Animation Speed: {speed}x</h3>
              <input
                type="range"
                min="0.1"
                max="2.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Mouse Interaction Toggle */}
            <div>
              <h3 className="font-semibold mb-3">Mouse Interaction</h3>
              <Button
                variant={mouseEnabled ? "default" : "outline"}
                onClick={() => setMouseEnabled(!mouseEnabled)}
              >
                {mouseEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>

            {/* Current Configuration Display */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Current Configuration</h3>
              <pre className="text-sm">
                {`tint: [${config.tint.join(", ")}]
speed: ${speed}
mouse: ${mouseEnabled}`}
              </pre>
            </div>

            {/* Usage Example */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Usage</h3>
              <pre className="text-sm overflow-x-auto">
                {`<AnimatedBackground 
  tint={[${config.tint.join(", ")}]}
  speed={${speed}}
  mouse={${mouseEnabled}}
/>`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomBackgroundExample;
