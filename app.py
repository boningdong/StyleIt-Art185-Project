import os
from io import StringIO, BytesIO
from flask import Flask, request, make_response, render_template, jsonify, send_file
import json
import core
import base64

# debug
from PIL import Image

app = Flask(__name__, static_folder='./static')

@app.route('/')
def index():
    return render_template('main.html')

@app.route('/transfer', methods=['POST'])
def transfer():
    try:
        size = request.form['size']     # normal data should be read from from
        if (isinstance(size, str)):
            size = int(size)
        origin = request.files['origin']    # file data need to be read from file function
        style = request.files['style']
    except:
        return make_response("Bad request! Missing files?", 400)

    try:
        (code, msg, imgfile, pilimg) = core.transfer(size, origin.stream, style.stream)
    except:
        return make_response("Neural Transfer core issue", 400)
    
    if code:
        return make_response("Error code:" + str(code) + " " + str(msg), 400)

    #Transfer succeed
    # imgfile is bytesIO
    # return send_file(imgfile, attachment_filename="myfile.jpg", as_attachment=True)
    return make_response(base64.b64encode(imgfile.getvalue()), 200)

if __name__ == "__main__":
    app.run(debug=True)