import { useEffect, useState } from 'react';

const ABORT_REASON = 'My useFetch Clean-up!';

const cache: Record<string, unknown> = {};

interface ErrorWithMessage {
  message: string;
}

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
  typeof error === 'object' &&
  error !== null &&
  'message' in error &&
  typeof error.message === 'string';

const toErrorWithMessage = (error: unknown) =>
  isErrorWithMessage(error) ? error : new Error(JSON.stringify(error));

export const useFetch = <T>(
  url: string,
  options: Record<string, string> = {},
  isCache: boolean = false,
  depArr: unknown[] = []
) => {
  // console.log('🚀  depArr:', depArr);
  const [result, setResult] = useState<T>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorWithMessage>();

  useEffect(() => {
    // console.log('useFetch>>', depArr);
    const abortController = new AbortController();
    const { signal } = abortController;

    (async function () {
      try {
        // console.log(url.substring(url.length - 12), '-->', cache);
        if (isCache && url in cache) {
          // console.log('cccccccccccccccc');
          setError(undefined);
          return setResult(cache[url] as T);
        }

        setLoading(true);
        const data = (await fetch(url, { ...options, signal }).then((res) => {
          if (res.ok) return res.json();
          throw new Error(`${res.status} ${res.statusText}`);
        })) as T;
        // console.log('🚀  data:', data);
        setResult(data);
        setError(undefined);

        if (isCache) {
          cache[url] = data;
          // console.log('cached>>', cache);
        }
        // console.log('useFetch.data>>', data);
      } catch (error) {
        if (error && String(error) !== ABORT_REASON) {
          console.error('Error>>', error, String(error));
          setError(toErrorWithMessage(error));
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => abortController.abort(ABORT_REASON);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depArr);

  // console.log('🚀  result:', result, error);
  return { data: result, isLoading, error };
};
