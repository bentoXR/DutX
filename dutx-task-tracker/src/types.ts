export interface Task {
  id: string;
  title: string;
  category: string;
  date: string; // e.g. "Hoje", "Amanhã" or ISO date string
  alarm: string; // "Desativado" or specific time
  notes: string;
  repeat: string; // "Nunca", "Diariamente", "Semanalmente", "Mensalmente"
  completed: boolean;
  time?: string; // Optional specific time like "14:00"
}

export interface User {
  email: string;
  name: string;
}

export interface WeeklyHistory {
  day: string; // "SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"
  concluidas: number;
}
