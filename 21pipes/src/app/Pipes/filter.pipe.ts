import { Pipe, PipeTransform } from "@angular/core";
import { Student } from "../Models/Student";

// Filter and sorting are not recommended using pipes as it is not reliable.If reliable ,then performance intensive.(Learn pure and impure pipes )
@Pipe({
    name: 'filter',
    standalone: false,
    // pure:false
    pure:true
})
export class FilterPipe implements PipeTransform {


    transform(studentList: Student[], filterByGender: string) {
        console.log("FILTER PIPE CALLED");

        if (!filterByGender || filterByGender == 'All' || studentList?.length == 0)
            return studentList
        else
            return studentList.filter((student: Student) => student.gender.toLowerCase() === filterByGender.toLowerCase())
    }
}

// Pure pipes which gets called when there is pure change on input value.By default,all pipes are pure

// Pure change -> 
// 1) If input value is of primitve type(string,number,boolean) and there is a change in input value then it is pure change
// 2) If input value is of reference type and  reference of input value changes then that change is  a pure change

//  Impure pipe is a pipe which is not pure.It gets called on every change detection cycle and is performance intensive,
// To create impure pipe,pass pure : false in @Pipe metadata
// Impure pipe will not use in real world scenario due to its performance issue