import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Clock, BookOpen, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { getArticleBySlug, TECHNICAL_ARTICLES } from "@/data/articles";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TECHNICAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: "Article Not Found | Aria Vita™",
    };
  }

  const canonicalUrl = `https://www.ariavita.in/resources/${article.slug}`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: canonicalUrl,
      type: "article",
      siteName: "Aria Vita™",
      publishedTime: article.publishedDate,
    },
  };
}

export default async function TechnicalArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Resources", url: "/resources" },
    { name: article.title, url: `/resources/${article.slug}` },
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <ArticleSchema
        title={article.title}
        description={article.metaDescription}
        url={`/resources/${article.slug}`}
        publishedDate={article.publishedDate}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-slate-600 font-medium overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-purple-700 transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/resources" className="hover:text-purple-700 transition-colors shrink-0">
            Resources
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-bold text-slate-900 shrink-0 truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </div>
      </div>

      {/* Article Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-14 lg:py-18 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Published {article.publishedDate}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal pt-2">
            {article.excerpt}
          </p>
        </div>
      </section>

      {/* Article Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 lg:p-12 space-y-10">
          {article.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4 border-b border-slate-100 last:border-0 pb-8 last:pb-0">
              <h2 className="text-2xl font-bold font-heading text-slate-900 tracking-tight">
                {sec.heading}
              </h2>

              {sec.body.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                <ul className="space-y-2.5 pt-2">
                  {sec.bulletPoints.map((point, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 mt-2" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Target Product Internal Link Box */}
          {article.targetProductSlug && (
            <div className="mt-8 p-6 bg-gradient-to-r from-sky-50 via-purple-50 to-sky-50 rounded-2xl border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block mb-1">
                  Related Product Line
                </span>
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  {article.targetProductName || "Explore Product Details"}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  View complete technical specifications, size models, and application matrices.
                </p>
              </div>
              <Link
                href={`/products/${article.targetProductSlug}`}
                className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all shrink-0 inline-flex items-center gap-2 shadow-sm"
              >
                <span>View Product Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Technical Support & Enquiries */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-xs font-bold text-slate-900 block">Need Technical Sizing or Project Quotes?</span>
              <span className="text-xs text-slate-500">Contact authorized distributor Ecosta Systems in Indiranagar, Bengaluru.</span>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2 shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Engineering Team</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
