import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { NavigationHeader } from './NavigationHeader';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  Users, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  BarChart3,
  Target,
  UserCheck,
  Eye,
  Mail,
  Phone
} from 'lucide-react';

const candidates = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Senior ML Engineer',
    location: 'San Francisco, CA',
    experience: '6 years',
    skills: ['Python', 'TensorFlow', 'MLOps', 'AWS'],
    matchScore: 95,
    availability: 'Available',
    salary: '$180K - $220K',
    education: 'Stanford CS',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    lastActive: '2 hours ago',
    responses: 85
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    title: 'AI Research Scientist',
    location: 'Boston, MA',
    experience: '8 years',
    skills: ['PyTorch', 'Computer Vision', 'NLP', 'Research'],
    matchScore: 92,
    availability: '2 weeks notice',
    salary: '$200K - $280K',
    education: 'MIT PhD',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastActive: '1 day ago',
    responses: 92
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    title: 'Data Science Lead',
    location: 'Austin, TX',
    experience: '7 years',
    skills: ['R', 'Python', 'Spark', 'Leadership'],
    matchScore: 88,
    availability: 'Open to offers',
    salary: '$160K - $200K',
    education: 'UT Austin',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastActive: '3 hours ago',
    responses: 78
  }
];

const analytics = [
  { label: 'Active Candidates', value: '2,847', change: '+12%', icon: Users },
  { label: 'Match Success Rate', value: '89%', change: '+5%', icon: Target },
  { label: 'Avg. Response Time', value: '2.3h', change: '-15%', icon: Clock },
  { label: 'Interviews Scheduled', value: '156', change: '+23%', icon: Calendar }
];

export default function RecruiterDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const { navigate } = useApp();

  const handleScheduleInterview = () => {
    setIsScheduleDialogOpen(true);
  };

  const handleViewPipeline = () => {
    // Navigate to a pipeline view or show pipeline modal
    console.log('View Pipeline clicked');
  };

  const handleContactCandidate = (candidate: any) => {
    setSelectedCandidate(candidate);
    // Navigate to interview experience or open contact modal
    navigate('interview-experience');
  };

  const handleViewProfile = (candidate: any) => {
    setSelectedCandidate(candidate);
    navigate('profile');
  };

  const handleMessageCandidate = (candidate: any) => {
    setSelectedCandidate(candidate);
    console.log('Message candidate:', candidate.name);
    // Open messaging interface
  };

  const confirmScheduleInterview = () => {
    if (scheduleDate && scheduleTime) {
      console.log(`Interview scheduled for ${scheduleDate} at ${scheduleTime}`);
      setIsScheduleDialogOpen(false);
      setScheduleDate('');
      setScheduleTime('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader 
        showBackButton={true}
        showDashboardLink={false}
        userType="recruiter"
        title="Recruiter Dashboard"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Recruiter Dashboard</h1>
            <p className="text-muted-foreground">Find and connect with top AI talent</p>
          </div>
          <div className="flex items-center space-x-3">
            <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleScheduleInterview}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Interview</DialogTitle>
                  <DialogDescription>
                    Choose a date and time for the AI-powered interview session.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="date" className="text-right">
                      Date
                    </label>
                    <Input
                      id="date"
                      type="date"
                      className="col-span-3"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="time" className="text-right">
                      Time
                    </label>
                    <Input
                      id="time"
                      type="time"
                      className="col-span-3"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={confirmScheduleInterview}>
                    Schedule Interview
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleViewPipeline}>
              <UserCheck className="h-4 w-4 mr-2" />
              View Pipeline
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analytics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="bg-card-gradient border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                      <p className={`text-sm ${
                        metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change} from last month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Search & Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-primary" />
                  Smart Search
                </CardTitle>
                <CardDescription>
                  Try: "Python, TensorFlow, MLOps in California"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search Query</label>
                  <Input
                    placeholder="Skills, location, experience..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-input-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="bg-input-background border-border">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sf">San Francisco, CA</SelectItem>
                      <SelectItem value="boston">Boston, MA</SelectItem>
                      <SelectItem value="austin">Austin, TX</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience Level</label>
                  <Select>
                    <SelectTrigger className="bg-input-background border-border">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">0-3 years</SelectItem>
                      <SelectItem value="mid">3-7 years</SelectItem>
                      <SelectItem value="senior">7+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Availability</label>
                  <Select>
                    <SelectTrigger className="bg-input-background border-border">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Available now</SelectItem>
                      <SelectItem value="2weeks">2 weeks notice</SelectItem>
                      <SelectItem value="1month">1 month notice</SelectItem>
                      <SelectItem value="open">Open to offers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary">
                    🎯 <strong>Smart Tip:</strong> ML engineers with MLOps experience have 
                    45% higher response rates.
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    📊 <strong>Market Trend:</strong> Average salary for senior AI roles 
                    increased 12% this quarter.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    AI-Matched Candidates
                  </span>
                  <Badge variant="secondary">
                    {candidates.length} found
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Ranked by AI compatibility score and your preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="p-6 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={candidate.image} />
                          <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 space-y-3">
                          <div>
                            <h4 className="font-semibold text-lg">{candidate.name}</h4>
                            <p className="text-muted-foreground">{candidate.title}</p>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {candidate.location}
                            </span>
                            <span className="flex items-center">
                              <Briefcase className="h-3 w-3 mr-1" />
                              {candidate.experience}
                            </span>
                            <span className="flex items-center">
                              <GraduationCap className="h-3 w-3 mr-1" />
                              {candidate.education}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {candidate.lastActive}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-muted-foreground">Expected: {candidate.salary}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              candidate.availability === 'Available' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {candidate.availability}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{candidate.matchScore}%</div>
                          <div className="text-xs text-muted-foreground">AI Match</div>
                          <Progress value={candidate.matchScore} className="h-2 w-20 mt-1" />
                        </div>
                        
                        <div className="text-right text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Star className="h-3 w-3 mr-1" />
                            {candidate.responses}% response rate
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewProfile(candidate)}
                            title="View Profile"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleMessageCandidate(candidate)}
                            title="Send Message"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => handleContactCandidate(candidate)}
                          >
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center pt-4">
                  <Button variant="outline" className="w-full">
                    Load More Candidates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}