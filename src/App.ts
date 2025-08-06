
import "./index.css"
import { Router } from "./routes";
import { html, useTSComponent, useTSElements, useTSMetaData } from '@devwareng/vanilla-ts';

export default function Start(DOM?: HTMLElement) {

    if (typeof window === "undefined") return;

    useTSMetaData({
        name: 'Start',
        description: '',
        author: ''
    });

    const title = 'Chatbot Assistant Open AI'

    const ui = useTSElements(
        DOM || document.body,
        html`
            <main id='router' class='main'></main>
        `
    );


    useTSComponent('router', DOM || document.body, Router, title)

    return ui

}

export const startHTML = Start();