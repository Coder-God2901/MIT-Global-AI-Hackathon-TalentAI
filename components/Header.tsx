import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { TalentAILogo } from "./TalentAILogo";
import { useApp } from "../context/AppContext";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigate } = useApp();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-talentai-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('landing')} className="flex items-center">
            <TalentAILogo size="sm" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigate('job-search')} className="text-talentai-accent hover:text-talentai-accent/80 transition-colors">
              Find AI Jobs
            </button>
            <button onClick={() => navigate('skill-challenge')} className="text-talentai-accent hover:text-talentai-accent/80 transition-colors">
              Skill Challenges
            </button>
            <button onClick={() => navigate('interview-experience')} className="text-talentai-accent hover:text-talentai-accent/80 transition-colors">
              AI Interviews
            </button>
            <button onClick={() => navigate('signup')} className="bg-talentai-accent text-white px-6 py-2 rounded-lg hover:bg-talentai-accent/90 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-talentai-accent" />
            ) : (
              <Menu className="w-6 h-6 text-talentai-accent" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-talentai-primary/20">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  navigate('job-search');
                  setIsMenuOpen(false);
                }}
                className="text-talentai-accent hover:text-talentai-accent/80 transition-colors px-2 py-1 text-left"
              >
                Find AI Jobs
              </button>
              <button 
                onClick={() => {
                  navigate('skill-challenge');
                  setIsMenuOpen(false);
                }}
                className="text-talentai-accent hover:text-talentai-accent/80 transition-colors px-2 py-1 text-left"
              >
                Skill Challenges
              </button>
              <button 
                onClick={() => {
                  navigate('interview-experience');
                  setIsMenuOpen(false);
                }}
                className="text-talentai-accent hover:text-talentai-accent/80 transition-colors px-2 py-1 text-left"
              >
                AI Interviews
              </button>
              <button 
                onClick={() => {
                  navigate('signup');
                  setIsMenuOpen(false);
                }}
                className="bg-talentai-accent text-white px-6 py-2 rounded-lg hover:bg-talentai-accent/90 transition-colors text-center mx-2"
              >
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};