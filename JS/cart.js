let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

const btnCarrinho = document.getElementById('btn-carrinho');
const modalCarrinho = document.getElementById('modal-carrinho');
const btnFecharCarrinho = document.getElementById('btn-fechar-carrinho');
const carrinhoItens = document.getElementById('carrinho-itens');
const carrinhoVazio = document.getElementById('carrinho-vazio');
const carrinhoFooter = document.getElementById('carrinho-footer');
const totalPreco = document.getElementById('total-preco');
const cartBadge = document.getElementById('cart-badge');
const alertaCarrinho = document.querySelector('.alerta');

document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho();
    configurarEventos();
    // Verifica o carrinho apenas na página de início
    if (window.location.pathname.endsWith('index.html')) {
        verificarCarrinho();
    }

    const botoesAdd = document.querySelectorAll('.btn-add');
    
    botoesAdd.forEach(botao => {
        botao.addEventListener('click', function() {
            const card = this.closest('.card');
            const id = parseInt(card.dataset.produto);
            const nome = card.querySelector('h3').textContent;
            const precoTexto = card.querySelector('.produto-preco').textContent;
            const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));

            const produto = {
                id: id,
                nome: nome,
                preco: preco
            };

            adicionarAoCarrinho(produto);
        });
    });
});

function adicionarAoCarrinho(produto) {
    const itemExistente = carrinho.find(item => item.id === produto.id);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }
    
    salvarCarrinho();
    atualizarCarrinho();
    mostrarNotificacao(`${produto.nome} adicionado ao carrinho!`);
}

function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    salvarCarrinho();
    atualizarCarrinho();
}

function atualizarQuantidade(produtoId, novaQuantidade) {
    const item = carrinho.find(i => i.id === produtoId);
    
    if (item) {
        if (novaQuantidade <= 0) {
            removerDoCarrinho(produtoId);
        } else {
            item.quantidade = novaQuantidade;
            salvarCarrinho();
            atualizarCarrinho();
        }
    }
}

function atualizarCarrinho() {
    carrinhoItens.innerHTML = '';

    if (carrinho.length === 0) {
        carrinhoVazio.style.display = 'flex';
        carrinhoFooter.style.display = 'none';
        cartBadge.textContent = '0';
        return;
    }

    carrinhoVazio.style.display = 'none';
    carrinhoFooter.style.display = 'block';

    carrinho.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'carrinho-item';
        itemElement.innerHTML = `
            <div class="item-info">
                <div class="item-detalhes">
                    <p class="item-nome">${item.nome}</p>
                    <p class="item-preco">R$ ${item.preco.toFixed(2)}</p>
                </div>
            </div>
            <div class="item-controles">
                <button class="btn-menos" data-id="${item.id}">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <input type="number" class="quantidade-input" value="${item.quantidade}" data-id="${item.id}" min="1">
                <button class="btn-mais" data-id="${item.id}">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <button class="btn-remover" data-id="${item.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        carrinhoItens.appendChild(itemElement);
    });

    document.querySelectorAll('.btn-menos').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const item = carrinho.find(i => i.id === id);
            atualizarQuantidade(id, item.quantidade - 1);
        });
    });

    document.querySelectorAll('.btn-mais').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const item = carrinho.find(i => i.id === id);
            atualizarQuantidade(id, item.quantidade + 1);
        });
    });

    document.querySelectorAll('.quantidade-input').forEach(input => {
        input.addEventListener('change', () => {
            const id = parseInt(input.dataset.id);
            atualizarQuantidade(id, parseInt(input.value));
        });
    });

    document.querySelectorAll('.btn-remover').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            removerDoCarrinho(id);
        });
    });

    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    totalPreco.textContent = `R$ ${total.toFixed(2)}`;

    const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    cartBadge.textContent = totalItens;
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function configurarEventos() {
    
    document.getElementById('btn-carrinho').addEventListener('click', (e) => {
        e.preventDefault();
        modalCarrinho.classList.add('ativo');
    });

    
    btnFecharCarrinho.addEventListener('click', () => {
        modalCarrinho.classList.remove('ativo');
    });

   
    modalCarrinho.addEventListener('click', (e) => {
        if (e.target === modalCarrinho) {
            modalCarrinho.classList.remove('ativo');
        }
    });


    document.querySelector('.btn-checkout').addEventListener('click', () => {
    if (carrinho.length > 0) {
        window.location.href = 'formulario.html';
    }
    });
}

function calcularTotal() {
    return carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0).toFixed(2);
}

function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.remove();
    }, 2000);
}
function verificarCarrinho() {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    const corpoPagina = document.querySelector('main');

    if (carrinhoSalvo.length > 0 && alertaCarrinho) {
        alertaCarrinho.style.display = 'flex';
        corpoPagina.classList.add('blurred');

        const btnManter = document.getElementById('Manter');
        if (btnManter) {
            btnManter.onclick = function() {
                window.location.href = 'catalogo.html';
            };
        }

        const btnLimpar = document.getElementById('Limpar');
        if (btnLimpar) {
            btnLimpar.onclick = function() {
                localStorage.removeItem('carrinho');
                carrinho = [];
                alertaCarrinho.style.display = 'none';
                corpoPagina.classList.remove('blurred');
                location.reload();
            };
        }
    }
}