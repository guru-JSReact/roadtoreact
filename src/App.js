import React, {Component} from 'react';
import './App.css';
import Search from "./Search";

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walker',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'React1',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walker1',
        num_comments: 31,
        points: 41,
        objectID: 1,
    },
    {
        title: 'React2',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walker3',
        num_comments: 32,
        points: 42,
        objectID: 2,
    }
]

const isSearched = searchTerm => item => {
    console.log(item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: list,
            searchTerm: ""
        }
    }

    onDismiss = (id) => {
        const updateList = this.state.list.filter((item) => item.objectID !== id)
        this.setState({list: updateList});
    }

    onSearchHandler = (event) => {
        this.setState({searchTerm: event.target.value})
    }

    render() {
        const {list, searchTerm, onDismiss} = this.state;
        return (
            <div className="App">
                <Search
                    input={searchTerm}
                    onChange = {this.onSearchHandler}
                >
                    Search
                </Search>
                {
                    list.filter(isSearched(searchTerm)).map(item =>
                            <div key={item.objectID}>
                    <span>
                        <a href={item.url}>{item.title}</a>
                    </span>
                                <span>{item.author}</span>
                                <span>{item.num_comments}</span>
                                <span>{item.points}</span>
                                <span>
                            <button type="button"
                                    onClick={() => onDismiss(item.objectID)}>
                                Dismiss
                            </button>
                        </span>
                            </div>
                    )}
            </div>
        );
    }
}

export default App;
