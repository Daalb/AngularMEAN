import { from, EMPTY, throwError } from 'rxjs';
import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';
 
 
describe('MedicosComponent', () => {
 
    let componente: MedicosComponent;
    //@ts-ignore
    const servicio = new MedicosService(null);
 
    beforeEach( () => {
        componente = new MedicosComponent(servicio);
    });
 
 
    it('Init: Debe de cargar los médicos', () => {
 
        const medicos = ['medico1', 'medico2', 'medico3'];
 
        spyOn( servicio, 'getMedicos' ).and.callFake( () => {
 
            return from( [ medicos ] );
        });
 
        componente.ngOnInit();
        expect( componente.medicos.length ).toBeGreaterThan(0);
   
    });
 

    it('Debe llamar al servidor para agregar un médico', () => {

        const espia = spyOn(servicio, 'agregarMedico').and.callFake(medico => {
            return EMPTY //*No intersa lo que retorno, por eso retorno vacio
        });

        componente.agregarMedico();
        expect(espia).toHaveBeenCalled()
    })


    it('Debe de agregar un nuevo médico al arreglo de médicos', () => {
        const medico = {id: 1, nombre: 'Juan'};

        spyOn(servicio,'agregarMedico')
            .and.returnValue( from( [medico]) )

        componente.agregarMedico();
        expect(componente.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0);
    })


    //*Probar errores en caso de que sucedan
    it('Si falla la adicion, la propieda mensajeError, debe ser igual al error del servicio', () => {

        const miError = 'No se pudo agregar al médico';
        spyOn(servicio, 'agregarMedico')
            .and.returnValue(throwError( () =>  miError));

        componente.agregarMedico();
        expect(componente.mensajeError).toBe(miError);
    });


    //*Simular una confirmación
    it('Debe de llamar al servidor para borrar un médico', () => {
        spyOn(window,'confirm').and.returnValue(true);

        const espia = spyOn(servicio, 'borrarMedico').and.returnValue(EMPTY);

        componente.borrarMedico('1');
        expect(espia).toHaveBeenCalledWith('1');

    })


    //*Simular una confirmación
    it('NO Debe de llamar al servidor para borrar un médico', () => {
        spyOn(window,'confirm').and.returnValue(false);

        const espia = spyOn(servicio, 'borrarMedico').and.returnValue(EMPTY);

        componente.borrarMedico('1');
        expect(espia).not.toHaveBeenCalledWith('1');

    })
 
});