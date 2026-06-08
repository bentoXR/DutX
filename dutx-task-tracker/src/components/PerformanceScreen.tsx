import React, { useState } from "react";
import { Task } from "../types";
import {
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  ChevronRight,
  TrendingDown,
  Sparkles,
  ClipboardList,
  CalendarDays
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PerformanceScreenProps {
  tasks: Task[];
  onChangeTab: (tab: string) => void;
  activeTab: string;
}

interface ChartPoint {
  day: string;
  concluidas: number;
  label: string;
}

export default function PerformanceScreen({
  tasks,
  onChangeTab,
  activeTab
}: PerformanceScreenProps) {
  const [timeRange, setTimeRange] = useState<"week" | "month">("week");
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);

  // Dynamic status indicators calculated from real state
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;

  // Preloaded statistics matching the picture layout. We'll combine with dynamic values
  const totalHistoricallyCompleted = 42 + completedCount;
  const totalHistoricallyPending = 8 + pendingCount;

  // Custom static representation for the week points matching the SVG line chart
  const weeklyData: ChartPoint[] = [
    { day: "SEG", concluidas: 4, label: "Segunda-feira" },
    { day: "TER", concluidas: 3, label: "Terça-feira" },
    { day: "QUA", concluidas: 6, label: "Quarta-feira" },
    { day: "QUI", concluidas: 5, label: "Quinta-feira" },
    { day: "SEX", concluidas: 8, label: "Sexta-feira" },
    { day: "SAB", concluidas: 7, label: "Sábado" },
    { day: "DOM", concluidas: 9, label: "Domingo" }
  ];

  const monthlyData: ChartPoint[] = [
    { day: "W1", concluidas: 24, label: "Semana 1" },
    { day: "W2", concluidas: 32, label: "Semana 2" },
    { day: "W3", concluidas: 28, label: "Semana 3" },
    { day: "W4", concluidas: 41, label: "Semana 4" }
  ];

  const activeData = timeRange === "week" ? weeklyData : monthlyData;

  // Render SVG charts based on dataset sizes
  const svgWidth = 500;
  const svgHeight = 150;
  const maxY = timeRange === "week" ? 10 : 50;

  // Generate SVG coordinate points
  const points = activeData.map((item, index) => {
    const x = (index / (activeData.length - 1)) * (svgWidth - 60) + 30;
    const y = svgHeight - (item.concluidas / maxY) * (svgHeight - 40) - 20;
    return { ...item, x, y };
  });

  // Polyline pathway string
  const pathData = points.map((p) => `${p.x},${p.y}`).join(" L");

  return (
    <div className="relative w-full h-full flex-1 bg-background text-on-surface flex flex-col overflow-hidden font-sans">
      {/* Top bar header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-md z-30 px-4 py-4 border-b border-surface-container/50 text-left">
        <h1 className="text-xl font-bold text-primary-container">Desempenho</h1>
        <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
          <Sparkles className="w-3.5 h-3.5 text-primary-container" />
          Análise em tempo real de suas metas
        </p>
      </header>

      {/* Primary Scroll Canvas */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-4 max-w-sm mx-auto w-full pt-4 space-y-6 pb-28">
        
        {/* Dynamic Card Row columns */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Concluidas Card */}
          <div className="bg-surface-container border-l-4 border-primary-container p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div className="text-left">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-0.5">
                Concluídas
              </p>
              <h2 className="text-2xl font-bold text-primary-container">
                {totalHistoricallyCompleted.toString().padStart(2, "0")}
              </h2>
            </div>
            <div className="bg-primary-container/10 p-2.5 rounded-full text-primary-container">
              <CheckCircle className="w-5 h-5 fill-primary-container/20" />
            </div>
          </div>

          {/* Pendente Card */}
          <div className="bg-surface-container border-l-4 border-tertiary p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div className="text-left">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-0.5">
                Pendente
              </p>
              <h2 className="text-2xl font-bold text-tertiary">
                {totalHistoricallyPending.toString().padStart(2, "0")}
              </h2>
            </div>
            <div className="bg-tertiary/10 p-2.5 rounded-full text-tertiary">
              <Clock className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Chart Card */}
        <div className="bg-surface-container p-5 rounded-2xl border border-white/5 space-y-6">
          <div className="flex justify-between items-center text-left">
            <div>
              <h3 className="text-sm font-bold text-on-surface">Histórico {timeRange === "week" ? "Semanal" : "Mensal"}</h3>
              <p className="text-[11px] text-neutral-500">
                {timeRange === "week"
                  ? "Progresso diário de 14 a 20 de Outubro"
                  : "Acumulado das últimas 4 semanas"}
              </p>
            </div>
            {/* Toggle state controller */}
            <div className="flex bg-surface-container-low p-1 rounded-full border border-white/5">
              <button
                onClick={() => {
                  setTimeRange("week");
                  setHoveredPoint(null);
                }}
                className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${
                  timeRange === "week"
                    ? "bg-primary-container text-white"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => {
                  setTimeRange("month");
                  setHoveredPoint(null);
                }}
                className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${
                  timeRange === "month"
                    ? "bg-primary-container text-white"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Mês
              </button>
            </div>
          </div>

          {/* Visualization area */}
          <div className="relative bg-surface-container-lowest/40 rounded-xl border border-outline-variant/15 p-2 h-44 flex flex-col justify-between overflow-hidden">
            
            {/* Chart SVG Canvas */}
            <svg
              className="w-full h-full"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="none"
            >
              {/* Gridlines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                const y = ratio * (svgHeight - 40) + 20;
                return (
                  <line
                    key={idx}
                    x1="20"
                    y1={y}
                    x2={svgWidth - 20}
                    y2={y}
                    stroke="rgba(241, 219, 255, 0.04)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* Glowing backup glow line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
                d={`M ${pathData}`}
                fill="none"
                stroke="#ff653f"
                strokeWidth="6"
                strokeOpacity="0.12"
                filter="blur(4px)"
              />

              {/* Main Line graph */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
                d={`M ${pathData}`}
                fill="none"
                stroke="#ff653f"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interaction points */}
              {points.map((p, idx) => (
                <g key={idx}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="8"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(p)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill={hoveredPoint?.day === p.day ? "#ffffff" : "#ff653f"}
                    stroke="#ff653f"
                    strokeWidth={hoveredPoint?.day === p.day ? "3.5" : "1.5"}
                    className="pointer-events-none transition-all duration-200"
                  />
                </g>
              ))}
            </svg>

            {/* X-axis indicators */}
            <div className="flex justify-between px-6 text-[10px] font-bold text-on-surface-variant/60 font-display">
              {activeData.map((d, index) => (
                <span key={index} className="w-10 text-center">{d.day}</span>
              ))}
            </div>

            {/* Hover tooltip overlay overlay */}
            <AnimatePresence>
              {hoveredPoint && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-2 left-1/2 -translate-x-1/2 bg-surface-container-high border border-primary-container/30 px-3 py-1.5 rounded-xl shadow-premium text-center z-10 pointer-events-none text-left"
                >
                  <p className="text-[10px] font-bold text-primary">{hoveredPoint.label}</p>
                  <p className="text-xs font-semibold text-on-surface">
                    {hoveredPoint.concluidas} tarefas concluídas
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Quick Stats Grid elements */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="bg-surface-container-low p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-semibold text-neutral-500 block">Média/Dia</span>
              <span className="text-lg font-bold text-on-surface mt-0.5 block">6.4</span>
            </div>
            <div className="bg-surface-container-low p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-semibold text-neutral-500 block">Pico Diário</span>
              <span className="text-lg font-bold text-on-surface mt-0.5 block">12</span>
            </div>
            <div className="bg-surface-container-low p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-semibold text-neutral-500 block">Consistência</span>
              <span className="text-lg font-bold text-tertiary mt-0.5 block">92%</span>
            </div>
            <div className="bg-surface-container-low p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-semibold text-neutral-500 block">Status Geral</span>
              <span className="text-lg font-bold text-primary-container mt-0.5 block">Excelente</span>
            </div>
          </div>

        </div>

        {/* Personalized insights section */}
        <section className="bg-surface-container p-5 rounded-2xl border border-white/5 text-leftspace-y-4">
          <div className="flex items-center gap-2 mb-3 text-left">
            <Award className="w-5 h-5 text-tertiary" />
            <h3 className="text-sm font-bold text-on-surface">Conselhos de Foco</h3>
          </div>
          
          <div className="space-y-3 text-xs text-on-surface-variant text-left leading-relaxed">
            <div className="flex gap-2.5 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1.5 flex-shrink-0" />
              <p>
                As suas maiores taxas de produtividade são registradas na categoria <strong className="text-on-surface">Estudo</strong>. Você costuma finalizar essas tarefas 20% mais rápido!
              </p>
            </div>
            <div className="flex gap-2.5 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-tertiary mt-1.5 flex-shrink-0" />
              <p>
                Os treinos físicos têm uma consistência excelente quando agendados antes das <strong className="text-on-surface">18:00</strong>.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Bottom Global Navigation menu */}
      <nav className="absolute bottom-0 left-0 right-0 w-full flex justify-between items-center h-20 pb-safe bg-surface-container border-t border-surface-container-high/30 z-40 rounded-t-2xl shadow-premium">
        <button
          onClick={() => onChangeTab("tasks")}
          className={`flex-1 h-full flex flex-col items-center justify-center transition-all ${
            activeTab === "tasks" ? "text-primary-container font-bold" : "text-neutral-500"
          }`}
        >
          <ClipboardList className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-wider uppercase font-semibold">Tasks</span>
        </button>

        <button
          onClick={() => onChangeTab("calendar")}
          className={`flex-1 h-full flex flex-col items-center justify-center transition-all ${
            activeTab === "calendar" ? "text-primary-container font-bold" : "text-neutral-500"
          }`}
        >
          <CalendarDays className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-wider uppercase font-semibold">Calendar</span>
        </button>

        <button
          onClick={() => onChangeTab("performance")}
          className={`flex-1 h-full flex flex-col items-center justify-center transition-all ${
            activeTab === "performance" ? "text-primary-container font-bold" : "text-neutral-500"
          }`}
        >
          <TrendingUp className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-wider uppercase font-semibold">Performance</span>
        </button>
      </nav>
    </div>
  );
}
