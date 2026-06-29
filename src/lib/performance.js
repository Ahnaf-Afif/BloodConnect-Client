/**
 * Performance and accessibility utilities
 */

// Debounce hook for search and input optimization
export const debounce = (fn, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Throttle hook for scroll and resize events
export const throttle = (fn, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      fn(...args);
      lastCall = now;
    }
  };
};

// Lazy loading image utility
export const observeImages = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  return imageObserver;
};

// Accessibility - Focus management
export const moveFocus = (element) => {
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};

// Screen reader announcement
export const announce = (message, priority = "polite") => {
  const ariaLive = document.getElementById("aria-live");
  if (ariaLive) {
    ariaLive.setAttribute("aria-live", priority);
    ariaLive.textContent = message;
  }
};

// Performance monitoring
export const measurePerformance = (label) => {
  if (typeof window !== "undefined" && window.performance) {
    const start = performance.now();
    return () => {
      const end = performance.now();
      console.log(`${label}: ${(end - start).toFixed(2)}ms`);
    };
  }
  return () => {};
};
