<?php

// Connessione al database
$conn = mysqli_connect("localhost", "root", "", "samuelfiori");

// Verifica la connessione
if (!$conn) {
    die("Connessione al database fallita: " . mysqli_connect_error());
}

// Verifica se la richiesta POST contiene i dati necessari
if (isset($_POST['id']) && isset($_POST['name']) && isset($_POST['cognome']) && isset($_POST['email']) && isset($_POST['cell'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $cognome = $_POST['cognome'];
    $email = $_POST['email'];
    $cell = $_POST['cell'];

    // Esegui l'inserimento dei dati nella tabella
    $query = "INSERT INTO utenti (id, nome, cognome, email, cell) VALUES ('$id', '$name', '$cognome', '$email', '$cell')";
    if (mysqli_query($conn, $query)) {
        echo "Dati inseriti correttamente";
    } else {
        echo "Errore durante l'inserimento dei dati: " . mysqli_error($conn);
    }
} else {
    echo "Dati mancanti nella richiesta";
}

// Chiudi la connessione al database
mysqli_close($conn);

?>
