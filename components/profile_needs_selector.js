import React, { Component } from "react";
import PropTypes from "prop-types";
import NeedsSelector from "./needs_selector";
import ProfileSelector from "./profile_selector";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import { css } from "react-emotion";

const root = css`
  padding: 25px;
  padding-top: 20px;
  background-color: #f5f5f5;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const styles = theme => ({
  summary: {
    opacity: "1 !important",
    userSelect: "inherit"
  },
  profileSelector: {
    borderBottom: "1px solid black",
    paddingBottom: "15px",
    marginBottom: "30px"
  },
  clearButton: {
    textDecoration: "underline",
    textTransform: "unset",
    fontSize: "60%",
    float: "right"
  },
  clearIcon: {
    fontSize: "100%",
    marginLeft: theme.spacing.unit,
    fontWeight: "bold"
  },
  filterTitle: {
    paddingRight: "0px",
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "22px"
  },
  gridItemButton: {
    textAlign: "center"
  }
});

export class ProfileNeedsSelector extends Component {
  state = {
    open: false
  };

  countSelected = () => {
    let selectedProfileFilters = 0;
    if (
      this.props.selectedPatronType !== "" ||
      this.props.selectedServiceType !== "" ||
      this.props.selectedStatusAndVitals !== "" ||
      this.props.selectedServiceHealthIssue !== ""
    ) {
      selectedProfileFilters = 1;
    }
    return (
      selectedProfileFilters + Object.values(this.props.selectedNeeds).length
    );
  };

  clearFilters = () => {
    this.props.setPatronType("");
    this.props.setServiceType("");
    this.props.setStatusAndVitals("");
    this.props.setServiceHealthIssue("");
    this.props.setSelectedNeeds({});
  };

  render() {
    const { t, pageWidth, store, classes } = this.props;
    return (
      <Paper className={root}>
        <h2 variant="title" className={classnames(classes.filterTitle)}>
          {t("filters")}{" "}
          {JSON.stringify(this.props.selectedNeeds) !== "{}" ||
          this.props.patronType !== "" ? (
            <Button
              className={classnames(classes.clearButton)}
              id="ClearFilters"
              variant="flat"
              size="small"
              style={{ color: "blue" }}
              onClick={() => {
                this.clearFilters();
              }}
            >
              {t("reset filters")} {"(" + this.countSelected() + ")"}
              <CloseIcon className={classnames(classes.clearIcon)} />
            </Button>
          ) : (
            ""
          )}
        </h2>

        <Grid container>
          <Grid item sm={12} className={classnames(classes.profileSelector)}>
            <ProfileSelector t={t} store={store} />
          </Grid>
          <Grid item sm={12}>
            <NeedsSelector t={t} pageWidth={pageWidth} store={store} />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapDispatchToProps1 = dispatch => {
  return {
    setPatronType: patronType => {
      dispatch({ type: "SET_PATRON_TYPE", data: patronType });
    },
    setServiceType: serviceType => {
      dispatch({ type: "SET_SERVICE_TYPE", data: serviceType });
    },
    setStatusAndVitals: statusType => {
      dispatch({ type: "SET_STATUS_TYPE", data: statusType });
    },
    setServiceHealthIssue: serviceHealthIssue => {
      dispatch({ type: "SET_HEALTH_ISSUE", data: serviceHealthIssue });
    },
    setSelectedNeeds: needsObject => {
      dispatch({ type: "SET_SELECTED_NEEDS", data: needsObject });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    selectedNeeds: reduxState.selectedNeeds,
    selectedPatronType: reduxState.patronType,
    selectedServiceType: reduxState.serviceType,
    selectedStatusAndVitals: reduxState.statusAndVitals,
    selectedServiceHealthIssue: reduxState.serviceHealthIssue,
    patronType: reduxState.patronType,
    pageWidth: reduxState.pageWidth
  };
};

ProfileNeedsSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  patronType: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  pageWidth: PropTypes.number.isRequired,
  setPatronType: PropTypes.func.isRequired,
  setServiceType: PropTypes.func.isRequired,
  setStatusAndVitals: PropTypes.func.isRequired,
  setServiceHealthIssue: PropTypes.func.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  store: PropTypes.object,
  selectedPatronType: PropTypes.string.isRequired,
  selectedServiceType: PropTypes.string.isRequired,
  selectedStatusAndVitals: PropTypes.string.isRequired,
  selectedServiceHealthIssue: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps1
)(withStyles(styles)(ProfileNeedsSelector));
