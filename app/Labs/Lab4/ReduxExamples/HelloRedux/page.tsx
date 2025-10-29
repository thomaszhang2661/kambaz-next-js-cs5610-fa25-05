export default function Page() {
  // This route exists for folder structure only. The Redux-connected
  // client component is implemented in HelloRedux/HelloRedux.tsx and
  // is imported by the parent ReduxExamples page to avoid prerender
  // errors (server rendering without a Provider).
  return <div />;
}
