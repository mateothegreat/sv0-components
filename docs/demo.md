# Demoing Components

For all components, we want to have a demo page that shows the component in
action.

The demo server is started by running `pnpm demo` in the root of the project and
will be available at `http://localhost:5173`.

The routes are defined in `demo/src/routes/routes.ts` and are handled by the
`@mateothegreat/svelte5-router` SPA router package.

## Adding/Updating Demo Routes

After creating a new component, you need to add a new route to the demo server:

1. Add the route and imports to the `routes.ts` file to the appropriate group.
2. Test the demo server by running `pnpm demo` and navigating to the new route
   at `http://localhost:5173/<route-name>`.
