const useTSSelect = <T extends HTMLElement = HTMLElement>(selector: string): T | null => {
    const element = document.querySelector<T>(selector);
    if (!element) {
        console.warn(`No element found for selector: '${selector}'`);
        return null;
    }

    return element;
};

export { useTSSelect };
