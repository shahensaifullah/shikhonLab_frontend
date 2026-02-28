export function setRequestLocale() {}

export function getRequestConfig(
  factory: (params: {locale: string}) => Promise<{locale: string; messages: Record<string, unknown>}>
) {
  return factory;
}
