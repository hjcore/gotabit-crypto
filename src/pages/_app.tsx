import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { Provider as StoreProvider } from 'react-redux';
import store from '@store/index';
import { LocalTraceTypeKey, otelTracer, TraceType } from '@utils/otel';
import { useCallback, useEffect } from 'react';
import OtelTracerContext from '../context/otelTracer/otelTracerContext';

declare global {
  interface Window {
    ENV: {
      NEXT_PUBLIC_OTEL_SERVICE_NAME?: string;
    };
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const [traceType, setTraceType] = useLocalStorage<TraceType | null>({
    key: LocalTraceTypeKey,
    defaultValue: null,
    getInitialValueInEffect: true,
  });

  const mutateTraceType = useCallback(
    (newTraceType: TraceType) => {
      if (newTraceType === traceType) return;
      setTraceType(newTraceType);
    },
    [setTraceType, traceType]
  );

  useEffect(() => {
    otelTracer(traceType);
  }, [traceType]);

  return (
    <>
      <Head>
        <title>Default</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content="Default" />
        <meta name="keywords" content="Default" />
        <meta name="author" content="Default" />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <OtelTracerContext.Provider value={{ traceType, setTraceType: mutateTraceType }}>
              <StoreProvider store={store}>
                <Component {...pageProps} />
              </StoreProvider>
            </OtelTracerContext.Provider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
