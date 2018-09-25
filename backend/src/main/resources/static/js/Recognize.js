function recognize(border){
    var newBorder=[];
    var shapeType="Undefined";
    var cvs = document.getElementById("cvs");
    var cxt = cvs.getContext("2d");
    /*
    var centre=getCentre(border);
    for(var i=0;i<border.length;i++){
        border[i].x-=centre.x;
        border[i].y-=centre.y;
    }
    border.sort(sortByAngle);
    for(var i=0;i<border.length;i++){
        border[i].x+=centre.x;
        border[i].y+=centre.y;
    }
    */
    var minX=cvs.width,minY=cvs.height,maxX=0,maxY=0;
    for(var i=0;i<border.length;i++){
        if(border[i].x<minX)
            minX=border[i].x;
        else if(border[i].x>maxX)
            maxX=border[i].x;
        if(border[i].y<minY)
            minY=border[i].y;
        else if(border[i].y>maxY)
            maxY=border[i].y;
    }
    var maxArea=(maxY-minY)*(maxX-minX);
    var shapeArea=getArea(border);
    var ratio=shapeArea/maxArea;
    //alert(ratio);
    var VALUE_TRI=0.5;
    var VALUE_CIRCLE=Math.PI/4;
    var VALUE_RECTANGLE=0.9;
    if(ratio<=(VALUE_TRI+VALUE_CIRCLE)/2){
        shapeType="Triangle";
        var minX=cvs.width,minY=cvs.height,maxX=0,maxY=0;
        var leftIndex,bottomIndex,rightIndex,topIndex;
        for(var i=0;i<border.length;i++){
            if(border[i].x<minX) {
                minX = border[i].x;
                leftIndex = i;
            }else if(border[i].x>maxX) {
                maxX=border[i].x;
                rightIndex = i;
            }if(border[i].y<minY) {
                minY=border[i].y;
                bottomIndex = i;
            }else if(border[i].y>maxY) {
                maxY=border[i].y;
                topIndex = i;
            }
        }
        //alert(leftIndex+" "+bottomIndex+" "+rightIndex+" "+topIndex);
        newBorder.push(border[leftIndex]);
        newBorder.push(border[rightIndex]);
        newBorder.push(border[bottomIndex]);
        newBorder.push(border[topIndex]);
    }else if(ratio>(VALUE_TRI+VALUE_CIRCLE)/2&&ratio<=(VALUE_CIRCLE+VALUE_RECTANGLE)/2){
        shapeType="Circle";
        newBorder.push({"x":minX,"y":minY});
        newBorder.push({"x":maxX,"y":maxY});
    }else{
        shapeType="Rectangle";
        newBorder.push({"x":minX,"y":minY});
        newBorder.push({"x":maxX,"y":maxY});
    }
    return new Shape(shapeType,newBorder);
}

function showRecognizeResult(shape){
    var cvs = document.getElementById("cvs");
    var cxt = cvs.getContext("2d");
    var minX=cvs.width,minY=cvs.height,maxX=0,maxY=0;
    var border=shape.border;
    var shapeType=shape.type;
    for(var i=0;i<border.length;i++){
        if(border[i].x<minX)
            minX=border[i].x;
        else if(border[i].x>maxX)
            maxX=border[i].x;
        if(border[i].y<minY)
            minY=border[i].y;
        else if(border[i].y>maxY)
            maxY=border[i].y;
    }
    cxt.setLineDash([10]);
    cxt.fillStyle="white";
    cxt.beginPath();
    cxt.fillRect(minX-5, minY-5, maxX - minX + 10, maxY - minY + 10);
    cxt.strokeRect(minX-5, minY-5, maxX - minX + 10, maxY - minY + 10);
    cxt.setLineDash([]);
    cxt.fillStyle="#000000";
    cxt.beginPath();
    if(shapeType=="Triangle") {
        var newBorder=[];
        var minDistance=Math.min(getDistance(border[0],border[2]),
            getDistance(border[0],border[3]),
            getDistance(border[1],border[2]),
            getDistance(border[1],border[3]));
        if(getDistance(border[0],border[2])==minDistance){
            newBorder.push(border[1]);
            newBorder.push(border[3]);
            newBorder.push(getMidPoint(border[2],border[0]));
        }else if(getDistance(border[0],border[3])==minDistance){
            newBorder.push(border[1]);
            newBorder.push(border[2]);
            newBorder.push(getMidPoint(border[3],border[0]));
        }else if(getDistance(border[1],border[2])==minDistance){
            newBorder.push(border[0]);
            newBorder.push(border[3]);
            newBorder.push(getMidPoint(border[2],border[1]));
        }else if(getDistance(border[1],border[3])==minDistance){
            newBorder.push(border[0]);
            newBorder.push(border[2]);
            newBorder.push(getMidPoint(border[3],border[1]));
        }
        cxt.moveTo(newBorder[0].x, newBorder[0].y);
        for (var i = 1; i < newBorder.length; i++) {
            cxt.lineTo(newBorder[i].x, newBorder[i].y);
            cxt.stroke();
        }
        cxt.lineTo(newBorder[0].x,newBorder[0].y);
        cxt.stroke();
    }else if(shapeType=="Circle"){
        var centreX=(minX+maxX)/2;
        var centreY=(minY+maxY)/2;
        var r=Math.min(maxX-centreX,maxY-centreY);
        cxt.arc(centreX,centreY,r,0,2*Math.PI);
        cxt.stroke();
    }else if(shapeType=="Rectangle"){
        cxt.strokeRect(minX, minY, maxX - minX, maxY - minY);
    }
    cxt.fillText(shapeType, minX,minY - 10);
}

function getArea(border){
    var s=0;
    var len=border.length;
    for(var i=0;i<len-1;i++){
        s+=border[i].x*border[i+1].y-border[i].y*border[i+1].x;
    }
    s+=border[len-1].x*border[0].y-border[len-1].y*border[0].x;
    s=Math.abs(s)/2;
    return s;
}

function getDistance(p1,p2){
    var x0=p1.x-p2.x;
    var y0=p1.y-p2.y;
    return Math.sqrt(x0*x0+y0*y0);
}

function getMidPoint(p1,p2){
    return {"x":(p1.x+p2.x)/2,"y":(p1.y+p2.y)/2};
}




