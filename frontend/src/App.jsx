import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import 'graphiql/graphiql.css';
import './App.css';

function App() {
  const fetcher = createGraphiQLFetcher({
    url: 'http://localhost:4000/graphql',
  });

  return <GraphiQL fetcher={fetcher} />;
}

export default App;
