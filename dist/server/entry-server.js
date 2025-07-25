function html(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] || "");
  }, "");
}
function render() {
  const htmlContent = html`
    <div id="app"></div>
  `;
  return {
    html: htmlContent,
    head: `<title>My App</title>`
  };
}
export {
  render
};
