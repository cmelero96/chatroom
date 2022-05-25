import {fireEvent, render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Home from './Home';

describe('Home', () => {
  const ROOM_ID = '1234';
  let inputRoomElement, joinRoomElement;

  const setup = () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    inputRoomElement = screen.getByTestId('room-input');
    joinRoomElement = screen.getByText(/Join room/i);
  };

  beforeEach(() => setup());

  it('Renders input and button', () => {
    fireEvent.change(inputRoomElement, {target: {value: ROOM_ID}});

    expect(inputRoomElement).toBeInTheDocument();
    expect(joinRoomElement).toBeInTheDocument();
  });

  it('Changes the URL link to match the input room id', () => {
    fireEvent.change(inputRoomElement, {target: {value: ROOM_ID}});

    expect(joinRoomElement).toHaveAttribute('href', `/${ROOM_ID}`);
  });
});
