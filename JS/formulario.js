let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

const itensResumo = document.getElementById('itens-resumo');
const totalValor = document.getElementById('total-valor');
const form = document.getElementById('form-finalizar');

if (carrinho.length === 0) {
    window.location.href = 'catalogo.html';
}

function mostrarItens() {
    itensResumo.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        
        const div = document.createElement('div');
        div.className = 'item-resumo';
        div.innerHTML = `
            <div class="item-resumo-info">
                <div class="item-resumo-nome">${item.nome}</div>
                <div class="item-resumo-qtd">Quantidade: ${item.quantidade}</div>
            </div>
            <div class="item-resumo-preco">R$ ${(item.preco * item.quantidade).toFixed(2)}</div>
        `;
        itensResumo.appendChild(div);
    });

    totalValor.textContent = `R$ ${total.toFixed(2)}`;
}

mostrarItens();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const horario = document.getElementById('horario').value;
    const veiculo = document.getElementById('veiculo').value;
   
    alert('Pedido enviado!');
    
    localStorage.removeItem('carrinho');
    window.location.href = 'catalogo.html';
});