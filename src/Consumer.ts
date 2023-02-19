// @ts-nocheck
export default class Consumer {
    constructor (readonly name: string, readonly cpf: any) {
        this.name = name;
        this.cpf = cpf;

        if (!this.isValidCpf()) throw new Error("Invalid cpf");
    }

    isValidCpf () {
        if (this.cpf === null || this.cpf === undefined) return false;
        if (this.cpf.length < 11 || this.cpf.length > 14) return false;
        const cpfOnlyNumbers = this.cpf.replace('.','').replace('.','').replace('-','').replace(" ","");  
        if (cpfOnlyNumbers.split("").every(c => c === cpfOnlyNumbers[0])) return false;
        try {  
            let d1, d2 = 0;  
            let dg1, dg2, rest;  
            let digito;  
            let nDigResult;  
            d1 = d2 = 0;  
            dg1 = dg2 = rest = 0;  
            for (let nCount = 1; nCount < cpfOnlyNumbers.length -1; nCount++) {
                digito = parseInt(cpfOnlyNumbers.substring(nCount -1, nCount));  							
                d1 = d1 + ( 11 - nCount ) * digito;  
                d2 = d2 + ( 12 - nCount ) * digito;
            };
            rest = (d1 % 11);
            dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;  
            d2 += 2 * dg1;
            rest = (d2 % 11);  
            dg2 = (rest < 2) ? 0 : (11 - rest);
            let nDigVerific = cpfOnlyNumbers.substring(cpfOnlyNumbers.length-2, cpfOnlyNumbers.length);  
            nDigResult = `${dg1}${dg2}`;  
            return nDigVerific == nDigResult;
        } catch (e){  
            return false;  
        }
    }
}