import {
  IMAGE_CHANGE_DELTA,
} from './constants';

export const calculateHeightForCarousel = (items: number) => {
  return items * IMAGE_CHANGE_DELTA;
};

