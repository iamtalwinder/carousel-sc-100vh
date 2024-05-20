
import { useEffect, useCallback, useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import { AnimationType } from '../types';
import { calculateHeightForCarousel } from './helpers';
import { IMAGE_CHANGE_DELTA } from './constants';

export const useLockAndScrollEffect = (
  itemsLength: number,
  animationType: AnimationType,
  containerRef: React.RefObject<HTMLDivElement>,
  innerContainerRef: React.RefObject<HTMLDivElement>
) => {

  const [index, setIndex] = useState(0);
  const extraScrollLength = calculateHeightForCarousel(itemsLength);
  const currentHeaderHeight = 60; // Mock header height

  useEffect(() => {
    const height = window.innerHeight + extraScrollLength;

    if (!containerRef.current || !innerContainerRef.current || animationType !== AnimationType.SCROLLING_CAROUSEL) {
      return;
    }

    innerContainerRef.current.style.top = `${currentHeaderHeight}px`;

    containerRef.current.style.height = `${height}px`;
  }, [animationType, containerRef, extraScrollLength, innerContainerRef, itemsLength]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const containerTop = containerRef.current.getBoundingClientRect().top;
    const scrollY = window.scrollY;
    const startScrollPosition = containerTop + scrollY - currentHeaderHeight;
    const endScrollPosition = startScrollPosition + extraScrollLength;

    if (scrollY < startScrollPosition || scrollY > endScrollPosition) {
      return;
    }

    const diff = scrollY - startScrollPosition;
    const newIndex = Math.floor(diff / IMAGE_CHANGE_DELTA);

    if (newIndex !== index) {
      setIndex(newIndex);
    }
  }, [extraScrollLength, currentHeaderHeight, index, containerRef]);

  useEventListener('scroll', handleScroll);

  return index;
};
