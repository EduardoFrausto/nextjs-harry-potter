import {render, screen} from "@testing-library/react";
import AppInput from "@/components/appInput/AppInput";

describe('App Input', () => {
    it('Render label', () => {
        const text = 'Nombre'
        render(<AppInput type={'text'} label={text}/>)
        const label = screen.getByText(text)
        expect(label).toBeInTheDocument()
    })

    it('Render error message when showErrorMessage is true', () => {
        const text = 'Error message'
        render(<AppInput type={'text'} errorMessage={text} showErrorMessage={true}/>)
        const label = screen.getByText(text)
        expect(label).toBeInTheDocument()
    })

    it('Not render error message when showErrorMessage is false', () => {
        const text = 'Error message'
        const {queryByText} = render(<AppInput type={'text'} errorMessage={text} showErrorMessage={false}/>)
        expect(queryByText(text)).toBeNull()
    })

    it('Append classes by props', () => {
        const value = 'valor'
        const className = 'jestClass'
        render(<AppInput type={'text'} value={value} className={className} onChange={() => {
        }}/>)
        const input = screen.getByDisplayValue(value);
        expect(input.parentElement).toBeInTheDocument()
        expect(input.parentElement).toHaveClass(className)
    })
})
