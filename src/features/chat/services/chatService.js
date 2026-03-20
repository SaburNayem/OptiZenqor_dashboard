import { createSupportThreadModel } from "../model/supportThreadModel";

const cannedResponses = [
  "We are checking this with the logistics team now.",
  "Your issue has been escalated and we will update you shortly.",
  "Thanks for your patience. We have added this to the support queue.",
];

const seedThreads = [
  {
    id: "chat-1",
    customerName: "Nafisa Rahman",
    customerEmail: "nafisa@optizenqor.com",
    channel: "Website chat",
    orderRef: "ORD-1204",
    status: "Open",
    unreadCount: 0,
    priority: "High",
    messages: [
      { id: "m1", sender: "customer", text: "My order is delayed. Can you check?", time: "09:20" },
      { id: "m2", sender: "admin", text: "Checking this for you now.", time: "09:24" },
    ],
  },
  {
    id: "chat-2",
    customerName: "Arif Hasan",
    customerEmail: "arif@optizenqor.com",
    channel: "Support inbox",
    orderRef: "ORD-1281",
    status: "Pending",
    unreadCount: 2,
    priority: "Normal",
    messages: [{ id: "m3", sender: "customer", text: "Can I change my delivery address?", time: "11:05" }],
  },
];

export function createChatSeed() {
  return {
    chatThreads: seedThreads.map(createSupportThreadModel),
    cannedResponses,
  };
}

export function sendChatMessage(threads, threadId, text) {
  return threads.map((thread) =>
    thread.id === threadId
      ? {
          ...thread,
          status: "Open",
          unreadCount: 0,
          messages: [
            ...thread.messages,
            { id: `${thread.id}-${thread.messages.length + 1}`, sender: "admin", text, time: "Now" },
          ],
        }
      : thread,
  );
}

export function updateChatStatus(threads, threadId, status) {
  return threads.map((thread) => (thread.id === threadId ? { ...thread, status } : thread));
}
