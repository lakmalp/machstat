#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <WiFiUdp.h>
#include <PubSubClient.h>
#include <Arduino.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Wire.h>
#include <RTClib.h>
#include <SPI.h>
#define DS3231_I2C_ADDRESS 0x68

RTC_DS3231 RTC;

// GPIO where the DS18B20 is connected to
const int oneWireBus = 4;          
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);
// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);
// Temperature value
float payload;
int elapsedTime = 0;

const String MQTT_HOST("cd85228569154ebbb574f0b252665c02.s1.eu.hivemq.cloud");
const int    MQTT_PORT = 8883 ;
const String MQTT_CLIENT_ID("test_hive_client_1");
const String MQTT_USER("ESP8266Temp"); 
const String MQTT_PWD("ESP8266Temp!"); 

const String WIFI_SID = "Dialog 4G D10";
const String WIFI_PWD = "Dadn1r18";

// The CA certificate used to sign the HiveMQ server certificate 
static const char caCert[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIFFjCCAv6gAwIBAgIRAJErCErPDBinU/bWLiWnX1owDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMjAwOTA0MDAwMDAw
WhcNMjUwOTE1MTYwMDAwWjAyMQswCQYDVQQGEwJVUzEWMBQGA1UEChMNTGV0J3Mg
RW5jcnlwdDELMAkGA1UEAxMCUjMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK
AoIBAQC7AhUozPaglNMPEuyNVZLD+ILxmaZ6QoinXSaqtSu5xUyxr45r+XXIo9cP
R5QUVTVXjJ6oojkZ9YI8QqlObvU7wy7bjcCwXPNZOOftz2nwWgsbvsCUJCWH+jdx
sxPnHKzhm+/b5DtFUkWWqcFTzjTIUu61ru2P3mBw4qVUq7ZtDpelQDRrK9O8Zutm
NHz6a4uPVymZ+DAXXbpyb/uBxa3Shlg9F8fnCbvxK/eG3MHacV3URuPMrSXBiLxg
Z3Vms/EY96Jc5lP/Ooi2R6X/ExjqmAl3P51T+c8B5fWmcBcUr2Ok/5mzk53cU6cG
/kiFHaFpriV1uxPMUgP17VGhi9sVAgMBAAGjggEIMIIBBDAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCsGAQUFBwMBMBIGA1UdEwEB/wQIMAYB
Af8CAQAwHQYDVR0OBBYEFBQusxe3WFbLrlAJQOYfr52LFMLGMB8GA1UdIwQYMBaA
FHm0WeZ7tuXkAXOACIjIGlj26ZtuMDIGCCsGAQUFBwEBBCYwJDAiBggrBgEFBQcw
AoYWaHR0cDovL3gxLmkubGVuY3Iub3JnLzAnBgNVHR8EIDAeMBygGqAYhhZodHRw
Oi8veDEuYy5sZW5jci5vcmcvMCIGA1UdIAQbMBkwCAYGZ4EMAQIBMA0GCysGAQQB
gt8TAQEBMA0GCSqGSIb3DQEBCwUAA4ICAQCFyk5HPqP3hUSFvNVneLKYY611TR6W
PTNlclQtgaDqw+34IL9fzLdwALduO/ZelN7kIJ+m74uyA+eitRY8kc607TkC53wl
ikfmZW4/RvTZ8M6UK+5UzhK8jCdLuMGYL6KvzXGRSgi3yLgjewQtCPkIVz6D2QQz
CkcheAmCJ8MqyJu5zlzyZMjAvnnAT45tRAxekrsu94sQ4egdRCnbWSDtY7kh+BIm
lJNXoB1lBMEKIq4QDUOXoRgffuDghje1WrG9ML+Hbisq/yFOGwXD9RiX8F6sw6W4
avAuvDszue5L3sz85K+EC4Y/wFVDNvZo4TYXao6Z0f+lQKc0t8DQYzk1OXVu8rp2
yJMC6alLbBfODALZvYH7n7do1AZls4I9d1P4jnkDrQoxB3UqQ9hVl3LEKQ73xF1O
yK5GhDDX8oVfGKF5u+decIsH4YaTw7mP3GFxJSqv3+0lUFJoi5Lc5da149p90Ids
hCExroL1+7mryIkXPeFM5TgO9r0rvZaBFOvV2z0gp35Z0+L4WPlbuEjN/lxPFin+
HlUjr8gRsI3qfJOQFy/9rKIJR0Y/8Omwt/8oTWgy1mdeHmmjk7j1nYsvC9JSQ6Zv
MldlTTKB3zhThV1+XWYp6rjd5JW1zbVWEkLNxE7GJThEUG3szgBVGP7pSWTUTsqX
nLRbwHOoq7hHwg==
-----END CERTIFICATE-----
)EOF";

