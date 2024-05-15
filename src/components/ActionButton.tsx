import { actions } from "astro:actions";

export function ActionButton() {
  return (
    <button onClick={async (e) => {
          e.preventDefault();
          console.log('clicked');
          const result = await actions.click({
            name: 'liruifengv',
            massage: 'hello',
          });
          console.log(result);
          if (result.success) {
            alert(result.data);
          }
        }}>
      click me
    </button>
  );
}