import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { NavigationHeader } from './NavigationHeader';
import { useApp } from '../context/AppContext';
import { 
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageSquare,
  Send,
  Brain,
  Star,
  Clock,
  Users,
  FileText,
  Code,
  Share,
  Settings,
  Maximize,
  Volume2,
  VolumeX,
  RotateCw,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  Sparkles,
  User
} from 'lucide-react';
import type { ComponentProps } from '../types';

const interviewData = {
  id: 1,
  position: 'Senior ML Engineer',
  company: 'TechCorp AI',
  interviewer: {
    name: 'Sarah Johnson',
    title: 'Engineering Manager',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
  },
  scheduledTime: '2:00 PM - 3:00 PM',
  date: 'Today',
  type: 'Technical Round',
  status: 'live'
};

const aiInsights = [
  { category: 'Communication', score: 85, feedback: 'Clear and articulate responses', color: 'text-green-600' },
  { category: 'Technical Depth', score: 92, feedback: 'Strong technical knowledge demonstrated', color: 'text-green-600' },
  { category: 'Problem Solving', score: 78, feedback: 'Good approach, could elaborate more', color: 'text-yellow-600' },
  { category: 'Confidence', score: 88, feedback: 'Confident delivery throughout', color: 'text-green-600' }
];

const chatMessages = [
  { id: 1, sender: 'interviewer', message: 'Welcome! Ready to start with the technical questions?', time: '2:02 PM' },
  { id: 2, sender: 'candidate', message: 'Yes, I\'m ready. Thank you for having me!', time: '2:02 PM' },
  { id: 3, sender: 'interviewer', message: 'Great! Let\'s start with a coding challenge.', time: '2:03 PM' },
  { id: 4, sender: 'ai', message: '💡 AI Tip: Take your time to think through the problem before coding', time: '2:03 PM' }
];

