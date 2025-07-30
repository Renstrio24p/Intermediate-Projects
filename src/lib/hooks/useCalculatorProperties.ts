import { formatNumberWithCommas } from "../utils";

export function useCalculatorProperties(display: HTMLInputElement | null) {
    let current = "";

    const initialValue = "0";
    if (display) display.value = initialValue;

    const generateBtns = () => {
        const values = [
            "7", "8", "9", "C",
            "4", "5", "6", "/",
            "1", "2", "3", "*",
            "0", "00", ".", "-",
            "+", "="
        ];

        let buttons = `<div class="grid grid-cols-4 gap-3 mt-4">`;

        for (let i = 0; i < values.length; i++) {
            const val = values[i];
            let bg = "bg-gray-800";
            if (val === "C") bg = "bg-red-600";
            else if (["/", "*", "-", "+"].includes(val!)) bg = "bg-yellow-600";
            else if (val === "00") bg = "bg-gray-700";
            else if (val === "=") bg = "w-full col-span-3 bg-slate-800";

            buttons += `
      <button 
        class="${bg} text-white text-lg font-medium py-4 rounded-md cursor-pointer hover:scale-105 active:scale-95 transition-all duration-150"
        data-key="${val}"
      >${val}</button>`;
        }

        buttons += `</div>`;
        return buttons;
    };


    const isOperator = (char: string) => ["+", "-", "*", "/"].includes(char);

    const handleClick = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLButtonElement;
        const key = target.dataset.key;
        if (!display || !key) return;

        if (key === "C") {
            current = "";
            display.value = "0";
            return;
        }

        if (key === "=") {
            try {
                const result = Function(`return (${current})`)();
                current = String(result);
                display.value = formatNumberWithCommas(current);
            } catch {
                current = "";
                display.value = "Error";
            }
            return;
        }

        if (isOperator(key)) {
            if (current === "" || isOperator(current.slice(-1))) return;
        }

        if (key === ".") {
            const lastNumber = current.split(/[\+\-\*\/]/).pop();
            if (lastNumber?.includes(".")) return;
        }

        const lastSegment = current.split(/[\+\-\*\/]/).pop() ?? "";

        // Prevent starting with 0 or 00
        if ((key === "0" || key === "00") && current === "") return;

        // Prevent adding 0 or 00 after an operator like '+0' then '2' → '02'
        if ((key === "0" || key === "00") && lastSegment === "0") return;

        // Prevent numbers like 01, 002, 0003
        if (/^0\d/.test(lastSegment + key)) return;

        // Replace default "0" when typing a digit (but not when adding operator or dot)
        if (display.value === "0" && /^[0-9]$/.test(key)) {
            current = key;
            display.value = key;
            return;
        }

        current += key;
        display.value = current;
    };




    return { generateBtns, handleClick };
}
