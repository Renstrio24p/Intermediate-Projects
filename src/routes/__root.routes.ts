import { Calculator, Home, NotFound, OpenAI } from "../pages";
import { useTSPurifier } from "../utils/hooks/useTSPurifier";
import { TSRouter } from "../utils/routes";

export const Router = (DOM: HTMLElement, websiteName: string) => {
    console.log(websiteName);
    const routes = new TSRouter(
        [
            {
                path: "/",
                element: () => Home(DOM, websiteName),
            },

            {
                path: "/calculate",
                element: () => Calculator(DOM),
            },

            {
                path: "/openai",
                element: () => OpenAI(DOM),
            },

            {
                path: "*",
                element: () => NotFound(DOM, websiteName),
            },
        ],
        [String(useTSPurifier(window.location.search))]
    );
    return routes.navigate("");
};
