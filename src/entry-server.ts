import { html } from "./utils/define"
import App from './App' // your app renderer
import { useInitialDOM } from "./utils/hooks"

export async function render(_url: string) {
  const appHtml = useInitialDOM("app", App) // your own SSR logic

  return {
    html: html`
      <div id="app">${appHtml}</div>
      <script type="module" src="/src/entry-client.ts"></script>
    `,
    head: `<title>My App</title>`,
  }
}
