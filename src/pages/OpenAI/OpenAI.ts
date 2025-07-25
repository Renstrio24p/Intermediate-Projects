import html from '../../utils/define/html';
import { useTSElements } from '../../utils/hooks/useTSElements'
import { useTSMetaData } from '../../utils/hooks/useTSMetaData'

export default function OpenAI(DOM: HTMLElement) {
    useTSMetaData({
        name: 'OpenAI',
        description: '',
        author: ''
    });

    useTSElements(
        DOM,
        html`
        <div>
            <h1>OpenAI</h1>
        </div>
`
    );
}