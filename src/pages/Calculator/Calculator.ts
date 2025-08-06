import { useCalculatorProperties } from "@/lib/hooks";
import { html, useTSElements, useTSEventAll } from "@devwareng/vanilla-ts";

export default function Calculator(DOM: HTMLElement) {
    const display = DOM.querySelector<HTMLInputElement>("#calc-display");

    const title = "Basic Calculator Project 1";

    document.title = title;

    const { generateBtns, handleClick } = useCalculatorProperties(display);

    const btns = generateBtns()

    const ui = useTSElements(
        DOM,
        html`
        <div class=" min-h-screen grid place-items-center">
            <div class="w-full md:max-w-4xl md:mx-auto p-4 grid place-items-center">
                <div class="w-full max-w-[400px] bg-gray-600 rounded-md min-h-[400px] p-2">
                    <input type="text" id="calc-display"
                        class="w-full bg-gray-900 min-h-[40px] rounded-md px-4 text-white mb-2 text-right" readonly />
                    ${btns}
                </div>
                <p class="py-1">Basic Calculator v1</p>
                <p class="text-xs text-gray-500">Made by
                    <a href="https://github.com/Renstrio24p" class="underline">Dev Waren</a>
                </p>
            </div>
        </div>
    `
    );

    useTSEventAll<MouseEvent>("[data-key]", "click", handleClick);

    return ui;
}
