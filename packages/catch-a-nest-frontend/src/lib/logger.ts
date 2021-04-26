import getFirebaseAnalytics from './utils/getFirebaseAnalytics';

const logger = {
  get analytics() {
    return getFirebaseAnalytics();
  },
  pageView(location: string) {
    this.analytics?.logEvent('page_view', {
      page_location: location,
    });
  },
};

declare module '@firebase/analytics-types' {
  interface EventParams {
    page_location?: string;
  }
  type ExtendedEventNameString = EventNameString;

  interface FirebaseAnalytics {
    logEvent(
      eventName: ExtendedEventNameString,
      eventParams?: EventParams,
      options?: AnalyticsCallOptions
    ): void;
  }
}

export default logger;
