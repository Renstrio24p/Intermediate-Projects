import { useTSSelect } from "@/utils/hooks";
import { useCalculatorProperties } from "./useCalculatorProperties";

const useCalculate = () => {
    const display = useTSSelect("#calc-display");

    const title = "Basic Calculator Project 1";

    document.title = title;

    const { generateBtns, handleClick } = useCalculatorProperties(display! as HTMLInputElement);

    const btns = generateBtns()

    return {
        display,
        title,
        btns,
        handleClick
    };
};

export { useCalculate };