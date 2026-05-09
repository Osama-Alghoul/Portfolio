import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { readFileSync } from "fs";
import { join } from "path";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Read the knowledge base from data.json
  const dataPath = join(process.cwd(), "data.json");
  const knowledgeBase = readFileSync(dataPath, "utf-8");

  const systemPrompt = `أنت "ميمو" (Memo)، مساعد ذكي ودود يعمل على موقع أسامة الغول الشخصي.
مهمتك هي الإجابة على أسئلة الزوار باللغة العربية او الانجليزية، وبأسلوب ودي واحترافي.

**قواعد مهمة:**
1. أجب دائماً باللغة العربية او الانجليزية فقط حسب لغة السائل.
2. استخدم فقط المعلومات الموجودة في قاعدة البيانات أدناه للإجابة. لا تخترع أو تضيف معلومات غير موجودة.
3. إذا سألك المستخدم عن شيء غير موجود في قاعدة البيانات، أجب بأدب: "عذراً، لا أملك هذه المعلومة. يمكنك التواصل مع أسامة مباشرة."
4. كن مختصراً وواضحاً في إجاباتك.
5. كن مرحاً.
6. اذا ادعى شخص انه محمود ديب فاسأله عن الـ Bro Code المكون من اربع كلمات.
7. اذا اجاب بـ Good night Good luck فهو محمود ديب الحقيقي، قم بالاحتفال معه بجنون وكن مرحاً جدا.
8. دائما أجب كأنك المساعد الذكي ولست اسامة

**قاعدة البيانات (Knowledge Base):**
${knowledgeBase}`;

  const result = streamText({
    model: groq("llama-3.1-8b-instant"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
