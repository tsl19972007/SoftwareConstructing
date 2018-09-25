package stz.backend.entity;
import java.util.ArrayList;
import stz.backend.entityHelper.ShapeHelper;

public class Shape {
    ShapeType type;
    ArrayList<Coordinate> border;

    public Shape(){

    }
    public Shape(ShapeType type,ArrayList<Coordinate> border){
        this.type=type;
        this.border=border;
    }

    public ShapeType getType(){
        return type;
    }
    public void setType(ShapeType type){
        this.type=type;
    }
    public ArrayList<Coordinate> getBorder(){
        return border;
    }
    public void setBorder(ArrayList<Coordinate> border){
        this.border=border;
    }

    public ShapeHelper toShapeHelper(){
        return new ShapeHelper(type.getName(),border);
    }
}
