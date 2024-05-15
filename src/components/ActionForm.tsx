import { actions } from "astro:actions";

export function ActionForm() {
  return (
    <form
      style={{ display: "flex", flexDirection: "column", width: "200px"}}
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const result = await actions.signUp(formData);
        // handle result
        if (result.success) {
          alert("Sign up successful!");
        }
      }}
    >
      <label htmlFor="username">username</label>
      <input id="username" type="text" name="username" />
      <label htmlFor="email">email</label>
      <input id="email" type="email" name="email" />
      <label htmlFor="password">password</label>
      <input id="password" type="password" name="password" />
      <br/>
      <button type="submit">Sign up</button>
    </form>
  );
}