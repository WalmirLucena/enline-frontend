import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { act } from "react-dom/test-utils";
import user from '@testing-library/user-event';

const someValues = [{ name: 'teresa teng' }];

describe("<App />", () => { 
  test('Render the page correctly', async () => {
    render(<App />);
    const inputElement = screen.getByText(/Arraste os seus arquivos aqui, ou clique para selecionar/i);
    expect(inputElement).toBeInTheDocument();
    const str = JSON.stringify(someValues);
    const blob = new Blob([str]);
    const fakeFile = new File([blob], 'test.png', {type: 'image/png'})
    File.prototype.text = jest.fn().mockResolvedValueOnce(str);
    const inputFile = screen.getByTestId(/input-file/i);
 
    user.upload(inputFile, fakeFile);
    await waitFor(() => expect(screen.getByTestId('file-list')).toBeTruthy());
});

});