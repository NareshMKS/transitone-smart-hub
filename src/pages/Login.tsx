import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bus, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const roleConfig = {
    admin: {
      title: "Admin Login",
      description: "Access system administration panel",
      placeholder: "admin@transitone.com",
      redirectPath: "/admin/dashboard"
    },
    passenger: {
      title: "Passenger Login",
      description: "Access your passenger account",
      placeholder: "passenger@example.com",
      redirectPath: "/passenger/dashboard"
    },
    staff: {
      title: "Staff Login",
      description: "Access operator staff portal",
      placeholder: "staff@transitone.com",
      redirectPath: "/staff/dashboard"
    }
  };

  const config = roleConfig[role as keyof typeof roleConfig];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (formData.username && formData.password) {
        toast({
          title: "Login Successful",
          description: `Welcome to ${config?.title}`,
        });
        navigate(config?.redirectPath || "/");
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleDemo = () => {
    setFormData({
      username: config?.placeholder || "",
      password: "demo123"
    });
    toast({
      title: "Demo Credentials Loaded",
      description: "Click login to continue with demo account",
    });
  };

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Invalid Role</h1>
            <Button onClick={() => navigate("/")} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="absolute top-4 left-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-hero rounded-lg">
              <Bus className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Transitone</h1>
          <p className="text-muted-foreground">Smart Transport Management</p>
        </div>

        {/* Login Card */}
        <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{config.title}</CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username / Email</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={config.placeholder}
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="transition-smooth focus:shadow-md"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="transition-smooth focus:shadow-md pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="hero"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={handleDemo}
                >
                  Load Demo Credentials
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need help? Contact system administrator
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card className="mt-4 bg-muted/50 border-dashed">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Demo Mode:</span> Use "Load Demo Credentials" for quick access
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;