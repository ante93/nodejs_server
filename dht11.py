import RPi.GPIO as GPIO
import Adafruit_DHT

# initialize GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.cleanup()

humidity, temperature = Adafruit_DHT.read_retry(11, 3)
print(str(humidity) +" " + str(temperature))


