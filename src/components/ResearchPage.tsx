import { BookOpen, FileText, Microscope, Award } from "lucide-react";

import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

export function ResearchPage() {
  const publications = [
    {
      title:
        "Building resilience: Risks and opportunities for housing stocks in “gateway” cities under changing extreme temperatures and energy systems",
      authors:
        "Juliette N Rooney-varga, TC Chakraborty, Laurie A Agel, Mathew A Barlow, Lucia Cheney, Saeed Gholamzadeh, Arghavan Louhghalam, Joy Beth Winbourne, Andrea Gamache",
      journal: "AGU25",
      year: "2025",
      type: "Journal Article",
    },
    {
      title:
        "Inga and Lianas Are Key Players in the Tropical Nitrogen Cycle of Brazilian Atlantic Forest: Insights From Linking Rates of Nitrogen Fixation With DNA Barcoding Root Identification",
      authors: "JB Winbourne, KE Hasenstab‐Lehman, AN Egan, D Piotto, WJ Kress, S Porder",
      journal: "Biotropica",
      year: "2025",
      type: "Journal Article",
    },
    {
      title: "Introducing the Urban Trees Ecophysiology Network",
      authors:
        "Joy Beth Winbourne, Meghan Blumstein, Xue Feng, Maria Elena Fernandez, Erez Feuer, Gabriel Gatica, Jess Gersony, Corina Graciano, Javier Gyenge, William M Hammond, Grace P John, Daniel M Johnson, Taylor Jones, Marylou Mantova, Yair Mau, Einat Shemesh, Alessandro Ossola, Renee Prokopavicius, Kaisa Rissanen, Beatriz Salgado-Negret, Leonardo Sallesses, Robert Skelton, Jean V Wilkening, Yakir Preisler",
      journal: "AGU Fall Meeting Abstracts",
      year: "2024",
      type: "Journal Article",
    },
    {
      title:
        "Spatial and seasonal trends in biogenic and fossil fuel carbon dioxide fluxes among three metropolitan regions",
      authors:
        "Joy Beth Winbourne, Conor Gately, Irene Palazzoli, Laura A Schifman, Ian A Smith, Lucy Hutyra",
      journal: "AGU Fall Meeting Abstracts",
      year: "2024",
      type: "Journal Article",
    },
  ];

  const projects = [
    {
      title: "UML food forest",
      description:
        "The UMass Lowell Food Forest was established in spring 2024 and is home to a variety of fruit trees, and edible perennial plants. Located at 46 Wilder Street on South Campus, members of the campus and community can visit and harvest what they need free of charge.",
      status: "Active",
      link: "https://www.uml.edu/office-sustainability/urban-agriculture-program/food-forest.aspx",
    },
    {
      title: "Saint Louis Sponge Park",
      description:
        "n the summer of 2025, the City of Lowell started construction on renovation of Saint Louis Sponge Park and Riverview Park (SLSP).The park renovation plans will transform this underutilized 6-acre park into a regional destination and model of climate resiliency. ",
      status: "Active",
      link: "https://www.lowellma.gov/1792/Saint-Louis-Sponge-Park-Phase-1",
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
                    <span className="text-foreground">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Read More
                      </a>
                    </span>
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
              <p className="text-sm text-muted-foreground">Climate change impacts and adaptation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💨</span>
              </div>
              <h3 className="text-foreground mb-2">Carbon Cycling</h3>
              <p className="text-sm text-muted-foreground">CO2 exchange and carbon sequestration</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📡</span>
              </div>
              <h3 className="text-foreground mb-2">Sensor Technology</h3>
              <p className="text-sm text-muted-foreground">Environmental monitoring systems</p>
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
