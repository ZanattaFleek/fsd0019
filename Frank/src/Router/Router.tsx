import React from 'react'

import { createBrowserRouter } from 'react-router-dom';
import Escola from '../Crud/Escola/Escola';
import ErroAplicacao from '../Layout/ErroAplicacao';
import LayOut from '../Layout/LayOut';
import Login from '../Login/Login';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    errorElement: <ErroAplicacao />,
    children: [{
      path: "escola",
      element: <Escola />,
      errorElement: <ErroAplicacao />
    }]
  },
  {
    path: "*",
    element: <Login />
  }

  /*
  {
    path: "/",
    element: <LayOut />,
    errorElement: <ErroAplicacao />,
    children: [
      {
        path: "cadastrocliente/:idCliente",
        element: <CadastroCliente />,
        errorElement: <ErroAplicacao />
      },
      {
        path: "cadastrofornecedor",
        element: <CadastroFornecedor />,
        errorElement: <ErroAplicacao />
      }
    ],
  },
  {
    path: "*",
    element: <ErroNavegacao />
  }
  */
]);