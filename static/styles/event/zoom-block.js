// Bloquer CTRL + molette (desktop)
globalThis.addEventListener("wheel", (e) => {
  if (e.ctrlKey) e.preventDefault();
}, {
  passive: false
});

// Bloquer CTRL + +/- (desktop)
globalThis.addEventListener("keydown", (e) => {
  const plus = e.key === "+" || e.key === "=";
  const minus = e.key === "-";
  if ((e.ctrlKey || e.metaKey) && (plus || minus)) {
    e.preventDefault();
  }
});

// Bloquer pinch / gesture (Safari iOS)
["gesturestart", "gesturechange", "gestureend"].forEach((evt) =>
  globalThis.addEventListener(evt, (e) => e.preventDefault())
);