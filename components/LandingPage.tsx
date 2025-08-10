import React from "react";
import { HeroSection } from "./HeroSection";
import { FeatureCards } from "./FeatureCards";
import { Header } from "./Header";
import type { ComponentProps } from "../types";

export const LandingPage: React.FC<ComponentProps> = ({
  onNavigate,
}) => {
  return (
    <div className="min-h-screen bg-talentai-background">
      <Header />

      <main>
        <HeroSection onNavigate={onNavigate} />
        <FeatureCards />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-talentai-accent to-talentai-primary">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl mb-6 font-[Poppins]"
              style={{ color: "#441752" }}
            >
              Ready to Transform Your AI Career?
            </h2>
            <p
              className="text-xl mb-8 max-w-2xl mx-auto font-[Poppins]"
              style={{ color: "#393E46" }}
            >
              Join thousands of AI professionals who trust
              TalentAI for their career growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate?.("signup")}
                className="bg-white text-talentai-accent px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
              >
                Get Started Today
              </button>
              <button
                onClick={() => onNavigate?.("job-search")}
                className="border-2 border-white text-[rgba(65,55,55,1)] px-8 py-4 rounded-lg hover:bg-white hover:text-talentai-accent transition-all duration-300"
              >
                Browse AI Jobs
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-talentai-accent text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4">For Talent</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <button
                    onClick={() => onNavigate?.("signup")}
                    className="hover:text-white text-left"
                  >
                    Sign Up
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.("job-search")}
                    className="hover:text-white text-left"
                  >
                    Find Jobs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.("signup")}
                    className="hover:text-white text-left"
                  >
                    Skill Challenges
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">For Recruiters</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <button
                    onClick={() => onNavigate?.("signup")}
                    className="hover:text-white text-left"
                  >
                    Post Jobs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.("signup")}
                    className="hover:text-white text-left"
                  >
                    Find Talent
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.("signup")}
                    className="hover:text-white text-left"
                  >
                    AI Interviews
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Company</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <button className="hover:text-white text-left">
                    About
                  </button>
                </li>
                <li>
                  <button className="hover:text-white text-left">
                    Blog
                  </button>
                </li>
                <li>
                  <button className="hover:text-white text-left">
                    Careers
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Support</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <button className="hover:text-white text-left">
                    Help Center
                  </button>
                </li>
                <li>
                  <button className="hover:text-white text-left">
                    Contact
                  </button>
                </li>
                <li>
                  <button className="hover:text-white text-left">
                    Privacy
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 TalentAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};