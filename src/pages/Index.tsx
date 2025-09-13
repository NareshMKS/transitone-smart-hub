import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bus } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-primary/5">
      <div className="text-center space-y-6 p-8">
        <div className="p-4 bg-gradient-hero rounded-full w-fit mx-auto">
          <Bus className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Welcome to Transitone
        </h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Smart Public Transport Management System
        </p>
        <Button 
          variant="hero" 
          size="lg"
          onClick={() => window.location.href = "/"}
          className="gap-2"
        >
          <Bus className="h-5 w-5" />
          Enter Portal
        </Button>
      </div>
    </div>
  );
};

export default Index;
