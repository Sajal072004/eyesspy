
    const itemMap = {0: 'background',
    1: 'person', 2: 'bicycle', 3: 'car', 4: 'motorcycle', 5: 'airplane', 6: 'bus',
    7: 'train', 8: 'truck', 9: 'boat', 10: 'traffic light', 11: 'fire hydrant',
    13: 'stop sign', 14: 'parking meter', 15: 'bench', 16: 'bird', 17: 'cat',
    18: 'dog', 19: 'horse', 20: 'sheep', 21: 'cow', 22: 'elephant', 23: 'bear',
    24: 'zebra', 25: 'giraffe', 27: 'backpack', 28: 'umbrella', 31: 'handbag',
    32: 'tie', 33: 'suitcase', 34: 'frisbee', 35: 'skis', 36: 'snowboard',
    37: 'sports ball', 38: 'kite', 39: 'baseball bat', 40: 'baseball glove',
    41: 'skateboard', 42: 'surfboard', 43: 'tennis racket', 44: 'bottle',
    46: 'wine glass', 47: 'cup', 48: 'fork', 49: 'knife', 50: 'spoon',
    51: 'bowl', 52: 'banana', 53: 'apple', 54: 'sandwich', 55: 'orange',
    56: 'broccoli', 57: 'carrot', 58: 'hot dog', 59: 'pizza', 60: 'donut',
    61: 'cake', 62: 'chair', 63: 'couch', 64: 'potted plant', 65: 'bed',
    67: 'dining table', 70: 'toilet', 72: 'tv', 73: 'laptop', 74: 'mouse',
    75: 'remote', 76: 'keyboard', 77: 'cell phone', 78: 'microwave', 79: 'oven',
    80: 'toaster', 81: 'sink', 82: 'refrigerator', 84: 'book', 85: 'clock',
    86: 'vase', 87: 'scissors', 88: 'teddy bear', 89: 'hair drier', 90: 'toothbrush'};

    const colorMap = {
      0:'red',
      1: 'blue',
      2: 'green',
      3:'cyan'

    }

    
    function displayImages1(jsonData) {
      // Assuming just one image in the data
      const imageData = jsonData.image;
      const width = imageData.length;
      const height = imageData[0].length;
      console.log(jsonData.label);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');


      const imageDataObj = ctx.createImageData(width, height);

      let i = 0;
      for (let y = 0; y <height;y++) {
        for (let x = 0; x <width; x++) {
          const pixel = imageData[x][y];
          imageDataObj.data[i + 2] = pixel[0];  // Red
          imageDataObj.data[i + 1] = pixel[1];  // Green
          imageDataObj.data[i] = pixel[2];
          imageDataObj.data[i + 3] = 255;        // Alpha (fully opaque)
          i += 4;
        }
      }

      


      ctx.putImageData(imageDataObj, 0, 0);


      imageContainer.appendChild(canvas);
      // let element = document.getElementById('image-container')
      // element.style.rotate = "90deg";
      // element.style.transform = "scaleY(-1)";
      
      

      

      const boxes = jsonData.box;
      

      let ww = boxes.length;
      for(var z = 0; z<ww; z++){
        const [x1, y1, x2, y2] = boxes[z];
        ctx.strokeStyle = colorMap[z%4];
        ctx.lineWidth = 3;
        ctx.strokeRect(y1,x1, (y2-y1),(x2-x1));
        ctx.save();
        ctx.translate(x1, y1)
        ctx.rotate(1.57);
        ctx.scale(1,-1)
        
        const label = jsonData.label;
        const item = itemMap[(label[z])];
        console.log(label , item);

        if (item) {
          
          ctx.font = '20px Arial';
          ctx.fillStyle = colorMap[z%4];
          
          ctx.fillText(`${item}`, x1/10,55);
          
        } else {
          console.warn("Label not found in itemMap:", label);

      }

      ctx.restore();


    }
  }


  const imageContainer = document.getElementById('image-container');

      setInterval( function(){
      const local = 'http://10.0.0.253:5000/data';
      fetch(local)
      .then(response => response.json())
      .then(jsonData => {imageContainer.innerHTML = ''; console.log(jsonData.boxes);
        displayImages1(jsonData)
      })
      .catch(error => console.error('Error loading JSON data:', error)
      );
      
      
      },600);

      
      
    
    

