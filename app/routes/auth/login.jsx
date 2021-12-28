import { useActionData, json, redirect } from "remix";
import { db } from "~/utils/db.server";
import { login, createUserSession } from "~/utils/session.server";
import { registerUser } from "../../utils/session.server";

function validateUsername(username) {
  if (typeof username !== "string" || username.length < 3) {
    return "Username must be at least 3 characters";
  }
}

function validatePassword(password) {
  if (typeof password !== "string" || password.length < 6) {
    return "Password must be at least 6 characters";
  }
}

function badRequest(data) {
  return json(data, { status: 400 });
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const username = form.get("username");
  const password = form.get("password");

  const fields = { loginType, username, password };

  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return badRequest({ fieldErrors, fields });
  }

  switch(loginType) {
      case 'login': {
        const user = await login({username, password})

        if(!user){
          return badRequest({
            fields,
            fieldErrors: {username: 'Invalid username or password'}
          })
        }
        return createUserSession(user.id, '/startups')
      }
      case 'register': {
        const userExists = await db.user.findFirst({
          where: {
            username
          }
        })
        if(userExists) {
          return badRequest({
            fields,
            fieldErrors: {username: `User ${username} already exists`}
          })
        }
        //Create user 
       const user = await registerUser({username, password})
       if(!user){
         return badRequest({
           fields,
           fieldErrors: 'Something went wrong'
         })
       }
       return createUserSession(user.id, '/startups')
      }
      default: {
          return badRequest({
              fields,
              formError: 'Login type is not valid'
          })
      }
  }
};

function Login() {
  const actionData = useActionData();
  return (
    <div className="container">
      <div className="login-form">
        <div className="page-header">
          <h1>Login</h1>
        </div>
        <div className="page-content">
          <form action="" method="post">
            <fieldset>
              <legend>Login or Register</legend>
              <label>
                <input
                  type="radio"
                  name="loginType"
                  value="login"
                  defaultChecked={
                    !actionData?.fields?.loginType ||
                    actionData?.fields?.loginType === "login"
                  }
                />
                Login
              </label>
              <label>
                <input type="radio" name="loginType" value="register" />
                Register
              </label>
            </fieldset>
            <div className="username">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                defaultValue={actionData?.fields?.username}
              />
              <div className="error">
                {actionData?.fieldErrors?.username &&
                  actionData?.fieldErrors?.username}
              </div>
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                defaultValue={actionData?.fields?.password}
              />
              <div className="error">
                {actionData?.fieldErrors?.password &&
                  actionData?.fieldErrors?.password}
              </div>
            </div>
            <button className="btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
