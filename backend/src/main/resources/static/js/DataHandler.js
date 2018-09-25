function savePicture(picture) {
    $.ajax({
        type: "POST",
        url: "/savePicture",
        async:false,
        contentType: "application/json",
        data: JSON.stringify(picture),
        success: function (result) {
            swal("保存成功", "当前画布已保存", "success");
        },
        error: function (result) {
            alert("error");
        }
    });
}

function deletePicture(pictureId){
    $.ajax({
        type: "POST",
        url: "/deletePicture",
        async:false,
        data: {
            pictureId : pictureId,
        },
        success: function (result) {
            alert("success");
        },
        error: function (result) {
            alert("error");
        }
    });
}

function getPictureIds(){
    var res=[];
    $.ajax({
        type: "GET",
        url: "/getPictureIds",
        async:false,
        data: {},
        success: function (result) {
            res=result;
        },
        error: function (result) {
            alert("error");
        }
    });
    return res;
}

function getPicture(pictureId){
    var picture;
    $.ajax({
        type: "GET",
        url: "/getPicture",
        async:false,
        data: {
            pictureId:pictureId
        },
        success: function (result) {
            picture=result;
        },
        error: function (result) {
            alert("error");
        }
    });
    return picture;
}