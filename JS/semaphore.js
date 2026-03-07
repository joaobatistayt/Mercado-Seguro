const statusTitulo = document.getElementById('status');
const statusContainer = document.querySelector('.container-status');
const statusIcone = statusContainer.querySelector('i');
const statusDesc = statusContainer.querySelector('p');

function verificarHorario() {
    const horaAtual = new Date();
    const horario = horaAtual.getHours();

    if (horario >= 7 && horario < 12) {
        setStatus('aberto');
    }else if (horario >= 13 && horario < 18) {
        setStatus('grade');
    }else {
        setStatus('fechado');
    }
}

function setStatus(status) {
	switch (status) {
		case 'aberto':
            statusContainer.className = 'container-status btn-aberto';
			statusIcone.className = 'fa-solid fa-circle-check';
			statusTitulo.textContent = 'Aberto';
			statusDesc.textContent = 'Loja aberta e operando normalmente';
			break;
		case 'grade':
            statusContainer.className = 'container-status btn-grade';
			statusIcone.className = 'fa-solid fa-circle-exclamation';
			statusTitulo.textContent = 'Grade';
			statusDesc.textContent = 'Atendimento pela grade, sem acesso ao interior da loja';
			break;
		case 'fechado':
            statusContainer.className = 'container-status btn-fechado';
			statusIcone.className = 'fa-solid fa-circle-xmark';
			statusTitulo.textContent = 'Fechado';
			statusDesc.textContent = 'Loja fechada no momento';
			break;
	}
}

verificarHorario();
setInterval(verificarHorario, 60000); //verifica por minuto
