import en from '@/messages/en.json';
import bn from '@/messages/bn.json';

const dictionaries = {en, bn};

export function getDictionary(locale: string) {
  return locale === 'en' ? dictionaries.en : dictionaries.bn;
}
