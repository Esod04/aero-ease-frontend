import React from 'react';
import ReactDOM from 'react-dom/client';

// Material UI specific text theme
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Toaster } from 'react-hot-toast';

import { PNRRankingRulesContextProvider } from './context/PNRRankingRules';
import { FlightRankingRulesContextProvider } from './context/FlightRankingRules';
import { SelectFlightsContextProvider } from './context/SelectFlights';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <PNRRankingRulesContextProvider>
      <FlightRankingRulesContextProvider>
        <SelectFlightsContextProvider>
          <App />
          <Toaster />
        </SelectFlightsContextProvider>
      </FlightRankingRulesContextProvider>
    </PNRRankingRulesContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
