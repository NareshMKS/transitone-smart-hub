import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Clock, 
  Navigation,
  Search,
  Star,
  History,
  AlertCircle,
  CheckCircle2,
  Siren
} from "lucide-react";

const PassengerDashboard = () => {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  const tripHistory = [
    {
      id: "TKT-098",
      from: "Jalandhar Bus Stand",
      to: "Bathinda Depot",
      date: "Dec 12, 2024",
      amount: "₹120",
      status: "completed",
      rating: 5
    },
    {
      id: "TKT-097",
      from: "Mohali ISBT",
      to: "Amritsar Bus Stand", 
      date: "Dec 11, 2024",
      amount: "₹180",
      status: "completed",
      rating: 4
    },
    {
      id: "TKT-096",
      from: "Chandigarh ISBT",
      to: "Ludhiana Junction",
      date: "Dec 10, 2024",
      amount: "₹95",
      status: "completed",
      rating: 5
    }
  ];

  const availableRoutes = [
    {
      route: "Route PB-15A",
      from: "Amritsar Bus Stand",
      to: "Chandigarh ISBT",
      duration: "4 hr 30 min",
      price: "₹220",
      nextBus: "5 min",
      frequency: "Every 30 min"
    },
    {
      route: "Route PB-8C", 
      from: "Ludhiana Junction",
      to: "Patiala Bus Stand",
      duration: "2 hr 10 min",
      price: "₹150",
      nextBus: "12 min",
      frequency: "Every 45 min"
    },
    {
      route: "Route PB-11A",
      from: "Jalandhar Bus Stand", 
      to: "Bathinda Depot",
      duration: "3 hr 50 min",
      price: "₹200",
      nextBus: "8 min",
      frequency: "Every 1 hour"
    }
  ];

  const notifications = [
    {
      type: "delay",
      message: "Your Route PB-15A bus from Amritsar is delayed by 15 minutes",
      time: "2 min ago",
      severity: "medium"
    },
    {
      type: "arrival",
      message: "Bus PB-10-1234 arriving at Chandigarh ISBT in 10 minutes",
      time: "5 min ago", 
      severity: "info"
    },
    {
      type: "promotion",
      message: "Flat 20% off on Punjab State Roadways online bookings this week",
      time: "1 hour ago",
      severity: "low"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-muted text-muted-foreground">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? "fill-accent text-accent" : "text-muted-foreground"}`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Passenger Portal</h1>
          <p className="text-muted-foreground">Plan your journey and track your rides</p>
        </div>
        <div className="flex gap-3">
          {/* SOS Button */}
          <Button variant="destructive" className="gap-2">
            <Siren className="h-4 w-4" />
            SOS
          </Button>
        </div>
      </div>

      {/* Quick Search */}
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Find Your Route
          </CardTitle>
          <CardDescription>Search for buses and plan your journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">From</label>
              <Input
                placeholder="Enter pickup location"
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
                className="transition-smooth focus:shadow-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">To</label>
              <Input
                placeholder="Enter destination"
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
                className="transition-smooth focus:shadow-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Action</label>
              <Button variant="hero" className="w-full gap-2">
                <Navigation className="h-4 w-4" />
                Search Routes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="routes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-fit">
          <TabsTrigger value="routes" className="gap-2">
            <Navigation className="h-4 w-4" />
            Routes
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            Alerts
          </TabsTrigger>
        </TabsList>

        {/* Routes */}
        <TabsContent value="routes" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle>Available Routes</CardTitle>
              <CardDescription>Choose the best route for your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableRoutes.map((route, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border hover:shadow-md transition-smooth">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Navigation className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{route.route}</div>
                        <div className="text-sm text-muted-foreground">
                          {route.from} → {route.to}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {route.duration}
                          </span>
                          <span>Next: {route.nextBus}</span>
                          <span>{route.frequency}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-lg text-foreground">{route.price}</div>
                        <div className="text-sm text-muted-foreground">per ticket</div>
                      </div>
                      {/**<Button variant="hero" size="sm" className="gap-2">
                        Book
                      </Button>**/}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Trip History
              </CardTitle>
              <CardDescription>Your past journeys and receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tripHistory.map((trip) => (
                  <div key={trip.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-muted rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{trip.from} → {trip.to}</div>
                        <div className="text-sm text-muted-foreground">{trip.date} • {trip.id}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {renderStars(trip.rating)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">{trip.amount}</div>
                      {getStatusBadge(trip.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Notifications & Alerts
              </CardTitle>
              <CardDescription>Stay updated with real-time information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-1 bg-primary/10 rounded-full mt-1">
                          <AlertCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PassengerDashboard;
