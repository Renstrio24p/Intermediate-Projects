import { html, useTSElements, useTSMetaData } from '@devwareng/vanilla-ts'
import { useTiktokApi, useTiktokSecrets } from '@/lib/hooks';

export default function Tiktok(DOM: HTMLElement) {

    useTSMetaData({
        name: 'Tiktok',
        description: '',
        author: ''
    });

    const { clientKey, clientSecret, redirectUri } = useTiktokSecrets()

    const res = useTiktokApi('code', clientKey, clientSecret, redirectUri);

    console.log(res);

    const ui = useTSElements(
        DOM,
        html`
        <div>
            <h1>Tiktok</h1>
            <p>Tiktok Api Integration</p>
        </div>
`
    );
    return ui
}