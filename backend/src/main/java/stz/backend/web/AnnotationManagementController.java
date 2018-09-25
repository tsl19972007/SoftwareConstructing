package stz.backend.web;

import org.springframework.web.bind.annotation.*;
import stz.backend.entityHelper.PictureHelper;
import stz.backend.service.AnnotationManagementService;
import stz.backend.serviceImpl.AnnotationManagementImpl;
import java.util.ArrayList;

@RestController
public class AnnotationManagementController implements AnnotationManagementService {

    private AnnotationManagementImpl management = new AnnotationManagementImpl();

    @Override
    @RequestMapping(value = "/savePicture", method = RequestMethod.POST)
    public @ResponseBody boolean savePicture(@RequestBody PictureHelper picture) {
        return management.savePicture(picture);
    }

    @Override
    @RequestMapping(value = "/getPicture", method = RequestMethod.GET)
    public @ResponseBody PictureHelper getPicture(@RequestParam String pictureId) {
        return management.getPicture(pictureId);
    }

    @Override
    @RequestMapping(value = "/getPictureIds", method = RequestMethod.GET)
    @ResponseBody
    public ArrayList<String> getPictureIds() {
        return management.getPictureIds();
    }
}
