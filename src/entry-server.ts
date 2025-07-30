import { html } from "./utils/define"

export function render() {
  const htmlContent = html`
    <div id="app"></div>
  `

  return {
    html: htmlContent,
    head: `<title>My App</title>`,
  }
}
