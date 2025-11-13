import { Droplets, Wind, Thermometer, Sun } from "lucide-react";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card } from "./ui/card";

export function HomePage() {
  const features = [
    {
      icon: Thermometer,
      title: "Temperature Monitoring",
      description: "Real-time temperature data collection across multiple field sites",
    },
    {
      icon: Droplets,
      title: "Soil Moisture Analysis",
      description: "Continuous monitoring of soil water content and availability",
    },
    {
      icon: Wind,
      title: "Atmospheric Measurements",
      description: "CO2 flux and atmospheric composition tracking",
    },
    {
      icon: Sun,
      title: "Solar Radiation",
      description: "Photosynthetically active radiation and light intensity data",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1730815048563-3c121b1e3544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYW5vcHklMjB0cmVlc3xlbnwxfHx8fDE3NjIyNDY4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Forest canopy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/80" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Environmental Sensor Network
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6">
              Advancing our understanding of forest ecosystems through real-time environmental monitoring
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl text-foreground mb-6">About the Project</h2>
            <p className="text-muted-foreground mb-4">
              Our research focuses on understanding the complex interactions between forest ecosystems 
              and the atmosphere. Through a comprehensive network of environmental sensors, we collect 
              continuous data on temperature, humidity, soil moisture, CO2 exchange, and other critical 
              environmental parameters.
            </p>
            <p className="text-muted-foreground mb-4">
              This project combines cutting-edge sensor technology with ecological research to provide 
              insights into how forests respond to changing environmental conditions. Our data helps 
              inform conservation strategies and contributes to our understanding of the global carbon cycle.
            </p>
            <p className="text-muted-foreground">
              The sensor network operates year-round, capturing seasonal variations and long-term trends 
              that are essential for climate science and forest ecology research.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1760307837545-894d6a26ea7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwc2Vuc29yJTIwZmllbGR8ZW58MXx8fHwxNzYyMjg2MjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Environmental sensors in the field"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl text-center mb-12">What We Monitor</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-border">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-primary/5 rounded-lg p-8 md:p-12 border border-border">
          <h2 className="text-3xl text-center mb-6">Our Mission</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            To advance scientific understanding of forest-atmosphere interactions through innovative 
            sensor technology and rigorous data collection, contributing to evidence-based environmental 
            policy and conservation efforts. We are committed to open science and making our data 
            accessible to researchers, educators, and the public.
          </p>
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
