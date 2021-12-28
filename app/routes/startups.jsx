import { Outlet, useLoaderData, Link } from "remix";
import { db } from "~/utils/db.server";

export const loader = async() => {
  const data = {
    startups: await db.startup.findMany({
      take: 20,
      select: { id: true, name: true, content: true, createdAt: true },
      orderBy: {name: "asc"}
    }),
  };

  return data;
};

function ShowAllStartups() {
  const { startups } = useLoaderData();

  return (
    <div className="startup-display">
      <div className="startups-list">
        <h3>All Startups</h3>
        <ul>
          {startups.map((startup) => (
            <Link to={startup.id}>
              <li key={startup.id}>
                <h2>{startup.name}</h2>
                {/* {new Date(post.createdAt).toLocaleDateString()} */}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="startup-info">
        <Outlet />
      </div>
    </div>
  );
}

export default ShowAllStartups;
