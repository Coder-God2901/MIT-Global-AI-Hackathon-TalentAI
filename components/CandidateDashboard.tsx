import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  Brain,
  User, 
  MapPin, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Briefcase,
  Star,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  Upload,
  Eye,
  BookmarkPlus,
  Target,
  Zap,
  Menu,
  X,
  Search,
  Filter,
  Bookmark,
  ExternalLink,
  Users,
  Building2
} from 'lucide-react';

interface CandidateDashboardProps {
  onNavigate: (view: string) => void;
}

// Mock data for recommended jobs
const recommendedJobs = [
  {
    id: 1,
    title: 'Senior ML Engineer',
    company: 'TechCorp AI',
    location: 'San Francisco, CA',
    salary: '$150K - $200K',
    matchPercentage: 95,
    tags: ['Python', 'TensorFlow', 'MLOps', 'AWS'],
    description: 'Join our AI team to build cutting-edge machine learning models for autonomous systems...',
    posted: '2 days ago',
    applicants: 23,
    logo: 'TC',
    type: 'Full-time',
    remote: false,
    urgent: true
  },
  {
    id: 2,
    title: 'AI Research Scientist',
    company: 'DeepMind Labs',
    location: 'London, UK',
    salary: '£90K - £130K',
    matchPercentage: 92,
    tags: ['PyTorch', 'Research', 'NLP', 'Computer Vision'],
    description: 'Lead groundbreaking research in artificial general intelligence and publish cutting-edge papers...',
    posted: '1 week ago',
    applicants: 45,
    logo: 'DM',
    type: 'Full-time',
    remote: false,
    urgent: false
  },
  {
    id: 3,
    title: 'Remote Data Science Lead',
    company: 'Startup Innovations',
    location: 'Remote',
    salary: '$120K - $160K',
    matchPercentage: 88,
    tags: ['Python', 'SQL', 'Leadership', 'Spark'],
    description: 'Build and lead our data science team from the ground up in a fast-growing AI startup...',
    posted: '3 days ago',
    applicants: 12,
    logo: 'SI',
    type: 'Full-time',
    remote: true,
    urgent: false
  }
];

// Mock data for skill badges
const skillBadges = [
  { name: 'Python', level: 'Expert', verified: true, score: 95 },
  { name: 'Machine Learning', level: 'Advanced', verified: true, score: 89 },
  { name: 'TensorFlow', level: 'Advanced', verified: false, score: 0 },
  { name: 'AWS', level: 'Intermediate', verified: true, score: 76 },
  { name: 'Deep Learning', level: 'Advanced', verified: false, score: 0 },
  { name: 'SQL', level: 'Expert', verified: true, score: 92 }
];

// Mock data for upcoming interviews
const upcomingInterviews = [
  {
    id: 1,
    company: 'TechCorp AI',
    position: 'Senior ML Engineer',
    date: 'Tomorrow',
    time: '2:00 PM',
    type: 'Technical',
    interviewer: 'Sarah Johnson',
    status: 'confirmed'
  },
  {
    id: 2,
    company: 'AI Innovations',
    position: 'Data Scientist',
    date: 'Friday',
    time: '10:00 AM',
    type: 'Behavioral',
    interviewer: 'Mike Chen',
    status: 'pending'
  }
];

const notifications = [
  { id: 1, type: 'job_match', message: '3 new jobs match your preferences', time: '2 hours ago' },
  { id: 2, type: 'interview', message: 'Interview scheduled with TechCorp', time: '1 day ago' },
  { id: 3, type: 'profile', message: 'Your skill assessment results are ready', time: '3 days ago' }
];

