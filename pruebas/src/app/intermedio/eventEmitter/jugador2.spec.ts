import { Jugador2 } from './jugador2';



describe( 'Jugador 2 Emit',  () => {

    let jugador: Jugador2;

    beforeEach( () => jugador = new Jugador2() );

    it( 'Debe de emitir un evento cuando recibe daño', () => {

        let nuevoHP = 0;

        jugador.hpCambia.subscribe( hp => {//*Solo está escuchando, no dispara nada
            nuevoHP = hp;
        });

        jugador.recibeDanio(1000);//*Al recibir daño en la clase se realiza el cambio y se emite el nuevo Hp que es recibido en el subscribe de arriba ↑↑

        expect( nuevoHP ).toBe(0);

    });

    it( 'Debe de emitir un evento cuando recibe daño y sobrevivir si es menos de 100', () => {

        let nuevoHP = 0;

        jugador.hpCambia.subscribe( hp => nuevoHP = hp); //*En estas pruebas espera que termine para continuar

        jugador.recibeDanio(50);

        expect( nuevoHP ).toBe(50);

    });


});

