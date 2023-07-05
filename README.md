# Welcome to Contentful Remix Workshop!

In this workshop you will learn to build a portofilo website with [Remix](https://remix.run) and [Contentful](https://contentful.com).

This repository contains different branches. Each branch representing a separate step.

## Step 3

### Create `.env` file

To fetch content from Contentful, you need the Space ID, and the Access Token. Follow the steps mentioned below to generate new tokens.
- In Contentful, click on ***Settings*** and select ***API keys***
- Click on the ***+ Add API key*** button.
- Copy the displayed ***Space ID*** and the ***Content Delivery API - access token***.

- Rename `.env.example` to `.env`.
- Paste the previously copied credentials, respectively.

### Create `contentful.server.js`

Create a new file called `contentful.server.js`. This file will contain the code that fetches content from Contentful.

- Add the following code
```js
const SPACE = process.env.CONTENTFUL_SPACE_ID
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN

const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/master`;

async function apiCall(query, variables) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
    }
    return await fetch(fetchUrl, options)
}
```
The above code creates a resuable function that will be used to make API calls to Contentful.

> NOTE: This project uses the GraphQL API. Alternatively, you can use the REST API, or the JavaScript SDK to fetch content.

- Update the file with the following code. The below code fetches all the blogs from Contentful.

```js
async function getAllBlogs() {
    const query = `
    {
        blogCollection {
          items {
            title
            slug
            description
            coverImage {
              url
              description
            }
          }
        }
      }
    `
    const response = await apiCall(query);
    const result = await response.json();
    return await result.data.blogCollection.items
}
```

- Lastly, export the `getAllBlogs()` function.

```js
export { getAllBlogs }
```

### Render content from Contentful

You now get the list of blog articles from Contentful. In this step, you will render them on the Blog page.

- Import the required functions.
```jsx
import { json } from "@remix-run/node";
import { getAllBlogs } from "../contentful.server";
...
```

- Add the `loader()` function as follow. This loader function will fetch the blogs from Contentful when a user navigates to the Blog page.
```jsx
import ...

export async function loader() {
    const blogs = await getAllBlogs();
    return json({blogs})
}

...
```
- Import the `useLoaderData()` hook and use it in your component.
```jsx
...
import { Link, useLoaderData } from "@remix-run/react";
...

export default function () {
    const { blogs } = useLoaderData();
    return (
        <main className="container mx-auto">
            <h1 className="text-3xl sm:text-6xl">Blogs</h1>
            <ul className="mt-8">
                {
                    blogs.map(blog => {
                        return (
                            <li key={blog.slug} className="mb-8">
                                <Link to={blog.slug}>
                                    <div className="max-w-sm w-full lg:max-w-full lg:flex">
                                        <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${blog.coverImage.url})` }} title={blog.coverImage.description}>
                                        </div>
                                        <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                            <div className="mb-8">
                                                <div className="text-gray-900 font-bold text-xl mb-2">{blog.title}</div>
                                                <p className="text-gray-700 text-base">{blog.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}
```

### About Page

Similar to the Blog page, try creating a query that fetches content for the About content type. Render out this content on the About page.

## Resources

- [Remix Docs](https://remix.run/docs)
- [Contentful Developer Portal](https://www.contentful.com/developers/)