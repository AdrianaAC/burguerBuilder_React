import React, { Component } from "react";
import Model from "../../components/UI/Model/Model";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
      state={
          error: null
      }
      componentDidMount(){
          axios.interceptors.request.use(req => {
              this.setState({error: null})
              return req;
          })
          axios.interceptors.response.use(resp => resp, error => {
            this.setState({error: error})
          })
      }

      errorConfirmedHandler = () => {
          this.setState({error: null})
      }

    render() {
      return (
        <Aux>
          <Model show={this.state.error} modalClosed={this.errorConfirmedHandler}>{this.state.error ? this.state.error.message : null}
         </Model>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
