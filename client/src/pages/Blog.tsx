import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { usePosts } from "@/hooks/use-posts";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Blog() {
  const { data: posts, isLoading } = usePosts();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="pt-40 pb-20 bg-accent/10">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display mb-6 text-foreground"
          >
            Home Stories
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tales from Hoi An, operating insights, and the people we meet.
          </p>
        </div>
      </section>

      <Section>
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-80 bg-secondary animate-pulse rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {posts?.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="aspect-[3/2] rounded-xl overflow-hidden mb-6 bg-secondary relative">
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md text-primary z-10">
                    {post.category}
                  </div>
                  <img 
                    src={post.imageUrl || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop"} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                    <span>{post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : 'Recently'}</span>
                    <span>•</span>
                    <span>{post.author || 'INN Team'}</span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {post.content.substring(0, 150)}...
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <Link href={`/blog/${post.slug}`} className="text-primary font-medium border-b border-primary/30 hover:border-primary pb-0.5 transition-colors">
                    Read Story
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </Section>

      <Footer />
    </div>
  );
}
