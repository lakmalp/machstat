<?php

/*
ref: https://community.hivemq.com/t/tls-certificates/1068/2

CA cert: https://letsencrypt.org/certs/isrgrootx1.pem

openssl x509 -outform der -in isrgrootx1.pem -out server.crt
openssl req -x509 -newkey rsa:2048 -keyout client-key.pem -out client-cert.pem -days 360 -passout pass:quantum -subj "/CN=client"
openssl x509 -outform der -in client-cert.pem -out client-cert.crt
openssl pkcs12 -export -in client-cert.pem -inkey client-key.pem -certfile client-cert.pem -out client-keystore.p12 -passin pass:quantum -passout pass:quantum;

*/

require('../machstat-server/vendor/autoload.php');

use \PhpMqtt\Client\MqttClient;
use \PhpMqtt\Client\ConnectionSettings;

$mqtt_host = 'cd85228569154ebbb574f0b252665c02.s1.eu.hivemq.cloud';
$mqtt_port = 8883;
$mqtt_client_id = 'test_hive_client_1' . rand();
$mqtt_user = 'ESP8266Temp';
$mqtt_pwd = 'ESP8266Temp!';
$mqtt_version = MqttClient::MQTT_3_1_1;

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "machstat";
$port = "3308";

error_reporting(E_ALL);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected to database " . $dbname . " successfully\n";


$mqtt = new MqttClient($mqtt_host, $mqtt_port, $mqtt_client_id, $mqtt_version);

$connectionSettings = (new ConnectionSettings)
  ->setUsername($mqtt_user)
  ->setPassword($mqtt_pwd)
  ->setKeepAliveInterval(60)
  ->setUseTls(true)
  ->setTlsVerifyPeer(true)
  ->setTlsCertificateAuthorityFile('./keys/isrgrootx1.pem')
  ->setTlsCertificateAuthorityPath('./keys')
  ->setTlsClientCertificateFile('./keys/client-cert.pem')
  ->setTlsClientCertificateKeyFile('./keys/client-key.pem')
  ->setTlsClientCertificateKeyPassphrase('quantum')
  ->setLastWillQualityOfService(1);

$mqtt->connect($connectionSettings, true);

$mqtt->subscribe('#', function ($device_id, $message) use ($conn) {
  //   echo sprintf("Received message on topic [%s]: %s\n", $device_id, $message);
  $info = explode("/", $message);
  $timestamp = date_format(now(), "Y-m-d H:i:s");
  $sql = "INSERT INTO mqtt_messages (guid, body, received_at, processed, created_at, updated_at) VALUES ('" . $device_id . "', '" . $info[0] . "', '" . $info[1] . "', false, '" . $timestamp . "', '" . $timestamp . "')";
  try {
    $conn->begin_transaction();
    $ret = $conn->query($sql);
    $conn->commit();
  } catch (Exception $e) {
    echo "---***---";
    echo $e->getMessage() . "\n";
    echo "---***---";
  }
}, 0);`
try {
  $mqtt->loop(true);
  $mqtt->disconnect();
} catch (Exception $e) {
  echo "---^^^---";
  echo $e->getMessage();
  echo "---^^^---";
}
