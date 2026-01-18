import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProjectBySlug(req.params.slug);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  // Services
  app.get(api.services.list.path, async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  // Posts
  app.get(api.posts.list.path, async (req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Database
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    // Projects
    await storage.createProject({
      name: "Camf",
      slug: "camf",
      slogan: "A second home in the heart of Hoi An",
      description: "Located amidst the An Mỹ rice fields, Camf offers a serene escape with rustic charm and modern comforts. Perfect for those seeking tranquility.",
      airbnbUrl: "https://airbnb.com",
      isFeatured: true,
      tags: ["Rice Fields", "Rustic", "Peaceful"],
      images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2940&auto=format&fit=crop"],
      type: "homestay"
    });

    await storage.createProject({
      name: "Dù Dẻ",
      slug: "du-de",
      slogan: "Cozy, rustic, and peaceful",
      description: "A place for family bonding, where simplicity meets warmth. Experience the authentic local lifestyle.",
      airbnbUrl: "https://airbnb.com",
      isFeatured: true,
      tags: ["Family", "Cozy", "Authentic"],
      images: ["https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2787&auto=format&fit=crop"],
      type: "homestay"
    });

    await storage.createProject({
      name: "Tươi",
      slug: "tuoi",
      slogan: "A place to breathe deeply",
      description: "Cast aside all worries and immerse yourself in nature. Tươi is designed to rejuvenate your spirit.",
      airbnbUrl: "https://airbnb.com",
      isFeatured: true,
      tags: ["Nature", "Rejuvenation", "Wellness"],
      images: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2940&auto=format&fit=crop"],
      type: "homestay"
    });

    // Services
    await storage.createService({
      title: "Management & Operations",
      description: "Comprehensive homestay management ensuring smooth operations and high guest satisfaction.",
      icon: "settings"
    });

    await storage.createService({
      title: "Business Consulting",
      description: "Expert advice on homestay business models, pricing strategies, and market positioning.",
      icon: "briefcase"
    });

    await storage.createService({
      title: "Renovation",
      description: "Transforming spaces into soulful homes with our design and renovation services.",
      icon: "hammer"
    });

    // Blog Posts
    await storage.createPost({
      title: "Awakening the Soul of a Home",
      slug: "awakening-soul",
      content: "At INN HoiAn, we believe that every house has a soul waiting to be awakened. Our journey begins with understanding the history and the potential of each space...",
      category: "Operating Stories",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2938&auto=format&fit=crop",
      author: "INN Team"
    });

    await storage.createPost({
      title: "The Story of Tươi",
      slug: "story-of-tuoi",
      content: "Tươi was born from a desire to create a sanctuary. We found an old house covered in vines and saw its potential...",
      category: "People & Stories",
      imageUrl: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2880&auto=format&fit=crop",
      author: "Founder"
    });
  }
}
