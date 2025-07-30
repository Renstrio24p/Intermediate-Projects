
import "./index.css"
import { Router } from "./routes";
import { html } from './utils/define';
import { useTSComponent, useTSElements, useTSMetaData } from './utils/hooks';

export default function Start(DOM: HTMLElement) {
    useTSMetaData({
        name: 'Start',
        description: '',
        author: ''
    });

    const title = 'Chatbot Assistant Open AI'

    const ui = useTSElements(
        DOM,
        html`
            <main id='router' class='main'></main>
        `
    );


    useTSComponent('router', DOM, Router, title)

    return ui

}