export default function InterviewExperience() {
  const { state, navigate } = useApp();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [activeTab, setActiveTab] = useState<'chat' | 'feedback' | 'notes'>('feedback');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'candidate' as const,
        message: newMessage,
        time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    // Redirect to feedback summary or dashboard
    setTimeout(() => {
      if (state.user) {
        navigate(state.user.type === 'candidate' ? 'candidate-dashboard' : 'recruiter-dashboard');
      } else {
        navigate('landing');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-talentai-background">
      {/* Navigation Header */}
      <NavigationHeader
        showBackButton={true}
        showDashboardLink={!!state.user}
        userType={state.user?.type}
        title={state.user ? "Interview in Progress" : "Demo Interview Experience"}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Authentication Notice for Non-Authenticated Users */}
        {!state.user && (
          <Card className="mb-6 border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm text-primary">
                    <strong>Demo Mode:</strong> You're viewing a sample interview experience. 
                    <button 
                      onClick={() => navigate('signup')}
                      className="ml-1 underline hover:no-underline"
                    >
                      Sign up
                    </button> to schedule real AI-powered interviews.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Interface */}
            <Card className="bg-black border-border/50 overflow-hidden">
              <div className="relative aspect-video">
                {/* Interviewer Video (Main) */}
                <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                  {isCallActive ? (
                    <div className="text-center">
                      <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarImage src={interviewData.interviewer.avatar} />
                        <AvatarFallback className="text-2xl">SJ</AvatarFallback>
                      </Avatar>
                      <h3 className="text-white text-xl font-semibold">{interviewData.interviewer.name}</h3>
                      <p className="text-gray-300">{interviewData.interviewer.title}</p>
                      <p className="text-gray-400 text-sm mt-2">{interviewData.company}</p>
                    </div>
                  ) : (
                    <div className="text-center text-white">
                      <PhoneOff className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                      <p className="text-lg">Call Ended</p>
                      <p className="text-sm text-gray-400">Redirecting to feedback...</p>
                    </div>
                  )}

                  {/* Candidate Video (Picture-in-Picture) */}
                  <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20">
                    <div className="w-full h-full flex items-center justify-center">
                      {isVideoOn ? (
                        <Avatar className="w-16 h-16">
                          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                      ) : (
                        <VideoOff className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="absolute bottom-1 left-1 right-1">
                      <div className="text-xs text-white text-center truncate">You</div>
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <Badge variant="secondary" className="bg-red-500/80 text-white">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      Recording
                    </Badge>
                  </div>

                  {/* Controls Overlay */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center space-x-3 bg-black/50 backdrop-blur-sm rounded-full p-3">
                      <Button
                        variant={isAudioOn ? "default" : "destructive"}
                        size="sm"
                        className="rounded-full w-10 h-10 p-0"
                        onClick={() => setIsAudioOn(!isAudioOn)}
                      >
                        {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </Button>
                      
                      <Button
                        variant={isVideoOn ? "default" : "destructive"}
                        size="sm"
                        className="rounded-full w-10 h-10 p-0"
                        onClick={() => setIsVideoOn(!isVideoOn)}
                      >
                        {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                      </Button>
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-full w-12 h-12 p-0"
                        onClick={endCall}
                      >
                        <PhoneOff className="h-5 w-5" />
                      </Button>
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full w-10 h-10 p-0"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Shared Screen / Code Editor */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-lg">
                    <Code className="h-5 w-5 mr-2 text-primary" />
                    Shared Code Editor
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Share Screen
                    </Button>
                    <Button variant="outline" size="sm">
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm min-h-48">
                  <div className="text-gray-500 mb-2"># Binary Tree Maximum Path Sum</div>
                  <div className="text-blue-400">def</div> <span className="text-yellow-400">maxPathSum</span><span className="text-white">(</span><span className="text-orange-400">self</span><span className="text-white">, </span><span className="text-orange-400">root</span><span className="text-white">):</span>
                  <br />
                  <span className="ml-4 text-gray-500"># Your solution here...</span>
                  <br />
                  <span className="ml-4 text-blue-400">if</span> <span className="text-blue-400">not</span> <span className="text-orange-400">root</span><span className="text-white">:</span>
                  <br />
                  <span className="ml-8 text-blue-400">return</span> <span className="text-purple-400">0</span>
                  <br />
                  <div className="animate-pulse bg-gray-700 w-2 h-4 inline-block mt-2"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Interview Info */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Interview Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Position</div>
                  <div className="font-medium">{interviewData.position}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Company</div>
                  <div className="font-medium">{interviewData.company}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Type</div>
                  <Badge variant="outline">{interviewData.type}</Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-medium">{formatTime(elapsedTime)} / 60:00</div>
                  <Progress value={(elapsedTime / 3600) * 100} className="h-2 mt-1" />
                </div>
              </CardContent>
            </Card>

            {/* Tabbed Content */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="pb-3">
                <div className="flex space-x-1 bg-muted/30 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab('feedback')}
                    className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                      activeTab === 'feedback' 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Brain className="h-4 w-4 mx-auto mb-1" />
                    AI Feedback
                  </button>
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                      activeTab === 'chat' 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <MessageSquare className="h-4 w-4 mx-auto mb-1" />
                    Chat
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                      activeTab === 'notes' 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <FileText className="h-4 w-4 mx-auto mb-1" />
                    Notes
                  </button>
                </div>
              </CardHeader>

              <CardContent>
                {/* AI Feedback Tab */}
                {activeTab === 'feedback' && (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground">Live AI Analysis</h4>
                      <p className="text-xs text-muted-foreground">Real-time feedback on your performance</p>
                    </div>

                    {aiInsights.map((insight, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{insight.category}</span>
                          <span className={`text-sm font-semibold ${insight.color}`}>{insight.score}/100</span>
                        </div>
                        <Progress value={insight.score} className="h-2" />
                        <p className="text-xs text-muted-foreground">{insight.feedback}</p>
                      </div>
                    ))}

                    <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-primary font-medium">AI Suggestion</p>
                          <p className="text-xs text-muted-foreground">
                            Try to provide more detailed explanations for your algorithmic choices.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chat Tab */}
                {activeTab === 'chat' && (
                  <div className="space-y-4">
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {messages.map((message) => (
                        <div key={message.id} className={`text-sm ${
                          message.sender === 'candidate' ? 'text-right' : 'text-left'
                        }`}>
                          <div className={`inline-block max-w-[80%] p-2 rounded-lg ${
                            message.sender === 'candidate' 
                              ? 'bg-primary text-white' 
                              : message.sender === 'ai'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-muted text-foreground'
                          }`}>
                            <p>{message.message}</p>
                            <p className="text-xs opacity-70 mt-1">{message.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1"
                      />
                      <Button size="sm" onClick={sendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Notes Tab */}
                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Take notes during the interview..."
                      className="min-h-48 resize-none"
                    />
                    <Button variant="outline" size="sm" className="w-full">
                      Save Notes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Job Description
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Company Research
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Technical Questions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}