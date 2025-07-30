import { html } from "../../utils/define"
import { useTSElements } from "../../utils/hooks"
import { useTSEvent } from "../../utils/hooks/useTSEvent"

const Home = (DOM: HTMLElement, websiteName: string) => {
    document.title = websiteName

    let a = 0
    let countEl: HTMLElement | null = null

    const handleClick = (DOM: HTMLElement) => {
        countEl = DOM.querySelector('#count')
        a += 1
        if (countEl) {
            countEl.textContent = `You have clicked ${a.toString()}`
        }
    }

    const ui = useTSElements(
        DOM,
        html`
        <div class="p-4">
            <h1>Home</h1>
            <p class="font-impact font-semibold">Welcome to ${websiteName}</p>
            <p>This page is currently under construction. Proceed to /calculate</p>
            <p id="count">You have clicked ${a ? a : '0'}</p>
            <button id="click-btn" class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Click
                me</button>
        </div>
    `
    )


    // Register click event
    useTSEvent('click-btn', 'click', () => handleClick(DOM))

    return ui
}

export default Home
