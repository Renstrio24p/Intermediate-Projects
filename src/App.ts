
import { Router } from './routes/__root.routes';
import html from './utils/define/html';
import { useTSComponent } from './utils/hooks/useTSComponent';
import { useTSElements } from './utils/hooks/useTSElements'
import { useTSMetaData } from './utils/hooks/useTSMetaData'
import "./index.css"

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