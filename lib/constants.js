const ENV =
  typeof window !== 'undefined'
    ? window.__NEXT_DATA__.env
    : process.env

export const PORT = +ENV.PORT || 3000
export const PUBLIC_BASE_URL = ENV.PUBLIC_BASE_URL

export const SG_COLORS = ENV.SG_COLORS
export const SG_FONT_FAMILIES = ENV.SG_FONT_FAMILIES
export const SG_FONT_FACES = ENV.SG_FONT_FACES
export const SG_LOGO_PATH = ENV.SG_LOGO_PATH
export const SG_LOGO_VIEWBOX = ENV.SG_LOGO_VIEWBOX
export const SG_BRAND_MARK_PATH = ENV.SG_BRAND_MARK_PATH
export const SG_BRAND_MARK_VIEWBOX = ENV.SG_BRAND_MARK_VIEWBOX
export const SG_DYNAMIC_COMPONENT_BASE_URLS = ENV.SG_DYNAMIC_COMPONENT_BASE_URLS
