// Tiny event bus so any "Add to cart" button can trigger the fly-to-cart
// animation without prop-drilling. <CartFly /> (mounted once in App) listens.
export interface FlyPayload {
  x: number; // origin center X (viewport px)
  y: number; // origin center Y (viewport px)
  image?: string;
}

export function flyToCart(payload: FlyPayload) {
  window.dispatchEvent(new CustomEvent("crave:fly", { detail: payload }));
}

/** Convenience: fire from a click event using the clicked element's center. */
export function flyToCartFromEvent(e: { currentTarget: Element }, image?: string) {
  const r = e.currentTarget.getBoundingClientRect();
  flyToCart({ x: r.left + r.width / 2, y: r.top + r.height / 2, image });
}
