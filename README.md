# Welcome to Contentful Remix Workshop!

In this workshop you will learn to build a portofilo website with [Remix](https://remix.run) and [Contentful](https://contentful.com).

This repository contains different branches. Each branch representing a separate step.

## Step 4

If you click on any blog, you will see be taken to a 404 page. In this step, you will learn to create dynamic routes in Remix.

### Update `contentful.server.js` file

Add and export the following function.
```js
async function getSingleBlogBySlug(slug) {
    const query = `
    query($slug: String){
        blogCollection(where: {slug: $slug}) {
          items {
            title
            description
            content {
                json
            }
            coverImage {
              url
              description
            }
          }
        }
      }
    `
    const variables = {
        slug: slug
    };
    const response = await apiCall(query, variables);
    const result = await response.json();
    console.log(result)
    return await result.data.blogCollection.items[0]
}
```

The above function queries for a blog article based on the slug.

### Add dynamic routes

- Create `blog_.$slug.jsx` file.
- Import the newly created function and use it in the `loader()` function.
```jsx
import { getSingleBlogBySlug } from "../contentful.server"
import { json } from "@remix-run/node"

export async function loader({ params }) {
    const blog = await getSingleBlogBySlug(params.slug)
    return json({ blog })
}
```
The `params` object contains the slug. You pass this slug to the function to fetch the respective content.
- Import the `useLoaderData()` hook and use it in the component.
```jsx
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getSingleBlogBySlug } from "../contentful.server"

export async function loader({ params }) {
    const blog = await getSingleBlogBySlug(params.slug)
    return json({ blog })
}

export default function () {
    const { blog } = useLoaderData()
    return (
        <main className="container mx-auto">
            <h1 className="mt-8 mb-8 text-3xl sm:text-6xl">{blog.title}</h1>
            <img src={blog.coverImage.url} width='100%' height='50%' className="mb-8" alt={blog.coverImage.description} />
        </main>
    )
}
```

The code will render the blog title and the cover image.

### Render Rich Text

- To render Rich Text, install the rich-text-render packages. Run the following command.
```sh
npm i @contentful/rich-text-react-renderer
```
- Update the imports in your `blog_.$slug.jsx` file.
```jsx
...
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
...
```

- Create the `richTextRenderOptions` object. In this object, you can define the style for the Rich Text content.
```jsx
export const richTextRenderOptions = {
    renderNode: {
        [INLINES.HYPERLINK]: (node, children) => {
            const { data } = node;
            const { uri } = data;
            return (
                <a
                    className="text-primary underline"
                    target="_blank"
                    href={uri}
                >
                    {children[0]}
                </a>
            );
        },
        [BLOCKS.PARAGRAPH]: (node, children) => {
            return (
                <p className="text-gray-700 text-baseleading-relaxed mb-4 text-justify">{children}</p>
            );
        },
        [BLOCKS.HEADING_1]: (node, children) => {
            return (
                <h2 className="text-4xl">{children}</h2>
            )
        },
        [BLOCKS.HEADING_2]: (node, children) => {
            return (
                <h2 className="text-3xl">{children}</h2>
            )
        }
    },
};
```

- Update the component to render the rich text.
```jsx
export default function () {
    const { blog } = useLoaderData()
    return (
        <main className="container mx-auto">
            <h1 className="mt-8 mb-8 text-3xl sm:text-6xl">{blog.title}</h1>
            <img src={blog.coverImage.url} width='100%' height='50%' className="mb-8" alt={blog.coverImage.description} />
            {documentToReactComponents(blog.content.json, richTextRenderOptions)}
        </main>
    )
}
```

### Add Meta data

- Add the following function to `blog_.$slug.jsx` file.
```jsx
export const meta = ({ data }) => {
    const { blog } = data;
    return [
        { title: blog.title },
        { name: "description", content: blog.description },
    ];
};
```


## Resources

- [Remix Docs](https://remix.run/docs)
- [Contentful Developer Portal](https://www.contentful.com/developers/)