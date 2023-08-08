import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

interface TreeNode {
  managerName: string;
  employees?: TreeNode[];
}

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent {
  rootNodeData?: TreeNode[]

  constructor(private employeeService: EmployeeService){}
  ngOnInit(): void {
    // this.getHierarchy();
  }

  // getHierarchy(){
  //   this.employeeService.getHierarchy().subscribe({
  //     next: response => {
  //       this.rootNodeData = response;
  //       console.log(response)
  //     },
  //     error: error => console.log(error)
  //   })
  // }



}





