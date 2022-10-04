/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.services;

import edu.eci.arsw.blueprints.persistence.BluePrintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistenceException;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;

import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hcadavid
 */
@Service
public class BlueprintsServices {
   
    @Autowired
    BlueprintsPersistence bpp=null;
    
    public void addNewBlueprint(Blueprint bp) throws BlueprintsPersistenceException {
        bpp.saveBlueprint(bp);
    }

    public void updateBlueprint(String bpnameold, String bpauthor, String newAuthor, String bprintname) throws BlueprintsPersistenceException{
        bpp.updateBlueprint(bpnameold,bpauthor,newAuthor,bprintname);
    }
    
    public Set<Blueprint> getAllBlueprints() throws BlueprintsPersistenceException {
        return bpp.getAllBlueprints();
    }
    
    /**
     * 
     * @param author blueprint's author
     * @param name blueprint's name
     * @return the blueprint of the given name created by the given author
     */
    public Blueprint getBlueprint(String author,String name) throws BluePrintNotFoundException {
        return bpp.getBlueprint(author,name);
    }
    
    /**
     * 
     * @param author blueprint's author
     * @return all the blueprints of the given author
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BluePrintNotFoundException {
        return bpp.getBlueprintsByAuthor(author);
    }
    
}
