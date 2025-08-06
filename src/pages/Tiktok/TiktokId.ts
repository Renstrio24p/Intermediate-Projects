import { html, useTSElements, useTSExtractParams, useTSMetaData } from '@devwareng/vanilla-ts'

export default function TiktokId(DOM: HTMLElement) {
    useTSMetaData({
        name: 'TiktokId',
        description: '',
        author: ''
    });

    const { id } = useTSExtractParams("/tiktok/:id");

    const ui = useTSElements(
        DOM,
        html`
        <div>
            <h1>TiktokId</h1>
            <p>${id}</p>
        </div>
`
    );
    return ui
}