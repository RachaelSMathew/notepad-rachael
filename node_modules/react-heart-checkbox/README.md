# react-heart-checkbox

[![Build Status](https://travis-ci.org/sabertazimi/react-heart-checkbox.svg?branch=master)](https://travis-ci.org/sabertazimi/react-heart-checkbox)

React heart checkbox - [Online Demo](https://sabertazimi.github.io/react-heart-checkbox)

## Usage

```bash
$ yarn add react-heart-checkbox
$ npm install -S react-heart-checkbox
```

```js
import HeartCheckbox from 'react-heart-checkbox';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  onClick = (evnet, props) => {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    const { checked } = this.state;

    return (
      <>
        <h1>{checked ? 'checked' : 'unchecked'}</h1>
        <HeartCheckbox checked={checked} onClick={this.onClick} />
      </>
    );
  }
}

render(<Demo />, document.getElementById("app"));
```
