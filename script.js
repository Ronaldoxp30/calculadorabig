function calcular() {
    // Captura os valores dos inputs
    const valorVenda = parseFloat(document.getElementById('valorVenda').value);
    const compra = parseFloat(document.getElementById('compra').value);
    const ipi = parseFloat(document.getElementById('ipi').value) || 0; // Tratamento para valor opcional
    const credICMS = parseFloat(document.getElementById('cred_icms').value) || 0;
    const fretePercent = parseFloat(document.getElementById('frete').value) || 0;
    const desconto = parseFloat(document.getElementById('desconto').value) || 0;

    // Validação de campos obrigatórios
    if (isNaN(valorVenda) || isNaN(compra)) {
        alert("Por favor, preencha os campos obrigatórios corretamente.");
        return;
    }

    // Cálculo do Preço de Compra + IPI
    const precoCompra = compra * (1 + ipi / 100);

    // Cálculo do Crédito ICMS
    const creditoICMS = precoCompra * (credICMS / 100);

    // Cálculo do Preço de Venda
    const precoVenda = valorVenda;

    // Cálculo do Custo Final
    const custoFinal = precoCompra + (precoCompra * (fretePercent / 100)) - (precoCompra * (desconto / 100));

    // Cálculo da Margem
    const margem = precoVenda - custoFinal;

    // Exibe os resultados nos campos de saída
    document.getElementById('preco_compra').value = precoCompra.toFixed(2);
    document.getElementById('cred_icms_result').value = creditoICMS.toFixed(2);
    document.getElementById('preco_venda').value = precoVenda.toFixed(2);
    document.getElementById('custo_final').value = custoFinal.toFixed(2);
    document.getElementById('margem').value = margem.toFixed(2);
    document.getElementById('resultadoFrete').value = (precoCompra * (fretePercent / 100)).toFixed(2);

    // Recalcula a tabela
    calcularTabela();
}

function calcularTabela() {
    const ipi = parseFloat(document.getElementById('ipi').value) / 100 || 0;
    const credICMS = parseFloat(document.getElementById('cred_icms').value) / 100 || 0;

    const rows = document.querySelectorAll('#tabelaDivisores tbody tr');

    rows.forEach(row => {
        const valorDividir = parseFloat(row.querySelector('.valor-dividir').value);
        const resultadoIPICampo = row.querySelector('.resultado-ipi');
        const resultadoCredICMSCampo = row.querySelector('.resultado-cred-icms');

        if (!isNaN(valorDividir)) {
            const resultadoIPI = valorDividir / (1 + ipi);
            const resultadoCredICMS = valorDividir / (1 + credICMS);

            resultadoIPICampo.value = resultadoIPI.toFixed(2);
            resultadoCredICMSCampo.value = resultadoCredICMS.toFixed(2);
        } else {
            resultadoIPICampo.value = '';
            resultadoCredICMSCampo.value = '';
        }
    });
}

// Adiciona eventos para recalcular quando a página carrega
document.addEventListener('DOMContentLoaded', calcular);
