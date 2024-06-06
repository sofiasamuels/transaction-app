import { connect } from "mongoose";
import { Person } from "../types/person";
import { PersonModel } from "../types/schemas/personSchema";

export class PersonService{
  
    static async savePerson(person: Person) {

        return await new PersonModel(person).save();
    }
    static async getPersonById(id: string) {

        return await PersonModel.findById(id);
    }
}