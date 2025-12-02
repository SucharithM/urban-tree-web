import { BookOpen, FileText, Microscope, Award } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { IntlProvider, FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from 'react-redux';
import messages_en from "../app/locales/en.json";
import messages_es from "../app/locales/es.json";

import { publications_en, projects_en, publications_es, projects_es, presentations_en, presentations_es } from "../app/publications"

export function ResearchPage() {

  const locale = useSelector(state => state.locale.value)
  const dispatch = useDispatch()

  let publications = locale === "es" ? publications_es : publications_en;
  let projects = locale === "es" ? projects_es : projects_en;
  let presentations = locale === "es" ? presentations_es : presentations_en;

  const messages = {
    en: messages_en,
    es: messages_es
  }

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Microscope className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl mb-4"><FormattedMessage id="Research & Publications" /></h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            <FormattedMessage id="Exploring the frontiers of forest ecology and environmental monitoring" />
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Current Projects */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-primary" />
            <h2 className="text-3xl"><FormattedMessage id="Current Projects" /></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="p-6 border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-accent text-accent-foreground">{project.status}</Badge>
                </div>
                <h3 className="text-foreground mb-3">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary hover:underline transition-colors"
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground"><FormattedMessage id="Funding:" /></span>
                    <span className="text-foreground">{project.funding}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground"><FormattedMessage id="Duration:" /></span>
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
            <h2 className="text-3xl"><FormattedMessage id="Recent Publications" /></h2>
          </div>
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <Card key={index} className="p-6 border-border hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground mb-2">
                      <a 
                        href={pub.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary hover:underline transition-colors"
                      >
                        {pub.title}
                      </a>
                    </h3>
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
            <h2 className="text-3xl"><FormattedMessage id="Conference Presentations" /></h2>
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
          <h2 className="text-3xl text-center mb-8"><FormattedMessage id="Research Focus Areas" /></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌳</span>
              </div>
              <h3 className="text-foreground mb-2"><FormattedMessage id="Forest Ecology" /></h3>
              <p className="text-sm text-muted-foreground">
                <FormattedMessage id="Ecosystem structure, function, and dynamics" />
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌡️</span>
              </div>
              <h3 className="text-foreground mb-2"><FormattedMessage id="Climate Science" /></h3>
              <p className="text-sm text-muted-foreground"><FormattedMessage id="Climate change impacts and adaptation" /></p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💨</span>
              </div>
              <h3 className="text-foreground mb-2"><FormattedMessage id="Carbon Cycling" /></h3>
              <p className="text-sm text-muted-foreground"><FormattedMessage id="CO2 exchange and carbon sequestration" /></p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📡</span>
              </div>
              <h3 className="text-foreground mb-2"><FormattedMessage id="Sensor Technology" /></h3>
              <p className="text-sm text-muted-foreground"><FormattedMessage id="Environmental monitoring systems" /></p>
            </div>
          </div>
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
