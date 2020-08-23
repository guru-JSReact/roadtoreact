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
const DEFAULT_HPP = '100';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
        }
    }

    setSearchTopStories = (result) => {
        const {hits, page} = result;
        const {searchKey, results} = this.state;
        const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
        const updatedHits = [...oldHits, ...hits];
        this.setState({
            result,
            [searchKey]: {hit: updatedHits, page}
        });

    }

    componentDidMount() {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm);
    }
    needsToSearchTopStories = (searchTerm)  => !this.state.results[searchTerm];


    onDismiss = (id) => {
        const { searchKey, results } = this.state; const { hits, page } = results[searchKey];
        const isNotId = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotId);
        this.setState({ results: {...results,
                [searchKey]: { hits: updatedHits, page }
            } });
    }

    fetchSearchTopStories = (searchTerm, page = 1) => {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
    }

    onSearchHandler = (event) => {
        this.setState({searchTerm: event.target.value})
    }
    onSearchSubmit = (event) => {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm);
        event.preventDefault();
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        }
    }

    render() {
        const {result, searchTerm, searchKey} = this.state;
        const page = (result && result[searchKey] && result[searchKey].page) || 0;
        const list = (result && result[searchKey] && result[searchKey].hits) || [];
        return (
            <div className="page">
                <Search
                    value={searchTerm}
                    onChange={this.onSearchHandler}
                    onSubmit={this.onSearchSubmit}
                >Search</Search>
                {
                    result &&
                    <List list={list}
                          onDismiss={this.onDismiss}
                    />
                }
                <div className="interactions">
                    <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                        More
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;
