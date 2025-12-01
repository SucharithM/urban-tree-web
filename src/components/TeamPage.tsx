import { Mail, GraduationCap, Users } from "lucide-react";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card } from "./ui/card";

export function TeamPage() {
  const teamMembers = [
    {
      name: "Dr. Joy Winbourne",
      role: "Principal Investigator",
      description:
        "As a terrestrial biogeochemist and global change ecologist, my research is focused on understanding how plants and soils regulate the movement of carbon, nutrients, and water in terrestrial ecosystems. I am particularly interested in understanding how human activities, such as urbanization, deforestation, forest fragmentation, and climate change, alter biogeochemical cycles. My research agenda is motivated by the need for actionable ecological data and theory to inform sustainable environmental policies and evaluate their efficacy, especially in the context of global climate change. To address these research aims I have conducted studies in remote tropical forests to the densely populated cities of northeastern United States. I integrate field studies, molecular analyses, stable isotopes, remote sensing, meta-analyses, and modeling approaches to scale ecosystem processes at the individual soil core or tree to landscape scales. ",
      email: "joy_winbourne@uml.edu",
    },
    {
      name: "Andrea Gamache",
      role: "Phd Student ",
      description:
        "Andrea is an enthusiastic disturbance biologist with a BS in Environmental Biology from Christopher Newport University and a MA in Integrative Biology from Kennesaw State University. For her MA, Andrea studied the impact of forest fire and cicada emergence on forest community composition and soil chemistry. For her dissertation research, Andrea plans to study the impact of urbanization and other stressors on plant ecophysiology.  ",
      email: "placeholder@university.edu",
    },
    {
      name: "Evan Paige",
      role: "Master Student",
      description:
        "Researching the effects of climate variability on forest carbon uptake. Managing the sensor network infrastructure and data pipelines.",
      email: "placeholder@university.edu",
    },
    {
      name: "Robert Scott",
      role: " Undergraduate Student",
      description: "2022/2023 Academic Year Immersive Scholar,2023/2024 Research Assistant",
      email: "placeholder@university.edu",
    },
    {
      name: "Cecilia Eluszkiewicz",
      role: " Undergraduate Student ",
      description: "2022 Summer Immersive Scholar,2024 Summer Research Assistant ",
      email: "placeholder@university.edu",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="relative h-[300px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758873271761-6cfe9b4f000c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc2MjI4NjI1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Research team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <Users className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl text-white">Meet Our Team</h1>
            <p className="text-xl text-white/90 mt-4">
              Dedicated researchers advancing environmental science
            </p>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{member.description}</p>
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {member.email}
              </a>
            </Card>
          ))}
        </div>

        {/* Collaboration Section */}
        <div className="mt-16 bg-primary/5 rounded-lg p-8 md:p-12 border border-border">
          <h2 className="text-3xl text-center mb-6">Join Our Research</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8">
            We are recruiting! If you are interested in pursuing a Ph.D. in Earth System Sciences
            studying impacts of urbanization on forest ecosystem processes, please contact Dr. Joy
            Winbourne by email with a copy of your CV and a description of your research interests
            to start a conversation.
          </p>
          <div className="text-center">
            <a
              href="mailto:joy_winbourne@uml.edu"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2025 Prof. Joy Winbourne Environmental Research Lab. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
