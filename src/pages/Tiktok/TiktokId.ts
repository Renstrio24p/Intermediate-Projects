import { useTSElements, useTSExtractParams, useTSMetaData } from '@/utils/hooks'
import { html } from '@/utils/define'

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