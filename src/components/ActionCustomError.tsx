import { actions, isInputError } from "astro:actions";

export function ActionCustomError() {
  return (
    <button onClick={async (e) => {
          e.preventDefault();
          console.log('clicked');
          const { data, error }  = await actions.customError.safe({
            name: 'liruifengv',
          });
          // handle result
          if (error) {
            if (isInputError(error)) {
              console.log("Handle Input error: ", error.fields);
            } else {
              console.log("Handle other errors: ", error.status, error.message);
            }
          } else {
            console.log("Success", data);
          }
        }}>
      click me
    </button>
  );
}