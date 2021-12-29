import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  useLoaderData,
  ScrollRestoration,
  Scripts
} from "remix";

import globalStylesUrl from "~/styles/global.css";
import { getUser } from "./utils/session.server";

export function meta() {
  const title = "Startup Otaku";
  const description = "A blog about startup companies in Tokyo, Japan.";
  const keywords =
    "Remix, React, Javascript, Japan, Tokyo, Startups, Startup Otaku, Blog";

  return { title, description, keywords };
}

export const loader = async({request}) => {
  const user = await getUser(request)
  const data = {
    user
  }
  return data
}

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
        <Header />
        <Outlet />
        <ScrollRestoration />
       
        {process.env.NODE_ENV === "development" && <LiveReload />}
        <Scripts />
      </body>
    </html>
  );
}

export const Header = () => {
  const {user} = useLoaderData();
  return (
    <header>
      <div className="title">
        <h1>
          <Link to="/">
            <span>Startup</span>Otaku
          </Link>
        </h1>
      </div>
      <nav>
        
        <ul>
        
          <li key="startups">
            <Link to="/startups">Blog</Link>
          </li>
          <li key="contact">
            <Link to="/contact">Contact Us</Link>
          </li>
          {user ? (
            <li>
              <form action="/auth/logout" method="post">
                <button type="submit" className="btn">
                  Logout {user.username}
                </button>
              </form>
            </li>
          ) : (<li key="login">
            <Link to="/auth/login">Login</Link>
          </li>)}
        </ul>
      </nav>
    </header>
  );
};

export const links = () => [
  { rel: "stylesheet", href: globalStylesUrl },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  {
    href: "https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap",
    rel: "stylesheet",
  },
];

export function ErrorBoundary({error}){
  console.error(error)
  return (
      <div className="error">
          <h1>Error</h1>
          <p>{error.message}</p>
      </div>
  )
}
