import App from "./components/main/App";
import * as Sentry from '@sentry/browser';

Sentry.init({dsn: process.env.SENTRY_DSN});

export default App