function success(){
    swal("发布成功","任务信息已更新","success");
}

function fail(){
    swal("发布失败","任务名不能为空","warning");
}

function confirm(){
    swal({
            title: "确定发布该任务吗",
            text: "点击确认进行发布",
            type: "warning",
            cancelButtonText:"取消",
            confirmButtonText:"确认",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        },
        function(){
           /*ajax
           ******
            */
            setTimeout(function(){
                swal("发布成功","任务信息已更新","success");
            }, 1500);
        });
}

function choose(options){
    var res="";
    var text="<select id='type' class=\"sel\">\n"+" <option>请选择</option>\n" ;
    for(var i=0;i<options.length;i++){
        text+="<option>"+options[i]+"</option>\n";
    }
    text+="    </select><br>";

    swal({
            title: "请选择要查看的图片id",
            subtitle:"sss",
            text: text,
            html: true,
            closeOnConfirm: false,
            showCancelButton:true,
        },
        function() {
            var index=document.getElementById("type").selectedIndex;
            var pictureId = document.getElementById("type").options[index].value;
            if((border.length!=0||shapes.length!=0)&&isSaved==false) {
                swal({
                        title: "确定读取该图片吗？",
                        text: "当前画布未保存",
                        type: "warning",
                        cancelButtonText: "取消",
                        confirmButtonText: "确认",
                        showCancelButton: true,
                    },
                    function () {
                        picture = getPicture(pictureId);
                        shapes = picture.shapes;
                        swal("选择成功", "您所选的图片已读取", "success");
                        showPicture(picture);
                    });
            }else{
                picture = getPicture(pictureId);
                shapes = picture.shapes;
                swal("选择成功", "您所选的图片已读取", "success");
                showPicture(picture);
            }
        });
}