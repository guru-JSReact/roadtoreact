import React from 'react';
import ReactDOM from 'react-dom';
import {render} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Search from "./Search";
import Button from "./Button";
import List from "./List";
import App from './App';
//
// test('page', () => {
//     const {getByText} = render(<App/>);
//     const linkElement = getByText(/page/);
//     expect(linkElement).toBeInTheDocument();
// });

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('has a valid snapshot', () => {
        const component = renderer.create(
            <App/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Search', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div'); ReactDOM.render(<Search>Search</Search>, div); ReactDOM.unmountComponentAtNode(div);
    });
    test('has a valid snapshot', () => { const component = renderer.create(
        <Search>Search</Search>
    );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot(); });
});

describe('Button', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div'); ReactDOM.render(<Button>Give Me More</Button>, div); ReactDOM.unmountComponentAtNode(div);
    });
    test('has a valid snapshot', () => { const component = renderer.create(
        <Button>Give Me More</Button>
    );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot(); });
});

describe('List', () => {
    const props = {
        list: [
            { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
            { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' }, ],
    };

    it('renders without crashing', () => {
        const div = document.createElement('div'); ReactDOM.render(<Table { ...props } />, div);
    });
    test('has a valid snapshot', () => { const component = renderer.create(
        <List { ...props } /> );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot(); });
});


