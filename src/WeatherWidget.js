import React, { useEffect } from 'react';

const WeatherWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'weatherwidget-io-js';
    script.src = 'https://weatherwidget.io/js/widget.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  }, []);

  return (
    <a className="weatherwidget-io" 
       href="https://forecast7.com/en/37d57126d98/seoul/" 
       data-label_1="SEOUL" 
       data-label_2="WEATHER" 
       data-theme="original" 
       >SEOUL WEATHER</a>
  );
};

export default WeatherWidget;
