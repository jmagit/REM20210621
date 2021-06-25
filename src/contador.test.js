import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from '@testing-library/react';
import Contador from './contador'

describe.skip('Contador como clase', () => {
    let cont = null;
    beforeEach(() => {
        cont = new Contador({ init: 10, delta: 2, min: 7, max: 13 });
    })
    test('Creación', () => {
        expect(cont).toBeDefined();
        expect(cont).not.toBeNull();
        console.log(cont);
        expect(cont.state.contador).toBe(10);
        expect(cont.props.delta).toBe(2);
    })
    test('Baja', () => {
        cont.baja();
        expect(cont.state.contador).toBe(8);
    })
    test('sube', () => {
        cont.sube();
        expect(cont.state.contador).toBe(12);
    })
})

describe('Contador como componente', () => {
    let container = null;
    beforeEach(() => {
        // configurar un elemento del DOM como objetivo del renderizado
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // limpieza al salir
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    // let cont = null;
    // beforeEach(() => {
    //     render(<Contador />)
    //     cont = new Contador({ init: 10, delta: 2, min: 7, max: 13 });
    // })
    test('Creación', () => {
        let comp;
        act(() => {
            comp = render(<Contador init={10} />, {container})
        })
        expect(container.textContent).toBe("10");
        expect(comp.getByTestId('pantalla').textContent).toBe("10");
        expect(screen.getByTestId('pantalla').textContent).toBe("10");
        expect(container.querySelector("h1").textContent).toBe("10");
        comp.unmount();
    })
    test('Creación con captura', () => {
        let comp;
        act(() => {
            comp = render(<Contador init={10} />)
        })
        expect(comp.container.textContent).toBe("10");
        expect(comp.container.querySelector("h1").textContent).toBe("10");
    })
    test('baja', () => {
        let comp;
        act(() => {
            comp = render(<Contador init={10} />, {container})
        })
        console.log(comp.asFragment());
        const firstRender = comp.asFragment();
        fireEvent.click(screen.getByDisplayValue('-'))
        expect(comp.container.querySelector("h1").textContent).toBe("9");
        console.log(comp.asFragment());
        fireEvent.click(screen.getByDisplayValue('-'))
        expect(comp.container.querySelector("h1").textContent).toBe("8");
    })
    test('sube', () => {
        let comp;
        act(() => {
            comp = render(<Contador init={10} />, {container})
        })
        fireEvent.click(screen.getByDisplayValue('+'))
        expect(comp.container.querySelector("h1").textContent).toBe("11");
        fireEvent.click(screen.getByDisplayValue('+'))
        expect(comp.container.querySelector("h1").textContent).toBe("12");
    })
    test('delta', () => {
        let comp;
        let delta = 2
        act(() => {
            comp = render(<Contador init={10} delta={delta} />, {container})
        })
        fireEvent.click(screen.getByDisplayValue('-'))
        expect(comp.container.querySelector("h1").textContent).toBe("8");
        fireEvent.click(screen.getByDisplayValue('+'))
        fireEvent.click(screen.getByDisplayValue('+'))
        expect(comp.container.querySelector("h1").textContent).toBe("12");
    })
    test('onCambia', () => {
        const mockCallback = jest.fn(x => x);
        let comp;
        act(() => {
            comp = render(<Contador init={10} onCambia={mockCallback} />, {container})
        })
        fireEvent.click(screen.getByDisplayValue('-'))
        expect(comp.container.querySelector("h1").textContent).toBe("9");
        expect(mockCallback).toBeCalled();
        expect(mockCallback).lastCalledWith(9);
        fireEvent.click(screen.getByDisplayValue('+'))
        expect(mockCallback).lastReturnedWith(10);
        fireEvent.click(screen.getByDisplayValue('+'))
        expect(mockCallback).lastReturnedWith(11);
    })
});