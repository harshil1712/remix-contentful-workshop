# Welcome to Contentful Remix Workshop!

In this workshop you will learn to build a portofilo website with [Remix](https://remix.run) and [Contentful](https://contentful.com).

This repository contains different branches. Each branch representing a separate step.

## Step 1

### Setup a Remix project

Fork and clone the repository. Alternatively, run the repo using GitHub CodeSpaces.

If you clone the repository on your local machine, make sure to run the following commond. This command will install all the required packages.

```sh
npm insalll
```

### Install and configure TailwindCSS

- In the [`remix.config.js`](./remix.config.js) file, set the `tailwind` plugin to `true`.

```js
module.exports = {
    ...
    // Add the below line
    tailwind: true,
}
```

- Run the following command to install tailwindcss.

```sh
npm install -D tailwindcss
```

- Run the command to create the `tailwind.config.js` file.

```sh
npx tailwindcss init
```

- In the `tailwind.config.js` file, add the file path.

```js
export default {
    // Update the below line
  content: ['./app/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Create `./app/tailwind.css` and add the following code.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Update the `./app/root.jsx` file.

```js
// Add the below line to import the Tailwind file
import stylesheet from "~/tailwind.css";
...

// Add the below code to link the Tailwind file
export const links = () => [
  { rel: "stylesheet", href: stylesheet },
];

```

### Create Blog and About pages

- Create `./app/routes/blog.jsx` and `./app/routes/about.jsx` files.
- Add the following code in the `blog.jsx` file.
```jsx
export default function () {
    return (
        <h1>Blog Page</h1>
    )
}
```

- Similarly, add the following code in the `about.jsx` file.
```jsx
export default function () {
    return (
        <h1>About Page</h1>
    )
}
```
### Create a Navigation component

- Create `./app/components/Nav.jsx`.
- Add the following code in the `Nav.jsx` file.

```jsx
import { NavLink } from "@remix-run/react";
import { useState } from "react";

export default function NavBar() {

    const [isOpen, setIsOpen] = useState(false);
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen((previous) => !previous);
    };

    return (
        <header className="sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-2">
            <div className="flex items-center justify-between px-4 py-2 sm:p-0">
                <div>
                    <NavLink to="/">
                        <span role="img" aria-label="dog" className="text-5xl">🐶</span>
                    </NavLink>
                </div>
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        className="focus:text-gray-800 hover:text-primary sm:hidden"
                        onClick={handleClick}
                    >
                        <svg
                            className="fill-current h-6 w-6"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                            ) : (
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            )}
                            <title>Menu</title>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="px-4 pb-2 items-center flex">
                <div
                    className={`${isOpen ? 'block' : 'hidden'
                        } sm:flex sm:justify-between sm:p-0 sm:text-lg`}
                >
                    <NavLink to="/blog" className="block py-1 underline-anim underline-animate sm:ml-4">
                        Blog
                    </NavLink>
                    <NavLink to="/about" className="mt-1 block py-1 underline-anim underline-animate sm:mt-0 sm:ml-4">
                        About
                    </NavLink>
                </div>
            </div>
        </header>
    )
}
```

- In the `./app/root.jsx` file, import the `NavBar` component.
```jsx
import NavBar from './components/Nav'

....

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <NavBar/>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

This will now render the Navigantion component on all the pages.

Once you have finished this step, head over to the [step-2 branch]().