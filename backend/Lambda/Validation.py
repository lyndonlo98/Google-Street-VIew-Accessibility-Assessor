def validateParams(params):
    statusCode = 200
    errMsg = ""

    if "lat" not in params:
        statusCode = 400
        errMsg = "Please supply lat value"
    if "long" not in params:
        statusCode = 400
        errMsg = "Please supply long value"

    if "heading" not in params:
        statusCode = 400
        errMsg = "Please supply heading value"

    return [statusCode, errMsg]