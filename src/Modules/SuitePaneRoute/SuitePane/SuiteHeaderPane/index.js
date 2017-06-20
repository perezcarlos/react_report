import React, { Component } from 'react';
import jenkins from './../../../../jenkins';
import {
    ButtonGroup,
    Button,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap'


class SuiteHeaderPane extends Component {

    constructor (props){
        super(props);

        this.onRebuild=this.onRebuild.bind(this);
        this.onRebuildFailed=this.onRebuildFailed.bind(this);
        this.renderRebuild=this.renderRebuild.bind(this);
        this.renderRetried=this.renderRetried.bind(this);
        this.rebuildFailedButtonClass=this.rebuildFailedButtonClass.bind(this);
    }

    onRebuild () {
        return (
            jenkins.launch(this.props.additionalInfo, (response, error) => {
                if (error) {
                    this.props.showAlert({header: 'Rebuild failed', message: error.message, type: 'danger'})
                }
                else {
                    const message = `The build ${this.props.additionalInfo.build} for ${this.props.additionalInfo.suite} has been re-build correctly`;
                    this.props.showAlert({header: 'Rebuild success', message: message})
                }
            })
        )
    };

    onRebuildFailed () {
        const params = {
            ...this.props.additionalInfo,
            ...{failedSpecs: this.props.failedSpecs}
        };
        return (
            jenkins.launch(params, (response, error) => {
                if (error) {
                    this.props.showAlert({header: 'Rebuild failed', message: error.message, type: 'danger'})
                }
                else {
                    const message = `The failed specs in build ${this.props.additionalInfo.build} for ${this.props.additionalInfo.suite} has been re-build correctly`;
                    this.props.showAlert({header: 'Rebuild failed specs succeed ', message: message})
                }
            })
        )
    };

    rebuildFailedButtonClass () {
        if (this.props.failedSpecs.length === 0) {
            return {
                disabled: true
            }
        } else {
            return {
                disabled: false
            }
        }
    }

    renderRebuild () {
      return (
          <ButtonGroup className="rebuild-pane">
              <Button
                  bsStyle="primary"
                  onClick={this.onRebuildFailed}
                  {...this.rebuildFailedButtonClass()}
              >
                  Rebuild Failed
              </Button>
              <Button
                  bsStyle="primary"
                  onClick={this.onRebuild}
              >
                  Rebuild All
              </Button>
          </ButtonGroup>
      )
    };

    renderRetried () {
        if (this.props.additionalInfo.retried === "true") {
            return (
                <i
                    className="retried glyphicon glyphicon-repeat"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Retried execution"
                />
            )
        } else {
            return null
        }
    };

    render () {
        const statusTooltip = (
            <Tooltip id="tooltip" placement="bottom">{this.props.loadState}</Tooltip>
        );

        if (!this.props.additionalInfo) {
            return (
                <div className="suite-header panel-title">
                    <h1>Suite</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="suite-header panel-title">
                        <OverlayTrigger overlay={statusTooltip}>
                            <img
                                className="status-image"
                                src={this.props.statusImage}
                                alt="status"
                            />
                        </OverlayTrigger>
                        <span className="suite-title h1">
                            {(this.props.additionalInfo.suite || this.props.locationParams.selectedSuite).replace(/[_-]/g," ")}
                        </span>
                        <span className="build-number h4">
                            {`\t#${this.props.additionalInfo.build || this.props.locationParams.selectedBuild}`}
                        </span>
                        {this.renderRetried()}
                    </div>
                    {this.renderRebuild()}
                </div>
            )
        }
    }
};

export default SuiteHeaderPane;
