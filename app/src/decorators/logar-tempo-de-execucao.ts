export function logarTempoDeExecucao(emSegundos: boolean = false) {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]) { //any[] = Array<any>
            //console.log('Iniciando logar tempo de execução'); //Os decorators são executados de cima para baixo, mas aplicados de baixo para cima, o que significa que o último decorator é aplicado primeiro, influenciando a execução do primeiro.
            let divisor = 1;
            let unidade = 'milisegundos';
            if(emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }
            const t1 = performance.now();
            //Chamar método original
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(t2-t1)/divisor} ${unidade}.`);
            retorno //O return "é facultativo!"
        };

         return descriptor; //O return "é facultativo!"
    }
}