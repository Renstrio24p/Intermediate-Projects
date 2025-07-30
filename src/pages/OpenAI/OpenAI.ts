import { html } from '@/utils/define';
import { useTSElements, useTSMetaData } from '@/utils/hooks'

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
            <h1 class="text-gray-500 p-4">OpenAI</h1>
        </div>
`
    );
}