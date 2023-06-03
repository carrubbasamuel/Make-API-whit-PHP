<?php

// Connessione al database
$conn = mysqli_connect("localhost", "root", "", "samuelfiori");

// Verifica la connessione
if (!$conn) {
    die("Connessione al database fallita: " . mysqli_connect_error());
}

// Verifica se la richiesta POST contiene l'ID dell'utente da eliminare
if (isset($_POST['id'])) {
    $id = $_POST['id'];

    // Esegui la query per eliminare l'utente dalla tabella
    $query = "DELETE FROM utenti WHERE id = '$id'";
    if (mysqli_query($conn, $query)) {
        echo "Utente eliminato correttamente";
    } else {
        echo "Errore durante l'eliminazione dell'utente: " . mysqli_error($conn);
    }
} else {
    echo "ID dell'utente mancante nella richiesta";
}

// Chiudi la connessione al database
mysqli_close($conn);

?>
