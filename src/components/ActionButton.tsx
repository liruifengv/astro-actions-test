import { actions } from "astro:actions";

export function ActionButton() {
  return (
    <button onClick={async (e) => {
          e.preventDefault();
          console.log('clicked');
          const result = await actions.click.safe({
            
          });
          console.log(result);
        }}>
      Sign Up
    </button>
  );
}