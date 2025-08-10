import React from "react";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import { TalentAILogo } from "./TalentAILogo";
import type { ComponentProps } from "../types";

export const HeroSection: React.FC<ComponentProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-20 pb-32 bg-hero-gradient overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-talentai-accent rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-talentai-primary rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-talentai-accent/50 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Large Logo Display */}
          <div className="mb-8 flex justify-center">
            <TalentAILogo size="xl" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl mb-6 text-talentai-accent">
            AI-Powered
            <br />
            <span className="bg-gradient-to-r from-talentai-accent to-talentai-primary bg-clip-text text-transparent">
              Talent Matching
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Break away from traditional HR. Our AI-powered platform connects exceptional AI talent 
            with innovative companies through bias-free, intelligent matching.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => onNavigate?.('signup')}
              className="group bg-talentai-accent text-white px-8 py-4 rounded-xl text-lg hover:bg-talentai-accent/90 transition-all duration-300 transform hover:scale-105 animate-pulse-glow flex items-center gap-3"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate?.('job-search')}
              className="border-2 border-talentai-accent text-talentai-accent px-8 py-4 rounded-xl text-lg hover:bg-talentai-accent hover:text-white transition-all duration-300"
            >
              Explore AI Jobs
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center group">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl mb-4 group-hover:bg-white transition-all duration-300 border border-talentai-primary/20">
                <Sparkles className="w-8 h-8 text-talentai-accent" />
              </div>
              <h3 className="text-lg mb-2 text-talentai-accent">AI-Powered Matching</h3>
              <p className="text-gray-600 text-sm">
                Our advanced algorithms ensure perfect talent-opportunity alignment
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl mb-4 group-hover:bg-white transition-all duration-300 border border-talentai-primary/20">
                <Users className="w-8 h-8 text-talentai-accent" />
              </div>
              <h3 className="text-lg mb-2 text-talentai-accent">Bias-Free Process</h3>
              <p className="text-gray-600 text-sm">
                Focus on skills and potential, not demographics or backgrounds
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl mb-4 group-hover:bg-white transition-all duration-300 border border-talentai-primary/20">
                <Zap className="w-8 h-8 text-talentai-accent" />
              </div>
              <h3 className="text-lg mb-2 text-talentai-accent">Instant Connections</h3>
              <p className="text-gray-600 text-sm">
                Connect with the right opportunities and talent in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};