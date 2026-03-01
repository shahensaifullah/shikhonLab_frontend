'use client';

import {createContext, ReactNode, useContext} from 'react';

export type NestedMessages = {[key: string]: string | NestedMessages};

const IntlContext = createContext<{locale: string; messages: NestedMessages}>({
  locale: 'bn',
  messages: {}
});

export function NextIntlClientProvider({
  children,
  locale,
  messages
}: {
  children: ReactNode;
  locale: string;
  messages: NestedMessages;
}) {
  return <IntlContext.Provider value={{locale, messages}}>{children}</IntlContext.Provider>;
}

export function useLocale() {
  return useContext(IntlContext).locale;
}

function resolveKey(messages: NestedMessages, key: string): string | undefined {
  return key.split('.').reduce<string | NestedMessages | undefined>((acc, part) => {
    if (!acc || typeof acc === 'string') return undefined;
    return acc[part];
  }, messages) as string | undefined;
}

export function useTranslations(namespace?: string) {
  const {messages} = useContext(IntlContext);
  return (key: string) => {
    const fullPath = namespace ? `${namespace}.${key}` : key;
    return resolveKey(messages, fullPath) ?? fullPath;
  };
}
