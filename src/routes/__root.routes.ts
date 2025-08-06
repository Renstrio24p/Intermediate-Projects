import { About, Calculator, Home, NotFound, OpenAI, AboutId, Tiktok } from "@/pages";
import { TSRouter, useTSParams, useTSPurifier } from "@devwareng/vanilla-ts";

export const Router = (DOM: HTMLElement, websiteName: string) => {

    useTSParams.getState()

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
                path: "/tiktok",
                element: () => Tiktok(DOM),
            },
            {
                path: "/tiktok/:id",
                element: () => Tiktok(DOM),
            },
            {
                path: "*",
                element: () => NotFound(DOM, websiteName),
            },
        ],
        [String(useTSPurifier(window.location.search)), "id", "sort", "name", "page", "pageSize"]
    );
    return routes.navigate("");
};
