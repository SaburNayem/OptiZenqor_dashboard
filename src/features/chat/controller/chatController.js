import { useMemo, useState } from "react";
import { validateChatReply } from "../../../core/utils/validation";
import { useDashboard } from "../../../store/DashboardContext";

export function useChatController() {
  const dashboard = useDashboard();
  const [activeThreadId, setActiveThreadId] = useState(dashboard.state.chat.chatThreads[0]?.id ?? "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const threads = dashboard.state.chat.chatThreads;
  const filteredThreads = useMemo(
    () =>
      threads.filter((thread) => statusFilter === "All" || thread.status === statusFilter),
    [threads, statusFilter],
  );
  const activeThread = threads.find((thread) => thread.id === activeThreadId) ?? filteredThreads[0] ?? null;

  function handleSend(event) {
    event.preventDefault();
    const nextErrors = validateChatReply(message);
    if (nextErrors.text) {
      setError(nextErrors.text);
      return;
    }

    if (activeThread) {
      dashboard.sendChatMessage(activeThread.id, message.trim());
      setMessage("");
      setError("");
    }
  }

  return {
    threads: filteredThreads,
    activeThread,
    message,
    setMessage,
    error,
    statusFilter,
    setStatusFilter,
    cannedResponses: dashboard.state.chat.cannedResponses,
    toneMap: dashboard.state.system.toneMap,
    setActiveThreadId,
    handleSend,
    updateChatStatus: dashboard.updateChatStatus,
  };
}
