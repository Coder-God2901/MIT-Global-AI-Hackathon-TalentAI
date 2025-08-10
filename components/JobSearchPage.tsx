import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { NavigationHeader } from './NavigationHeader';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building, 
  TrendingUp, 
  Bookmark,
  ExternalLink,
  Sparkles,
  Users,
  Target,
  ChevronDown,
  ChevronUp,
  Calendar,
  Briefcase
} from 'lucide-react';
import type { ComponentProps } from '../types';

const jobs = [
  {
    id: 1,
    title: 'Senior Machine Learning Engineer',
    company: 'TechCorp AI',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$180K - $250K',
    posted: '2 days ago',
    matchScore: 94,
    description: 'Join our AI team to build cutting-edge ML models for autonomous systems. You\'ll work with state-of-the-art technology and collaborate with world-class researchers.',
    skills: ['Python', 'TensorFlow', 'MLOps', 'Kubernetes'],
    requirements: ['5+ years ML experience', 'PhD preferred', 'Computer Vision background'],
    benefits: ['Equity', 'Health Insurance', 'Flexible Work'],
    logo: 'TC',
    urgent: false,
    remote: false
  },
  {
    id: 2,
    title: 'AI Research Scientist',
    company: 'DeepMind Labs',
    location: 'London, UK',
    type: 'Full-time',
    salary: '£120K - £180K',
    posted: '1 week ago',
    matchScore: 91,
    description: 'Lead groundbreaking research in artificial general intelligence. Publish papers, collaborate with academia, and shape the future of AI.',
    skills: ['PyTorch', 'Research', 'NLP', 'Computer Vision'],
    requirements: ['PhD in AI/ML', 'Published papers', 'Strong math background'],
    benefits: ['Research Budget', 'Conference Travel', 'Publication Support'],
    logo: 'DM',
    urgent: true,
    remote: false
  },
  {
    id: 3,
    title: 'Remote ML Engineering Lead',
    company: 'Startup Inc',
    location: 'Remote',
    type: 'Full-time',
    salary: '$160K - $220K',
    posted: '3 days ago',
    matchScore: 87,
    description: 'Lead a team of ML engineers building recommendation systems at scale. Shape our technical strategy and mentor junior developers.',
    skills: ['Python', 'Scala', 'Spark', 'Leadership'],
    requirements: ['7+ years experience', 'Team leadership', 'Distributed systems'],
    benefits: ['Stock Options', 'Home Office Budget', 'Unlimited PTO'],
    logo: 'SI',
    urgent: false,
    remote: true
  },
  {
    id: 4,
    title: 'Data Science Manager',
    company: 'Enterprise Corp',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$200K - $280K',
    posted: '5 days ago',
    matchScore: 82,
    description: 'Drive data-driven decision making across the organization. Build and lead a team of data scientists and analysts.',
    skills: ['R', 'Python', 'SQL', 'Management'],
    requirements: ['Management experience', 'Business acumen', 'Statistics background'],
    benefits: ['Bonus Eligible', 'Health Insurance', 'Retirement Plan'],
    logo: 'EC',
    urgent: false,
    remote: false
  }
];

const filters = {
  salaryRange: [100, 300],
  experience: '',
  location: '',
  jobType: '',
  remote: false,
  urgent: false
};

export default function JobSearchPage({ onNavigate, user }: ComponentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const applyToJob = (jobId: number) => {
    setAppliedJobs(prev => [...prev, jobId]);
  };

  return (
    <div className="min-h-screen bg-talentai-background">
      {/* Navigation Header */}
      <NavigationHeader
        showBackButton={true}
        showDashboardLink={user?.type ? true : false}
        userType={user?.type}
        title="Job Search"
      />
      
      {/* Job Search Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-talentai-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Discover AI-curated opportunities tailored for you</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Saved Jobs ({savedJobs.length})
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Applications ({appliedJobs.length})
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for jobs, skills, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input-background border-border"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Search className="h-4 w-4 mr-2" />
                Search Jobs
              </Button>
            </div>

            {/* Search Tips */}
            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-primary">
                <Sparkles className="h-4 w-4 inline mr-1" />
                <strong>AI Search Tips:</strong> Try "Python ML engineer remote $150k+" or "Computer vision PhD research"
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <CardDescription>Refine your search results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Salary Range (K)</label>
                    <Slider
                      value={filters.salaryRange}
                      min={50}
                      max={500}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${filters.salaryRange[0]}K</span>
                      <span>${filters.salaryRange[1]}K+</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Experience Level</label>
                    <Select>
                      <SelectTrigger className="bg-input-background">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                        <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Select>
                      <SelectTrigger className="bg-input-background">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sf">San Francisco, CA</SelectItem>
                        <SelectItem value="nyc">New York, NY</SelectItem>
                        <SelectItem value="london">London, UK</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Type</label>
                    <Select>
                      <SelectTrigger className="bg-input-background">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fulltime">Full-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="parttime">Part-time</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Preferences</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remote" />
                        <label htmlFor="remote" className="text-sm">Remote OK</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="urgent" />
                        <label htmlFor="urgent" className="text-sm">Urgent hiring</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="equity" />
                        <label htmlFor="equity" className="text-sm">Equity offered</label>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>

              {/* Recommended Searches */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Trending Searches</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                    🔥 Remote ML Engineer
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                    🚀 AI Research Scientist
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                    💰 $200K+ Data Science
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                    🏆 Computer Vision Jobs
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Job Listings */}
          <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-6`}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {jobs.length} jobs found
                <span className="text-sm text-muted-foreground ml-2">• Sorted by relevance</span>
              </h2>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="date">Date Posted</SelectItem>
                  <SelectItem value="match">AI Match Score</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="bg-card-gradient border-border/50 hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-4">
                        {/* Job Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <span className="font-bold text-primary">{job.logo}</span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="text-lg font-semibold">{job.title}</h3>
                                {job.urgent && (
                                  <Badge variant="destructive" className="text-xs">
                                    Urgent
                                  </Badge>
                                )}
                                {job.remote && (
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                    Remote
                                  </Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground">{job.company}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">{job.matchScore}%</div>
                            <div className="text-xs text-muted-foreground">AI Match</div>
                          </div>
                        </div>

                        {/* Job Details */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {job.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleSaveJob(job.id)}
                              className={savedJobs.includes(job.id) ? 'text-primary' : ''}
                            >
                              <Bookmark className={`h-4 w-4 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              Learn More
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => applyToJob(job.id)}
                              disabled={appliedJobs.includes(job.id)}
                            >
                              {appliedJobs.includes(job.id) ? 'Applied ✓' : 'Quick Apply'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" className="w-full">
                Load More Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}