import React, { useEffect, useRef, useState } from 'react';
import { AnimationType } from '../types';
import { useLockAndScrollEffect } from './hooks';

const items = ['green', 'red', 'blue', 'yellow', 'cyan'];

export function Carousel() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  const selectedIndex = useLockAndScrollEffect(
    items.length,
    AnimationType.SCROLLING_CAROUSEL,
    containerRef,
    innerContainerRef
  );

  useEffect(() => {
    setIndex(selectedIndex);
  }, [selectedIndex]);

  return (
    <div className="carousel__container" ref={containerRef}>
      <div className="carousel__inner-container" ref={innerContainerRef}>
        <div
          style={{ backgroundColor: items[index], height: '90vh' }}
          data-animation-type={AnimationType.SCROLLING_CAROUSEL}
          data-items={items.length}
        >
          Experience Fragment {index + 1}
        </div>
      </div>
    </div>
  );
}
