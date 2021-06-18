const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio')

lblEscritorio.innerText = escritorio
divAlerta.style.display = 'none'

const socket = io()


socket.on('connect', () => {
    btnAtender.disabled = false
})

socket.on('disconnect', () => {
    btnAtender.disabled = true
})

socket.on('ultimo-ticket', (payload) => {
    // lblNuevoTicket.innerText = "Ticket " + payload
})

socket.on('cola-tickets', (payload) => {
    if (payload === 0) {
        divAlerta.style.display = ''
        lblPendientes.style.display = 'none'
    }else{
        divAlerta.style.display = 'none'
        lblPendientes.style.display = ''
    }
    console.log(payload);
    lblPendientes.innerText = payload
})

btnAtender.addEventListener( 'click', () => {
   
    socket.emit('atender-ticket', {escritorio}, ({ok, ticket, message}) => {
        if(!ok){
            lblTicket.innerText = `Nadie`
            return divAlerta.style.display = ''
        }
        lblTicket.innerText = `Ticket ${ticket.numero}`

    })

    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket
    // });

});