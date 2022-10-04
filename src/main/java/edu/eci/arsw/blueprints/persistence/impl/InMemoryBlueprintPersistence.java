/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author hcadavid
 */
@Component
@Qualifier("inMemory")
public class InMemoryBlueprintPersistence implements BlueprintsPersistence{

    private final Map<Tuple<String,String>,Blueprint> blueprints=new HashMap<>();


    public InMemoryBlueprintPersistence() {
        //load stub data
        Point[] pts1=new Point[]{new Point(140, 140),new Point(115, 115)};
        Blueprint bp=new Blueprint("jay", "firstBlueprint",pts1);

        Point[] ptsj=new Point[]{new Point(300, 50),new Point(70, 112)};
        Blueprint bpj=new Blueprint("jay", "anotherBlueprint",ptsj);

        Blueprint bp2=new Blueprint("zoe", "secondBlueprint",pts1);

        Point[] pts3=new Point[]{new Point(30, 10),new Point(250, 55)};
        Blueprint bp3=new Blueprint("drew", "thirdBlueprint",pts3);

        blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        blueprints.put(new Tuple<>(bpj.getAuthor(),bpj.getName()), bpj);
        blueprints.put(new Tuple<>(bp2.getAuthor(),bp2.getName()), bp2);
        blueprints.put(new Tuple<>(bp3.getAuthor(),bp3.getName()), bp3);
    }    
    
    @Override
    public void saveBlueprint(Blueprint bp)  {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(),bp.getName()))){
            System.out.println("The given blueprint already exists: "+bp);
        }
        else{
            blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        }        
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) {
        return blueprints.get(new Tuple<>(author, bprintname));
    }

    @Override
    public Set<Blueprint> getAllBlueprints()  {
        Set<Blueprint> set = new HashSet<>();
        for (Tuple<String,String> tuple : blueprints.keySet()){
            Blueprint blueprint = getBlueprint(blueprints.get(tuple).getAuthor(), blueprints.get(tuple).getName());
            set.add(blueprint);
        }
        return set;
    }

    @Override
    public Set<Blueprint> getBlueprintsByAuthor(String author) {
        Set<Blueprint> set = new HashSet<>();
        for (Tuple<String, String> tuple: blueprints.keySet()){
            if (blueprints.get(tuple).getAuthor().equals(author)){
                Blueprint blueprint = getBlueprint(blueprints.get(tuple).getAuthor(), blueprints.get(tuple).getName());
                set.add(blueprint);
            }
        }
        return set;
    }

    @Override
    public void updateBlueprint(String bpnameold, String bpautor, String newAutor, String bprintname) {
        Blueprint bp1 = getBlueprint(bpautor,bpnameold);
        bp1.setAuthor(newAutor);
        bp1.setName(bprintname);
        saveBlueprint(bp1);
    }
}

