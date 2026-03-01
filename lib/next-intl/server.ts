import type {NestedMessages} from './index';

export function setRequestLocale(locale: string) {
  void locale;
}

export function getRequestConfig(
  factory: (params: {locale: string}) => Promise<{locale: string; messages: NestedMessages}>
) {
  return factory;
}
