import React, { useState, useEffect } from "react";
import { Task, User } from "./types";
import {
  getStoredTasks,
  saveStoredTasks,
  getStoredUser,
  saveStoredUser,
  getStoredStreak,
  saveStoredStreak
} from "./utils";
import LoginScreen from "./components/LoginScreen";
import TasksScreen from "./components/TasksScreen";
import AddTaskScreen from "./components/AddTaskScreen";
import PerformanceScreen from "./components/PerformanceScreen";
import CalendarScreen from "./components/CalendarScreen";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [streak, setStreak] = useState(712);
  const [activeTab, setActiveTab] = useState("tasks"); // "tasks", "calendar", "performance"
  const [screen, setScreen] = useState<"main" | "addTask">("main");
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Initialize state from local storage on mount
  useEffect(() => {
    setUser(getStoredUser());
    setTasks(getStoredTasks());
    setStreak(getStoredStreak());
  }, []);

  const handleLogin = (email: string) => {
    const newUser: User = {
      email,
      name: email.split("@")[0]
    };
    setUser(newUser);
    saveStoredUser(newUser);
  };

  const handleLogOut = () => {
    setUser(null);
    saveStoredUser(null);
    setActiveTab("tasks");
    setScreen("main");
  };

  const handleToggleTask = (id: string) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
    saveStoredTasks(updated);

    // Increase streak by 1 if a task gets completed (cool, interactive reward!)
    const completing = tasks.find((t) => t.id === id)?.completed === false;
    if (completing) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      saveStoredStreak(newStreak);
    }
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    saveStoredTasks(updated);
  };

  const handleSaveTask = (taskData: Omit<Task, "id" | "completed"> & { id?: string }) => {
    if (taskData.id) {
      // Edit existing task
      const updated = tasks.map((task) =>
        task.id === taskData.id
          ? { ...task, ...taskData }
          : task
      );
      setTasks(updated);
      saveStoredTasks(updated);
    } else {
      // Create new task
      const newTask: Task = {
        ...taskData,
        id: `task-${Date.now()}`,
        completed: false
      };
      const updated = [newTask, ...tasks];
      setTasks(updated);
      saveStoredTasks(updated);
    }
    setScreen("main");
    setTaskToEdit(null);
  };

  return (
    <div className="bg-gradient-to-b from-[#120320] via-[#1c062a] to-[#140224] min-h-screen w-full flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 font-sans overflow-x-hidden md:overflow-y-auto">
      {/* Tall Premium Phone Chassis Simulator */}
      <div className="w-full max-w-full sm:max-w-[420px] h-screen sm:h-[880px] sm:max-h-[92vh] sm:rounded-[44px] sm:border-[10px] sm:border-[#2b1540] sm:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85)] relative flex flex-col bg-background overflow-hidden">
        
        {/* Simulated top notch/island bar on desktop preview */}
        <div className="hidden sm:flex justify-between items-center w-full px-6 pt-3.5 pb-2.5 text-[10px] font-bold text-on-surface-variant/75 tracking-tight z-50 bg-[#1e0733] select-none border-b border-white/[0.02]">
          <span>15:02</span>
          {/* Dynamic pill island */}
          <div className="w-20 h-4.5 bg-[#19022d] border border-white/[0.04] rounded-full flex items-center justify-center pointer-events-none">
            <span className="w-1 h-1 rounded-full bg-primary-container animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="opacity-75">5G</span>
            <div className="w-4.5 h-2.5 rounded-[3px] border border-on-surface-variant/40 p-[1px] flex items-center">
              <div className="h-full w-[85%] bg-on-surface-variant/85 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Screen Content Wrapper fitted within device container */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col h-full bg-background">
          <AnimatePresence mode="wait">
            {!user ? (
              <motion.div
                key="login-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex-1 flex flex-col min-h-full"
              >
                <LoginScreen onLogin={handleLogin} />
              </motion.div>
            ) : screen === "addTask" ? (
              <motion.div
                key="addTask-wrapper"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex-1 flex flex-col min-h-full"
              >
                <AddTaskScreen
                  taskToEdit={taskToEdit}
                  onClose={() => {
                    setScreen("main");
                    setTaskToEdit(null);
                  }}
                  onSave={handleSaveTask}
                />
              </motion.div>
            ) : (
              <motion.div
                key="main-tabs-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex-1 flex flex-col min-h-full"
              >
                {activeTab === "tasks" && (
                  <TasksScreen
                    tasks={tasks}
                    streak={streak}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                    onAddTaskClick={() => {
                      setTaskToEdit(null);
                      setScreen("addTask");
                    }}
                    onEditTaskClick={(task) => {
                      setTaskToEdit(task);
                      setScreen("addTask");
                    }}
                    activeTab={activeTab}
                    onChangeTab={setActiveTab}
                    userEmail={user.email}
                    onLogOut={handleLogOut}
                  />
                )}

                {activeTab === "calendar" && (
                  <CalendarScreen
                    tasks={tasks}
                    activeTab={activeTab}
                    onChangeTab={setActiveTab}
                    onAddTaskClick={() => {
                      setTaskToEdit(null);
                      setScreen("addTask");
                    }}
                    onToggleTask={handleToggleTask}
                  />
                )}

                {activeTab === "performance" && (
                  <PerformanceScreen
                    tasks={tasks}
                    activeTab={activeTab}
                    onChangeTab={setActiveTab}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home gesture indicator bar */}
        <div className="hidden sm:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-45 pointer-events-none" />
      </div>
    </div>
  );
}
