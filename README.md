# Welcome to Contentful Remix Workshop!

In this workshop you will learn to build a portofilo website with [Remix](https://remix.run) and [Contentful](https://contentful.com).

This repository contains different branches. Each branch representing a separate step.

## Step 2

### Update `_index.jsx` file

- Replace the default code in `_index.jsx` with the following code.

```jsx
export const meta = () => {
  return [
    // Update the title
    { title: "Harshil's Website" },
    // Update the description
    { name: "description", content: "Welcome to my website" },
  ];
};

export default function Index() {
  return (
    <div className="text-center mt-24 sm:mt-24">
      {/* Update Name and title */}
      <h1 className="text-3xl sm:text-6xl">Hello <span role="img" aria-label="wave">👋</span>, I'm Harshil</h1>
      <h2 className="mt-8 text-xl sm:text-3xl">Developer Advocate</h2>
      <div className="mt-8 sm:mt-16 flex justify-evenly sm:mx-64 mx-12">
        {/* Update GitHub Profile Link */}
        <a href="https://github.com/harshil1712" aria-label="GitHub Profile Link" target="_blank">
          <svg aria-hidden="true" class="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </a>
        {/* Update LinkedIn Profile Link */}
        <a href="https://linkedin.com/in/harshil1712" aria-label="LinkedIn Profile Link" target="_blank">
          <svg style={{ color: "blue" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"> <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" fill="blue"></path> </svg>
        </a>
      </div>
    </div>
  );
}

```

### Create Blog content type in Contentful

- Sign up for a free [Contentful]() account, if you don't already have one.
- In your empty space, click on the ***Content model*** tab.
- Click on the ***Design your content model*** button.
- Enter `Blog` in the **Name** field and click on the ***Create*** button.
- Click on the ***+ Add field*** button and select ***Text***.
- Enter `Title` in the ***Name*** field and click on ***Add and configure***.
- Under ***Setting*** > ***Field options***, select ***This field represents the Entry title***.
- Under ***Validation***, select ***Required field***.
- Click on the ***Confirm*** button.
- Similarly, add the following fields:
    - **Slug**
        - Type: Text (Short text)
        - Validation: Unique Field
        - Appearance: Slug
    - **Description**
        - Type: Text (Long text, full-text search)
        - Validation: Required field
        - Appearance: Multiple line
    - **Published Date**
        - Type: Date and time
        - Validation: Required field
        - Appreance: Format > Date only
    - **Content**
        - Type: Rich text
        - Allow hyperlinks: Only enable `Link to URL`
        - Allow embedded entries & assets: Only enable `Asset`
        - Validation: Required field
    - **Cover Image**
        - Type: Media
        - Validation: Required field
- Click on the ***Save*** button to save the newly created content type.

### Add entries for the blog

- Navigate to the ***Content*** tab and click on ***+ Add entry***.
- Enter the title of the blog article.
- Enter all the required fields.
- Add a new image, and publish the image.
- Click on the ***Publish*** button, to publish the article.

Similarly, create a couple of other entries.

### Create About content type in Contentful
- Create a new content type, called About with the following fields:
    - ***Name***
        - Type: Text (Short text)
        - Field Options: This field represents the Entry title
        - Validation: Required field
    - ***Short Description***
        - Type: Text (Short text)
        - Validation: Required field
    - ***Long Description***
        - Type: Text (Long text)
        - Validation: Required field
        - Appearance: Multiple line
    - ***GitHub Link***
        - Type: Text (Short text)
        - Validation: Required field
        - Validation: Match a specific patter > URL
    - ***LinkedIn Link***
        - Type: Text (Short text)
        - Validation: Required field
        - Validation: Match a specific patter > URL
    - ***Image***
        - Type: Media
        - Validation: Required field
- Click on the ***Save*** button to save the newly created content type.

### Add an entry for About

Create an entry for the About type. This will contain your information.

## Resources

- [Remix Docs](https://remix.run/docs)
- [Contentful Developer Portal](https://www.contentful.com/developers/)