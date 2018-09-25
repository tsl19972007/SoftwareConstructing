package stz.backend.entity;

public enum ShapeType {
    Circle("Circle"), Rectangle("Rectangle"),Triangle("Triangle"),Undefined("Undefined");

    private final String name;

    private ShapeType(String name)
    {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static ShapeType getShapeType(String key){
        if(null == key){
            return null;
        }
        for(ShapeType temp:ShapeType.values()){
            if(temp.getName().equals(key)){
                return temp;
            }
        }
        return null;
    }
}
