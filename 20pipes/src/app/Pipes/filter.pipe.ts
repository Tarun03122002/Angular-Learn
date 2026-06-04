import { Pipe, PipeTransform } from "@angular/core";
import { Student } from "../Models/Student";

// Filter and sorting are not recommended using pipes as it is not reliable.If reliable ,then performance intensive.(Learn pure and impure pipes )
@Pipe({
    name:'filter',
    standalone : false
})
export class FilterPipe implements PipeTransform{


    transform(studentList: Student[],filterByGender:string) {

        if(!filterByGender || filterByGender =='All' || studentList?.length == 0)
            return studentList
        else 
            return studentList.filter((student : Student) => student.gender.toLowerCase() === filterByGender.toLowerCase())
    }
}