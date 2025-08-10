import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { NavigationHeader } from './NavigationHeader';
import { useApp } from '../context/AppContext';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Code,
  Terminal,
  FileText,
  Trophy,
  Target,
  Zap,
  User
} from 'lucide-react';
import type { ComponentProps } from '../types';

const challenge = {
  title: 'Binary Tree Maximum Path Sum',
  difficulty: 'Hard',
  category: 'Dynamic Programming',
  timeLimit: 45, // minutes
  description: `Given a non-empty binary tree, find the maximum path sum.

For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.`,
  examples: [
    {
      input: '[1,2,3]',
      output: '6',
      explanation: 'Optimal path is 2 -> 1 -> 3 with sum = 6'
    },
    {
      input: '[-10,9,20,null,null,15,7]',
      output: '42',
      explanation: 'Optimal path is 15 -> 20 -> 7 with sum = 42'
    }
  ],
  constraints: [
    'The number of nodes in the tree is in the range [1, 3 * 10^4]',
    '-1000 <= Node.val <= 1000'
  ],
  starterCode: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxPathSum(self, root: TreeNode) -> int:
        # Your code here
        pass`
};

const testCases = [
  { input: '[1,2,3]', expected: '6', status: 'pending' },
  { input: '[-10,9,20,null,null,15,7]', expected: '42', status: 'pending' },
  { input: '[5,4,8,11,null,13,4,7,2,null,null,null,1]', expected: '48', status: 'pending' },
];

export default function SkillChallengePage() {
  const { state, navigate } = useApp();
  const [code, setCode] = useState(challenge.starterCode);
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [testResults, setTestResults] = useState(testCases);
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('problem');

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0 && !isCompleted) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setIsCompleted(true);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startChallenge = () => {
    setIsRunning(true);
  };

  const runCode = () => {
    setOutput('Running tests...\n');
    
    // Simulate test execution
    setTimeout(() => {
      const results = testResults.map((test, index) => {
        const passed = Math.random() > 0.3; // 70% chance of passing
        return {
          ...test,
          status: passed ? 'passed' : 'failed'
        };
      });
      
      setTestResults(results);
      const passedTests = results.filter(r => r.status === 'passed').length;
      const score = Math.round((passedTests / results.length) * 100);
      setCurrentScore(score);
      
      let output = 'Test Results:\n\n';
      results.forEach((result, index) => {
        output += `Test Case ${index + 1}: ${result.status.toUpperCase()}\n`;
        output += `Input: ${result.input}\n`;
        output += `Expected: ${result.expected}\n`;
        if (result.status === 'failed') {
          output += `Got: ${Math.floor(Math.random() * 100)}\n`;
        }
        output += '\n';
      });
      
      if (score === 100) {
        output += '🎉 All tests passed! Challenge completed successfully!';
        setIsCompleted(true);
        setIsRunning(false);
      }
      
      setOutput(output);
    }, 2000);
  };

  const resetCode = () => {
    setCode(challenge.starterCode);
    setOutput('');
    setTestResults(testCases.map(tc => ({ ...tc, status: 'pending' })));
    setCurrentScore(0);
  };

  const submitSolution = () => {
    setIsCompleted(true);
    setIsRunning(false);
    setOutput(prev => prev + '\n\nSolution submitted successfully! ✅');
  };

  return (
    <div className="min-h-screen bg-talentai-background">
      {/* Navigation Header */}
      <NavigationHeader
        showBackButton={true}
        showDashboardLink={!!state.user}
        userType={state.user?.type}
        title="Skill Challenge"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Timer and Score Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
          <div className="flex-1">
            {/* Content removed as it's now in NavigationHeader */}
          </div>
          
          {/* Timer and Score */}
          <div className="flex items-center space-x-4">
            <Card className="p-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-red-500' : 'text-foreground'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-mono text-lg text-foreground">
                  {currentScore}/100
                </span>
              </div>
            </Card>
          </div>
        </div>

        {/* Challenge Info Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold">{challenge.title}</h2>
                <Badge 
                  variant={challenge.difficulty === 'Hard' ? 'destructive' : 'secondary'}
                  className={challenge.difficulty === 'Hard' ? 'bg-red-100 text-red-700' : ''}
                >
                  {challenge.difficulty}
                </Badge>
                <Badge variant="outline">{challenge.category}</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                {!isRunning && !isCompleted && (
                  <Button onClick={startChallenge} className="bg-primary hover:bg-primary/90">
                    <Play className="h-4 w-4 mr-2" />
                    {state.user ? 'Start Challenge' : 'Try Challenge (Demo)'}
                  </Button>
                )}
                {(isRunning || isCompleted) && (
                  <Button 
                    onClick={runCode} 
                    variant="outline"
                    disabled={isCompleted}
                  >
                    <Terminal className="h-4 w-4 mr-2" />
                    Run Tests
                  </Button>
                )}
                <Button onClick={resetCode} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                {isRunning && (
                  <Button onClick={submitSolution} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Authentication Notice for Non-Authenticated Users */}
        {!state.user && (
          <Card className="mb-6 border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm text-primary">
                    <strong>Demo Mode:</strong> You're viewing a sample challenge. 
                    <button 
                      onClick={() => navigate('signup')}
                      className="ml-1 underline hover:no-underline"
                    >
                      Sign up
                    </button> to save progress and access personalized challenges.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel - Problem & Tests */}
          <div className="space-y-6">
            <Card className="h-full">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <CardHeader className="pb-3">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="problem">Problem</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="tests">Tests</TabsTrigger>
                  </TabsList>
                </CardHeader>
                
                <CardContent className="max-h-96 overflow-y-auto">
                  <TabsContent value="problem" className="space-y-4 mt-0">
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {challenge.description}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Constraints</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {challenge.constraints.map((constraint, index) => (
                          <li key={index} className="text-sm">{constraint}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="examples" className="space-y-4 mt-0">
                    {challenge.examples.map((example, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg space-y-2">
                        <h4 className="font-semibold">Example {index + 1}</h4>
                        <div className="font-mono text-sm space-y-1">
                          <div><strong>Input:</strong> {example.input}</div>
                          <div><strong>Output:</strong> {example.output}</div>
                          <div><strong>Explanation:</strong> {example.explanation}</div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="tests" className="space-y-3 mt-0">
                    {testResults.map((test, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="font-mono text-sm">
                          <div>Input: {test.input}</div>
                          <div className="text-muted-foreground">Expected: {test.expected}</div>
                        </div>
                        <div className="flex items-center">
                          {test.status === 'pending' && (
                            <Badge variant="secondary">Pending</Badge>
                          )}
                          {test.status === 'passed' && (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Passed
                            </Badge>
                          )}
                          {test.status === 'failed' && (
                            <Badge variant="destructive">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Failed
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Panel - Code Editor & Output */}
          <div className="space-y-6">
            {/* Code Editor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  Code Editor
                </CardTitle>
                <CardDescription>Write your solution in Python</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-64 font-mono text-sm bg-muted/50 border-border"
                  placeholder="Write your code here..."
                  disabled={isCompleted}
                />
              </CardContent>
            </Card>

            {/* Output Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Terminal className="h-5 w-5 mr-2 text-primary" />
                  Output
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-32 max-h-48 overflow-y-auto">
                  {output || 'Run your code to see output...'}
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            {(isRunning || isCompleted) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-primary" />
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Test Cases Passed</span>
                      <span>{testResults.filter(t => t.status === 'passed').length}/{testResults.length}</span>
                    </div>
                    <Progress 
                      value={(testResults.filter(t => t.status === 'passed').length / testResults.length) * 100} 
                      className="h-3" 
                    />
                  </div>
                  
                  {isCompleted && (
                    <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20 space-y-3">
                      <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold text-primary">Challenge Completed!</h4>
                      <p className="text-sm text-muted-foreground">
                        Final Score: {currentScore}/100
                      </p>
                      {!state.user && (
                        <Button 
                          onClick={() => navigate('signup')}
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                        >
                          Sign Up to Save Progress
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}