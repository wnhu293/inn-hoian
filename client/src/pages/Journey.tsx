import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { useProjects } from "@/hooks/use-projects";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Journey() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="pt-40 pb-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display mb-6 text-foreground"
          >
            Our Journey
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of homes we've nurtured, designed, and opened to travelers from around the world.
          </p>
        </div>
      </section>

      {/* Projects List */}
      <Section>
        {isLoading ? (
          <div className="space-y-24">
            {[1, 2].map(i => (
              <div key={i} className="h-96 bg-secondary/30 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-32">
            {projects?.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Side */}
                <div className={`relative ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={project.images?.[0] || "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop"} 
                      alt={project.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl hidden md:block max-w-xs">
                    <p className="font-display italic text-lg text-primary">"{project.slogan}"</p>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {project.type}
                    </span>
                    {project.isFeatured && (
                      <span className="text-amber-500 text-xs font-bold uppercase tracking-wider flex items-center">
                        Featured Stay
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-display mb-6 text-foreground">
                    {project.name}
                  </h2>
                  
                  <div className="prose text-muted-foreground mb-8">
                    <p>{project.description}</p>
                  </div>

                  {project.tags && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-sm text-foreground/60 bg-secondary px-3 py-1 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    {project.airbnbUrl && (
                      <a href={project.airbnbUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white">
                          Book Now <ExternalLink size={16} className="ml-2" />
                        </Button>
                      </a>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full border-2">
                          <Info size={20} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View house rules and details on Airbnb</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Section>

      {/* Long Term Stay Policy */}
      <Section className="bg-white border-y border-border">
        <SectionHeader title="Stay Longer, Save More" subtitle="Long-Term Stays" centered />
        
        <div className="max-w-4xl mx-auto bg-background rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <p className="text-lg text-muted-foreground mb-8">
              We encourage slow travel. Immerse yourself in the local rhythm of Hoi An with our extended stay discounts.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="p-6">
                <div className="text-4xl font-display text-primary mb-2">-10%</div>
                <div className="font-bold text-foreground">1 Week Stay</div>
                <div className="text-sm text-muted-foreground mt-2">Perfect for a short getaway</div>
              </div>
              <div className="p-6 bg-secondary/30">
                <div className="text-4xl font-display text-primary mb-2">-50%</div>
                <div className="font-bold text-foreground">1 Month Stay</div>
                <div className="text-sm text-muted-foreground mt-2">Live like a local</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-display text-primary mb-2">-55%</div>
                <div className="font-bold text-foreground">2+ Months</div>
                <div className="text-sm text-muted-foreground mt-2">Your second home</div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border flex justify-center items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Discounts are automatically applied when booking dates are selected.</span>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
