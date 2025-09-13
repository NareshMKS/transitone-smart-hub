import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bus, 
  Users, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Activity,
  UserCheck,
  Navigation,
  BarChart3,
  Settings,
  Bell
} from "lucide-react";

const AdminDashboard = () => {
  const [activeAlerts] = useState([
    { id: 1, type: "delay", message: "Route 15A delayed by 8 minutes", severity: "medium", time: "2 min ago" },
    { id: 2, type: "maintenance", message: "Bus TN-456 scheduled for maintenance", severity: "low", time: "15 min ago" },
    { id: 3, type: "traffic", message: "Heavy traffic on MG Road route", severity: "high", time: "5 min ago" }
  ]);

  const fleetStats = [
    { title: "Total Buses", value: "156", change: "+3", icon: Bus, color: "text-primary" },
    { title: "Active Routes", value: "45", change: "+2", icon: Navigation, color: "text-secondary" },
    { title: "Daily Passengers", value: "12.5K", change: "+8%", icon: Users, color: "text-accent" },
    { title: "On-Time Performance", value: "94.2%", change: "+2.1%", icon: Clock, color: "text-secondary" }
  ];

  const recentActivity = [
    { type: "attendance", message: "Driver ID-234 checked in", time: "5 min ago", icon: UserCheck },
    { type: "route", message: "Route 12B completed on schedule", time: "12 min ago", icon: MapPin },
    { type: "maintenance", message: "Bus TN-789 maintenance completed", time: "25 min ago", icon: Settings },
    { type: "alert", message: "Traffic congestion alert cleared", time: "1 hour ago", icon: AlertTriangle }
  ];

  const busStatus = [
    { id: "TN-123", route: "Route 15A", status: "active", passengers: 42, capacity: 50, delay: 0 },
    { id: "TN-456", route: "Route 22B", status: "maintenance", passengers: 0, capacity: 45, delay: 0 },
    { id: "TN-789", route: "Route 8C", status: "active", passengers: 38, capacity: 50, delay: 5 },
    { id: "TN-321", route: "Route 11A", status: "active", passengers: 50, capacity: 50, delay: 0 },
    { id: "TN-654", route: "Route 19D", status: "delayed", passengers: 35, capacity: 45, delay: 12 }
  ];

  const getStatusBadge = (status: string, delay: number) => {
    if (status === "maintenance") return <Badge variant="secondary">Maintenance</Badge>;
    if (delay > 10) return <Badge variant="destructive">Delayed</Badge>;
    if (delay > 5) return <Badge className="bg-accent text-accent-foreground">Minor Delay</Badge>;
    return <Badge className="bg-secondary text-secondary-foreground">On Time</Badge>;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-l-destructive bg-destructive/5";
      case "medium": return "border-l-accent bg-accent/5";
      case "low": return "border-l-secondary bg-secondary/5";
      default: return "border-l-muted bg-muted/5";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your transport fleet</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Bell className="h-4 w-4" />
            Alerts ({activeAlerts.length})
          </Button>
          <Button variant="hero" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {fleetStats.map((stat, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-elevated transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <span className="text-sm text-secondary font-medium">{stat.change}</span>
                  </div>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="fleet" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-fit">
          <TabsTrigger value="fleet" className="gap-2">
            <Bus className="h-4 w-4" />
            Fleet Status
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="alerts" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Activity className="h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fleet" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bus className="h-5 w-5 text-primary" />
                Real-Time Fleet Status
              </CardTitle>
              <CardDescription>Monitor all buses and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {busStatus.map((bus) => (
                  <div key={bus.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{bus.id}</span>
                        <span className="text-sm text-muted-foreground">{bus.route}</span>
                      </div>
                      {getStatusBadge(bus.status, bus.delay)}
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-foreground">{bus.passengers}/{bus.capacity}</div>
                        <div className="text-muted-foreground">Passengers</div>
                      </div>
                      {bus.delay > 0 && (
                        <div className="text-center">
                          <div className="font-medium text-destructive">+{bus.delay}m</div>
                          <div className="text-muted-foreground">Delay</div>
                        </div>
                      )}
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        Track
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Weekly overview of transport efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg border-dashed border-2">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Performance Chart</p>
                    <p className="text-sm text-muted-foreground">Integration with chart library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
              <CardHeader>
                <CardTitle>Route Efficiency</CardTitle>
                <CardDescription>Analysis of route performance and optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg border-dashed border-2">
                  <div className="text-center">
                    <Navigation className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Route Analysis</p>
                    <p className="text-sm text-muted-foreground">Heat map visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Active Alerts
              </CardTitle>
              <CardDescription>Monitor system alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">{alert.time}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest system activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-muted/20 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
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

export default AdminDashboard;