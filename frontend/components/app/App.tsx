import React from 'react';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';

/**
 * Component creates 2 links, /tasks and /evals, which will render the Tasks and Evals components respectively.
 * Tasks and Evals component both have their own store setup, composed of slices unique to them, and one shared slice that is shared between them
 * Evals component is connected and has the interesting stuff in it
 */
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
              <Link to="/tasks/sub">Tasks Subdomain</Link>
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
      path: '/tasks/*',
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
