import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { Instruction } from '../instruction';
import { InstructionService } from '../instruction.service';
import { InMemoryDataService } from '../in-memory-data.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

    instructions: Instruction[];

    instruction: Instruction;

    constructor(
      private route: ActivatedRoute,
      private instService: InstructionService,
      private auth: AuthService
    ) { }

    ngOnInit() {
      this.route.paramMap
        .switchMap((params: ParamMap) => {
          return this.instService.getInstructions(+params.get('id'))
      }).subscribe(instructions => this.instructions = instructions);
    }

}
