function enablePaint() {
    var cvs = document.getElementById('cvs');
    var cxt = cvs.getContext('2d');
    cvs.onmousedown = function (ev) {
        var ev = ev || window.event;
        cxt.beginPath();
        cxt.moveTo(ev.clientX - cvs.offsetLeft, ev.clientY - cvs.offsetTop); //ev.clientX-cvs.offsetLeft,ev.clientY-cvs.offsetTop鼠标在当前画布上X,Y坐标
        document.onmousemove = function (ev) {
            var ev = ev || window.event;//获取event对象
            cxt.lineTo(ev.clientX - cvs.offsetLeft, ev.clientY - cvs.offsetTop);
            cxt.stroke();
            var point = {"x": ev.clientX - cvs.offsetLeft, "y": ev.clientY - cvs.offsetTop};
            border.push(point);
        };
        cvs.onmouseup = function (ev) {
            isSaved=false;
            document.onmousemove=null;
            cxt.closePath();
        };
    };
}

function disablePaint(){
    var cvs = document.getElementById('cvs');
    cvs.onmousedown=null;
}

window.onload=function() {
    var options = document.getElementsByClassName("optionLi");
    //给每个li绑定事
    options[0].onclick = function () {
        if((border.length!=0||shapes.length!=0)&&isSaved==false){
            swal({
                    title: "确定要新建画布吗？",
                    text: "当前画布未保存",
                    type: "warning",
                    cancelButtonText:"取消",
                    confirmButtonText:"确认",
                    showCancelButton: true,
                },
                function(){
                    clearCanvas();
                    enablePaint();
                    swal("成功","画布已清空","success");
                });
        }
        else {
            clearCanvas();
            enablePaint();
            swal("成功","画布已清空","success");
            shapes=[];
        }
    };
    options[1].onclick = function (){
        if(border.length==0){
            swal("无法识别","当前无未识别图形","warning");
            return;
        }
        var shape=recognize(border);
        showRecognizeResult(shape);
        shapes.push(shape);
        isSaved=false;
        border=[];
    };
    options[2].onclick = function(){
        if(shapes.length==0){
            swal("无法保存","当前画布为空","warning");
        }else {
            picture = new Picture(new Date().getTime(), shapes);
            savePicture(picture);
            isSaved = true;
        }
    };
    options[3].onclick = function(){
        var pictureIds=getPictureIds();
        choose(pictureIds);
        isSaved=true;
    };
    enableCanvas();
    enablePaint();
};