import React from "react";
import { Flame, Sliders, Zap, Wrench, Headset } from "lucide-react";

export default function CapabilityStrip() {
  const capabilities = [
    {
      name: "Fire Safety",
      detail: "Tested for high risk zones",
      icon: Flame,
    },
    {
      name: "Airflow Control",
      detail: "Self-balancing precision",
      icon: Sliders,
    },
    {
      name: "Energy Efficiency",
      detail: "Reduced fan operating power",
      icon: Zap,
    },
    {
      name: "Easy Installation",
      detail: "Tool-less duct mounting",
      icon: Wrench,
    },
    {
      name: "Technical Support",
      detail: "Sizing & project guidance",
      icon: Headset,
    },
  ];

  return (
    <section className="bg-slate-900 border-y border-slate-800 text-white py-6 relative z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 items-center">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.name}
                className="flex items-center gap-3.5 group p-2 rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-950/80 border border-sky-800/60 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-sky-500 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                    {cap.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-none mt-1">{cap.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
