import io
from io import BytesIO
import numpy as np
from matplotlib import image, pyplot

def preProcessImage(imgInBytes):
    im = image.imread(imgInBytes, format="JPEG")
    im = im.swapaxes(1, 2).swapaxes(0, 1)
    im = im[(2, 1, 0), :, :]

    pyplot.imshow(im[0])
    pyplot.show()
    im = im[np.newaxis, :, :, :].astype(np.float32)
    return im