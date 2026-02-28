export default function createNextIntlPlugin(_requestPath: string) {
  void _requestPath;
  return function withNextIntl<T>(config: T): T {
    return config;
  };
}
