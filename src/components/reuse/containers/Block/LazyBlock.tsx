"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./Block.module.scss";
import FlexDiv from "../../FlexDiv";

interface LazyBlockProps {
  children: React.ReactNode;
  threshold?: number; // Number of items to load initially
  loadIncrement?: number; // Number of items to load on scroll
}

export const LazyBlock: React.FC<LazyBlockProps> = ({
  children,
  threshold = 2, // Default to loading first 4 items
  loadIncrement = 2, // Load 4 more items on scroll
}) => {
  // Convert children to an array for easier manipulation
  const childrenArray = React.Children.toArray(children);

  // State to manage loaded items
  const [loadedItems, setLoadedItems] = useState<React.ReactNode[]>(
    childrenArray.slice(0, threshold)
  );

  // Ref for the last loaded item
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If all items are already loaded, return
    if (loadedItems.length >= childrenArray.length) return;

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load more items when last item is in view
            const currentLoadedCount = loadedItems.length;
            const newItems = childrenArray.slice(
              currentLoadedCount,
              currentLoadedCount + loadIncrement
            );

            setLoadedItems((prev) => [...prev, ...newItems]);
          }
        });
      },
      {
        rootMargin: "200px", // Start loading before item is fully in view
        threshold: 0.1,
      }
    );

    // Observe the last item
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    // Cleanup
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadedItems, childrenArray, loadIncrement]);

  return (
    <FlexDiv flex={{ direction: "column", y: "flex-start" }} width100>
      {loadedItems.map((child, index) => (
        <div
          key={index}
          ref={index === loadedItems.length - 1 ? observerRef : null}
        >
          {child}
        </div>
      ))}

      {/* Optional: Loading indicator */}
      {loadedItems.length < childrenArray.length && (
        <div className={styles.loadingIndicator}>Loading more...</div>
      )}
    </FlexDiv>
  );
};
