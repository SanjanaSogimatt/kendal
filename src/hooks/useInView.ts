import { useState, useEffect, useRef } from 'react';

export function useInView<T extends HTMLElement>() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0
      }
    );

    const element = ref.current; // Store current ref value

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element); // Use stored ref value
      }
    };
  }, []);

  return { ref, isInView };
}
