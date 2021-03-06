import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { connect } from "react-redux";
import { logEvent } from "../utils/analytics";
import { uuidv4 } from "../utils/common";

export class NeedButton extends Component {
  guid = uuidv4();

  handleClick = id => {
    let newSelectedNeeds = JSON.parse(JSON.stringify(this.props.selectedNeeds));
    if (newSelectedNeeds.hasOwnProperty(id)) {
      delete newSelectedNeeds[id];
    } else {
      logEvent("FilterClick", "need", id);
      newSelectedNeeds[id] = id;
    }
    if (window && this.props.pageWidth >= 600) {
      window.scrollTo(0, 0);
    }
    this.props.setSelectedNeeds(newSelectedNeeds);
  };

  render() {
    const { t, need } = this.props;
    const id = need.nameEn.replace(/ /g, "-") + "-checkbox-" + this.guid;
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={this.props.selectedNeeds[need.id]}
            onChange={() => this.handleClick(need.id)}
            value={need.id}
            color="primary"
            id={id}
          />
        }
        label={t("current-language-code") === "en" ? need.nameEn : need.nameFr}
        htmlFor={id}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedNeeds: needsObject => {
      dispatch({ type: "SET_SELECTED_NEEDS", data: needsObject });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    needs: reduxState.needs,
    selectedNeeds: reduxState.selectedNeeds,
    pageWidth: reduxState.pageWidth
  };
};

NeedButton.propTypes = {
  need: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  pageWidth: PropTypes.number.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NeedButton);
