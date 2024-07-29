import {render, screen} from "@testing-library/react";
import AppButton from "@/components/appButton/AppButton";


describe('App Button', () => {
    it('Render label', () => {
        const text = 'ESTUDIANTES'
        render(<AppButton text={text}/>)
        const button = screen.getByText(text)
        expect(button).toBeInTheDocument()
    })

    it('Background when is active', () => {
        const text = 'ESTUDIANTES'
        render(<AppButton text={text} isActive={true}/>)
        const button = screen.getByText(text)
        expect(button).toBeInTheDocument()
        expect(button).toHaveStyle('background-color: var(--purple)')
    })

    it('Disable when loading', () => {
        const text = 'ESTUDIANTES'
        render(<AppButton text={text} isActive={true} disable={true}/>)
        const button = screen.getByText(text)
        expect(button.parentElement).toBeInTheDocument()
        expect(button.parentElement).toBeDisabled()
    })

    it('Append classes by props', () => {
        const text = 'ESTUDIANTES'
        const className = 'jestClass'
        render(<AppButton text={text} isActive={true} disable={true} className={className}/>)
        const button = screen.getByText(text)
        expect(button.parentElement).toBeInTheDocument()
        expect(button.parentElement).toHaveClass(className)
    })
})
