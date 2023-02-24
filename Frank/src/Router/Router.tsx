import React from 'react'

import { createBrowserRouter } from 'react-router-dom';
import Cao from '../Crud/Cao/Cao';
import Escola from '../Crud/Escola/Escola';
import Usuario from '../Crud/Usuario/Usuario';
import ErroAplicacao from '../Layout/ErroAplicacao';
import LayOut from '../Layout/LayOut';
import Login from '../Login/Login';
import Teste from '../Teste_apagar/Teste';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    errorElement: <ErroAplicacao />,
    children: [{
      path: "escola",
      element: <Escola />,
      errorElement: <ErroAplicacao />
    },
    {
      path: "cao",
      element: <Cao />,
      errorElement: <ErroAplicacao />
    }
    ,
    {
      path: "usuarios",
      element: <Usuario />,
      errorElement: <ErroAplicacao />
    }
  ]
  },
  {
    path: "teste",
    element: <Teste />
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