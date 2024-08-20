import React from 'react';
import ReactDOM from 'react-dom/client';
import { Result } from 'antd';

import App from './App.jsx';

import './index.css';

import { Offline, Online } from 'react-detect-offline';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Online>
      <App />
    </Online>
    <Offline>
      <Result
        status="error"
        title="Ошибка соединения"
        subTitle="Проверьте ваше интернет соединение и перезагрузите страницу"
      />
    </Offline>
  </>
);
