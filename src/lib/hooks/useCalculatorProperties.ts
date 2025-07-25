import { formatNumberWithCommas } from "../utils";

export function useCalculatorProperties(display: HTMLInputElement | null) {
    let current = "";

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
            else if (["/", "*", "-", "+"].includes(val)) bg = "bg-yellow-600";
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
            // Don't start with operator
            if (current === "") return;

            // Avoid duplicate operators
            const lastChar = current[current.length - 1];
            if (isOperator(lastChar)) return;
        }

        if (key === ".") {
            const lastNumber = current.split(/[\+\-\*\/]/).pop();
            if (lastNumber?.includes(".")) return;
        }

        current += key;
        display.value = current;
    };

    return { generateBtns, handleClick };
}
