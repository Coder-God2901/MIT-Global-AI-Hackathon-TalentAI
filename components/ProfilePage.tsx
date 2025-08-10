import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ResumeUploader from '../components/ResumeUploader';
import { NavigationHeader } from './NavigationHeader';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Github, 
  Linkedin, 
  Download,
  Edit,
  Star,
  Calendar,
  Building,
  GraduationCap,
  Award,
  ExternalLink,
  FileText,
  Code,
  BarChart3,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useRouter } from 'next/router';

// This is the correct interface for the ProfilePage component
interface ProfilePageProps {
  onNavigate: (route: string) => void;
  onNavigateToUploader: () => void;
  onNavigateToChallenge: () => void;
  user?: any; // Assuming user is passed down as a prop
}

const skills = [
  { name: 'Machine Learning', level: 95, category: 'AI/ML' },
  { name: 'Python', level: 90, category: 'Programming' },
  { name: 'TensorFlow', level: 85, category: 'Frameworks' },
  { name: 'PyTorch', level: 80, category: 'Frameworks' },
  { name: 'MLOps', level: 75, category: 'DevOps' },
  { name: 'AWS', level: 70, category: 'Cloud' },
  { name: 'Docker', level: 85, category: 'DevOps' },
  { name: 'SQL', level: 80, category: 'Database' }
];

const experiences = [
  {
    title: 'Senior ML Engineer',
    company: 'TechCorp AI',
    duration: '2022 - Present',
    location: 'San Francisco, CA',
    description: 'Led development of recommendation systems serving 10M+ users daily. Improved model accuracy by 25% and reduced inference latency by 40%.',
    achievements: [
      'Built scalable ML pipeline processing 1TB+ data daily',
      'Mentored 3 junior engineers',
      'Published 2 papers on recommendation systems'
    ]
  },
  {
    title: 'ML Engineer',
    company: 'StartupCorp',
    duration: '2020 - 2022',
    location: 'Austin, TX',
    description: 'Developed computer vision models for autonomous vehicle perception. Created data pipelines and model training infrastructure.',
    achievements: [
      'Improved object detection accuracy by 15%',
      'Reduced training time by 60% through optimization',
      'Led migration to cloud-based training infrastructure'
    ]
  }
];

const education = [
  {
    degree: 'M.S. Computer Science',
    school: 'Stanford University',
    year: '2020',
    gpa: '3.9/4.0',
    focus: 'Machine Learning & AI'
  },
  {
    degree: 'B.S. Computer Engineering',
    school: 'UC Berkeley',
    year: '2018',
    gpa: '3.8/4.0',
    focus: 'Computer Systems'
  }
];

const projects = [
  {
    title: 'Neural Style Transfer App',
    description: 'Real-time style transfer using optimized CNN models. Deployed as mobile app with 50K+ downloads.',
    tech: ['PyTorch', 'React Native', 'AWS Lambda'],
    link: 'https://github.com/user/neural-style-app',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=200&fit=crop'
  },
  {
    title: 'Distributed Training Framework',
    description: 'Open-source framework for distributed deep learning training. Used by 500+ researchers worldwide.',
    tech: ['Python', 'PyTorch', 'Docker', 'Kubernetes'],
    link: 'https://github.com/user/distributed-training',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=300&h=200&fit=crop'
  },
  {
    title: 'AI-Powered Code Review',
    description: 'ML model that automatically reviews code for bugs and style issues. Integrated with GitHub Actions.',
    tech: ['Transformers', 'FastAPI', 'GitHub API'],
    link: 'https://github.com/user/ai-code-review',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
  }
];

const endorsements = [
  {
    name: 'Sarah Williams',
    title: 'Engineering Manager at TechCorp',
    content: 'John is an exceptional ML engineer with deep technical expertise and strong leadership skills. He consistently delivers high-quality solutions.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face'
  },
  {
    name: 'Dr. Michael Chen',
    title: 'Professor at Stanford',
    content: 'One of the most talented students I\'ve worked with. His research contributions in deep learning are remarkable.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
  }
];

export default function ProfilePage({ onNavigate, user, onNavigateToUploader, onNavigateToChallenge }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-talentai-background">
      {/* Navigation Header */}
      {/* Assuming NavigationHeader is in a separate file and expects these props */}
      <NavigationHeader
        currentView="profile"
        userType={user?.type}
        onNavigate={onNavigate}
        title="My Profile"
        subtitle="Manage your professional profile and showcase your skills"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 bg-card-gradient">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <Avatar className="h-32 w-32">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">John Doe</h1>
                  <p className="text-xl text-muted-foreground">Senior Machine Learning Engineer</p>
                  <p className="text-muted-foreground">Passionate about AI/ML • 6 years experience</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    San Francisco, CA
                  </span>
                  <span className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    john.doe@email.com
                  </span>
                  <span className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    +1 (555) 123-4567
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Portfolio
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-700">Available</Badge>
                  <Badge variant="secondary">Open to opportunities</Badge>
                  <Badge variant="secondary">Remote OK</Badge>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-xs text-muted-foreground">Profile Strength</div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={onNavigateToUploader}>
                    <Download className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">247</div>
              <div className="text-xs text-muted-foreground">Profile Views</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">15</div>
              <div className="text-xs text-muted-foreground">Job Applications</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-xs text-muted-foreground">Interview Invites</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-xs text-muted-foreground">Endorsements</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="endorsements">Endorsements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* About */}
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Passionate Machine Learning Engineer with 6+ years of experience building scalable AI systems. 
                      Expertise in deep learning, computer vision, and MLOps. Led teams that developed ML solutions 
                      serving millions of users. Strong background in both research and production environments.
                    </p>
                  </CardContent>
                </Card>

                {/* Recent Experience */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {experiences.slice(0, 2).map((exp, index) => (
                      <div key={index} className="border-l-2 border-primary/20 pl-4 space-y-2">
                        <div>
                          <h4 className="font-semibold">{exp.title}</h4>
                          <p className="text-muted-foreground">{exp.company} • {exp.duration}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Top Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {skills.slice(0, 5).map((skill, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Education */}
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={index} className="space-y-1">
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p className="text-muted-foreground">{edu.school}</p>
                        <p className="text-sm text-muted-foreground">{edu.year} • GPA: {edu.gpa}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Professional career timeline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative">
                    {index < experiences.length - 1 && (
                      <div className="absolute left-6 top-12 h-full w-0.5 bg-border"></div>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold">{exp.title}</h3>
                          <p className="text-muted-foreground">{exp.company} • {exp.duration}</p>
                          <p className="text-sm text-muted-foreground">{exp.location}</p>
                        </div>
                        <p className="text-muted-foreground">{exp.description}</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Proficiency</CardTitle>
                  <CardDescription>Skills verified through assessments and experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {skill.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-3" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Assessment</CardTitle>
                  <CardDescription>Take assessments to verify your skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 border-2 border-dashed border-border rounded-lg">
                    <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Verify Your Skills</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete skill assessments to showcase your expertise to employers
                    </p>
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      onClick={onNavigateToChallenge}
                    >
                      Take Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h4 className="font-semibold">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Endorsements Tab */}
          <TabsContent value="endorsements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Endorsements</CardTitle>
                <CardDescription>What colleagues and managers say about me</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {endorsements.map((endorsement, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={endorsement.avatar} />
                        <AvatarFallback>{endorsement.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h5 className="font-semibold">{endorsement.name}</h5>
                        <p className="text-sm text-muted-foreground">{endorsement.title}</p>
                      </div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{endorsement.content}"</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
