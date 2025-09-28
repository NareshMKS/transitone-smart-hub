import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, Users, UserCog, MapPin, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/hero-transport.jpg";
import dashboardImage from "@/assets/dashboard-preview.jpg";

const Landing = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: "admin",
      title: "Admin Panel",
      description: "Monitor fleet, analytics, and system management",
      icon: UserCog,
      color: "text-primary",
      bgGradient: "bg-gradient-primary",
      features: ["Real-time tracking", "Performance analytics", "Route management", "Staff monitoring"]
    },
    {
      id: "passenger",
      title: "Passenger Portal",
      description: "Book tickets, track buses, and manage trips",
      icon: Users,
      color: "text-secondary",
      bgGradient: "bg-gradient-success",
      features: ["Live bus tracking", "Route search", "Trip history"]
    },
    {
      id: "staff",
      title: "Operator Staff",
      description: "Attendance, route info, and real-time updates",
      icon: Bus,
      color: "text-accent",
      bgGradient: "bg-gradient-warning",
      features: ["Check-in system", "Route assignments", "GPS tracking", "Issue reporting"]
    }
  ];

  const stats = [
    { icon: Bus, label: "Active Buses", value: "156" },
    { icon: Users, label: "Daily Passengers", value: "12.5K" },
    { icon: MapPin, label: "Routes Covered", value: "45" },
    { icon: Clock, label: "On-Time Rate", value: "94%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-hero rounded-lg">
                <Bus className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Transitone</h1>
                <p className="text-sm text-muted-foreground">Smart Transport Management</p>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Shield className="h-4 w-4" />
              Emergency
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Smart Public Transport
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Revolutionizing urban mobility with real-time tracking, intelligent routing, and seamless passenger experience
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-slide-up">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-sm border border-border/50 hover:shadow-elevated transition-smooth">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* System Preview */}
          <Card className="mb-12 bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <img 
                src={heroImage} 
                alt="Smart Transport System Overview" 
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Real-Time Transport Intelligence</h3>
                <p className="text-muted-foreground">Experience the future of public transportation with AI-powered routing, live tracking, and seamless digital integration</p>
              </div>
            </CardContent>
          </Card>

          {/* Role Selection */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-semibold mb-8 text-foreground">Choose Your Portal</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {roles.map((role) => (
                <Card 
                  key={role.id}
                  className={`cursor-pointer transition-smooth hover:shadow-elevated border-2 ${
                    selectedRole === role.id ? "border-primary shadow-glow" : "border-border/50"
                  } bg-card/80 backdrop-blur-sm`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${role.bgGradient} flex items-center justify-center animate-float`}>
                      <role.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant={selectedRole === role.id ? "hero" : "outline"}
                      className="w-full"
                      onClick={() => navigate(`/login/${role.id}`)}
                    >
                      Access {role.title}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Transitone. Smart India Hackathon 2025 - Revolutionizing Public Transport</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;