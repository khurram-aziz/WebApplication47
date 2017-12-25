import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

class AutoCompleteSimple extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dataSource: [] };
        this.onUpdateInput = this.handleUpdateInput.bind(this);
    }

    handleUpdateInput(value) {
        this.setState({
            dataSource: [value, value + value, value + value + value ]
        });
    }

    render() {
        return (
            <div>
                <AutoComplete
                    hintText="Type anything"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput.bind(this)} />
                <AutoComplete
                    hintText="Type anything"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput.bind(this)}
                    floatingLabelText="Full width"
                    fullWidth={true} />
            </div>
        );
    }
}

const MyAwesomeReactComponent = () => (
    <RaisedButton label="Default" />
);

const App = () => (
    <MuiThemeProvider>
        <div>
            <AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more" />
            <AutoCompleteSimple />
            <MyAwesomeReactComponent />
        </div>
    </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));