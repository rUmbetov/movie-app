import React from 'react';
import ReactDOM from 'react-dom/client';
import { Result } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import GenreContext from './GenreContext.jsx';
import App from './App.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Online>
      <GenreContext>
        <App />
      </GenreContext>
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
