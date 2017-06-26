import React, { Component } from 'react';

import BitPanel from '../BitPanel/BitPanel';

class BinaryCountingMain extends Component {
  render() {
    return (
      <div>
        <BitPanel numberToShow={0} angle={50} />
        <BitPanel numberToShow={1} angle={50} />
      </div>
    )
  }
}

export default BinaryCountingMain;
