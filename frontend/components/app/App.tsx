import React from 'react';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';

export function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div>
          <ul>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/evals">Evals</Link>
            </li>
          </ul>
        </div>
      ),
    },
    {
      path: '/tasks',
      async lazy() {
        const component = await import('@frontend/components/tasks/Tasks');
        return { Component: component.default };
      },
    },
    {
      path: '/evals',
      async lazy() {
        const component = await import('@frontend/components/evals/Evals');
        return { Component: component.default };
      },
    },
  ]);

  return <RouterProvider router={router} />;
}
