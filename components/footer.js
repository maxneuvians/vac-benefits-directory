import React, { Component } from "react";
import PropTypes from "prop-types";
import { WordMark } from "@cdssnc/gcui";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import styled from "react-emotion";

const Div = styled("div")`
  width: 100%;
  background-color: #434343;
  height: 65px;
  color: #fff;
  text-align: center;
`;

class Footer extends Component {
  render() {
    const envDetails = process.env.CIRCLE_SHA1
      ? process.env.CIRCLE_SHA1.substring(0, 7)
      : process.env.NODE_ENV;

    return (
      <Div role="navigation">
        <Toolbar
          style={{
            padding: 0,
            marginLeft: "15px",
            marginRight: "15px",
            height: "100%"
          }}
        >
          <Button
            id="privacy"
            style={{ color: "#fff", paddingLeft: 0, textTransform: "none" }}
            href={this.props.t("privacy-link")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.t("Privacy")}
          </Button>
          <p style={{ flex: 1, color: "#fff" }}>Build: {envDetails}</p>
          <div style={{ height: "25px" }}>
            <WordMark width="6em" flag="#fff" text="#fff" />
          </div>
        </Toolbar>
      </Div>
    );
  }
}

Footer.propTypes = {
  t: PropTypes.func.isRequired
};

export default Footer;
