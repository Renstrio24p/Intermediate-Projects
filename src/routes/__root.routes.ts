import { About, Calculator, Home, NotFound, OpenAI, AboutId } from "@/pages";
import { useTSParams, useTSPurifier } from "@/utils/hooks";
import { TSRouter } from "@/utils/routes";

export const Router = (DOM: HTMLElement, websiteName: string) => {

    useTSParams.getState()

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
                path: "/about",
                element: () => About(DOM),
            },
            {
                path: "/aboutid/:id",
                element: () => AboutId(DOM),
            },
            {
                path: "*",
                element: () => NotFound(DOM, websiteName),
            },
        ],
        [String(useTSPurifier(window.location.search)), "id", "sort"]
    );
    return routes.navigate("");
};
