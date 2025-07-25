import html from "./utils/define/html"

export function render(_url: string): { html: string; head?: string } {
  const htmlStr = html`
    <div id="app" class='w-screen'></div>
  `
  return {
    html: htmlStr,
    head: `
      <meta name="description" content="Chatbot Assistant powered by OpenAI" />
      <meta name="author" content="Your Name" />
      <title>Chatbot Assistant Open AI</title>
    `
  }
}
