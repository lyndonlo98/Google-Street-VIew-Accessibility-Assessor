import google_streetview.api
import requests
import shutil

import os

from os import path

SIZE = '640x640'
HEADING = '22.5;67.5;112.5;157.5;202.5;247.5;292.5;337.5'
FOV = '45'
PITCH = '0'

API_KEY = os.environ['google_api_key']
def getGSVImage(latlongheading):
  lat = latlongheading["lat"]
  longitude = latlongheading["long"]
  heading = latlongheading["heading"]

  locstr = "{},{}".format(lat, longitude)
  apiargs = {
      'location': locstr,
      'key': API_KEY,
      'size': SIZE,
      'heading': str(heading),
      'fov': FOV,
      'pitch': PITCH
  }
  api_list = google_streetview.helpers.api_list(apiargs)
  results = google_streetview.api.results(api_list)
  allImagesByteArray = download_links(results)

  return allImagesByteArray
    #results.preview()

def download_links(results, metadata_file='metadata.json', metadata_status='status', status_ok='OK'):
    
  metadata = results.metadata
  imageByteArray = []
    
  # (download) Download images if status from metadata is ok
  for i, url in enumerate(results.links):
    if metadata[i][metadata_status] == status_ok:
      imageByteArray.append(getImageBytes(url))

  return imageByteArray


def getImageBytes(url):
  r = requests.get(url, stream=True)
  if r.status_code == 200: # if request is suc
    return r.content