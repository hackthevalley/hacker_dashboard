import React, { Component } from 'react';

export class Page extends Component {
  render() {
    const { title, children } = this.props;
    return <main className="page">
      <h1 className="page__header">{ title }</h1>
      { children }
    </main>
  }
}