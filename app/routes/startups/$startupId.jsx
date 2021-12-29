import { useLoaderData, redirect } from "remix";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";

export const loader = async ({ params, request }) => {
  const user = await getUser(request);

  const startup = await db.startup.findUnique({
    where: { id: params.startupId },
  });

  if (!startup) throw new Error("Startup not found");

  const data = { startup, user };
  return data;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();

  if (form.get("_method") === "delete") {
    const user = await getUser(request);

    const startup = await db.startup.findUnique({
      where: { id: params.startupId },
    });

    if (!startup) throw new Error("Startup not found");

    if (user && startup.userId === user.id) {
      await db.startup.delete({ where: { id: params.startupId } });
    }

    return redirect("/startups");
  }
};

function Startup() {
  const { startup, user } = useLoaderData();
  return (
    <div className="card">
      <h3>{startup.name}</h3>
      <p>{startup.content}</p>
      {/* {user.id === startup.userId && (
        <form action="" method="post">
          <input type="hidden" name="_method" value="delete" />
          <button className="btn">Delete</button>
        </form>
      )} */}
    </div>
  );
}

export default Startup;
