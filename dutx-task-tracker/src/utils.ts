import { Task } from "./types";

export const INITIAL_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Finalizar relatório de design",
    category: "Estudo",
    date: "Hoje",
    alarm: "Desativado",
    notes: "Incluir feedback recebido do diretor de arte",
    repeat: "Nunca",
    completed: false,
    time: "14:00",
  },
  {
    id: "task-2",
    title: "Treino de pernas",
    category: "Saúde",
    date: "Hoje",
    alarm: "Desativado",
    notes: "Foco em quadríceps e panturrilhas",
    repeat: "Nunca",
    completed: false,
    time: "17:30",
  },
  {
    id: "task-3",
    title: "Beber 2L de água",
    category: "Saúde",
    date: "Hoje",
    alarm: "Desativado",
    notes: "Foco em hidratação constante durante o trabalho",
    repeat: "Diariamente",
    completed: true,
  },
  {
    id: "task-4",
    title: "Ler 20 páginas de \"Hábitos Atômicos\"",
    category: "Estudo",
    date: "Hoje",
    alarm: "Desativado",
    notes: "Anotar insights importantes sobre mudança de comportamento",
    repeat: "Nunca",
    completed: false,
    time: "21:00",
  }
];

export function getStoredTasks(): Task[] {
  try {
    const data = localStorage.getItem("dutx_tasks");
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading stored tasks", error);
  }
  return INITIAL_TASKS;
}

export function saveStoredTasks(tasks: Task[]): void {
  try {
    localStorage.setItem("dutx_tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks", error);
  }
}

export function getStoredUser() {
  try {
    const data = localStorage.getItem("dutx_user");
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading stored user", error);
  }
  return null;
}

export function saveStoredUser(user: { email: string; name: string } | null): void {
  try {
    if (user) {
      localStorage.setItem("dutx_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("dutx_user");
    }
  } catch (error) {
    console.error("Error saving user", error);
  }
}

export function getStoredStreak(): number {
  try {
    const streak = localStorage.getItem("dutx_streak");
    return streak ? parseInt(streak, 10) : 712;
  } catch {
    return 712;
  }
}

export function saveStoredStreak(streak: number): void {
  try {
    localStorage.setItem("dutx_streak", streak.toString());
  } catch (error) {
    console.error("Error saving streak", error);
  }
}
