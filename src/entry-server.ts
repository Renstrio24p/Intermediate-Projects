import { html } from "./utils/define"
import App from './App'

export async function render(_url: string) {
  const appHtml = App

  return {
    html: html`
      <div id="app">${appHtml}</div>
      <script type="module" src="/src/entry-client.ts"></script>
    `,
    head: `<title>My App</title>`,
  }
}
