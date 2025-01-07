import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { globalStyles } from '@styled';
import useSettings from '@state/settings';
import * as Tooltip from '@radix-ui/react-tooltip';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);
  const { isDarkTheme, setUserOld } = useSettings((state) => ({
    isDarkTheme: state.darkTheme,
    setUserOld: state.setUserOld,
  }));

  useEffect(() => {
    setMounted(true);
    globalStyles();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    return () => {
      setUserOld();
    };
  }, [isDarkTheme, setUserOld, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip.Provider>
      <Component {...pageProps} />
    </Tooltip.Provider>
  );
};

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  console.log(`${metric.name}: ${metric.value}`);
}

export default MyApp;
