import { json } from "@remix-run/node";
import { getAbout } from "../contentful.server";
import { Link, useLoaderData } from "@remix-run/react";

export const meta = () => {
    return [
        { title: "About | Harshil" },
        { name: "description", content: "About Harshil" },
    ];
};

export async function loader() {
    const about = await getAbout();
    return json({ about })
}

export default function () {
    const { about } = useLoaderData();
    return (
        <main className="container mx-auto">
            <h1 className="text-3xl sm:text-6xl">About</h1>
            <div className="mt-8 mb-8 w-1/2">
                {
                    <p>{about.longDescription}</p>
                }
            </div>
            <img src={about.image.url} alt={about.image.description} width={500} />
        </main>
    )
}