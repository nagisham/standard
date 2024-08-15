import { $remove, $get, $set, Provider } from "./provider";

export function fetch_provider<S>(base: string, on_error: (error: unknown) => void = console.log): Provider<S> {
	return {
		[$get]: async (key) => {
      try {
        const response = await fetch(
          new URL(key.toString(), base),
          {
            method: "GET",
          }
        );
  
        if (response.ok){ 
          return await response.json();
        }
      } catch (error) {
        on_error(error);
      }
		},
		[$set]: async (key, value) => {
      try {
        await fetch(
          new URL(key.toString(), base),
          {
             method: "PUT",
             body: JSON.stringify(value),
             headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        on_error(error);
      }
		},
		[$remove]: async (key) => {
      try {
        const response = await fetch(
          new URL(key.toString(), base),
          {
            method: "DELETE"
          }
        );

        return response.ok;
      } catch (error) {
        on_error(error);
        return false;
      }
    },
	};
}
