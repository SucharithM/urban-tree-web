import { BookOpen, FileText, Microscope, Award } from "lucide-react";

import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

export function ResearchPage() {
  const publications = [
    {
      title: "Long-term patterns of carbon dioxide exchange in temperate deciduous forests",
      authors: "Winbourne, J., Martinez, S., Chen, J.",
      journal: "Global Change Biology",
      year: "2024",
      type: "Journal Article",
    },
    {
      title: "Soil moisture dynamics and their influence on forest productivity",
      authors: "Winbourne, J., Park, L., Thompson, E.",
      journal: "Ecological Applications",
      year: "2023",
      type: "Journal Article",
    },
    {
      title: "Advances in wireless sensor networks for environmental monitoring",
      authors: "Chen, J., Rodriguez, M., Winbourne, J.",
      journal: "Environmental Science & Technology",
      year: "2023",
      type: "Journal Article",
    },
    {
      title: "Climate change impacts on forest-atmosphere CO2 exchange",
      authors: "Martinez, S., Winbourne, J.",
      journal: "Nature Climate Change",
      year: "2022",
      type: "Journal Article",
    },
  ];

  const projects = [
    {
      title: "Real-time Environmental Sensor Network",
      description: "Development of a comprehensive wireless sensor network for continuous monitoring of forest environmental conditions. This project aims to create an open-source platform for environmental data collection and visualization.",
      status: "Active",
      funding: "NSF Grant",
      duration: "2022-2025",
    },
    {
      title: "Forest Carbon Dynamics Study",
      description: "Investigation of seasonal and inter-annual variability in forest carbon uptake and release. Using eddy covariance techniques to measure ecosystem-scale CO2 fluxes.",
      status: "Active",
      funding: "DOE Grant",
      duration: "2021-2024",
    },
    {
      title: "Climate Resilience in Forest Ecosystems",
      description: "Examining how forest ecosystems respond to extreme weather events and long-term climate trends. Focus on understanding mechanisms of resilience and adaptation.",
      status: "Active",
      funding: "University Research Fund",
      duration: "2023-2026",
    },
  ];

  const presentations = [
    {
      title: "Innovations in Environmental Monitoring Technology",
      event: "American Geophysical Union Fall Meeting",
      location: "San Francisco, CA",
      year: "2024",
    },
    {
      title: "Forest-Atmosphere Interactions in a Changing Climate",
      event: "Ecological Society of America Annual Meeting",
      location: "Portland, OR",
      year: "2023",
    },
    {
      title: "Data-Driven Approaches to Ecosystem Science",
      event: "International Conference on Environmental Science",
      location: "Virtual",
      year: "2023",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Microscope className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl mb-4">Research & Publications</h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Exploring the frontiers of forest ecology and environmental monitoring
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Current Projects */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-primary" />
            <h2 className="text-3xl">Current Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="p-6 border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-accent text-accent-foreground">{project.status}</Badge>
                </div>
                <h3 className="text-foreground mb-3">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Funding:</span>
                    <span className="text-foreground">{project.funding}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="text-foreground">{project.duration}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-3xl">Recent Publications</h2>
          </div>
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <Card key={index} className="p-6 border-border hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground mb-2">{pub.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{pub.authors}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-primary">{pub.journal}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{pub.year}</span>
                      <Badge variant="outline" className="ml-2">
                        {pub.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Presentations */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-3xl">Conference Presentations</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {presentations.map((pres, index) => (
              <Card key={index} className="p-6 border-border">
                <h3 className="text-foreground mb-3">{pres.title}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">{pres.event}</p>
                  <p className="text-muted-foreground">{pres.location}</p>
                  <p className="text-primary">{pres.year}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Research Focus Areas */}
        <div className="bg-primary/5 rounded-lg p-8 md:p-12 border border-border">
          <h2 className="text-3xl text-center mb-8">Research Focus Areas</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌳</span>
              </div>
              <h3 className="text-foreground mb-2">Forest Ecology</h3>
              <p className="text-sm text-muted-foreground">
                Ecosystem structure, function, and dynamics
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌡️</span>
              </div>
              <h3 className="text-foreground mb-2">Climate Science</h3>
              <p className="text-sm text-muted-foreground">
                Climate change impacts and adaptation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💨</span>
              </div>
              <h3 className="text-foreground mb-2">Carbon Cycling</h3>
              <p className="text-sm text-muted-foreground">
                CO2 exchange and carbon sequestration
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📡</span>
              </div>
              <h3 className="text-foreground mb-2">Sensor Technology</h3>
              <p className="text-sm text-muted-foreground">
                Environmental monitoring systems
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2024 Prof. Joy Winbourne Environmental Research Lab. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
