document.getElementById('simuladorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const valorBruto = parseFloat(document.getElementById('valor').value);
    const valeRefeicaoTipo = document.getElementById('valeRefeicaoTipo').value;
    const valeRefeicaoValor = parseFloat(document.getElementById('valeRefeicaoValor').value);
    const regimeTributario = document.getElementById('regimeTributario').value;
    const tipoPorte = document.getElementById('tipoPorte').value;

    let resultado;

    // Definindo o desconto de Vale Transporte 
    const valeTransportePercent = 0.06;  // 6% de desconto para vale transporte
    const valeTransporte = valorBruto * valeTransportePercent;

    let valeRefeicao = 0;

    // Cálculo do Vale Refeição
    if (valeRefeicaoTipo === 'fixo') {
        valeRefeicao = valeRefeicaoValor;
    } else if (valeRefeicaoTipo === 'percentual') {
        valeRefeicao = (valorBruto * (valeRefeicaoValor / 100));
    }

    // Verificando o tipo de contratação
    if (tipo === 'clt1') {
        // Cálculo de INSS para CLT
        let inss = 0;
        if (valorBruto <= 1302) {
            inss = valorBruto * 0.075;
        } else if (valorBruto <= 2571.29) {
            inss = valorBruto * 0.09;
        } else if (valorBruto <= 3856.94) {
            inss = valorBruto * 0.12;
        } else if (valorBruto <= 7507.49) {
            inss = valorBruto * 0.14;
        } else {
            inss = 1078.67;
        }

        let irrf = 0;
        if (valorBruto > 2259.20 && valorBruto <= 2826.65) {
            irrf = (valorBruto - inss) * 0.075 - 169.69;
        } else if (valorBruto <= 3751.05) {
            irrf = (valorBruto - inss) * 0.15 - 381.44;
        } else if (valorBruto <= 4664.68) {
            irrf = (valorBruto - inss) * 0.225 - 662.77;
        } else if (valorBruto > 4664.68) {
            irrf = (valorBruto - inss) * 0.275 - 896.00;
        }

        const totalDescontos = inss + irrf + valeTransporte + valeRefeicao;
        resultado = valorBruto - totalDescontos;

    } else if (tipo === 'pj') {
        if (tipoPorte === 'MEI1') {
            resultado = valorBruto - 71.60 - valeTransporte - valeRefeicao;
        } else if (tipoPorte === 'MEI2') {
            resultado = valorBruto - 75.60 - valeTransporte - valeRefeicao;
        } else if (tipoPorte === 'MEI3') {
            resultado = valorBruto - 76.60 - valeTransporte - valeRefeicao;
        } 
        let descmeepp = 0;
        
         if (tipoPorte === 'MEEPP') {
            if ((valorBruto *12) <= 180000) {
                descmeepp = (valorBruto *12) * 0.155;
            } else if ((valorBruto *12) <= 360000) {
                descmeepp = (valorBruto *12) * 0.18 - 4500;
            } else if ((valorBruto *12) <= 720000) {
                descmeepp = (valorBruto *12) * 0.195 - 9900;
            } else if ((valorBruto *12) <= 1800000) {
                descmeepp = (valorBruto *12) * 0.205 - 17100;
            } else if ((valorBruto *12) <= 3600000) {
                descmeepp = (valorBruto *12) * 0.23 - 62100;
            } else if ((valorBruto *12) <= 4800000) {
                descmeepp = (valorBruto *12) * 0.305 - 540000;
            }

            resultado = valorBruto - (descmeepp/12);

        } else if (regimeTributario === 'simples') {
            const aliquotaSimples = 0.06;
            const impostosSimples = valorBruto * aliquotaSimples;

            resultado = valorBruto - impostosSimples - valeTransporte - valeRefeicao;

        } else if (regimeTributario === 'lucroPresumido') {
            const irpj = valorBruto * 0.15;
            const csll = valorBruto * 0.09;
            const pis = valorBruto * 0.0065;
            const cofins = valorBruto * 0.03;
            const iss = valorBruto * 0.02;

            resultado = valorBruto - (irpj + csll + pis + cofins + iss) - valeTransporte - valeRefeicao;

        } else if (regimeTributario === 'lucroReal') {
            const irpj = valorBruto * 0.15;
            const csll = valorBruto * 0.09;
            const pis = valorBruto * 0.0165;
            const cofins = valorBruto * 0.076;
            const iss = valorBruto * 0.02;

            resultado = valorBruto - (irpj + csll + pis + cofins + iss) - valeTransporte - valeRefeicao;
        }
    }

    // Exibir o resultado
    document.getElementById('resultado').innerText = `Valor Líquido: R$ ${resultado.toFixed(2)}`;
});