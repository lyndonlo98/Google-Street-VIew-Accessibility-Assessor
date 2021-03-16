# handler.py
import GSVFetching.ImageFetching
import ImageProcessing.ImagePreprocessing
import Validation

import json
import sys
import os

from PIL import Image, ImageDraw
import numpy as np
import base64
import boto3
import io
import pickle 
from io import BytesIO

import logging


from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.data import MetadataCatalog
from detectron2.utils.visualizer import ColorMode, Visualizer
import cv2
import requests
import numpy as np
from detectron2 import model_zoo

def hello(event, context):
    #images = GSVFetching.ImageFetching.getGSVImage(params := {'lat':35.696233, 'long':139.570431, 'heading': 112.5})
    print("Received event: " + json.dumps(event, indent=2))
    statusCode, errMsg = Validation.validateParams(event['queryStringParameters'])

    if statusCode != 200:
        response = {
            'statusCode': statusCode,
            'body': errMsg
        }
        return response
    
    images = GSVFetching.ImageFetching.getGSVImage(event['queryStringParameters'])
    img_str = ""

    im = Image.open(BytesIO(images[0]))
    r, g, b = im.split()
    rgb = [b, r, g]
    im = Image.merge("RGB", (b, g, r))

    buffered = io.BytesIO()
    im.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode('ascii')

    print(img_str) 

    response = {
        'isBase64Encoded': True,
        'headers': {'Content-Type': 'image/jpeg'},
        'statusCode': 200,
        'body': img_str
    }

    return response

def goodbye(event, context):
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    logger.info("hi")
    logger.info("Received event: " + json.dumps(event, indent=2))
    statusCode, errMsg = Validation.validateParams(event['queryStringParameters'])

    if statusCode != 200:
        response = {
            'statusCode': statusCode,
            'body': errMsg
        }
        return response
    
    image_response = GSVFetching.ImageFetching.getGSVImage(event['queryStringParameters'])
    image_as_np_array = np.frombuffer(image_response[0], np.uint8)
    image = cv2.imdecode(image_as_np_array, cv2.IMREAD_COLOR)

    logger.info("decoded gsv image")

    # image_reponse = requests.get("https://upload.wikimedia.org/wikipedia/commons/4/41/Leo_Messi_v_Almeria_020314_%28cropped%29.jpg")
    # image_as_np_array = np.frombuffer(image_reponse.content, np.uint8)
    # image = cv2.imdecode(image_as_np_array, cv2.IMREAD_COLOR)

    cfg = get_cfg()
    cfg.merge_from_file(model_zoo.get_config_file("COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml"))
    cfg.MODEL.ROI_HEADS.NUM_CLASSES = 5
    cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.5  # set threshold for this model
    cfg.MODEL.WEIGHTS = "../model_final-40k.pth"
    cfg.MODEL.DEVICE = "cpu" # we use a CPU Detectron copy
    classes = MetadataCatalog.get("curbs_train").thing_classes = ["AccessibleCurb", 
                                                                  "InaccessibleCurb",
                                                                  "Stairs",
                                                                  "Ramp",
                                                                  "APS"]


    predictor = DefaultPredictor(cfg)
    logger.info("Predictor has been initialized.")

    scoring_result = predictor(image)

    v = Visualizer(image[:, :, ::-1],
        MetadataCatalog.get("curbs_train"),
        scale=0.5, 
        instance_mode=ColorMode.IMAGE_BW   # remove the colors of unsegmented pixels. This option is only available for segmentation models
      )
    logger.info('drew on image')

    out = v.draw_instance_predictions(scoring_result["instances"].to("cpu"))

    im = Image.fromarray(np.uint8(out.get_image()[:, :, ::-1]))
    r, g, b = im.split()
    rgb = [b, r, g]
    im = Image.merge("RGB", (b, g, r))

    buffered = io.BytesIO()
    im.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode('ascii')
    logger.info('created image string')

    # instances = scoring_result["instances"]
    # scores = instances.get_fields()["scores"].tolist()
    # pred_classes = instances.get_fields()["pred_classes"].tolist()
    # pred_boxes = instances.get_fields()["pred_boxes"].tensor.tolist()

    response = {
        'isBase64Encoded': True,
        'headers': {'Content-Type': 'image/jpeg'},
        'statusCode': 200,
        'body': img_str
    }

    # bodyOfResponse = {
    #     "scores": scores,
    #     "pred_classes": pred_classes,
    #     "pred_boxes" : pred_boxes,
    #     "classes": classes
    # }

    # response = {
    #     # 'isBase64Encoded': True,
    #     'headers': {'Content-Type': 'application/json'},
    #     'statusCode': 200,
    #     'body': json.dumps(bodyOfResponse)
    # }

    return response

if __name__ == "__main__":
    goodbye('', '')