import React, { useState, useRef } from 'react';
import { Terminal } from './Terminal';
import { Calculator } from './Calculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from './ThemeProvider';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Calendar,
  Code,
  ExternalLink,
  Camera,
  Download,
  X,
  FileImage,
  Briefcase,
  GraduationCap,
  Award,
  Star
} from 'lucide-react';

interface WindowContentProps {
  appName: string;
}

export const WindowContent: React.FC<WindowContentProps> = ({ appName }) => {
  const { theme, toggleTheme } = useTheme();
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('portos-notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentNote, setCurrentNote] = useState('');
  const [browserUrl, setBrowserUrl] = useState('https://google.com');
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>(() => {
    const saved = localStorage.getItem('portos-photos');
    return saved ? JSON.parse(saved) : [];
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const projects = [
    {
      title: 'PortOS',
      description: 'A macOS-inspired portfolio operating system built with React and TypeScript',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Material Design 3'],
      github: 'https://github.com/Sanket-Bharadwaj/portos',
      live: '#'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with modern UI/UX',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com/Sanket-Bharadwaj',
      live: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates',
      tech: ['React', 'Socket.io', 'MongoDB', 'Express'],
      github: 'https://github.com/Sanket-Bharadwaj',
      live: '#'
    }
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const photoData = canvas.toDataURL('image/jpeg');
        const newPhotos = [...capturedPhotos, photoData];
        setCapturedPhotos(newPhotos);
        localStorage.setItem('portos-photos', JSON.stringify(newPhotos));
      }
    }
  };

  const saveNote = () => {
    if (currentNote.trim()) {
      const newNotes = [...notes, {
        id: Date.now(),
        content: currentNote,
        date: new Date().toISOString()
      }];
      setNotes(newNotes);
      localStorage.setItem('portos-notes', JSON.stringify(newNotes));
      setCurrentNote('');
    }
  };

  const deleteNote = (id: number) => {
    const newNotes = notes.filter((note: any) => note.id !== id);
    setNotes(newNotes);
    localStorage.setItem('portos-notes', JSON.stringify(newNotes));
  };

  switch (appName) {
    case 'Portfolio':
      return (
        <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
          <ScrollArea className="h-full">
            <div className="min-h-full p-8">
              {/* Hero Section */}
              <div className="text-center space-y-6 mb-12">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                    SB
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-2">Sanket Bharadwaj</h1>
                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-4">Full-Stack Developer & UI/UX Enthusiast</p>
                  <div className="flex justify-center items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span>Available for opportunities</span>
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <Button variant="default" onClick={() => window.open('https://github.com/Sanket-Bharadwaj', '_blank')}>
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="outline" onClick={() => window.open('https://www.linkedin.com/in/sanket-bharadwaj', '_blank')}>
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" onClick={() => window.open('https://drive.google.com/file/d/1VW6W7O-CAVVLYBWcOiTAoCd7n65RcYAN/view?usp=sharing', '_blank')}>
                    <Download className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <Briefcase className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">3+</h3>
                  <p className="text-slate-600 dark:text-slate-300">Years Experience</p>
                </Card>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <Code className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">50+</h3>
                  <p className="text-slate-600 dark:text-slate-300">Projects Completed</p>
                </Card>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">4.9</h3>
                  <p className="text-slate-600 dark:text-slate-300">Client Rating</p>
                </Card>
              </div>

              {/* Featured Projects */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Code className="w-6 h-6" />
                    Featured Projects
                  </CardTitle>
                  <CardDescription>
                    A curated selection of my best work showcasing technical expertise
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                      <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold">{project.title}</h3>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <p className="text-slate-600 dark:text-slate-300 mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => window.open(project.github, '_blank')}>
                              <Github className="w-4 h-4 mr-1" />
                              Code
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Live
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      );

    case 'Browser':
      return (
        <div className="h-full flex flex-col bg-white dark:bg-slate-900">
          {/* Browser Header */}
          <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 px-4 py-3">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 max-w-2xl mx-auto">
                <Input
                  value={browserUrl}
                  onChange={(e) => setBrowserUrl(e.target.value)}
                  placeholder="Search or enter website URL"
                  className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-full px-4"
                  onKeyDown={(e) => e.key === 'Enter' && setBrowserUrl(browserUrl)}
                />
              </div>
              <Button variant="ghost" onClick={() => setBrowserUrl(browserUrl)}>
                Go
              </Button>
            </div>
          </div>
          
          {/* Browser Content */}
          <div className="flex-1 bg-white dark:bg-slate-900">
            <iframe
              src={browserUrl}
              className="w-full h-full border-0"
              title="Browser"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      );

    case 'Calculator':
      return <Calculator />;

    case 'Camera':
      return (
        <div className="h-full bg-black text-white flex flex-col">
          {/* Camera Header */}
          <div className="bg-black/50 backdrop-blur-sm p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-center">Camera</h2>
          </div>
          
          {/* Camera View */}
          <div className="flex-1 relative overflow-hidden">
            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-900">
                <div className="text-center space-y-4">
                  <Camera className="w-24 h-24 text-white/60 mx-auto" />
                  <h3 className="text-xl font-semibold text-white">Camera Access</h3>
                  <p className="text-white/60 max-w-sm">
                    Allow camera access to capture photos and take selfies
                  </p>
                  <Button 
                    onClick={startCamera}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Enable Camera
                  </Button>
                </div>
              </div>
            )}
            
            {/* Camera Controls */}
            {cameraActive && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-6">
                <div className="flex justify-center">
                  <Button
                    onClick={capturePhoto}
                    size="lg"
                    className="w-16 h-16 rounded-full bg-white hover:bg-gray-100 text-black border-4 border-white/20"
                  >
                    <div className="w-6 h-6 bg-black rounded-full"></div>
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      );

    case 'Notes':
      return (
        <div className="h-full bg-yellow-50 dark:bg-yellow-900/20">
          <div className="h-full flex">
            {/* Sidebar */}
            <div className="w-64 bg-yellow-100 dark:bg-yellow-900/30 border-r border-yellow-200 dark:border-yellow-800">
              <div className="p-4 border-b border-yellow-200 dark:border-yellow-800">
                <h2 className="text-lg font-bold text-yellow-900 dark:text-yellow-100">Notes</h2>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">{notes.length} notes</p>
              </div>
              <ScrollArea className="h-[calc(100%-80px)]">
                <div className="p-2 space-y-2">
                  {notes.map((note: any) => (
                    <Card 
                      key={note.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-yellow-800/50"
                    >
                      <CardContent className="p-3">
                        <p className="text-sm text-slate-900 dark:text-yellow-100 line-clamp-3">
                          {note.content}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-slate-500 dark:text-yellow-400">
                            {new Date(note.date).toLocaleDateString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNote(note.id);
                            }}
                            className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            {/* Main Area */}
            <div className="flex-1 flex flex-col">
              <div className="p-6 border-b border-yellow-200 dark:border-yellow-800">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100">New Note</h3>
                  <Button 
                    onClick={saveNote} 
                    disabled={!currentNote.trim()}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Save Note
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 p-6">
                <Textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder="Start writing your note here..."
                  className="w-full h-full resize-none border-none bg-transparent text-lg leading-relaxed focus:ring-0 text-yellow-900 dark:text-yellow-100 placeholder:text-yellow-600 dark:placeholder:text-yellow-400"
                />
              </div>
            </div>
          </div>
        </div>
      );

    case 'Settings':
      return (
        <div className="h-full bg-md3-surface p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-md3-on-surface">Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of PortOS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-md3-on-surface">Theme</span>
                  <Button onClick={toggleTheme} variant="outline">
                    {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-md3-on-surface-variant">Version</span>
                  <span className="text-md3-on-surface">PortOS 3.7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-md3-on-surface-variant">Build</span>
                  <span className="text-md3-on-surface">2025.09.02</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-md3-on-surface-variant">Developer</span>
                  <span className="text-md3-on-surface">Sanket Bharadwaj</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case 'About Me':
      return (
        <div className="h-full bg-md3-surface p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-md3-primary rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold">
                SB
              </div>
              <h1 className="text-3xl font-bold text-md3-on-surface">Sanket Bharadwaj</h1>
              <p className="text-xl text-md3-on-surface-variant">Full-Stack Developer & UI/UX Enthusiast</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-md3-on-surface">
                  Passionate full-stack developer with expertise in modern web technologies. 
                  I love creating beautiful, functional applications that provide exceptional user experiences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-md3-on-surface">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'Next.js', 'Tailwind CSS'].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-md3-on-surface">Backend</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Node.js', 'Python', 'PostgreSQL', 'MongoDB'].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-md3-on-surface-variant" />
                  <span className="text-md3-on-surface">github.com/Sanket-Bharadwaj</span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-md3-on-surface-variant" />
                  <span className="text-md3-on-surface">linkedin.com/in/sanket-bharadwaj</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-md3-on-surface-variant" />
                  <span className="text-md3-on-surface">Contact via LinkedIn</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case 'Gallery':
      return (
        <div className="h-full bg-slate-50 dark:bg-slate-900">
          {/* Gallery Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Gallery</h2>
                <p className="text-slate-600 dark:text-slate-300">{capturedPhotos.length} photos</p>
              </div>
              {capturedPhotos.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setCapturedPhotos([]);
                    localStorage.removeItem('portos-photos');
                  }}
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
          
          {/* Gallery Content */}
          <ScrollArea className="h-[calc(100%-120px)]">
            <div className="p-6">
              {capturedPhotos.length === 0 ? (
                <div className="text-center space-y-4 py-12">
                  <FileImage className="w-24 h-24 text-slate-400 mx-auto" />
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">No Photos Yet</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Use the Camera app to capture some memorable moments and they'll appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {capturedPhotos.map((photo, index) => (
                    <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="aspect-square relative">
                        <img
                          src={photo}
                          alt={`Captured photo ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              const newPhotos = capturedPhotos.filter((_, i) => i !== index);
                              setCapturedPhotos(newPhotos);
                              localStorage.setItem('portos-photos', JSON.stringify(newPhotos));
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = photo;
                              link.download = `photo-${index + 1}.jpg`;
                              link.click();
                            }}
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      );

    case 'Terminal':
      return <Terminal />;

    default:
      return (
        <div className="h-full bg-md3-surface flex items-center justify-center">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-md3-on-surface">App Not Found</h3>
            <p className="text-md3-on-surface-variant">
              The requested application could not be loaded.
            </p>
          </div>
        </div>
      );
  }
};
