export default function Signature(
  props: { readonly data: string },
) {
  const draggable = false;
  
  return (
    <div
      class={`paper paper-shadow w-full max-w-[180px] mx-auto text-lighterdark overflow-hidden sm:overflow-visible`}
    >
      <div class="top-tape"></div>
      <div class={`w-full m-2 z-10`}>
        <div class={`flex justify-end`}>
          <img
            src={props.data}
            alt={props.data}
            draggable={draggable}
          />
        </div>
      </div>
    </div>
  );
}
