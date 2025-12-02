import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card } from "./ui/card";
import { useSelector, useDispatch } from 'react-redux';
import messages_en from "../app/locales/en.json";
import messages_es from "../app/locales/es.json";
import { IntlProvider, FormattedMessage } from "react-intl";
import {features_en} from "../app/features";
import {features_es} from "../app/features-es";



// adjust the path below based on where HomePage file is located
import sensorLocal from "../assets/images/eli-alexander-qhuAQ_m0_yU-unsplash.jpg";

export function HomePage() {

  const locale = useSelector(state => state.locale.value)
  const dispatch = useDispatch()

  let features = locale === "es" ? features_es : features_en;

  const messages = {
    en: messages_en,
    es: messages_es
  }

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
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
                <FormattedMessage id="Environmental Sensor Network" />
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-6">
                <FormattedMessage id="Advancing our understanding of forest ecosystems through real-time environmental
              monitoring" />
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl text-foreground mb-6"><FormattedMessage id="About the Project" /></h2>
              <p className="text-muted-foreground mb-4">
                <FormattedMessage id="Environmental Sensor Network" />
                <FormattedMessage id="about-project-1" />
              </p>
              <p className="text-muted-foreground mb-4">
                <FormattedMessage id="about-project-2" />
              </p>
              <p className="text-muted-foreground">
                <FormattedMessage id="about-project-3" />
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <ImageWithFallback
                src="/src/images/joy_winbourne.png"
                alt="Environmental sensors in the field"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl text-center mb-12"><FormattedMessage id="What We Monitor" /></h2>
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
            <h2 className="text-3xl text-center mb-6"><FormattedMessage id="Our Mission" /></h2>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto">
              <FormattedMessage id="our-mission-1" />
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground mt-16 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm">
              <FormattedMessage id="disclaimer" />
            </p>
          </div>
        </footer>
      </div>
    </IntlProvider>
  );
}
