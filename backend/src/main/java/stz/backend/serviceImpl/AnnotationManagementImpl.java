package stz.backend.serviceImpl;

import stz.backend.entity.*;
import stz.backend.service.AnnotationManagementService;
import stz.backend.entityHelper.ShapeHelper;
import stz.backend.entityHelper.PictureHelper;

import java.io.*;

import java.util.ArrayList;

public class AnnotationManagementImpl implements AnnotationManagementService {

    private final String BORDER_END = "##BORDER_END##";

    @Override
    public ArrayList<String> getPictureIds(){
        ArrayList<String> res=new ArrayList<String>();
        File file = new File("Data");
        String []fileName = file.list();
        for (int i = 0; i < fileName.length; i++){
            res.add(fileName[i]);
        }
        return res;
    }

    @Override
    public PictureHelper getPicture(String pictureId){
        File file = new File("Data/" + pictureId);
        if (!file.isDirectory() || file.list().length == 0) {
            return null;
        }
        String []fileName = file.list();
        ArrayList<Shape> shapes=new ArrayList<Shape>();
        for (int i = 0; i < fileName.length; i++){
            String shapeId = fileName[i].substring(0, fileName[i].indexOf('.'));
            File f = new File("Data/" + pictureId + "/" + shapeId + ".txt");

            try {
                FileReader filereader = new FileReader(f);
                BufferedReader reader = new BufferedReader(filereader);
                String line = "";
                ArrayList<String> content = new ArrayList<String>();
                while ((line = reader.readLine()) != null) {
                    content.add(line);
                }

                ArrayList<Coordinate> border = new ArrayList<Coordinate>();
                String type = "";
                for (int j = 0; j < content.indexOf(BORDER_END); j++) {
                    String[] coordinate = content.get(j).split(",");
                    int x = Integer.parseInt(coordinate[0]);
                    int y = Integer.parseInt(coordinate[1]);
                    border.add(new Coordinate(x, y));
                }
                type = content.get(content.indexOf(BORDER_END) + 1);

                Shape shape = new Shape(ShapeType.getShapeType(type), border);
                shapes.add(shape);
                reader.close();
                filereader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        Picture res=new Picture(pictureId,shapes);
        return res.toPictureHelper();
    }

    @Override
    public boolean savePicture(PictureHelper picture){
        Picture rPicture=picture.toPicture();
        ArrayList<Shape> shapes=rPicture.getShapes();
        for(int i=0;i<shapes.size();i++){
            saveShape(shapes.get(i),rPicture.getPictureId(),String.valueOf(i+1));
        }
        return true;
    }

    public boolean saveShape(Shape shape,String pictureId,String shapeId) {
        File fileDir = new File("Data/" + pictureId);
        fileDir.mkdirs();
        File file = new File("Data/" + pictureId + "/" + shapeId + ".txt");
        try {
            FileWriter fw = new FileWriter(file, false);

            for (Coordinate coordinate : shape.getBorder()) {
                fw.write(coordinate.getX() + "," + coordinate.getY() + "\r\n");
            }

            fw.write(BORDER_END + "\r\n");
            fw.write(shape.getType().getName() + "\r\n");

            fw.flush();
            fw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return true;
    }

}
