import { useTSElements } from "../../utils/hooks"

const NotFound = (DOM: HTMLElement, websiteName: string) => {


  document.title = websiteName

  const ui = useTSElements(
    DOM,
        /*html*/`
    <div>
      <h1>Not Found</h1>
    </div>
  `)

  return ui

}
export default NotFound