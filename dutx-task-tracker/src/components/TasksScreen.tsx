import React, { useState } from "react";
import { Task } from "../types";
import {
  Menu,
  Flame,
  Search,
  Clock,
  Plus,
  Check,
  ClipboardList,
  CalendarDays,
  TrendingUp,
  User,
  Trash2,
  CheckCircle2,
  LogOut,
  X,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TasksScreenProps {
  tasks: Task[];
  streak: number;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTaskClick: () => void;
  onEditTaskClick: (task: Task) => void;
  onChangeTab: (tab: string) => void;
  activeTab: string;
  userEmail: string;
  onLogOut: () => void;
}

export default function TasksScreen({
  tasks,
  streak,
  onToggleTask,
  onDeleteTask,
  onAddTaskClick,
  onEditTaskClick,
  onChangeTab,
  activeTab,
  userEmail,
  onLogOut
}: TasksScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tudo");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Distinct category filters available
  const categories = ["Tudo", "Saúde", "Estudo", "Trabalho", "Pessoal", "Finanças"];

  // Filter tasks based on search and category
  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      selectedCategory === "Tudo" || task.category === selectedCategory;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate dynamic weekly completion percentage
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="relative w-full h-full flex-1 bg-background text-on-surface flex flex-col overflow-hidden font-sans">
      
      {/* Sidebar / Menu flyout */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowSidebar(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-surface-container-high z-50 p-6 flex flex-col justify-between shadow-premium"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary-container">
                    dutX
                  </div>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="p-1.5 hover:bg-surface-container-highest rounded-full"
                  >
                    <X className="w-5 h-5 text-on-surface" />
                  </button>
                </div>

                <div className="pb-4 border-b border-outline-variant/30 text-left">
                  <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center font-bold text-lg mb-2">
                    {userEmail ? userEmail.slice(0, 2).toUpperCase() : "G"}
                  </div>
                  <p className="font-semibold text-sm truncate text-on-surface">
                    {userEmail === "guest@dutx.com" ? "Convidado" : userEmail}
                  </p>
                  <p className="text-[11px] text-on-surface-variant">
                    Nível de Produtividade: Consistente
                  </p>
                </div>

                <nav className="flex flex-col gap-2 text-left">
                  <button
                    onClick={() => {
                      onChangeTab("tasks");
                      setShowSidebar(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                      activeTab === "tasks"
                        ? "bg-primary-container text-on-primary-container font-semibold"
                        : "text-on-surface-variant hover:bg-surface-container-highest"
                    }`}
                  >
                    <ClipboardList className="w-5 h-5" />
                    <span>Minhas Tarefas</span>
                  </button>
                  <button
                    onClick={() => {
                      onChangeTab("performance");
                      setShowSidebar(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                      activeTab === "performance"
                        ? "bg-primary-container text-on-primary-container font-semibold"
                        : "text-on-surface-variant hover:bg-surface-container-highest"
                    }`}
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span>Desempenho</span>
                  </button>
                  <button
                    onClick={() => {
                      onChangeTab("calendar");
                      setShowSidebar(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                      activeTab === "calendar"
                        ? "bg-primary-container text-on-primary-container font-semibold"
                        : "text-on-surface-variant hover:bg-surface-container-highest"
                    }`}
                  >
                    <CalendarDays className="w-5 h-5" />
                    <span>Calendário</span>
                  </button>
                </nav>
              </div>

              <div className="pt-4 border-t border-outline-variant/30">
                <button
                  onClick={() => {
                    setShowSidebar(false);
                    onLogOut();
                  }}
                  className="flex items-center gap-3 text-red-400 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold">Sair da Conta</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header section wrapper */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-md z-30 px-4 py-3 flex justify-between items-center border-b border-surface-container/50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSidebar(true)}
            className="p-1.5 hover:bg-surface-container rounded-lg active:scale-95 transition-all text-primary-container cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-xl font-bold tracking-tight text-primary-container">
            dutX
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Flame streak */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 bg-surface-container-high px-3 py-1 rounded-full border border-outline-variant/30 shadow-sm"
          >
            <Flame className="w-4 h-4 text-primary-container fill-primary-container animate-pulse" />
            <span className="text-xs font-bold text-on-surface">{streak}</span>
          </motion.div>

          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="p-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Inner Screen Scroll View */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-4 max-w-md mx-auto w-full pt-4 pb-28">
        
        {/* Search bar transition */}
        <AnimatePresence>
          {showSearchInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4 overflow-hidden"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar por tarefas..."
                className="w-full bg-surface-container border-none focus:outline-none focus:ring-1 focus:ring-primary-container rounded-xl px-4 py-2.5 text-sm placeholder:text-neutral-500 font-sans"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories / Filter Chips horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar select-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all duration-150 ${
                  isActive
                    ? "bg-primary-container text-on-primary-container border-primary-container shadow-md scale-102"
                    : "bg-surface-container border-outline-variant/10 text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Task List Section */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-on-surface-variant uppercase tracking-wider">
              Tarefas de Hoje
            </h2>
            <span className="text-xs bg-surface-container px-2 py-0.5 rounded-md text-on-surface-variant/70 font-semibold font-display">
              {filteredTasks.length} {filteredTasks.length === 1 ? "tarefa" : "tarefas"}
            </span>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layoutId={`container-${task.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 group relative overflow-hidden bg-surface-container border border-white/5 ${
                      task.completed ? "opacity-60" : "hover:bg-surface-container-high"
                    }`}
                  >
                    {/* Ring Button for complete state */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleTask(task.id);
                      }}
                      className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center cursor-pointer transition-all ${
                        task.completed
                          ? "bg-primary-container border-primary-container"
                          : "border-outline hover:border-primary-container"
                      }`}
                    >
                      {task.completed && (
                        <Check className="w-3.5 h-3.5 text-on-primary-container stroke-[3]" />
                      )}
                    </button>

                    {/* Task Title content */}
                    <div
                      onClick={() => onEditTaskClick(task)}
                      className="flex-1 text-left cursor-pointer select-none"
                    >
                      <p
                        className={`text-sm font-semibold transition-all ${
                          task.completed
                            ? "line-through text-on-surface-variant/50 font-normal"
                            : "text-on-surface"
                        }`}
                      >
                        {task.title}
                      </p>
                      
                      {/* Secondary meta info (time, category, badges) */}
                      <div className="flex items-center gap-2 mt-1">
                        {task.time && (
                          <span className="text-[11px] font-medium text-neutral-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.time}
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            task.category === "Saúde"
                              ? "bg-tertiary-container/20 text-tertiary"
                              : task.category === "Estudo"
                              ? "bg-secondary-container/30 text-secondary"
                              : "bg-surface-container-highest text-on-surface-variant"
                          }`}
                        >
                          {task.category}
                        </span>
                        {task.notes && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-container" title="Contém notas" />
                        )}
                      </div>
                    </div>

                    {/* Quick delete item hover indicator */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTask(task.id);
                      }}
                      className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-background/100 hover:text-red-400 text-on-surface-variant transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 px-6 bg-surface-container rounded-2xl flex flex-col items-center justify-center gap-3">
                  <div className="p-4 bg-surface-container-high rounded-full">
                    <CheckCircle2 className="w-8 h-8 text-neutral-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">Nenhuma tarefa</h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      {searchQuery
                        ? "Nenhum resultado para a busca atual."
                        : `Sem tarefas pendentes na categoria ${selectedCategory}.`}
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bento Layout Weekly Progress Box */}
        <section className="mt-8">
          <div className="bg-gradient-to-br from-surface-container-high to-surface-container-low rounded-2xl p-5 relative overflow-hidden border border-white/5">
            <div className="relative z-10 text-left">
              <h3 className="text-base font-bold text-on-surface">Progresso Semanal</h3>
              <p className="text-xs text-on-surface-variant mt-1 font-medium">
                Você concluiu {completionPercentage}% das suas metas hoje.
              </p>
              
              {/* Dynamic progress loader bar */}
              <div className="mt-4 h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-primary-container rounded-full"
                />
              </div>
            </div>
            {/* Visual background element */}
            <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-primary-container/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </section>

      </main>

      {/* Floating Action Event Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddTaskClick}
        className="absolute bottom-24 right-5 w-14 h-14 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-lg z-30 hover:brightness-110 cursor-pointer text-white"
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </motion.button>

      {/* Bottom Global Tablet navigation menu */}
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
