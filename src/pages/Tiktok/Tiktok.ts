import { useTSElements, useTSMetaData } from '@/utils/hooks'
import { html } from '@/utils/define'
import { useTiktokApi } from '@/lib/hooks';

export default function Tiktok(DOM: HTMLElement) {
    useTSMetaData({
        name: 'Tiktok',
        description: '',
        author: ''
    });

    const clientKey = import.meta.env.VITE_CLIENT_KEY;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

    const res = useTiktokApi('code', clientKey, clientSecret, 'redirect_uri');

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