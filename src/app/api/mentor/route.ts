import Anthropic from "@anthropic-ai/sdk";
import { MENTORS } from "@/data/mentors";

const anthropic = new Anthropic();

export async function POST(request: Request) {
  const { messages, mentorId } = await request.json();

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Messages are required" }, { status: 400 });
  }

  const mentor = MENTORS.find((m) => m.id === mentorId);
  if (!mentor) {
    return Response.json({ error: "Invalid mentor ID" }, { status: 400 });
  }

  const anthropicMessages = messages.map(
    (msg: { role: string; content: string }) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })
  );

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: mentor.systemPrompt,
    messages: anthropicMessages,
  });

  const textBlock = response.content.find((block) => block.type === "text");
  const reply = textBlock ? textBlock.text : "";

  return Response.json({ reply });
}
