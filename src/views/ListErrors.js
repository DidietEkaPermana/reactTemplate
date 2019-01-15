import React from 'react';
import { Alert } from 'reactstrap';

class ListErrors extends React.Component {
  render() {
    const errors = this.props.errors;
    if (errors) {
      return (
        Object.keys(errors).map(key => {
          return (
            <Alert color="danger">
              {key} {errors[key]}
            </Alert>
          );
        })
      );
    } else {
      return null;
    }
  }
}

export default ListErrors;
