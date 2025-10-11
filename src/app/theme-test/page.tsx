import { ThemeOptions } from "@/components/modules/ThemeSetup/themeOptions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ThemeTestPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Theme Test Page</h1>
          <p className="text-muted-foreground">Test your theme customization</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Theme Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Configuration</CardTitle>
              <CardDescription>
                Customize your primary colors and dark/light mode
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeOptions />
            </CardContent>
          </Card>

          {/* Preview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Preview</CardTitle>
              <CardDescription>
                See how your theme looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                <h3 className="font-semibold">Primary Color</h3>
                <p>This text uses primary color</p>
              </div>
              
              <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
                <h3 className="font-semibold">Secondary Color</h3>
                <p>This text uses secondary color</p>
              </div>
              
              <div className="p-4 bg-muted text-muted-foreground rounded-lg">
                <h3 className="font-semibold">Muted Color</h3>
                <p>This text uses muted color</p>
              </div>
              
              <div className="p-4 bg-accent text-accent-foreground rounded-lg">
                <h3 className="font-semibold">Accent Color</h3>
                <p>This text uses accent color</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}