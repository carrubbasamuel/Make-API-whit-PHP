async function getApi() {
    const response = await fetch('api.php');
    const data = await response.json();
    console.log(data);
    return data;
}

async function postApi(user) {
    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('name', user.name);
    formData.append('cognome', user.cognome);
    formData.append('email', user.email);
    formData.append('cell', user.cell);

    const response = await fetch('insert.php', { method: 'POST', body: formData });
    const INSERT = await response.text();
    console.log(INSERT);
    return INSERT;
}


async function deleteApi(id) {
    const response = await fetch('delete.php', {
        method: 'POST',
        body: id
    });

    const DELETE = await response.text();
    return DELETE;
}




class User{
    constructor(id, name, cognome, email, cell){
        this.id = id;
        this.name = name;
        this.cognome = cognome;
        this.email = email;
        this.cell = cell;
    }
    get user() {
        let tr = document.createElement('tr');
    
        let thId = document.createElement('th');
        thId.innerHTML = this.id;
        let tdName = document.createElement('td');
        tdName.innerHTML = this.name;
        let tdCognome = document.createElement('td');
        tdCognome.innerHTML = this.cognome;
        let tdEmail = document.createElement('td');
        tdEmail.innerHTML = this.email;
        let tdCell = document.createElement('td');
        tdCell.innerHTML = this.cell;
        let tdDelete = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Elimina';
        deleteButton.addEventListener('click', () => this.deleteUser());
        tdDelete.appendChild(deleteButton);
    
        tr.appendChild(thId);
        tr.appendChild(tdName);
        tr.appendChild(tdCognome);
        tr.appendChild(tdEmail);
        tr.appendChild(tdCell);
        tr.appendChild(tdDelete);
    
        return tr;
    }
    
    deleteUser() {
        console.log(this.id);
        // Chiamata API per eliminare l'utente dal database
        deleteApi(this.id).then(response => {
            console.log(response); // Mostra la risposta dal file PHP
            render(); // Aggiorna la visualizzazione dei dati dopo l'eliminazione
        });
    }
}


function insert(event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const cognome = document.getElementById('cognome').value;
    const email = document.getElementById('email').value;
    const cell = document.getElementById('cell').value;

    const user = new User(id, name, cognome, email, cell);

    postApi(user).then(response => {
        console.log(response); // Mostra la risposta dal file PHP
        clearInputs(); // Svuota gli input
        render(); // Aggiorna la visualizzazione dei dati
    });
}

function clearInputs() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('cognome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('cell').value = '';
}











function render() {
    let root = document.getElementById('root');
    root.innerHTML = ''; // Svuota il contenuto precedente
    getApi().then(data => {
        data.forEach(element => {
            let user = new User(element.id, element.nome, element.cognome, element.email, element.cell);
            root.appendChild(user.user);
        });
    });
}




window.onload = render;


