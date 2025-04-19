import React from "react";
import Link from "next/link";
import Image from "next/image";
import { photos, posts } from "@/data/beyondCode";
import { formatDate } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ImageIcon, ReaderIcon, ArrowLeftIcon } from "@radix-ui/react-icons";

export default function BeyondPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <section className="py-20 pt-32">
          <div className="container">
            <div className="mb-12">
              <Link href="/" className="inline-flex items-center text-sm hover:text-primary transition-colors mb-8">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Beyond Code</h1>
              <p className="text-lg max-w-2xl">
                Welcome to my creative space. Here, I share my photography and thoughts through my blog.
              </p>
            </div>
          </div>
        </section>

        {/* Photography Section */}
        <section id="photography" className="py-16">
          <div className="container">
            <div className="flex items-center mb-12">
              <ImageIcon className="h-6 w-6 mr-3 text-primary" />
              <h2 className="text-3xl font-bold">Photography</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-16 bg-card/30">
          <div className="container">
            <div className="flex items-center mb-12">
              <ReaderIcon className="h-6 w-6 mr-3 text-primary" />
              <h2 className="text-3xl font-bold">Blog</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <Card key={index} className="flex flex-col h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription>{formatDate(post.date)}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm opacity-90 line-clamp-3 mb-4">
                      {post.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/beyond/blog/${post.slug}`}
                      className="text-primary hover:underline text-sm font-medium inline-flex items-center"
                    >
                      Read more
                      <span className="ml-1">→</span>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
} 