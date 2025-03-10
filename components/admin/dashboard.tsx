import React from 'react';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { LayoutDashboard, User, Code, Award, Mail, LogOut, Settings, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import type { PortfolioData } from '@/lib/portfolio';

import AboutForm from './about-form';
import TechStackForm from './tech-stack-form';
import ProjectsList from './projects-list';
import AchievementsList from './achievements-list';
import ContactSettings from './contact-settings';

interface AdminDashboardProps {
  data: PortfolioData;
}

export default function AdminDashboard({ data }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen bg-muted/50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-background border-r">
        <div className="p-6">
          <h2 className="text-xl font-bold">Portfolio Admin</h2>
        </div>
        <Separator />
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Button
                variant={activeTab === 'overview' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('overview')}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === 'about' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('about')}
              >
                <User className="mr-2 h-4 w-4" />
                About Me
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === 'tech' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('tech')}
              >
                <Code className="mr-2 h-4 w-4" />
                Tech Stack
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === 'projects' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('projects')}
              >
                <Code className="mr-2 h-4 w-4" />
                Projects
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === 'achievements' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('achievements')}
              >
                <Award className="mr-2 h-4 w-4" />
                Achievements
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === 'contact' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('contact')}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Button>
            </li>
          </ul>
        </nav>
        <div className="p-4 mt-auto">
          <Button variant="ghost" className="w-full justify-start" onClick={() => signOut({ callbackUrl: '/' })}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="md:hidden p-4 bg-background border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Portfolio Admin</h2>
            <Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: '/' })}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <Button asChild>
                  <Link href="/" target="_blank">
                    View Portfolio
                  </Link>
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>Manage your projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{data.projects.length}</div>
                    <Button
                      variant="ghost"
                      className="w-full justify-between mt-4"
                      onClick={() => setActiveTab('projects')}
                    >
                      View all projects
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Manage your achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{data.achievements.length}</div>
                    <Button
                      variant="ghost"
                      className="w-full justify-between mt-4"
                      onClick={() => setActiveTab('achievements')}
                    >
                      View all achievements
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Tech Stack</CardTitle>
                    <CardDescription>Manage your tech stack</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {data.techStack.reduce((acc, category) => acc + category.items.length, 0)}
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-between mt-4"
                      onClick={() => setActiveTab('tech')}
                    >
                      View tech stack
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <Button variant="outline" className="justify-start" onClick={() => setActiveTab('about')}>
                      <User className="mr-2 h-4 w-4" />
                      Update Profile Information
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => setActiveTab('projects')}>
                      <Code className="mr-2 h-4 w-4" />
                      Add New Project
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => setActiveTab('achievements')}>
                      <Award className="mr-2 h-4 w-4" />
                      Add New Achievement
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => setActiveTab('contact')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Update Contact Information
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tips & Help</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="font-medium mb-2">Optimize Your Portfolio</h3>
                      <p className="text-sm text-muted-foreground">
                        Add detailed descriptions to your projects and use high-quality images to make your portfolio
                        stand out.
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="font-medium mb-2">Keep It Updated</h3>
                      <p className="text-sm text-muted-foreground">
                        Regularly update your portfolio with new projects and achievements to showcase your latest work.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'about' && <AboutForm data={data} />}

          {activeTab === 'tech' && <TechStackForm data={data} />}

          {activeTab === 'projects' && <ProjectsList projects={data.projects} />}

          {activeTab === 'achievements' && <AchievementsList achievements={data.achievements} />}

          {activeTab === 'contact' && <ContactSettings data={data} />}
        </main>
      </div>
    </div>
  );
}