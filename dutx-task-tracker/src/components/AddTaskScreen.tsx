import React, { useState, useEffect } from "react";
import { Task } from "../types";
import {
  X,
  Check,
  ChevronRight,
  Calendar,
  Bell,
  FileText,
  RotateCcw,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";

interface AddTaskScreenProps {
  onSave: (task: Omit<Task, "id" | "completed"> & { id?: string }) => void;
  onClose: () => void;
  taskToEdit?: Task | null;
}

export default function AddTaskScreen({
  onSave,
  onClose,
  taskToEdit
}: AddTaskScreenProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Trabalho");
  const [date, setDate] = useState("Hoje");
  const [alarm, setAlarm] = useState("Desativado");
  const [notes, setNotes] = useState("");
  const [repeat, setRepeat] = useState("Nunca");
  const [errorMessage, setErrorMessage] = useState("");

  const categories = ["Trabalho", "Pessoal", "Saúde", "Finanças", "Estudo"];
  const dateOptions = ["Hoje", "Amanhã", "Próxima Segunda", "Escolher Data"];
  const alarmOptions = ["Desativado", "08:00", "12:00", "14:00", "18:00", "20:00"];
  const repeatOptions = ["Nunca", "Diariamente", "Semanalmente", "Mensalmente"];

  // Load editing task if available
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setCategory(taskToEdit.category);
      setDate(taskToEdit.date);
      setAlarm(taskToEdit.alarm);
      setNotes(taskToEdit.notes || "");
      setRepeat(taskToEdit.repeat);
    }
  }, [taskToEdit]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      setErrorMessage("Por favor, preencha o nome da sua tarefa!");
      return;
    }
    setErrorMessage("");

    onSave({
      id: taskToEdit?.id,
      title: title.trim(),
      category,
      date,
      alarm,
      notes: notes.trim(),
      repeat
    });
  };

  // Handy helpers to rotate option values when clicked
  const cycleDate = () => {
    const currentIndex = dateOptions.indexOf(date);
    const nextIndex = (currentIndex + 1) % dateOptions.length;
    setDate(dateOptions[nextIndex]);
  };

  const cycleAlarm = () => {
    const currentIndex = alarmOptions.indexOf(alarm);
    const nextIndex = (currentIndex + 1) % alarmOptions.length;
    setAlarm(alarmOptions[nextIndex]);
  };

  const cycleRepeat = () => {
    const currentIndex = repeatOptions.indexOf(repeat);
    const nextIndex = (currentIndex + 1) % repeatOptions.length;
    setRepeat(repeatOptions[nextIndex]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      className="min-h-full h-full flex-1 bg-background text-on-surface flex flex-col pb-12 font-sans"
    >
      {/* Top Bar Navigation */}
      <header className="bg-surface sticky top-0 flex justify-between items-center w-full px-4 h-16 z-30 border-b border-surface-container/50">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant hover:bg-surface-container p-2 rounded-full active:scale-95 transition-all cursor-pointer"
          >
            <X className="w-5 h-5 text-on-surface" />
          </button>
          <h1 className="text-lg font-bold text-primary-container">
            {taskToEdit ? "Editar Tarefa" : "Nova Tarefa"}
          </h1>
        </div>

        <button
          type="button"
          onClick={() => handleSubmit()}
          className="text-on-surface-variant hover:bg-surface-container p-2 rounded-full active:scale-95 transition-all text-primary-container cursor-pointer"
        >
          <Check className="w-5 h-5 text-primary-container" />
        </button>
      </header>

      {/* Input Canvas Content */}
      <main className="flex-1 px-4 py-6 max-w-sm mx-auto w-full flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {errorMessage && (
            <div className="bg-red-950/40 text-red-300 text-xs py-2 px-3 rounded-lg border border-red-900/40 text-center">
              {errorMessage}
            </div>
          )}

          {/* Task title */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1">
              Nome da Tarefa
            </label>
            <input
              type="text"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="O que precisa ser feito?"
              className="w-full bg-surface-container border-b-2 border-outline-variant/30 focus:border-primary-container text-on-surface px-4 py-4 rounded-t-xl text-base placeholder:text-on-surface-variant/30 font-sans focus:outline-none transition-all"
            />
          </div>

          {/* Category dropdown */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1">
              Categoria
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none bg-surface-container border-none focus:outline-none focus:ring-1 focus:ring-primary-container text-on-surface px-4 py-4 rounded-xl text-sm cursor-pointer font-sans"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-surface-container-high py-2">
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>

          {/* Options Tonal Container list */}
          <div className="bg-surface-container rounded-2xl overflow-hidden divide-y divide-outline-variant/20 border border-white/5">
            
            {/* Calendar Data */}
            <div
              onClick={cycleDate}
              className="flex items-center justify-between p-4 hover:bg-surface-container-highest transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-primary-container" />
                <span className="text-sm font-semibold text-on-surface">Data</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                <span>{date}</span>
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              </div>
            </div>

            {/* Alarm bell clock */}
            <div
              onClick={cycleAlarm}
              className="flex items-center justify-between p-4 hover:bg-surface-container-highest transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <Bell className="w-5 h-5 text-tertiary" />
                <span className="text-sm font-semibold text-on-surface">Alarme</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                <span>{alarm}</span>
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              </div>
            </div>

            {/* Note text field details - integrated within list */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-4">
                <FileText className="w-5 h-5 text-secondary" />
                <span className="text-sm font-semibold text-on-surface">Nota / Descrição</span>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Insira detalhes ou subtarefas aqui..."
                rows={2}
                className="w-full bg-surface-container-low focus:bg-surface-container-high border-none focus:outline-none focus:ring-1 focus:ring-primary-container text-xs text-on-surface p-3 rounded-xl mt-1 placeholder:text-neutral-500 resize-none font-sans transition-all"
              />
            </div>

            {/* Repeat recurring rule */}
            <div
              onClick={cycleRepeat}
              className="flex items-center justify-between p-4 hover:bg-surface-container-highest transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <RotateCcw className="w-5 h-5 text-on-surface-variant" />
                <span className="text-sm font-semibold text-on-surface">Repetir</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                <span>{repeat}</span>
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              </div>
            </div>

          </div>
        </form>

        {/* Action Button */}
        <div className="pt-8">
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="w-full bg-primary-container text-on-primary-container py-4 rounded-full font-bold shadow-lg shadow-primary-container/20 active:scale-95 hover:brightness-110 transition-all duration-150 text-sm cursor-pointer font-display text-white"
          >
            {taskToEdit ? "Salvar Alterações" : "Salvar Tarefa"}
          </button>
        </div>
      </main>
    </motion.div>
  );
}
