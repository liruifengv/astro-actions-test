import { actions, getActionProps } from "astro:actions";

export function ActionFormNoJS() {
  return (
    <form
      method="POST"
    >
      <input {...getActionProps(actions.newsletter)} />
      <label htmlFor="email2">Email</label>
      <input name="email2" type="email" id="email2" />

      <label htmlFor="receivePromo">Receive promotional emails</label>
      <input name="receivePromo" type="checkbox" id="receivePromo" checked onChange={()=>{
        console.log("checked")
      }}/>

      <button type="submit">Sign Up</button>
    </form>
  );
}