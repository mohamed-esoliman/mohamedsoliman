import { useState, useEffect, useRef } from "react";

interface ScrollSpyOptions {
  offset?: number;
  threshold?: number;
}

export function useScrollspy(
  selectors: string[],
  options: ScrollSpyOptions = {}
) {
  const { offset = 0, threshold = 0.3 } = options;
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = selectors
      .map((selector) => {
        // Remove leading slash if present and ensure ID selector format
        const formattedSelector = selector.replace(/^\//, '');
        const idSelector = formattedSelector.startsWith('#') ? formattedSelector : `#${formattedSelector}`;
        return document.querySelector(idSelector);
      })
      .filter((element): element is Element => element !== null);

    if (elements.length === 0) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleElements = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aRatio = a.intersectionRatio;
            const bRatio = b.intersectionRatio;
            return bRatio - aRatio;
          });

        if (visibleElements.length > 0) {
          const mostVisible = visibleElements[0];
          setActiveId(mostVisible.target.id);
        }
      },
      {
        rootMargin: `-${offset}px 0px 0px 0px`,
        threshold,
      }
    );

    elements.forEach((element) => {
      if (observer.current) {
        observer.current.observe(element);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [selectors, offset, threshold]);

  return activeId;
} 