import html from "./utils/define/html"

export function render() {
  const htmlContent = html`
    <div id="app"></div>
  `

  return {
    html: htmlContent,
    head: `<title>My App</title>`,
  }
}
