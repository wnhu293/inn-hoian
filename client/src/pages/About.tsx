import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-40 pb-20 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display mb-6 text-foreground"
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Awakening the soul of a home through design, care, and hospitality.
          </motion.p>
        </div>
      </section>

      {/* Philosophy */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
             {/* cozy warm atmosphere coffee */}
            <img 
              src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop" 
              alt="Philosophy" 
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent/20 rounded-full -z-10 blur-3xl" />
          </div>
          <div>
            <SectionHeader title="Operating Philosophy" subtitle="Our Beliefs" />
            <div className="prose prose-lg text-muted-foreground">
              <p className="mb-6">
                At INN HoiAn, we believe that every house has a soul waiting to be awakened. It is not just about renovation or decoration; it's about listening to the history of the walls and the whisper of the space.
              </p>
              <p className="mb-6">
                Our approach blends traditional Hoi An aesthetics with modern comforts, creating spaces that feel authentically local yet perfectly suited for the contemporary traveler.
              </p>
              <p>
                We operate with heart. Every guest interaction, every neatly folded towel, and every morning coffee is an act of care. We are not just hosts; we are storytellers of the Hoi An lifestyle.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section className="bg-white">
        <SectionHeader title="The People Behind INN" subtitle="Our Team" centered />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Minh Anh", role: "Founder & Creative Director", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop" },
            { name: "Tuan Kiet", role: "Operations Manager", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop" },
            { name: "Lan Huong", role: "Guest Experience", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop" },
            { name: "Bao Nam", role: "Renovation Lead", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" },
          ].map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="aspect-[3/4] mb-4 overflow-hidden rounded-xl bg-secondary relative">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 saturate-0 group-hover:saturate-100"
                />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground">{member.name}</h3>
              <p className="text-sm text-primary uppercase tracking-wider mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
}
