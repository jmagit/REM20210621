function sum(a, b) {
    return a + b;
}

describe('Pruebas de suma', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
    it('adds 2 + 2 to equal 4', () => {
        expect(sum(2, 2)).toBe(4);
    });
});

describe.each([
    [1, 1, 2],
    [1, 2, 3],
    [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
    test(`returns ${expected}`, () => {
        expect(a + b).toBe(expected);
    });

    test(`returned value not be greater than ${expected}`, () => {
        expect(a + b).not.toBeGreaterThan(expected);
    });

    test(`returned value not be less than ${expected}`, () => {
        expect(a + b).not.toBeLessThan(expected);
    });
});

describe('Pruebas de expect', () => {
    test.todo('Pendiente...');
    test('null', () => {
        const n = null;
        expect(n).toBeNull();
        expect(n).toBeDefined();
        expect(n).not.toBeUndefined();
        expect(n).not.toBeTruthy();
        expect(n).toBeFalsy();
    });

    test('toMatchObject', () => {
        let punto = { x: 1, y: 2, z: 3 };
        expect(punto).toMatchObject({ x: 1, y: 2 });
    });

    test('cero', () => {
        const z = 0;
        expect(z).not.toBeNull();
        expect(z).toBeDefined();
        expect(z).not.toBeUndefined();
        expect(z).not.toBeTruthy();
        expect(z).toBeFalsy();
    });
    test('dos mas dos', () => {
        const value = 2 + 2;
        expect(value).toBeGreaterThan(3);
        expect(value).toBeGreaterThanOrEqual(3.5);
        expect(value).toBeLessThan(5);
        expect(value).toBeLessThanOrEqual(4.5);

        // toBe y toEqual son equivalentes para números
        expect(value).toBe(4);
        expect(value).toEqual(4);
    });
    test('adding floating point numbers', () => {
        const value = 0.1 + 0.2;
        expect(value).toBe(0.3);        // This won't work because of rounding error
        expect(value).toBeCloseTo(0.3); // This works.
    });

    const shoppingList = [
        'diapers',
        'kleenex',
        'trash bags',
        'paper towels',
        'milk',
    ];

    test('the shopping list has milk on it', () => {
        expect(shoppingList).toContain('milk');
        expect(new Set(shoppingList)).toContain('milk');
    });

    function compileAndroidCode() {
        throw new Error('you are using the wrong JDK');
    }

    test('compiling android goes as expected', () => {
        expect(() => compileAndroidCode()).toThrow();
        expect(() => compileAndroidCode()).toThrow(Error);

        // You can also use the exact error message or a regexp
        expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
        expect(() => compileAndroidCode()).toThrow(/JDK/);
    });
});

describe('Dobles de pruebas', () => {
    function forEach(items, callback) {
        for (let index = 0; index < items.length; index++) {
            callback(items[index]);
        }
    }
    test('Dobles de pruebas', () => {
        const mockCallback = jest.fn(x => 42 + x);
        forEach([0, 1, 2], mockCallback);

        // The mock function is called twice
        expect(mockCallback.mock.calls.length).toBe(3);

        // The first argument of the first call to the function was 0
        expect(mockCallback.mock.calls[0][0]).toBe(0);

        // The first argument of the second call to the function was 1
        expect(mockCallback.mock.calls[1][0]).toBe(1);

        // The return value of the first call to the function was 42
        expect(mockCallback.mock.results[1].value).toBe(43);

        const myMock = jest.fn();
        myMock.mockReturnValueOnce(false).mockReturnValueOnce(true);
        const result = [11, 12, 15].filter(num => myMock(num));
        expect(result).toHaveLength(1);
        expect(result[0]).toBe(12);
    });

    class Calc {
        sum(a, b) { return a + b; }
    }
    test('Sustitutos de pruebas', () => {
        //jest.mock('calc');
        let c = new Calc();
        expect(c.sum(2, 2)).toBe(4);
        const spy = jest.spyOn(c, 'sum').mockName('Mock sum');
        spy.mockReturnValue(5);
        expect(c.sum(2, 2)).toBe(5);
        expect(spy).toBeCalled();
    });
    test('async test', async () => {
        const asyncMock = jest.fn().mockResolvedValue(43);
        let rslt = await asyncMock(); // 43
        expect(rslt).toBe(43);
    });
});