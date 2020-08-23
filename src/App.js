import React, {Component} from 'react';
import './App.css';
import Search from "./Search";
import Button from "./Button";
import List from "./List";


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

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            searchTerm: DEFAULT_QUERY,
        }
    }

    setSearchTopStories = (result) => {
        this.setState({result});
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        this.fetchSearchTopStories(searchTerm);
    }

    onDismiss = (id) => {
        const isNot = item => item.objectID !== id;
        const updatedHits = this.state.result.hits.filter(isNot);
        this.setState({
            result: {...this.state.result, hits: updatedHits}
        });
    }

    fetchSearchTopStories = (searchTerm) => {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
    }

    onSearchHandler = (event) => {
        this.setState({searchTerm: event.target.value})
    }
    onSearchSubmit = (event) => {
        const {searchTerm} = this.state;
        this.fetchSearchTopStories(searchTerm);
        event.preventDefault();
    }

    render() {
        const {result, searchTerm} = this.state;

        if(!result) {
            console.log(result);
            return null;
        }
        return (
            <div className="page">
                <Search
                    value={searchTerm}
                    onChange={this.onSearchHandler}
                    onSubmit={this.onSearchSubmit}
                >Search</Search>
                {
                    result && <List list={result.hits}
                          onDismiss={this.onDismiss}
                    />
                }
            </div>
        );
    }
}

export default App;
