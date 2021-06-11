import {render, fireEvent, waitFor} from '@testing-library/react'
import MovieList from '../MovieList'
import { createMemoryHistory } from 'history';
import {Provider} from 'react-redux';
import store from '../../redux/store';

it("check search box and button search exist", () => {
    const history = createMemoryHistory();
    history.push = jest.fn();
    const { queryByLabelText, queryByTitle  } = render(
        <Provider store={store}>
            <MovieList />
        </Provider>
    
    );
    const searchBox = queryByLabelText("Search by title");
    expect(searchBox).toBeTruthy();
    const searchButton = queryByTitle("Submit");
    expect(searchButton).toBeTruthy();
});

describe("can search movie by search box", () => {
    it("can enter input on search box", () => {

        const { queryByLabelText } = render(
            <Provider store={store}>
                <MovieList/>
            </Provider>
        );
        const searchBox = queryByLabelText("Search by title");
        fireEvent.change(searchBox, {target:{value:'superman'}});
        expect(searchBox.value).toBe("superman")
    });

    it("can submit via button", async () => {
        
        const { queryByLabelText, queryByTitle } = render(
            <Provider store={store}>
                <MovieList />
            </Provider>
        );
        const searchBox = queryByLabelText("Search by title");
        fireEvent.change(searchBox, {target:{value:'superman'}});
        const searchButton = queryByTitle("Submit");
        fireEvent.click(searchButton);
        const listMovieContainer = queryByTitle("List Movie Container")
        await waitFor(() => {
            expect(listMovieContainer).toBeInTheDocument;
          })
    });
});