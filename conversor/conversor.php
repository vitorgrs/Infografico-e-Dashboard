<?php
require __DIR__ . '/vendor/autoload.php';

$client = new \Google_Client();
$client->setApplicationName('Pet Planilha');
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');
$client->setAuthConfig(__DIR__ . '/credentials.json');

$service = new Google_Service_Sheets($client);
$spreadsheetId = "1De458G9tOhnEvlg1nfzM5eY0mUcGYe6wewjX4Klo-Qk";
$range = "tabela_1!A1:B10";

$response = $service->spreadsheets_values->get($spreadsheetId, $range);
$values = $response->getValues();

if (empty($values)) {
    print "No data found.\n";
} else {
    $csv_filename = "tabela1.csv";
    $new_directory = ",,/data/dados_csv";
    $csv_file = fopen($new_directory . "/" . $csv_filename, "w");

    foreach ($values as $row) {
        fputcsv($csv_file, $row);
    }

    fclose($csv_file);
    echo "CSV $csv_filename exportado com sucesso no diretório $new_directory!";
}
?>