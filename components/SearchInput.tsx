export function SearchInput(
  props: { readonly value: string; readonly onInput: (e: Event) => void;},
) {

  return (
    <input
      type="text"
      value={props.value}
      onInput={(e: Event) => {
        const maxLength = 12;
        const input = e.target as HTMLInputElement;
        if (input.value.length <= maxLength) {
          props.onInput(e);
        } else {
          input.value = input.value.slice(0, maxLength);
        }
      }}
      maxlength={12}
      class="w-full rounded text-lg outline-none py-0.5 px-3"
    />
  );
};