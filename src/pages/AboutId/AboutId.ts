import { html, useTSElements, useTSExtractParams, useTSMetaData } from "@devwareng/vanilla-ts";

export default function AboutId(DOM: HTMLElement) {

    useTSMetaData({
        name: 'AboutId',
        description: 'This is about page with Parameter Query',
        author: 'Sample Name'
    });

    const { id } = useTSExtractParams("/aboutid/:id");

    const ui = useTSElements(
        DOM,
        html`
        <div class="p-4">
            <h1 class="font-semibold">About with Params</h1>
            <p>parameter id is :${id}</p>
            <p>Free public APIs</p>
            <p>Animated ICONS</p>
        </div>
    `
    );

    return ui;
}
