function displayShape(shape) {
    showRecognizeResult(shape);
}

function showPicture(picture){
    var cvs = document.getElementById("cvs");
    var cxt = cvs.getContext("2d");
    var img = new Image();
    img.src = "../img/canvas.jpg";
    img.onload = drawImg;//图片加载完成再执行
    function drawImg() {
        cxt.drawImage(img, 0, 0, cvs.width, cvs.height);
        for(var i=0;i<picture.shapes.length;i++){
            displayShape(picture.shapes[i]);
        }
    };
}

function clearCanvas(){
    var cvs = document.getElementById("cvs");
    var cxt = cvs.getContext("2d");
    var img = new Image();
    img.src = "../img/canvas.jpg";
    img.onload = drawImg;//图片加载完成再执行
    function drawImg() {
        cxt.drawImage(img, 0, 0, cvs.width, cvs.height);
    };
}

function enableCanvas(){
    var cvs = document.getElementById("cvs");
    var cxt = cvs.getContext("2d");
    var img = new Image();
    img.src = "../static/img/canvas.jpg";
    img.onload = drawImg;//图片加载完成再执行
    function drawImg(){
        cxt.drawImage(img,0,0,cvs.width,cvs.height);
    }
}

