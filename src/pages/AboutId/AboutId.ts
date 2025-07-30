import { useTSElements, useTSExtractParams, useTSMetaData } from '../../utils/hooks';
import { html } from '../../utils/define';

export default function AboutId(DOM: HTMLElement) {

    useTSMetaData({
        name: 'AboutId',
        description: '',
        author: ''
    });

    const { id } = useTSExtractParams("/aboutid/:id");

    const ui = useTSElements(
        DOM,
        html`
    <div>
        <h1>AboutId</h1>
        <p>parameter id is :${id}</p>
    </div>
    `
    );

    return ui;
}
