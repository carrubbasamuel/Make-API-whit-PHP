<?php
// Connessione al database
$conn = mysqli_connect("localhost", "root", "", "samuelfiori");

// Verifica la connessione
if (!$conn) {
    die("Connessione al database fallita: " . mysqli_connect_error());
}

// Esegui la query per ottenere tutti i dati dalla tabella "users"
$query = "SELECT * FROM utenti";
$result = mysqli_query($conn, $query);

// Creazione di un array per i dati
$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Chiudi la connessione al database
mysqli_close($conn);

// Restituisci i dati come risposta JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
