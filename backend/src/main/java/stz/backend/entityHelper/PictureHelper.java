package stz.backend.entityHelper;

import stz.backend.entity.Shape;
import stz.backend.entity.Picture;

import java.util.ArrayList;

public class PictureHelper {
    String pictureId;
    ArrayList<ShapeHelper> shapes;

    public PictureHelper(){

    }

    public PictureHelper(String pictureId,ArrayList<ShapeHelper> shapes){
        this.pictureId=pictureId;
        this.shapes=shapes;
    }

    public String getPictureId(){
        return pictureId;
    }
    public void setPictureId(){
        this.pictureId=pictureId;
    }
    public ArrayList<ShapeHelper> getShapes(){
        return shapes;
    }
    public void setShapes(ArrayList<ShapeHelper> shapes){
        this.shapes=shapes;
    }

    public Picture toPicture(){
        ArrayList<Shape> rShapes=new ArrayList<Shape>();
        for(int i=0;i<shapes.size();i++){
            rShapes.add(i,shapes.get(i).toShape());
        }
        return new Picture(pictureId,rShapes);
    }
}
