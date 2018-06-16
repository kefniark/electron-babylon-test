import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Home from '../components/Home';
import Game from '../components/Game';

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <div>
      <Home />
      <Game />
      </div>
    );
  }
}

export default (HomePage as any as React.StatelessComponent<RouteComponentProps<any>>);
