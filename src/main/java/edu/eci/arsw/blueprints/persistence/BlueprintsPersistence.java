/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence;

import edu.eci.arsw.blueprints.model.Blueprint;

import java.util.Set;

/**
 *
 * @author hcadavid
 */
public interface BlueprintsPersistence {
    
    /**
     * 
     * @param bp the new blueprint
     *    or any other low-level persistence error occurs.
     */
    public void saveBlueprint(Blueprint bp) ;
    
    /**
     * 
     * @param author blueprint's author
     * @param bprintname blueprint's author
     * @return the blueprint of the given name and author
     */
    public Blueprint getBlueprint(String author,String bprintname);

    Set<Blueprint> getAllBlueprints() ;

    Set<Blueprint> getBlueprintsByAuthor(String author);

    void updateBlueprint(Blueprint bp, String newAutor, String bprintname);
    
}
