<?php
require 'vendor/autoload.php';
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Payment\PaymentClient;

$mpAccessToken = 'APP_USR-6836003344835449-060310-e3161895eb8d95272de7ecf76cd26fa9-2244514896';
MercadoPagoConfig::setAccessToken($mpAccessToken);

$client = new PaymentClient();
$request = [
    "transaction_amount" => 150.00,
    "description" => 'Mensalidade Sophie Link - Teste',
    "payment_method_id" => "pix",
    "external_reference" => "123",
    "payer" => [
        "email" => "joao.silva.test.mp@gmail.com",
        "first_name" => "Joao Silva",
        "identification" => [
            "type" => "CPF",
            "number" => "05796898329"
        ]
    ]
];

try {
    $payment = $client->create($request);
    echo "Sucesso! ID: " . $payment->id . "\n";
} catch (\MercadoPago\Exceptions\MPApiException $e) {
    $response = $e->getApiResponse();
    $content = $response ? $response->getContent() : [];
    
    if (isset($content['message']) && strpos($content['message'], 'Collector user without key') !== false) {
        $mockPix = '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000520400005303986540510.005802BR5913Test Receiver6008Brasilia62070503***63049F30';
        $mockQrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' . urlencode($mockPix);
        
        $imgData = @file_get_contents($mockQrUrl);
        $mockBase64 = $imgData ? base64_encode($imgData) : '';

        echo json_encode([
            'success' => true,
            'qr_code' => $mockPix,
            'qr_code_base64' => substr($mockBase64, 0, 30) . '...',
            'is_mock' => true
        ]);
        exit;
    }

    echo "API Error:\n";
    print_r($content);
}