X509List caCertList(caCert); 

// Use secure client to handle TLS connection. 
WiFiClientSecure wifiClient ;
PubSubClient mqttClient(wifiClient) ;

// BearSSL needs current time to validate certificate. 
WiFiUDP ntpUDP; 
NTPClient timeClient(ntpUDP, "pool.ntp.org", 3600 * 5.5); 

// Publish current time to MQTT every 60 seconds
#define MQTT_TIME_UPDATE_PERIOD 10000 
unsigned long nextTimeUpdate = 0 ;

void mqttCallback(const char* topic, byte* payload, unsigned int length)
{
  // Payload may not be null terminated. 
  char value[length+1]; 
  memcpy(value,payload, length); 
  value[length] = '\0'; 
  
  Serial.print("MQTT update: "); 
  Serial.print(topic);
  Serial.print(":");
  Serial.println(value); 
}

void connectToWifi() 
{
  WiFi.mode(WIFI_STA); 

  WiFi.disconnect(); 
  WiFi.begin(WIFI_SID.c_str(), WIFI_PWD.c_str()); 

  Serial.println("");
  Serial.print("Connecting to " + WIFI_SID + " - "); 

  while (WiFi.status() != WL_CONNECTED)
  {
      Serial.print("."); 
      delay(1000); 
  }
  
  Serial.println(""); 
  Serial.print("Connected, IP Address = ");
  Serial.println(WiFi.localIP()); 
}

void checkWifi()
{
  if ( WiFi.status() != WL_CONNECTED )
  {
    connectToWifi(); 
  }
}

void checkMQTT()
{
  if ( !mqttClient.connected() )
  {
    String details = MQTT_HOST + "/" ; 
    details += MQTT_PORT ;
    
    Serial.println("Connecting to MQTT server: " + details); 
     
    mqttClient.setServer(MQTT_HOST.c_str(), MQTT_PORT);   
    
    while( !mqttClient.connected() )
    {
      Serial.println(".");

      // secure client needs to know the current time. 
      timeClient.update(); 
      time_t now = (time_t) timeClient.getEpochTime();
      wifiClient.setX509Time(now); 

      int ret = mqttClient.connect(MQTT_CLIENT_ID.c_str(), MQTT_USER.c_str(), MQTT_PWD.c_str());

      Serial.print("MQTT Connect returned: ");
      Serial.println(ret);

      if ( !mqttClient.connected() )
        delay(5000); 
    }
    
    Serial.println("Connected to MQTT"); 

    mqttClient.setCallback(mqttCallback); 
    mqttClient.subscribe("test/value1"); 
  }
}

void setup() {

  Serial.begin(9600); 
  sensors.begin();

  Serial.println("Starting"); 
  
  // Load certificates
  wifiClient.setTrustAnchors(&caCertList); 

  connectToWifi(); 
  checkMQTT(); 

  nextTimeUpdate = millis() + MQTT_TIME_UPDATE_PERIOD ;
}

void loop() {

  checkWifi();
  checkMQTT();
  mqttClient.loop();

  if ( millis() > nextTimeUpdate )
  {
      // publish the current time to MQTT. 
      timeClient.update(); 

      time_t epochTime = timeClient.getEpochTime();
      struct tm *ptm = gmtime ((time_t *)&epochTime); 
      String currentYear = String(ptm->tm_year + 1900);
      String currentMonth = String(ptm->tm_mon + 1);
      String currentDay = String(ptm->tm_mday);
      String currentHour = String(timeClient.getHours());
      String currentMinute = String(timeClient.getMinutes());
      String currentSecond = String(timeClient.getSeconds());

      String timeStamp = currentYear + "-" +  currentMonth + "-" + currentDay + " " + currentHour + ":" + currentMinute + ":" + currentSecond;

    // New temperature readings
    sensors.requestTemperatures(); 
    // Temperature in Celsius degrees
    payload = sensors.getTempCByIndex(0);
    // Temperature in Fahrenheit degrees
    //payload = sensors.getTempFByIndex(0);

      mqttClient.publish("4583-7336-6372-6359", (String(payload) + "/" + timeStamp).c_str(), true);

      nextTimeUpdate = millis() + MQTT_TIME_UPDATE_PERIOD ;
  }
  
  delay(50);
}