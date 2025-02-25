import '@/styles/globals.scss';

import env from '@beam-australia/react-env';
import DayjsAdapter from '@date-io/dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Loading from '@/components/shared/Loading';
import ModalWrapper from '@/modals/index';
import queryClient from '@/services/react-query';
import store, { persistor } from '@/store/index';
import WrapperRegistry from '@/wrappers/index';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <Head>
      <title>Reactive Resume</title>

      <meta
        name="description"
        content="Reactive Resume is a free and open source resume builder that's built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3."
      />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>

    <ReduxProvider store={store}>
      <LocalizationProvider dateAdapter={DayjsAdapter}>
        <PersistGate loading={null} persistor={persistor}>
          <GoogleOAuthProvider clientId={env('GOOGLE_CLIENT_ID')}>
            <QueryClientProvider client={queryClient}>
              <WrapperRegistry>
                <Loading />

                <Component {...pageProps} />

                <ModalWrapper />
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    duration: 4000,
                    className: 'toast',
                  }}
                />
              </WrapperRegistry>
            </QueryClientProvider>
          </GoogleOAuthProvider>
        </PersistGate>
      </LocalizationProvider>
    </ReduxProvider>
  </>
);

export default appWithTranslation(App);
