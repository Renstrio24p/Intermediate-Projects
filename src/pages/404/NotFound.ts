import { useTSElements } from "@/utils/hooks";

const NotFound = (DOM: HTMLElement, websiteName: string) => {
  document.title = `404 - Page Not Found | ${websiteName}`;

  const ui = useTSElements(
    DOM,
    /*html*/ `
      <section class="flex flex-col items-center justify-center min-h-screen text-center px-4 py-12">
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlnZnQ2aWQ5ZXphZmdvbW92ZHBzdzZlOXEzZjA4dXYwMWNhdzZpcCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/v1YyNw9tBHrJK/giphy.gif" 
          alt="Tarzan plug gif" 
          class="w-72 h-auto mb-8 rounded-xl shadow-lg" 
        />
        <h1 class="text-3xl font-bold mb-4">Oops! Page Not Found</h1>
        <p class="text-gray-500 mb-6">Looks like Tarzan unplugged the page!</p>
        <a href="/" class="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">Go Back Home</a>
      </section>
    `
  );

  return ui;
};

export default NotFound;
