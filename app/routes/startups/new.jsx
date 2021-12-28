import { Link, redirect, useActionData, json } from "remix";
import { db } from "~/utils/db.server";
import {getUser} from '~/utils/session.server';

const validateName = (name) => {
  if (typeof name !== "string" || name.length < 2) {
    return "Name should be at least 2 characters.";
  }
};

const validateContent = (content) => {
  if (typeof content !== "string" || content.length < 10) {
    return "Content should be at least 10 characters.";
  }
};

function badRequest (data) {
  return json(data, { status: 400 })
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const content = form.get("content");
  const user = await getUser(request)

  const fields = { name, content };

  const fieldErrors = {
    name: validateName(name),
    content: validateContent(content),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return badRequest({ fieldErrors, fields });
  }

  const startup = await db.startup.create({ data: {...fields, userId: user.id} });

  return redirect(`/startups/${startup.id}`);
};

function NewStartup() {
  const actionData = useActionData();
  return (
    <div>
      <div className="new-header">
        <h4>New Startup</h4>
      </div>

      <div className="new-form">
        <form method="post" className="new-input">
          <label htmlFor="name">Company Name</label>
          <input  
            type="text"
            name="name"
            id="name"
            placeholder="company name.."
            autoComplete="off"
            defaultValue={actionData?.fields?.name}
          />
          <div className="error">
            <p>
              {actionData?.fieldErrors?.name && actionData?.fieldErrors?.name}
            </p>
          </div>
          <label htmlFor="content">Startup Info</label>
          <textarea
            name="content"
            id="content"
            defaultValue={actionData?.fields?.content}
          ></textarea>
          <div className="error">
            <p>
              {actionData?.fieldErrors?.content &&
                actionData?.fieldErrors?.content}
            </p>
          </div>
          <div className="buttons">
            <button type="submit" className="btn">
              Submit
            </button>
            <Link to="/startups">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewStartup;
