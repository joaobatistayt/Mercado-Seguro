document.addEventListener('DOMContentLoaded', () => {
    const itensResumoContainer = document.getElementById('itens-resumo');
    const totalValorElement = document.getElementById('total-valor');
    const formFinalizar = document.getElementById('form-finalizar');

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    function renderizarResumo() {
        if (carrinho.length === 0) {
            itensResumoContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
            return;
        }

        itensResumoContainer.innerHTML = '';
        let total = 0;

        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;

            const divItem = document.createElement('div');
            divItem.className = 'item-resumo-linha'; 
            divItem.innerHTML = `
                <span>${item.quantidade}x ${item.nome}</span>
                <span>R$ ${subtotal.toFixed(2)}</span>
            `;
            itensResumoContainer.appendChild(divItem);
        });

        totalValorElement.textContent = `R$ ${total.toFixed(2)}`;
    }

    renderizarResumo();

    formFinalizar.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const horario = document.getElementById('horario').value;
        const veiculo = document.getElementById('veiculo').value;

        if (carrinho.length === 0) {
            alert("Adicione itens ao carrinho antes de enviar!");
            return;
        }

        let listaProdutos = "";
        let totalFinal = 0;

        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            totalFinal += subtotal;
            listaProdutos += `• *${item.quantidade}x* ${item.nome}\n`;
        });

        const telefoneVendedora = "5583993960168";         
        const mensagem = 
`*NOVO PEDIDO - MERCADO SEGURO* 🛒

*DADOS DO CLIENTE:*
👤 *Nome:* ${nome}
⏰ *Horário de Retirada:* ${horario}
🚗 *Veículo/Descrição:* ${veiculo}

*PRODUTOS:*
${listaProdutos}

_Aguardo confirmação da disponibilidade dos itens e valor final para realizar a retirada segura!_`;

        const urlFinal = `https://api.whatsapp.com/send?phone=${telefoneVendedora}&text=${encodeURIComponent(mensagem)}`;
        
        localStorage.removeItem('carrinho');
        
        window.open(urlFinal, '_blank');
    });
});