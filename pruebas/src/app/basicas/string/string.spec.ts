//*Partes generales de una prueba

import { mensaje } from "./string"

//*Grupos de pruebas
// describe();
//*Una prueba en específico
// it();


describe('Pruebas de strings(breve descri de toda las pruebas agrupadas)', () => {

    it('Debe de regresar un string', () => {
        const resp = mensaje('Diego');
        
        expect( typeof resp ).toBe('string');
    })

    it('Debe de retornar un saludo con el nombre enviado', () => {
        const nombre = 'Diego'
        const resp = mensaje(nombre);
        
        expect(resp).toContain(nombre);
    })

})