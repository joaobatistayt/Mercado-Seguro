const statusTitulo = document.getElementById('status');
const statusContainer = document.querySelector('.container-status');
const statusIcone = statusContainer.querySelector('i');
const statusDesc = statusContainer.querySelector('p');

function verificarHorario() {
    const horaAtual = new Date();
    const horario = horaAtual.getHours();
    const hoje = horaAtual.getDay(); // 0 = domingo a 6 = sábado

    if(hoje === 0) { // Verifica se é domingo
        setStatus('fechado');
        return;
    }else{
        if (horario >= 7 && horario < 12) {
            setStatus('aberto');
        }else if (horario >= 13 && horario < 18) {
            setStatus('grade');
        }else {
            setStatus('fechado');
        }
    }
}

function setStatus(status) {
	switch (status) {
		case 'aberto':
            statusContainer.className = 'container-status btn-aberto';
			statusIcone.className = 'fa-solid fa-circle-check';
			statusTitulo.textContent = 'Aberto';
			statusDesc.textContent = 'Loja aberta para compras presenciais ou para agendar a retirada nos horários de atendimento pela grade.';
			break;
		case 'grade':
            statusContainer.className = 'container-status btn-grade';
			statusIcone.className = 'fa-solid fa-circle-exclamation';
			statusTitulo.textContent = 'Grade';
			statusDesc.textContent = 'Venda restrita à grade; agende sua retirada para este momento ou para outro horário.';
			break;
		case 'fechado':
            statusContainer.className = 'container-status btn-fechado';
			statusIcone.className = 'fa-solid fa-circle-xmark';
			statusTitulo.textContent = 'Fechado';
			statusDesc.textContent = 'Loja fechada agora; organize sua lista e agende a retirada para quando o atendimento na grade retornar.';
			break;
	}
}

verificarHorario();
setInterval(verificarHorario, 60000); //verifica por minuto
