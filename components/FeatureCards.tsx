import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Bot, Target, Shield, Zap, Users, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Matching',
    description: 'Advanced algorithms analyze skills, experience, and cultural fit to create perfect matches between talent and opportunities.',
    gradient: 'from-violet-500/20 to-purple-500/20'
  },
  {
    icon: Target,
    title: 'Precision Targeting',
    description: 'Find exactly what you\'re looking for with our intelligent filtering system that understands context and nuance.',
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    icon: Shield,
    title: 'Verified Profiles',
    description: 'All profiles undergo rigorous verification including skill assessments, background checks, and portfolio reviews.',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    icon: Zap,
    title: 'Instant Connections',
    description: 'Connect with top talent in real-time. Our platform facilitates immediate communication and fast decision-making.',
    gradient: 'from-yellow-500/20 to-orange-500/20'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Join a thriving community of AI professionals. Share knowledge, collaborate, and grow together.',
    gradient: 'from-pink-500/20 to-rose-500/20'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Get detailed analytics on your hiring process, candidate performance, and market trends to make data-driven decisions.',
    gradient: 'from-indigo-500/20 to-blue-500/20'
  }
];

export const FeatureCards: React.FC = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Why Choose TalentAI?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of talent acquisition with our cutting-edge AI platform
            designed for the modern workplace.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card-gradient border-border/50 hover:border-primary/20"
              >
                <CardHeader className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};