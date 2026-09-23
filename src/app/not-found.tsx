import React from "react";
import Link from "next/link";
import { Wind, ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 pt-24">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-purple-950/80 border border-purple-800 text-purple-400 flex items-center justify-center mx-auto shadow-2xl">
          <Wind className="w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block">
            Error 404
          </span>
          <h1 className="text-4xl font-extrabold font-heading text-white">Airflow Lost.</h1>
          <p className="text-base text-slate-400">
            The page you&apos;re looking for could not be found or has moved to a new route.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            href="/"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            Back Home
          </Button>

          <Button
            variant="outline"
            size="md"
            href="/products"
            icon={<ArrowRight className="w-4 h-4 text-purple-400" />}
            className="bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
          >
            Explore Products
          </Button>
        </div>
      </div>
    </div>
  );
}
