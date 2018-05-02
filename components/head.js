// @flow

import React, { Component } from "react";
import NextHead from "next/head";
import { initGA, logPageView } from "../utils/analytics";

type Props = {
  title?: string,
  description?: string,
  t: mixed
};

class Head extends Component<Props> {
  props: Props;

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    return (
      <NextHead>
        <meta charSet="UTF-8" />
        <title>{this.props.title || this.props.t("title")}</title>
        <meta
          name="description"
          content={this.props.description || this.props.t("description")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
      </NextHead>
    );
  }
}

export default Head;
