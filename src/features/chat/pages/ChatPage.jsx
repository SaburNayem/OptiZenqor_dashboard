import { useEffect, useState } from "react";
import DashboardSection from "../../../shared/ui/DashboardSection";
import InsightCard from "../../../shared/ui/InsightCard";
import SideDetailPanel from "../../../shared/feedback/SideDetailPanel";
import { adminRequest } from "../../../shared/api/adminApi";

function ChatPage() {
  const [state, setState] = useState({ loading: true, error: "", threads: [], activeThreadId: "", message: "" });

  async function load(activeThreadId = state.activeThreadId) {
    try {
      const threads = await adminRequest("/admin/support");
      setState((current) => ({
        ...current,
        loading: false,
        error: "",
        threads,
        activeThreadId: activeThreadId || threads[0]?.id || "",
      }));
    } catch (error) {
      setState((current) => ({ ...current, loading: false, error: error.message || "Unable to load support inbox." }));
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function sendReply() {
    const activeThread = state.threads.find((thread) => thread.id === state.activeThreadId);
    if (!activeThread || !state.message.trim()) return;

    await adminRequest(`/support/threads/${activeThread.id}/messages`, {
      method: "POST",
      body: JSON.stringify({ message: state.message.trim() }),
    });
    await load(activeThread.id);
    setState((current) => ({ ...current, message: "" }));
  }

  async function updateStatus(status) {
    const activeThread = state.threads.find((thread) => thread.id === state.activeThreadId);
    if (!activeThread) return;

    const path = status === "CLOSED" ? `/support/threads/${activeThread.id}/close` : `/support/threads/${activeThread.id}/reopen`;
    await adminRequest(path, { method: "PATCH" });
    await load(activeThread.id);
  }

  const activeThread = state.threads.find((thread) => thread.id === state.activeThreadId);

  if (state.loading) return <div className="page-stack"><section className="panel-card"><p>Loading support inbox...</p></section></div>;
  if (state.error) return <div className="page-stack"><section className="panel-card"><p className="auth-error">{state.error}</p></section></div>;

  return (
    <div className="page-stack">
      <section className="card-grid">
        <InsightCard eyebrow="Support" title="Open chats" value={state.threads.filter((thread) => thread.status === "OPEN").length} description="Customer chats requiring active admin response." />
        <InsightCard eyebrow="Support" title="Pending chats" value={state.threads.filter((thread) => thread.status === "PENDING").length} description="Threads waiting for a first reply." />
        <InsightCard eyebrow="Support" title="Closed chats" value={state.threads.filter((thread) => thread.status === "CLOSED").length} description="Resolved support threads archived by the team." />
      </section>

      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection title="Support inbox" subtitle="Filter and respond to support conversations across channels.">
            <div className="chat-list">
              {state.threads.map((thread) => (
                <button key={thread.id} type="button" className={`chat-thread ${thread.id === activeThread?.id ? "active" : ""}`} onClick={() => setState((current) => ({ ...current, activeThreadId: thread.id }))}>
                  <div>
                    <strong>{thread.user.fullName}</strong>
                    <p>{thread.subject}</p>
                    <p>{thread.priority} priority</p>
                  </div>
                  <span>{thread.status}</span>
                </button>
              ))}
            </div>
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <SideDetailPanel title="Customer info" subtitle="Support context for the selected thread.">
            {activeThread ? (
              <div className="feature-list">
                <article className="feature-card">
                  <h3>{activeThread.user.fullName}</h3>
                  <p>{activeThread.user.email}</p>
                  <p>{activeThread.subject}</p>
                </article>
              </div>
            ) : null}
          </SideDetailPanel>

          <DashboardSection title="Live conversation" subtitle="Reply and update thread status.">
            {activeThread ? (
              <>
                <div className="chat-messages">
                  {activeThread.messages.map((item) => (
                    <article key={item.id} className={`chat-bubble ${item.senderType === "ADMIN" ? "admin" : "customer"}`}>
                      <strong>{item.sender.fullName}</strong>
                      <p>{item.message}</p>
                      <span>{new Date(item.createdAt).toLocaleString()}</span>
                    </article>
                  ))}
                </div>
                <textarea value={state.message} onChange={(event) => setState((current) => ({ ...current, message: event.target.value }))} placeholder="Write a reply to the customer" />
                <div className="chat-actions">
                  <button type="button" className="primary-button" onClick={sendReply}>Send reply</button>
                  <button type="button" className="secondary-button" onClick={() => updateStatus("CLOSED")}>Close chat</button>
                  <button type="button" className="table-action" onClick={() => updateStatus("OPEN")}>Reopen</button>
                </div>
              </>
            ) : null}
          </DashboardSection>
        </div>
      </section>
    </div>
  );
}

export default ChatPage;
