import DashboardSection from "../../../shared/ui/DashboardSection";
import FormFieldError from "../../../shared/feedback/FormFieldError";
import InsightCard from "../../../shared/ui/InsightCard";
import SideDetailPanel from "../../../shared/feedback/SideDetailPanel";
import StatusBadge from "../../../shared/ui/StatusBadge";
import { useChatController } from "../controller/chatController";

function ChatPage() {
  const controller = useChatController();

  return (
    <div className="page-stack">
      <section className="card-grid">
        <InsightCard eyebrow="Support" title="Open chats" value={controller.threads.filter((thread) => thread.status === "Open").length} description="Customer chats requiring active admin response." />
        <InsightCard eyebrow="Support" title="Pending chats" value={controller.threads.filter((thread) => thread.status === "Pending").length} description="Threads waiting for a first reply." />
        <InsightCard eyebrow="Support" title="Unread messages" value={controller.threads.reduce((sum, thread) => sum + thread.unreadCount, 0)} description="New customer messages still needing review." />
      </section>

      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection title="Support inbox" subtitle="Filter and respond to support conversations across channels.">
            <div className="filter-row">
              <select value={controller.statusFilter} onChange={(event) => controller.setStatusFilter(event.target.value)}>
                <option>All</option>
                <option>Open</option>
                <option>Pending</option>
                <option>Closed</option>
              </select>
            </div>
            <div className="chat-list">
              {controller.threads.map((thread) => (
                <button
                  key={thread.id}
                  type="button"
                  className={`chat-thread ${thread.id === controller.activeThread?.id ? "active" : ""}`}
                  onClick={() => controller.setActiveThreadId(thread.id)}
                >
                  <div>
                    <strong>{thread.customerName}</strong>
                    <p>{thread.channel} • {thread.orderRef}</p>
                    <p>{thread.unreadCount} unread • {thread.priority} priority</p>
                  </div>
                  <StatusBadge value={thread.status} toneMap={controller.toneMap} />
                </button>
              ))}
            </div>
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <SideDetailPanel title="Customer info" subtitle="Support context for the selected thread.">
            {controller.activeThread ? (
              <div className="feature-list">
                <article className="feature-card">
                  <h3>{controller.activeThread.customerName}</h3>
                  <p>{controller.activeThread.customerEmail}</p>
                  <p>{controller.activeThread.channel} • {controller.activeThread.orderRef}</p>
                </article>
              </div>
            ) : null}
          </SideDetailPanel>

          <DashboardSection title="Live conversation" subtitle="Reply, use canned responses, and update thread status.">
            {controller.activeThread ? (
              <>
                <div className="chat-messages">
                  {controller.activeThread.messages.map((item) => (
                    <article key={item.id} className={`chat-bubble ${item.sender}`}>
                      <strong>{item.sender === "admin" ? "Admin" : controller.activeThread.customerName}</strong>
                      <p>{item.text}</p>
                      <span>{item.time}</span>
                    </article>
                  ))}
                </div>

                <div className="pill-grid">
                  {controller.cannedResponses.map((response) => (
                    <button key={response} type="button" className="selector-pill" onClick={() => controller.setMessage(response)}>
                      {response}
                    </button>
                  ))}
                </div>

                <form className="chat-form" onSubmit={controller.handleSend}>
                  <textarea value={controller.message} onChange={(event) => controller.setMessage(event.target.value)} placeholder="Write a reply to the customer" />
                  <FormFieldError message={controller.error} />
                  <div className="chat-actions">
                    <button type="submit" className="primary-button">Send reply</button>
                    <button type="button" className="secondary-button" onClick={() => controller.updateChatStatus(controller.activeThread.id, "Closed")}>
                      Close chat
                    </button>
                    <button type="button" className="table-action" onClick={() => controller.updateChatStatus(controller.activeThread.id, "Open")}>
                      Reopen
                    </button>
                  </div>
                </form>
              </>
            ) : null}
          </DashboardSection>
        </div>
      </section>
    </div>
  );
}

export default ChatPage;
