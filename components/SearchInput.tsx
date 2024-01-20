export function SearchInput(
  props: { value: string; onInput: (value: string) => void;},
) {

  return (
    <input
      type="text"
      value={props.value}
      onInput={props.onInput}
      class="w-full rounded text-lg outline-none py-0.5 px-3"
    />
  );
};