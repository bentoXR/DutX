import React, { useState } from "react";
import { Task } from "../types";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  TrendingUp,
  CalendarDays,
  Plus,
  Check
} from "lucide-react";
import { motion } from "motion/react";

interface CalendarScreenProps {
  tasks: Task[];
  onChangeTab: (tab: string) => void;
  activeTab: string;
  onAddTaskClick: () => void;
  onToggleTask: (id: string) => void;
}

export default function CalendarScreen({
  tasks,
  onChangeTab,
  activeTab,
  onAddTaskClick,
  onToggleTask
}: CalendarScreenProps) {
  // Mock current date as June 3, 2026 to synchronize perfectly with additional metadata
  const [selectedDay, setSelectedDay] = useState(3);

  const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
  
  // June 2026 starts on a Monday (1st is Monday).
  // Total days = 30
  const daysInJune = Array.from({ length: 30 }, (_, i) => i + 1);

  // Helper to relate task categories or presence to days
  const getTasksForDay = (day: number): Task[] => {
    const matched = tasks.filter((task) => {
      if (task.date === "Hoje" && day === 3) return true;
      if (task.date === "Amanhã" && day === 4) return true;
      if (task.date === "Próxima Segunda" && day === 8) return true;
      
      const match = task.date.match(/Dia\s+(\d+)/i) || task.date.match(/(\d+)/);
      if (match) {
        const parsedDay = parseInt(match[1], 10);
        return parsedDay === day;
      }
      return false;
    });

    // Fallback: If 4 is selected, also inject the mock task if no other tasks exist
    if (day === 4 && matched.length === 0) {
      return [
        {
          id: "simulated-1",
          title: "Reunião de Alinhamento Semanal",
          category: "Trabalho",
          date: "Amanhã",
          alarm: "09:00",
          notes: "Apresentar resultados do trimestre",
          repeat: "Semanalmente",
          completed: false,
          time: "09:30"
        }
      ];
    }
    return matched;
  };

  const selectedDayTasks = getTasksForDay(selectedDay);

  return (
    <div className="relative w-full h-full flex-1 bg-background text-on-surface flex flex-col overflow-hidden font-sans">
      {/* Top Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-md z-30 px-4 py-4 border-b border-surface-container/50 text-left">
        <h1 className="text-xl font-bold text-primary-container">Calendário</h1>
        <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
          <CalendarIcon className="w-3.5 h-3.5 text-primary-container" />
          Agenda para Junho de 2026
        </p>
      </header>

      {/* Main Canvas */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-4 max-w-sm mx-auto w-full pt-4 space-y-6 pb-28">
        
        {/* Month Selector Cards */}
        <div className="bg-surface-container p-4 rounded-2xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-bold text-on-surface font-display uppercase tracking-widest text-primary-container">
              Junho 2026
            </h3>
            <div className="flex gap-2 text-on-surface-variant">
              <button disabled className="p-1 hover:bg-surface-container-high rounded-full opacity-40">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button disabled className="p-1 hover:bg-surface-container-high rounded-full opacity-40">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid of days */}
          <div>
            {/* Weekdays header */}
            <div className="grid grid-cols-7 gap-1 text-[10px] font-bold text-neutral-500 uppercase pb-2 text-center">
              {daysOfWeek.map((day) => (
                <div key={day}>{day[0]}</div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {daysInJune.map((day) => {
                const isSelected = selectedDay === day;
                const hasTasks = getTasksForDay(day).length > 0;
                
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`h-9 w-9 rounded-full flex flex-col items-center justify-center relative cursor-pointer font-semibold text-xs border transition-all ${
                      isSelected
                        ? "bg-primary-container border-primary-container text-on-primary-container shadow-md"
                        : "bg-surface-container border-outline-variant/5 text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    <span>{day}</span>
                    {hasTasks && (
                      <span
                        className={`absolute bottom-1 w-1 h-1 rounded-full ${
                          isSelected ? "bg-white" : "bg-primary-container"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Day Agenda Header */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-left">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest pl-1">
              Agenda para {selectedDay} de Junho
            </h3>
            <span className="text-[10px] font-bold text-neutral-500 font-display">
              {selectedDayTasks.length} {selectedDayTasks.length === 1 ? "Evento" : "Eventos"}
            </span>
          </div>

          <div className="space-y-3">
            {selectedDayTasks.length > 0 ? (
              selectedDayTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl flex items-center gap-4 bg-surface-container border border-white/5 text-left ${
                    task.completed ? "opacity-60" : ""
                  }`}
                >
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center cursor-pointer ${
                      task.completed
                        ? "bg-primary-container border-primary-container"
                        : "border-outline hover:border-primary-container"
                    }`}
                  >
                    {task.completed && (
                      <Check className="w-3 h-3 text-on-primary-container stroke-[3]" />
                    )}
                  </button>

                  <div className="flex-1">
                    <p className={`text-xs font-semibold ${task.completed ? "line-through text-neutral-500" : "text-on-surface"}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {task.time && (
                        <span className="text-[10px] font-semibold text-neutral-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.time}
                        </span>
                      )}
                      <span className="bg-surface-container-highest text-on-surface-variant text-[8px] font-bold uppercase py-0.5 px-2 rounded-full">
                        {task.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-surface-container rounded-2xl border border-white/5">
                <p className="text-xs text-neutral-500 font-medium">Não há tarefas agendadas para este dia.</p>
                <button
                  onClick={onAddTaskClick}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary-container font-bold hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agendar Tarefa</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </main>

      {/* Bottom Global Tablet Navigation menu */}
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
