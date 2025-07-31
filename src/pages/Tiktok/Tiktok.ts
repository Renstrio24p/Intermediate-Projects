import { useTSElements, useTSMetaData } from '@/utils/hooks'
import { html } from '@/utils/define'
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