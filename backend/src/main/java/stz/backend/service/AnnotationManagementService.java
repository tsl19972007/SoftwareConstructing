package stz.backend.service;

import stz.backend.entityHelper.PictureHelper;

import java.util.ArrayList;

public interface AnnotationManagementService {

    public ArrayList<String> getPictureIds();

    public PictureHelper getPicture(String pictureId);

    public boolean savePicture(PictureHelper picture);

}
