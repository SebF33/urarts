// usehooks-ts : https://usehooks-ts.com/react-hook/use-image-on-load
// useImageOnLoad
// Modifié par Sébastien Flouriot le 13/02/2024

import type { Any } from "any";
import { useState } from "preact/hooks";

interface ImageStyle {
  thumbnail: Any
  fullSize: Any
  fullSizeNoTransition: Any
}

interface ImageOnLoadType {
  handleImageOnLoad: () => void
  imageOnLoadStyle: ImageStyle
}

/**
 * Custom hook for handling image loading events and providing related CSS styles.
 * @deprecated This hook is deprecated and will be removed in a future release.
 * @returns {ImageOnLoadType} An object containing a function to handle image load events and related CSS styles.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-image-on-load)
 * @example
 * const { handleImageOnLoad, imageOnLoadStyle } = useImageOnLoad();
 * // Use handleImageOnLoad as the onLoad handler for the full-size image.
 * // Apply the CSS styles from the `imageOnLoadStyle` object to control visibility and transitions.
 */
export function useImageOnLoad(): ImageOnLoadType {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // Triggered when full image will be loaded.
  const handleImageOnLoad = () => {
    setIsLoaded(true)
  }

  const imageOnLoadStyle: ImageStyle = {
    // Thumbnail style.
    thumbnail: {
      visibility: isLoaded ? 'hidden' : 'visible',
      filter: 'blur(8px)',
      transition: 'visibility 0ms ease-out 500ms',
    },
    // Full image style.
    fullSize: {
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 500ms ease-in 0ms',
    },
    fullSizeNoTransition: {
      opacity: isLoaded ? 1 : 0,
    },
  }

  return { handleImageOnLoad, imageOnLoadStyle }
}