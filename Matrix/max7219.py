# S.A.M library 
# Offers functionality to array of daisy chained MAX7219 8x8 LED matrix boards
# Jordan Blackett v1 - 2022

import spidev
from time import sleep
from fonts import CP437_FONT

# Register address map (see datasheet for more in-depth information)
# - NOOP (no operation) register is needed for cascading max7219 chips together
# - Digit registers 1 -> 8 are the digits on a digit display device ie. [8.8.8.8] 
# (where the 8 bits of data are which segment to display for that digit)
# - Decode mode register is required for a 7-segment digit display device to have
# micro controller to translate and decode numbers into the correct segments
# - Intensity register allows you to set an intensity level (0 to 15)
# controls the duty cycle of the PWM (pulse-width modulator) sent to the LEDs, and thus how bright they are
# - Scan limit register sets the number of digits are displayed
# (This allows the display to be brighter as power is split between less digits)
# - Shutdown register blanks all LCDs (or digits) to save power, 
# while still retaining the ability to recieve data  
# - Display test register turns all LEDs on or off
NOOP = 0x00
DIGIT_0 = 0x01
DIGIT_1 = 0x02
DIGIT_2 = 0x03
DIGIT_3 = 0x04
DIGIT_4 = 0x05
DIGIT_5 = 0x06
DIGIT_6 = 0x07
DIGIT_7 = 0x08
DECODEMODE = 0x09
INTENSITY = 0x0A
SCANLIMIT = 0x0B
SHUTDOWN = 0x0C
DISPLAYTEST = 0x0F

class spi():
    # Only have SPI bus 0 available to us on the Pi # bus#0 using CS0 (CE0)
    # Device is the chip select pin. Set to 0 (default) or 1
    def __init__(self, spi_device=0):   
        self.spi_bus = 0
        self.spi_bus_speed_hz = 500000
    
        # Enable SPI
        self.spi_ = spidev.SpiDev()
        
        # Open a connection to a specific bus and device (chip select pin)
        self.spi_.open(self.spi_bus, spi_device)
        
        # Set SPI speed and mode
        self.spi_.max_speed_hz = self.spi_bus_speed_hz
        self.spi_.mode = 0
    
    # Data format - [register, data]
    def send_bytes(self, data):
        self.spi_.xfer2(data[:]) # data[:]
    
    # bitbanging
    #def write_bytes(self, data):
        #self.spi_.writebytes(data)

    def cleanup(self):
        # Disconnects from the spi device
        spi.close()
    

class max7219():

    # Serial interface for S.A.M 8x8 LED matrix controled by a MAX7219 chip - Daisychained 
    
    def __init__(self, serial_interface=None, daisynum=None, defaultfont=CP437_FONT):
        self.serial_interface = serial_interface
        
        #if daisynum is not None:
        self.daisynum = daisynum or 1
        self.font = defaultfont
            #self.width = daisynum * 8
            #self.height = 8
        
        
        # Initialise all MAX7219 chips
        self.send_all_command_byte([SCANLIMIT, 7]) # Show all 8 digits
        self.send_all_command_byte([DECODEMODE, 0]) # Using a LED Matrix (not a digits display) 
        self.send_all_command_byte([DISPLAYTEST, 0]) # No display test
        self.clear_register_all() #Ensure the whole array is blank
        self.brightness(115) # Sets LED brightness/ intensity: Range - [0 - 255]
        self.send_all_command_byte([SHUTDOWN, 1]) # No display test

    # -----
    #   SPI send functions
    # -----
    def send_bytes(self, data):
        # Sends a data byte or sequence of data bytes to the SPI serial interface. then raise CS
        # Format: [register, data] tuples
        self.serial_interface.send_bytes(data)
        
    def send_all_command_byte(self, register):
        # Send the same byte of data ([register, data] tuple) to the register in all MAX7219 chips in the daisychain
        self.serial_interface.send_bytes(register * self.daisynum)
           
    def send_message(self, message):
        self.serial_interface.send_bytes(message)
    
    # -----
    #   Message functions
    # -----
    def show_message(self, msg):
        # Send a static message to the matrices array
        # Message will be trimmed/truncated from the right to fit the daisychain size
        message = msg + " " * (self.daisynum - len(msg)) # pad strings shorter then daisynum size
        message = message[:self.daisynum] # trim

        # Convert string message to list
        keycodes = []
        keycodes[:0] = message
        keycodes = [ord(char) for char in keycodes] # Convert message to ord() keycodes

        # Using the keycodes pull the 8-byte data/hex decimal (per character) from fonts.py
        
        # digit + 1 because the register digits hex's are 0x01 to 0x08 [1-8] not [0-7]
        for reg_digit in range(8):
            #Send them in sequence digit/column 0 - 7 to make up a character on the 8x8 LED display 
            # - each value in the list for each matrices digit/column in the daisy chain
            # - Dig0 - [0x7C][0x41][0x1C][0x41]
            # send_data = [[digit+1, self.font[keycodes[matrix] % 0x100][digit]] for matrix in range(self.daisynum)]
            send_data = []
            for matrix in range(self.daisynum):
                send_data = send_data + [reg_digit + 1, self.font[keycodes[matrix] % 0x100][reg_digit]]
                
            self.send_bytes(send_data)  
    
    # -----
    #   Graphic/Draw functions
    # -----

    # -----
    #   Other functions
    # -----
    def changefont(self, font):
        self.font = font

    def brightness(self, intensity):
        # Sets the LED brightness on all connected matrices, 
        # specified brightness range [0-255] with 0=dimmest, 255=brightess
        # - bitshifted >>4 (intensity >> 4) to match 0..15
        assert(0x00 <= intensity <= 0xFF)
        self.send_bytes([INTENSITY, intensity >> 4] * self.daisynum)
    
    def clear_register_all(self):
        # Clear all connected matrices registers
        for col in range(8):
            self.send_all_command_byte([col+1, 0x00])

    def wake(self):
        # Sets display mode to [ON], waking up the MAX7219 chip from sleep/low-power mode
        self.send_all_command_byte([SHUTDOWN, 1] * self.daisynum)
    
    def sleep(self):
        # Sets display mode to [OFF], putting the MAX7219 chip to sleep/low-power mode
        self.send_all_command_byte([SHUTDOWN, 0] * self.daisynum)
       
def demo():
    serial_interface = spi()
    SAMDevice = max7219(serial_interface, 4)
    print("Device Init")
    
    SAMDevice.show_message("hiya")
    sleep(2)

if __name__ == "__main__":

    try:
        demo()
    except KeyboardInterrupt:
        pass