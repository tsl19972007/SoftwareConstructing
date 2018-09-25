package stz.backend.entityHelper;

import stz.backend.entity.Coordinate;
import stz.backend.entity.Shape;
import stz.backend.entity.ShapeType;

import java.util.ArrayList;

public class ShapeHelper {
    String type;
    ArrayList<Coordinate> border;

    public ShapeHelper(){

    }
    public ShapeHelper(String type,ArrayList<Coordinate> border){
        this.type=type;
        this.border=border;
    }

    public String getType(){
        return type;
    }
    public void setType(String type){
        this.type=type;
    }
    public ArrayList<Coordinate> getBorder(){
        return border;
    }
    public void setBorder(ArrayList<Coordinate> border){
        this.border=border;
    }

    public Shape toShape(){
        return new Shape(ShapeType.getShapeType(type),border);
    }
}
