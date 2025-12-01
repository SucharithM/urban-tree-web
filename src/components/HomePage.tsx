import { Droplets, Wind, Thermometer, Sun } from "lucide-react";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card } from "./ui/card";

// adjust the path below based on where HomePage file is located
import sensorLocal from "../assets/images/eli-alexander-qhuAQ_m0_yU-unsplash.jpg";

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
              Terrestrial Biogeochemistry Group at UML
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6">
              The Terrestrial Biogeochemistry Group investigates how plants and soils regulate the
              movement of carbon, nutrients, and water in terrestrial ecosystems under a variety of
              human perturbations.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl text-center mb-12">Key Research Areas</h2>
        {/* Item 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-3xl md:text-4xl text-foreground mb-6">
              Can trees help cities adapt to extreme heat events?
            </h3>
            <p className="text-muted-foreground mb-4">
              Urbanization results in cities having warmer temperatures than surrounding areas
              (i.e., urban heat island effect) which is anticipated to worsen as climate change
              progresses. A commonly proposed nature based solution to extreme heat is to increase
              urban canopy cover. Trees can help cities adapt to extreme heat by moving water from
              the ground to the atmosphere where it evaporates (or transpires) and creates a cooling
              latent heat fluxes that can reduce local temperatures. There are few studies, however,
              that quantify the response of tree transpiration to unique and heterogenous growth
              conditions trees experience in urban areas and how these growth conditions influence
              the response of urban trees to extreme temperatures (Winbourne et al. 2020). Using
              ground-based measurements of transpiration (e.g., sap flux sensors) with novel sensor
              design (Jones et al. 2020 Ecospheres) we are testing how tree transpiration responses
              to urbanization and extreme temperatures among tree species known to vary in their
              water use strategies. To learn more click here to hear Winbourne discuss "Hot Days and
              Tree Transpiration" with Bioscience Talks podcast and click here to read more about
              Winbourne's research on UML campus.
            </p>
          </div>

          <div className="h-[400px] rounded-lg shadow-lg overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1730815048563-3c121b1e3544?q=80&w=1080"
              alt="Forest canopy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Item 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-3xl md:text-4xl text-foreground mb-6">
              What are the spatial and temporal trends in biogenic carbon dioxide fluxes in urban
              areas?
            </h3>
            <p className="text-muted-foreground mb-4">
              Cities are responsible for ~70% of global anthropogenic carbon emissions and are where
              the majority of humans live on earth. Across the globe, cities are taking the lead on
              climate change action, making pledges to decarbonize their societies. Accurate
              measurements of carbon emissions in cities is necessary to guide policy decisions and
              monitor their efficacy. Historically urban areas have been considered concrete jungles
              with the influence of biology (plants and soils) on carbon fluxes being assumed as
              known, neutral or negligible. This has introduced biases of unknown magnitude into the
              measurement and modeling of carbon emissions in cities. Urbanization creates a suite
              of novel ecosystem conditions that can have important but poorly constrained impacts
              on ecosystem carbon balance (Winbourne et al. 2022). In the Winbourne lab we use
              empirical and modeling studies to investigate when, where, and how plants and soils
              influence urban carbon fluxes.
            </p>
          </div>

          <div className="h-[400px] rounded-lg shadow-lg overflow-hidden">
            <ImageWithFallback
              src={sensorLocal}
              alt="Urban environmental sensors"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Item 3 */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-3xl md:text-4xl text-foreground mb-6">
              What regulates the availability of nitrogen in temperate and tropical forests?
            </h3>
            <p className="text-muted-foreground">
              Despite bathing in an atmosphere of nitrogen, this element remains one of the most
              common limiting nutrients to the growth of terrestrial plants. In the absences of
              anthropogenic fertilizers (or Haber-Bosch process) and lightening, only a select group
              of bacteria are able to convert the inert di-nitrogen in the atmosphere into inorganic
              forms of nitrogen essential to life on earth. Some plants have evolved symbiotic
              relationships with nitrogen fixing bacteria (such as plants in legume family)
              providing them a potential advantage when nitrogen is in short supply. Research in the
              Winbourne lab examines the drivers regulating the activity of biological nitrogen
              fixation in temperate and tropical forests by bacteria living in the soil or in
              symbiotic relationships with plants. Past research projects have examined the
              contribution of nitrogen from legumes during secondary tropical forest succession
              (Winbourne et al. 2018) and how we can improve our empirical estimates of this process
              (Winbourne et al. 2018).
            </p>
          </div>

          <div className="h-[400px] rounded-lg shadow-lg overflow-hidden">
            <ImageWithFallback
              src="src/assets/images/jeremy-bishop-EwKXn5CapA4-unsplash.jpg"
              alt="Nitrogen cycling forest"
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
                {" "}
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
            {" "}
            To advance scientific understanding of The Terrestrial Biogeochemistry Group
            investigates how plants and soils regulate the movement of carbon, nutrients, and water
            in terrestrial ecosystems under a variety of human perturbations. The group is located
            at University of Massachusetts Lowell in the Department of Environmental, Earth, and
            Atmospheric Sciences and is lead by Dr. Joy Winbourne.
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
