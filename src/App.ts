
import "./index.css"
import { Router } from "./routes";
import { html, useTSComponent, useTSElements, useTSMetaData } from '@devwareng/vanilla-ts';

export default function Start(DOM?: HTMLElement) {

    if (typeof window === "undefined") return;

    const isDOM = DOM || document.body;

    useTSMetaData({
        name: 'Start',
        description: '',
        author: ''
    });

    const title = 'Chatbot Assistant Open AI'

    const ui = useTSElements(
        isDOM,
        html`
            <main id='router' class='main'></main>
        `
    );


    useTSComponent('router', isDOM, Router, title)

    return ui

}

export const startHTML = Start();