export default function CandidateDashboard({ onNavigate }: CandidateDashboardProps) {
  const [profileCompletion] = useState(78);
  const [showNotifications, setShowNotifications] = useState(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([2]);

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="min-h-screen bg-talentai-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => onNavigate('landing')}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">TalentAI</span>
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => onNavigate('job-search')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Browse Jobs
              </button>
              <button 
                onClick={() => onNavigate('skill-challenge')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Skill Challenges
              </button>
              <button 
                onClick={() => onNavigate('interview-experience')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Interviews
              </button>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-border rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-3 border-b border-border last:border-0 hover:bg-muted/50">
                          <p className="text-sm text-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('profile')}
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <section className="bg-hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome back, John!</h1>
                <p className="text-muted-foreground">Ready to find your next amazing opportunity?</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Button 
                variant="outline"
                onClick={() => onNavigate('profile')}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </Button>
              <Button 
                onClick={() => onNavigate('job-search')}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Search className="h-4 w-4 mr-2" />
                Browse Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Completion */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Profile Strength
                </CardTitle>
                <CardDescription>Complete your profile to get better matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-muted"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-primary"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray={`${profileCompletion}, 100`}
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">{profileCompletion}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Resume uploaded
                      </span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        3 Skills verified
                      </span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-orange-500">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Portfolio missing
                      </span>
                      <Badge variant="outline">22% boost</Badge>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => onNavigate('profile')}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Skill Badges */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Zap className="h-5 w-5 mr-2 text-primary" />
                  Verified Skills
                </CardTitle>
                <CardDescription>Skills validated through assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skillBadges.slice(0, 4).map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={skill.verified ? "default" : "secondary"}
                          className={skill.verified ? "bg-primary text-white" : ""}
                        >
                          {skill.name}
                        </Badge>
                        {skill.verified && (
                          <div className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-xs text-green-600">{skill.score}%</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{skill.level}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                  onClick={() => onNavigate('skill-challenge')}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Take Assessment
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Profile views</span>
                  <span className="font-semibold">147</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Job matches</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Applications</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Response rate</span>
                  <span className="font-semibold text-green-600">85%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* AI Recommended Jobs */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center text-xl">
                      <Brain className="h-6 w-6 mr-2 text-primary" />
                      AI-Recommended Jobs
                    </CardTitle>
                    <CardDescription>Perfect matches based on your skills and preferences</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onNavigate('job-search')}
                  >
                    View All Jobs
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <Card key={job.id} className="border-border/50 hover:shadow-lg transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="font-bold text-primary">{job.logo}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-lg text-foreground truncate">{job.title}</h3>
                                {job.urgent && (
                                  <Badge variant="destructive" className="text-xs">Urgent</Badge>
                                )}
                                {job.remote && (
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">Remote</Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground">{job.company}</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-2xl font-bold text-primary">{job.matchPercentage}%</div>
                            <div className="text-xs text-muted-foreground">AI Match</div>
                            <div className="w-12 h-1 bg-muted rounded-full mt-1">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${job.matchPercentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {job.salary}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="h-3 w-3 mr-1" />
                            {job.type}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {job.posted}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {job.applicants} applicants
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{job.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {job.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleSaveJob(job.id)}
                              className={savedJobs.includes(job.id) ? 'text-primary' : ''}
                            >
                              <Bookmark className={`h-4 w-4 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                            </Button>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Learn More
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Quick Apply
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Upcoming Interviews */}
              <Card className="bg-card-gradient border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    Upcoming Interviews
                  </CardTitle>
                  <CardDescription>Don't miss your scheduled interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingInterviews.map((interview) => (
                      <div key={interview.id} className="p-4 bg-muted/30 rounded-lg border border-border/30">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{interview.company}</h4>
                            <p className="text-sm text-muted-foreground">{interview.position}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {interview.date} at {interview.time}
                              </span>
                              <span>with {interview.interviewer}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <Badge 
                              variant={interview.type === 'Technical' ? 'default' : 'secondary'}
                              className={interview.type === 'Technical' ? 'bg-primary text-white' : ''}
                            >
                              {interview.type}
                            </Badge>
                            <Badge 
                              variant="outline"
                              className={interview.status === 'confirmed' ? 'border-green-500 text-green-600' : 'border-orange-500 text-orange-600'}
                            >
                              {interview.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={() => onNavigate('interview-experience')}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    View All Interviews
                  </Button>
                </CardContent>
              </Card>

              {/* Application Status */}
              <Card className="bg-card-gradient border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Application Pipeline
                  </CardTitle>
                  <CardDescription>Track your recent applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-foreground">Senior ML Engineer</h4>
                        <p className="text-sm text-muted-foreground">TechCorp AI</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Final Round</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-foreground">Data Scientist</h4>
                        <p className="text-sm text-muted-foreground">AI Innovations</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">Under Review</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/30 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-foreground">Research Scientist</h4>
                        <p className="text-sm text-muted-foreground">DeepMind Labs</p>
                      </div>
                      <Badge variant="secondary">Applied</Badge>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4"
                  >
                    View All Applications
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}