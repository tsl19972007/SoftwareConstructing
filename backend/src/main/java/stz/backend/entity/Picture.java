package stz.backend.entity;
import java.util.ArrayList;
import stz.backend.entityHelper.PictureHelper;
import stz.backend.entityHelper.ShapeHelper;

public class Picture {
    String pictureId;
    ArrayList<Shape> shapes;

    public Picture(){

    }

    public Picture(String pictureId,ArrayList<Shape> shapes){
        this.pictureId=pictureId;
        this.shapes=shapes;
    }

    public String getPictureId(){
        return pictureId;
    }
    public void setPictureId(){
        this.pictureId=pictureId;
    }
    public ArrayList<Shape> getShapes(){
        return shapes;
    }
    public void setShapes(ArrayList<Shape> shapes){
        this.shapes=shapes;
    }

    public PictureHelper toPictureHelper(){
        ArrayList<ShapeHelper> rShapes=new ArrayList<ShapeHelper>();
        for(int i=0;i<shapes.size();i++){
            rShapes.add(i,shapes.get(i).toShapeHelper());
        }
        return new PictureHelper(pictureId,rShapes);
    }

}
