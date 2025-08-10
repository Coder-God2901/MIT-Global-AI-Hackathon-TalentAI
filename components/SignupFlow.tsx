import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { validateEmail, validateName, sanitizeUserData } from '../utils/validation';
import { 
  Brain, 
  User, 
  Building2, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  Users,
  Target,
  Zap,
  Upload,
  Github,
  Linkedin,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface SignupFlowProps {
  onSignup: (userType: 'candidate' | 'recruiter', userData: { email: string; name: string }) => void;
  onNavigate: (view: string) => void;
}

type Step = 'user-type' | 'basic-info' | 'role-details' | 'onboarding';
type UserType = 'candidate' | 'recruiter' | null;

const candidateBenefits = [
  { icon: Target, title: 'AI-Matched Opportunities', description: 'Get jobs that perfectly fit your skills' },
  { icon: Zap, title: 'Skip the Resume Black Hole', description: 'Direct access to hiring managers' },
  { icon: CheckCircle, title: 'Skill-Based Evaluation', description: 'Showcase abilities, not just experience' }
];

const recruiterBenefits = [
  { icon: Users, title: 'Pre-Verified Talent Pool', description: 'Access 100K+ validated AI professionals' },
  { icon: Brain, title: 'AI-Powered Matching', description: 'Find perfect candidates in minutes' },
  { icon: Zap, title: 'Faster Hiring Process', description: 'Reduce time-to-hire by 60%' }
];

export default function SignupFlow({ onSignup, onNavigate }: SignupFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('user-type');
  const [userType, setUserType] = useState<UserType>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    region: '',
    roleType: '',
    company: '',
    experience: '',
    skills: [] as string[],
    agreeTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = ['user-type', 'basic-info', 'role-details', 'onboarding'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const validateStep = (step: Step): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 'basic-info') {
      const firstNameValidation = validateName(formData.firstName);
      if (!firstNameValidation.isValid) {
        newErrors.firstName = firstNameValidation.errors[0];
      }

      const lastNameValidation = validateName(formData.lastName);
      if (!lastNameValidation.isValid) {
        newErrors.lastName = lastNameValidation.errors[0];
      }

      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.errors[0];
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
    }

    if (step === 'role-details') {
      if (!formData.region) newErrors.region = 'Region is required';
      if (userType === 'candidate' && !formData.roleType) newErrors.roleType = 'Role type is required';
      if (userType === 'recruiter' && !formData.company.trim()) newErrors.company = 'Company name is required';
      if (!formData.agreeTerms) newErrors.agreeTerms = 'Please agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < steps.length) {
      setCurrentStep(steps[nextStepIndex] as Step);
    } else {
      handleSignup();
    }
  };

  const handlePrevious = () => {
    const prevStepIndex = currentStepIndex - 1;
    if (prevStepIndex >= 0) {
      setCurrentStep(steps[prevStepIndex] as Step);
    }
  };

  const handleSignup = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    // Validate all required fields
    if (!userType) {
      setErrors({ general: 'Please select user type' });
      return;
    }

    if (!validateStep('basic-info') || !validateStep('role-details')) {
      setErrors({ general: 'Please fix the validation errors above' });
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({}); // Clear any previous errors
      
      // Sanitize user input
      const sanitizedData = sanitizeUserData({
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`
      });

      await onSignup(userType, sanitizedData);
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'Failed to create account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-talentai-background flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary">TalentAI</span>
          </div>
          <p className="text-muted-foreground">Join the future of AI talent matching</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStepIndex + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="bg-white border-border/50 shadow-lg">
          {/* User Type Selection */}
          {currentStep === 'user-type' && (
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Path</h2>
                <p className="text-muted-foreground">Are you looking for opportunities or talent?</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Candidate Option */}
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    userType === 'candidate' 
                      ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setUserType('candidate')}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">I'm a Candidate</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Looking for AI/ML opportunities
                      </p>
                    </div>
                    <div className="space-y-3">
                      {candidateBenefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                          <div key={index} className="flex items-start space-x-3 text-left">
                            <Icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-foreground">{benefit.title}</div>
                              <div className="text-xs text-muted-foreground">{benefit.description}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Recruiter Option */}
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    userType === 'recruiter' 
                      ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setUserType('recruiter')}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">I'm a Recruiter</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Looking to hire AI/ML talent
                      </p>
                    </div>
                    <div className="space-y-3">
                      {recruiterBenefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                          <div key={index} className="flex items-start space-x-3 text-left">
                            <Icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-foreground">{benefit.title}</div>
                              <div className="text-xs text-muted-foreground">{benefit.description}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleNext}
                  disabled={!userType}
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          )}

          {/* Basic Info */}
          {currentStep === 'basic-info' && (
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Basic Information</h2>
                <p className="text-muted-foreground">Let's start with the basics</p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className={errors.firstName ? 'border-destructive' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-destructive flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className={errors.lastName ? 'border-destructive' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-destructive flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      className={errors.password ? 'border-destructive' : ''}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-destructive flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="pt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">Or continue with:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex items-center justify-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Google</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center space-x-2">
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-white">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          )}

          {/* Role Details */}
          {currentStep === 'role-details' && (
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {userType === 'candidate' ? 'Your Background' : 'Company Details'}
                </h2>
                <p className="text-muted-foreground">
                  {userType === 'candidate' 
                    ? 'Tell us about your experience and goals'
                    : 'Help us understand your hiring needs'
                  }
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Region/Location</Label>
                  <Select value={formData.region} onValueChange={(value) => updateFormData('region', value)}>
                    <SelectTrigger className={errors.region ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select your region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north-america">North America</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.region && (
                    <p className="text-xs text-destructive flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.region}
                    </p>
                  )}
                </div>

                {userType === 'candidate' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="roleType">Role Type</Label>
                      <Select value={formData.roleType} onValueChange={(value) => updateFormData('roleType', value)}>
                        <SelectTrigger className={errors.roleType ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select your specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ml-engineer">ML Engineer</SelectItem>
                          <SelectItem value="data-scientist">Data Scientist</SelectItem>
                          <SelectItem value="ai-researcher">AI Researcher</SelectItem>
                          <SelectItem value="mlops-engineer">MLOps Engineer</SelectItem>
                          <SelectItem value="computer-vision">Computer Vision</SelectItem>
                          <SelectItem value="nlp-engineer">NLP Engineer</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.roleType && (
                        <p className="text-xs text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.roleType}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience Level</Label>
                      <Select value={formData.experience} onValueChange={(value) => updateFormData('experience', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                          <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                          <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                          <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {userType === 'recruiter' && (
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => updateFormData('company', e.target.value)}
                      placeholder="Enter your company name"
                      className={errors.company ? 'border-destructive' : ''}
                    />
                    {errors.company && (
                      <p className="text-xs text-destructive flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.company}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => updateFormData('agreeTerms', checked)}
                    className={errors.agreeTerms ? 'border-destructive' : ''}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{' '}
                    <button className="text-primary underline">Terms of Service</button>{' '}
                    and{' '}
                    <button className="text-primary underline">Privacy Policy</button>
                  </Label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-xs text-destructive flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.agreeTerms}
                  </p>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-white">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          )}

          {/* Onboarding */}
          {currentStep === 'onboarding' && (
            <CardContent className="p-8 text-center">
              <div className="max-w-md mx-auto space-y-6">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Welcome to TalentAI!
                  </h2>
                  <p className="text-muted-foreground">
                    {userType === 'candidate' 
                      ? 'Let\'s set up your profile and start finding amazing opportunities'
                      : 'Let\'s get you set up to find the perfect AI talent'
                    }
                  </p>
                </div>

                <div className="space-y-4 text-left">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {userType === 'candidate' ? 'Complete Your Profile' : 'Post Your First Job'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {userType === 'candidate' 
                            ? 'Upload your resume and showcase your skills to get better matches'
                            : 'Create your first job posting to start receiving qualified candidates'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Brain className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">AI Matching Process</h4>
                        <p className="text-sm text-muted-foreground">
                          Our AI analyzes your {userType === 'candidate' ? 'skills and preferences' : 'requirements'} to 
                          provide the best matches in real-time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {errors.general}
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleSignup}
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}