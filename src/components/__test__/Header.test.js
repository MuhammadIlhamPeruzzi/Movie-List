import {render, fireEvent} from '@testing-library/react'
import Header from '../Header'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

it("check header render", () => {
    const history = createMemoryHistory();
    history.push = jest.fn();
    const { queryByTitle } = render(<Router history={history}><Header /></Router>);
    const header = queryByTitle("movie list");
    expect(header).toBeTruthy();
    expect(header.innerHTML).toBe("Movie List");
});

describe("redirect to root url when header title clicked", () => {
    it("click header title", () => {
        const history = createMemoryHistory();
        history.push = jest.fn();
        
        const { queryByTitle } = render(<Router history={history}><Header /></Router>);
        const header = queryByTitle("movie list");
        fireEvent.click(header);
        expect(history.push).toHaveBeenCalledWith('/');
    });
});
