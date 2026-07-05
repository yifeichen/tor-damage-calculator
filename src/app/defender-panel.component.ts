import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DefenderData } from './models';
import { ClassType, ElementType, Steelstance } from './enums';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-defender-panel',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  templateUrl: './defender-panel.component.html',
  styleUrls: ['./defender-panel.component.css']
})

export class DefenderPanelComponent implements OnInit {
  @Input() initialData!: DefenderData;
  @Output() onDataChanged = new EventEmitter<DefenderData>();
  defenderForm!: FormGroup;
  steelstanceOptions = Object.values(Steelstance);
  classTypes = Object.values(ClassType);
  elementTypes = Object.values(ElementType);

  constructor(
    private fb: FormBuilder,
  ) {
    this.defenderForm = this.fb.group({
      defenderStr: [100],
      defenderVit: [100],
      defenderLevel: [1],
      defenderClass: ClassType.Warrior,
      defenderElement: [ElementType.Fire],
      physicalResistance: [0],
      elementalResistance: [0],
      racialResistance: [0],
      equipmentDef: [0],  
      defenderWeaponSkillRank: [1],
      steelstance: [Steelstance.No], 
      prevailingElemPenalty: [0],
      ogreSetBonusDefender: [false],
      fortify: [false],
      breach: [false],
      attuned: [false],
      averse: [false],
      frightenedDefender: [false],
      petrified: [false],
      phalanxGordianLock: [false],
      dragonScale: [false],
    });

    this.defenderForm.valueChanges.subscribe(value => {
      this.onDataChanged.emit(value);
    });
  }

  ngOnInit() {
    if (this.initialData) {
      this.defenderForm.patchValue(this.initialData);
    }
  }
  
}
