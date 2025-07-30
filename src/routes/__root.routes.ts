import { About, Calculator, Home, NotFound, OpenAI } from "../pages";
import AboutId from "../pages/AboutId/AboutId";
import { useTSParams } from "../utils/hooks";
import { useTSPurifier } from "../utils/hooks/useTSPurifier";
import { TSRouter } from "../utils/routes";

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
