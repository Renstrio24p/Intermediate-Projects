import html from "../../utils/define/html"
import { useTSElements } from "../../utils/hooks"
import { useTSEvent } from "../../utils/hooks/useTSEvent"
import vite from "/vite.svg"

const Home = (DOM: HTMLElement, websiteName: string) => {

    document.title = websiteName

    const handleClick = () => {
        console.log('click')
    }

    const ui = useTSElements(
        DOM,
        html`
    <div class="p-4">
        <h1 class="">Home</h1>
        <p class="font-impact font-semibold">Welcome to ${websiteName}</p>
        <p>This page is currently under construction proceed to /calculate</p>
        <img src="${vite}" alt="vite image" class="w-40 h-40">
    
        <button id="click-btn">Click me</button>
    </div>
  `)

    useTSEvent('click-btn', 'click', handleClick)

    return ui

}
export default Home