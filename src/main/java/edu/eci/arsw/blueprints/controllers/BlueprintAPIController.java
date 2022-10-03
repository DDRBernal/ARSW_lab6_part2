/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistenceException;
import edu.eci.arsw.blueprints.persistence.BluePrintNotFoundException;

/**
 *
 * @author hcadavid
 */

@RestController
@RequestMapping(value = "/blueprints")
public class BlueprintAPIController {
    @Autowired
    BlueprintsServices blueprintsServices;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> GetResource() {
        //obtener datos que se enviarán a través del API
        //data
        try {
            return new ResponseEntity<>(blueprintsServices.getAllBlueprints(), HttpStatus.ACCEPTED);
        } catch (BlueprintsPersistenceException ex){
            return new ResponseEntity<>("Blue print error",HttpStatus.NOT_FOUND);
        }
    }


    @RequestMapping(method = RequestMethod.GET, value = "/{author}")
    @ResponseBody
    public ResponseEntity<?> getBlueprintByAuthor(@PathVariable("author") String author) {
        try {
            return new ResponseEntity<>(blueprintsServices.getBlueprintsByAuthor(author),HttpStatus.ACCEPTED);
        } catch (BluePrintNotFoundException ex) {
            return new ResponseEntity<>("404 ERROR \n The blueprint by Author +"+author+" wasn't found",HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{author}/{bpname}")
    public ResponseEntity<?> getBlueprint(@PathVariable("author") String author, @PathVariable("bpname") String bpname){
        try {
            return new ResponseEntity<>(blueprintsServices.getBlueprint(author,bpname),HttpStatus.ACCEPTED);
        } catch (BluePrintNotFoundException ex){
            return new ResponseEntity<>("404 ERROR \n The blueprint wasn't found ",HttpStatus.NOT_FOUND);
        }
    }

    //@GetMapping("/blueprints/{author}/{bpname}")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> updateNewBlueprint(@PathVariable Blueprint bp, @PathVariable String author, @PathVariable String bpname){
        try {
            blueprintsServices.updateBlueprint(bp,author,bpname);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (BlueprintsPersistenceException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

