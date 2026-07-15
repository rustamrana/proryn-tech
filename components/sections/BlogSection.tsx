'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import BlogCard from '@/components/common/BlogCard';
import { blogPosts } from '@/lib/data/blog-posts';

const featuredPosts = blogPosts.slice(0, 3);

export default function BlogSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Insights & Articles"
          heading="From Our Knowledge Base"
          subheading="Stay ahead of the curve with expert insights on enterprise technology, digital transformation, AI, and software engineering best practices."
          align="center"
        />

        {/* Blog posts grid — 3 cols on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard
                slug={post.slug}
                category={post.category}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={post.date}
                readTime={post.readTime}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>

        {/* View All Articles CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-secondary px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
