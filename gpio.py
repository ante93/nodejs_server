import RPi.GPIO as gpio
import sys

gpio.setmode(gpio.BOARD)
gpio.setup(3, gpio.OUT)
gpio.setwarnings(False);
if sys.argv[1] == "on":
    gpio.output(3, gpio.HIGH)
    
elif sys.argv[1] == "off":
    gpio.output(3,gpio.LOW)
    
else:
    print("Error");
