import time
import spidev

# We only have SPI bus 0 available to us on the Pi
bus = 0

# Device is the chip select pin. Set to 0 or 1, depending on the connections
device = 0

# Enable SPI
spi = spidev.SpiDev()

# Open a connection to a specific bus and device (chip select pin)
# bus#0 using CS0 (CE0)
spi.open(bus, device)

# Set SPI speed and mode
spi.max_speed_hz = 500000
spi.mode = 0

# Clear display
msg = [0x76]
spi.xfer2(msg)

# Enable and disable test mode
spi.xfer2([0x0F, 1] * 4)
time.sleep(5)
spi.xfer2([0x0F, 0] * 4)

# Clear display
msg = [0x76]
spi.xfer2(msg)

# Disconnects from the spi device
spi.close()