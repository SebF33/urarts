import { BG_STYLE } from "@utils/constants.ts";
import { colorScheme, currentColorScheme, extraColors } from "@utils/colors.ts";
import { useLayoutEffect } from "preact/hooks";


export type BackgroundStyle = {
  background?: string;
  backgroundAttachment?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
};

export type PageBackgroundConfig = {
  bodyBackgroundColor?: string;
  mainSelector?: string;
  mainStyle?: BackgroundStyle;
  removeMainBackground?: boolean;
};


const MAIN_BACKGROUND_PROPERTIES = [
  "background",
  "background-attachment",
  "background-position",
  "background-size",
] as const;


export const PAGE_BACKGROUNDS = {
  about: {
    bodyBackgroundColor: colorScheme[currentColorScheme].gray,
    mainSelector: '[data-name="about"]',
    mainStyle: {
      background: "url(/background/white)",
      backgroundAttachment: "local",
      backgroundPosition: "center",
      backgroundSize: "2400px",
    },
  },

  artists: {
    bodyBackgroundColor: colorScheme[currentColorScheme].gray,
    mainSelector: '[data-name="artists"]',
    mainStyle: {
      background: "url(/background/gray)",
      backgroundAttachment: "local",
      backgroundPosition: "center",
      backgroundSize: "3400px",
    },
  },

  arts: {
    bodyBackgroundColor: colorScheme[currentColorScheme].gray,
    mainSelector: '[data-name="arts"]',
    mainStyle: {
      background: "url(/background/gray)",
      backgroundAttachment: "local",
      backgroundPosition: "center",
      backgroundSize: "3200px",
    },
  },

  error: {
    bodyBackgroundColor: colorScheme[currentColorScheme].gray,
    mainSelector: '[data-name="error"]',
    mainStyle: {
      background: "url(/background/white)",
      backgroundAttachment: "local",
      backgroundPosition: "center",
      backgroundSize: "3400px",
    },
  },

  histocharacters: {
    bodyBackgroundColor: colorScheme[currentColorScheme].gray,
    mainSelector: '[data-name="histocharacters"]',
    mainStyle: {
      background: "url(/background/white)",
      backgroundAttachment: "local",
      backgroundPosition: "center",
      backgroundSize: "346px",
    },
  },

  home: {
    bodyBackgroundColor: colorScheme[currentColorScheme].gray,
    mainSelector: '[data-name="home"]',
    mainStyle: {
      background: "url(/background/gray)",
      backgroundAttachment: "local",
      backgroundPosition: "center",
      backgroundSize: "466px",
    },
  },

  indicators: {
    bodyBackgroundColor: colorScheme[currentColorScheme].gray,
    mainSelector: '[data-name="indicators"]',
    mainStyle: {
      background: "url(/background/gray)",
      backgroundAttachment: "local",
      backgroundPosition: "center",
      backgroundSize: "2800px",
    },
  },

  movements: {
    bodyBackgroundColor: colorScheme[currentColorScheme].gray,
    mainSelector: '[data-name="movements"]',
    mainStyle: {
      background: "url(/background/gray)",
      backgroundAttachment: "local",
      backgroundPosition: "center",
      backgroundSize: "3700px",
    },
  },

  talents: {
    bodyBackgroundColor: colorScheme[currentColorScheme].gray,
    mainSelector: '[data-name="talents"]',
    mainStyle: {
      background: "url(/background/gray_half)",
      backgroundAttachment: "local",
      backgroundPosition: "center",
      backgroundSize: "420px",
    },
  },

  women: {
    bodyBackgroundColor: colorScheme[currentColorScheme].gray,
    mainSelector: '[data-name="women"]',
    mainStyle: {
      background: "url(/background/white)",
      backgroundAttachment: "local",
      backgroundPosition: "center",
      backgroundSize: "3400px",
    },
  },

  worldmap: {
    bodyBackgroundColor: extraColors.water,
    mainSelector: '[data-name="worldmap"]',
    removeMainBackground: true,
  },
} satisfies Record<string, PageBackgroundConfig>;


export function applyPageBackground(config: PageBackgroundConfig) {
  const body = document.body;
  const main = config.mainSelector
    ? document.querySelector<HTMLElement>(config.mainSelector)
    : null;

  if (body) {
    body.style.backgroundColor = config.bodyBackgroundColor ?? "";
  }

  if (!main) return;

  if (config.removeMainBackground) {
    for (const prop of MAIN_BACKGROUND_PROPERTIES) {
      main.style.removeProperty(prop);
    }
    return;
  }

  if (config.mainStyle) {
    if (config.mainStyle.background !== undefined) {
      main.style.background = config.mainStyle.background;
    }

    if (config.mainStyle.backgroundAttachment !== undefined) {
      main.style.backgroundAttachment = config.mainStyle.backgroundAttachment;
    }

    if (config.mainStyle.backgroundPosition !== undefined) {
      main.style.backgroundPosition = config.mainStyle.backgroundPosition;
    }

    if (config.mainStyle.backgroundSize !== undefined) {
      main.style.backgroundSize = config.mainStyle.backgroundSize;
    }
  }
}


export function getTextureBasePath(isPersoGallery?: boolean) {
  return isPersoGallery ? "../../textures/" : "../textures/";
}


export function resetPageBackground(config?: PageBackgroundConfig) {
  const body = document.body;
  const main = config?.mainSelector
    ? document.querySelector<HTMLElement>(config.mainSelector)
    : null;

  if (body) {
    body.style.backgroundColor = "";
  }

  if (!main) return;

  for (const prop of MAIN_BACKGROUND_PROPERTIES) {
    main.style.removeProperty(prop);
  }
}


export function resolveArtModalBackground(
  movementSlug: string,
  basePath: string,
) {
  const rawBgStyle = BG_STYLE[movementSlug];

  if (rawBgStyle) {
    return {
      ...rawBgStyle,
      background:
        `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), ` +
        rawBgStyle.background.replace("../textures/", basePath),
    };
  }

  return {
    background: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), ` +
      `${colorScheme[currentColorScheme].gray} url(${basePath}default.png)`,
    backgroundSize: "480px",
  };
}


export function resolveBgStyleBackground(
  slug: string,
  basePath: string,
) {
  const rawBgStyle = BG_STYLE[slug];

  if (rawBgStyle) {
    return {
      background: rawBgStyle.background.replace("../textures/", basePath),
      backgroundAttachment: "local",
      backgroundPosition: "center",
      backgroundSize: rawBgStyle.backgroundSize,
    };
  }

  return {
    background: `${
      colorScheme[currentColorScheme].gray
    } url(${basePath}default.png)`,
    backgroundAttachment: "local",
    backgroundPosition: "center",
    backgroundSize: "480px",
  };
}


export function resolveCollectionBackground(
  slug: string,
  basePath: string,
) {
  return resolveBgStyleBackground(slug, basePath);
}


export function resolveCopyrightBackground(basePath = "../textures/") {
  return {
    background: `${
      colorScheme[currentColorScheme].gray
    } url(${basePath}default.png)`,
    backgroundAttachment: "local",
    backgroundPosition: "center",
    backgroundSize: "480px",
  };
}


export function usePageBackground(
  pageKey: keyof typeof PAGE_BACKGROUNDS,
) {
  useLayoutEffect(() => {
    const config = PAGE_BACKGROUNDS[pageKey];

    applyPageBackground(config);

    return () => {
      resetPageBackground(config);
    };
  }, [pageKey]);
}
