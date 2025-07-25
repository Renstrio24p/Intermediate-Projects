import { useCalculatorProperties } from "../../lib/hooks/useCalculatorProperties";
import html from "../../utils/define/html";
import { useTSElements } from "../../utils/hooks";
import { useTSEventAll } from "../../utils/hooks/useTSAllElements";

export default function Calculator(DOM: HTMLElement) {
    const display = DOM.querySelector<HTMLInputElement>("#calc-display");

    const { generateBtns, handleClick } = useCalculatorProperties(display);

    const ui = useTSElements(
        DOM,
        html`
    <div class="min-w-full min-h-screen grid place-items-center">
        <div class="max-w-4xl mx-auto">
            <div class="w-[400px] bg-gray-600 rounded-md min-h-[400px] p-2">
                <input type="text" id="calc-display"
                    class="w-full bg-gray-900 min-h-[40px] rounded-md px-4 text-white mb-2 text-right" readonly />
                ${generateBtns()}
            </div>
        </div>
    </div>
    `
    );

    useTSEventAll<MouseEvent>("[data-key]", "click", handleClick);

    return ui;
}
