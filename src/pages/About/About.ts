import { useTSElements, useTSMetaData } from '../../utils/hooks'
import { html } from '../../utils/define'

export default function About(DOM: HTMLElement) {
    useTSMetaData({
        name: 'About',
        description: '',
        author: ''
    });

    const ui = useTSElements(
        DOM,
        html`
        <div>
            <h1>About</h1>
        </div>
`
    );
    return ui
}