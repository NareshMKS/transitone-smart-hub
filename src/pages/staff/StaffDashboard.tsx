import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserCheck, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Navigation,
  Phone,
  CheckCircle2,
  XCircle,
  Calendar,
  Route,
  Users
} from "lucide-react";

const StaffDashboard = () => {
  const [attendanceStatus, setAttendanceStatus] = useState<"checked-in" | "checked-out">("checked-out");
  const [currentLocation, setCurrentLocation] = useState("Central Station");

  const todaySchedule = {
    driver: "John Doe",
    staffId: "DRV-234",
    busNumber: "TN-123",
    route: "Route 15A",
    shift: "Morning Shift",
    startTime: "06:00 AM",
    endTime: "02:00 PM",
    checkInTime: attendanceStatus === "checked-in" ? "05:45 AM" : null
  };

  const routeStops = [
    { name: "Central Station", time: "06:00 AM", status: "completed", passengers: 12 },
    { name: "Mall Junction", time: "06:15 AM", status: "completed", passengers: 8 },
    { name: "Tech Park Gate", time: "06:30 AM", status: "current", passengers: 15 },
    { name: "University Campus", time: "06:45 AM", status: "upcoming", passengers: 0 },
    { name: "Airport Terminal", time: "07:00 AM", status: "upcoming", passengers: 0 },
    { name: "City Center", time: "07:20 AM", status: "upcoming", passengers: 0 }
  ];

  const recentAlerts = [
    {
      type: "traffic",
      message: "Heavy traffic reported on MG Road",
      time: "5 min ago",
      severity: "medium",
      action: "Consider alternate route"
    },
    {
      type: "maintenance",
      message: "Schedule maintenance reminder for next week",
      time: "1 hour ago", 
      severity: "low",
      action: "Acknowledge"
    },
    {
      type: "passenger",
      message: "Passenger assistance request at Stop 12",
      time: "15 min ago",
      severity: "high",
      action: "Respond immediately"
    }
  ];

  const performanceStats = [
    { title: "On-Time Arrivals", value: "94%", change: "+2%", icon: Clock, color: "text-secondary" },
    { title: "Passenger Satisfaction", value: "4.8", change: "+0.2", icon: Users, color: "text-accent" },
    { title: "Routes Completed", value: "156", change: "+8", icon: Route, color: "text-primary" },
    { title: "Hours Logged", value: "42.5", change: "+3.5", icon: Calendar, color: "text-secondary" }
  ];

  const handleAttendance = () => {
    setAttendanceStatus(attendanceStatus === "checked-in" ? "checked-out" : "checked-in");
  };

  const getStopStatus = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-secondary" />;
      case "current":
        return <MapPin className="h-5 w-5 text-primary animate-pulse" />;
      case "upcoming":
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      default:
        return <XCircle className="h-5 w-5 text-muted-foreground" />;
    }
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
          <h1 className="text-3xl font-bold text-foreground">Staff Portal</h1>
          <p className="text-muted-foreground">Manage your duties and track performance</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant={attendanceStatus === "checked-in" ? "destructive" : "success"}
            className="gap-2"
            onClick={handleAttendance}
          >
            <UserCheck className="h-4 w-4" />
            {attendanceStatus === "checked-in" ? "Check Out" : "Check In"}
          </Button>
          <Button variant="outline" className="gap-2">
            <Phone className="h-4 w-4" />
            Emergency
          </Button>
        </div>
      </div>

      {/* Current Shift Info */}
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            Current Shift Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Driver</p>
              <p className="font-semibold text-foreground">{todaySchedule.driver}</p>
              <p className="text-xs text-muted-foreground">ID: {todaySchedule.staffId}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Assignment</p>
              <p className="font-semibold text-foreground">{todaySchedule.busNumber}</p>
              <p className="text-xs text-muted-foreground">{todaySchedule.route}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Shift Timing</p>
              <p className="font-semibold text-foreground">{todaySchedule.startTime} - {todaySchedule.endTime}</p>
              <p className="text-xs text-muted-foreground">{todaySchedule.shift}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="flex items-center gap-2">
                {attendanceStatus === "checked-in" ? (
                  <Badge className="bg-secondary text-secondary-foreground">Checked In</Badge>
                ) : (
                  <Badge variant="outline">Not Checked In</Badge>
                )}
              </div>
              {todaySchedule.checkInTime && (
                <p className="text-xs text-muted-foreground">Check-in: {todaySchedule.checkInTime}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceStats.map((stat, index) => (
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
      <Tabs defaultValue="route" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-fit">
          <TabsTrigger value="route" className="gap-2">
            <Navigation className="h-4 w-4" />
            Route Progress
          </TabsTrigger>
          <TabsTrigger value="alerts" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <Clock className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="route" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-primary" />
                Route 15A Progress
              </CardTitle>
              <CardDescription>Track your current route and passenger information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routeStops.map((stop, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-lg border ${
                    stop.status === "current" ? "bg-primary/10 border-primary/30" : "bg-muted/30"
                  }`}>
                    <div className="flex items-center gap-3">
                      {getStopStatus(stop.status)}
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{stop.name}</div>
                        <div className="text-sm text-muted-foreground">Scheduled: {stop.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {stop.passengers} passengers
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stop.status === "current" ? "At Stop" : 
                         stop.status === "completed" ? "Completed" : "Upcoming"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex gap-3">
                <Button variant="hero" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  Share Location
                </Button>
                <Button variant="outline" className="gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Report Issue
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Active Alerts & Notifications
              </CardTitle>
              <CardDescription>Important updates and required actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">{alert.time}</p>
                        <p className="text-sm font-medium text-primary mt-1">Action: {alert.action}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Acknowledge
                        </Button>
                        {alert.severity === "high" && (
                          <Button variant="destructive" size="sm">
                            Urgent
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Daily Reports & Logs
              </CardTitle>
              <CardDescription>Submit reports and view your performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Report Vehicle Issue
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Users className="h-4 w-4" />
                      Log Passenger Incident
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Clock className="h-4 w-4" />
                      Submit Delay Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Navigation className="h-4 w-4" />
                      Request Route Change
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Today's Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shift Duration:</span>
                      <span className="font-medium text-foreground">6.5 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Routes Completed:</span>
                      <span className="font-medium text-foreground">4 trips</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Passengers Served:</span>
                      <span className="font-medium text-foreground">187</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Delay:</span>
                      <span className="font-medium text-secondary">2.3 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffDashboard;