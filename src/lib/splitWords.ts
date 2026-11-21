/**
 * Wraps every word of an element in an inline-block `.word` span while keeping
 * nested markup (e.g. <em>) intact. Returns the spans plus a restore function
 * that puts the original markup back so React's DOM is never left modified.
 */
export function splitWords(el: HTMLElement): {
  words: HTMLElement[];
  restore: () => void;
} {
  const original = el.innerHTML;
  const words: HTMLElement[] = [];

  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? "";
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        text.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          const span = document.createElement("span");
          span.className = "word";
          span.style.display = "inline-block";
          span.textContent = part;
          words.push(span);
          frag.appendChild(span);
        });
        child.parentNode?.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };

  walk(el);
  return {
    words,
    restore: () => {
      el.innerHTML = original;
    },
  };
}
