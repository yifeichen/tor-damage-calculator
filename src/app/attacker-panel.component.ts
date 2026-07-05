import { Component, EventEmitter, Input, OnInit, Output, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { AttackerData } from './models';
import { AttackerType, ClassType, ElementType, PhysicalActionType, PincerRank, CounterRank } from './enums';
import { FinisherEntry, allWeaponTypes, oneHandMeleeWeaponTypes, twoHandMeleeWeaponTypes, rangedWeaponTypes, getFinishersByWeaponType, finisherDataMap } from './constants';

@Component({
  selector: 'app-attacker-panel',
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
  templateUrl: './attacker-panel.component.html',
  styleUrls: ['./attacker-panel.component.css']
})

export class AttackerPanelComponent implements OnInit {
  @Input() initialData!: AttackerData;
  @Output() onDataChanged = new EventEmitter<AttackerData>();
  attackerForm: FormGroup;
  actionTypes = [
    PhysicalActionType['1H Melee'],
    PhysicalActionType['2H Melee'],
    PhysicalActionType['Ranged'],
    PhysicalActionType['Dark Knight Finisher'],
    PhysicalActionType['Elemental Shot'],
    PhysicalActionType['Evanescence'],
    PhysicalActionType['Elemental Orb'],
    PhysicalActionType['Monster Special'],
    PhysicalActionType['Humanoid Special'],
    PhysicalActionType['Monster Melee'],
    PhysicalActionType['Monster Ranged'],
  ];
  classTypes = Object.values(ClassType);
  elementTypes = Object.values(ElementType);
  pincerRanks = Object.values(PincerRank);
  counterRanks = Object.values(CounterRank);
  availableWeaponTypes: string[] = ['None'];
  finisherList: FinisherEntry[] = [];

  constructor(
    private fb: FormBuilder,
  ) {
    this.attackerForm = this.fb.group({
      physicalActionType: [PhysicalActionType['2H Melee']],
      weaponType: ['None'],
      oneHanderOffhand: ['No'],
      attackerStr: [100],
      attackerDex: [100],
      attackerElement: [ElementType.Fire],
      weaponStr: [1],
      weaponDex: [1],
      weaponSkillRank: [1],
      attackerLevel: [1],
      attackerClass: [ClassType.Warrior],
      physicalDamageBonus: [0],
      elementalDamageBonus: [0],
      racialDamageBonus: [0],
      prevailingElemBonus: [0],

      ogreSetBonus: [false],
      strengthen: [false],
      frightened: [false],
      weaken: [false],
      jijyglaSetBonus: [false],
      criticalHit: [false],
      physUpCard: [false],
      bane: [false],
      slayer: [false],
      offensiveMultiplier: [1],
      jijyglaMultiplier: [1],
      sanguineAssault: [false],
      berserk : [false],
      mightyStrike: [false],
      antiUndead: [false],
      weaponAtk: [100],
      jewelryAtk: [0],
      atkMultiplier: [1],
      elementalShotAtk: [0],
      actionAtkBonus: [0],
      pincerRank: [PincerRank.None],
      counterRank: [CounterRank.None],
      selectedFinisher: ['']
    });

    this.attackerForm.valueChanges.subscribe(value => {
      this.onDataChanged.emit(value);
    });

    this.attackerForm.get('physicalActionType')?.valueChanges.subscribe((actionType: string) => {
      this.updateWeaponTypes(actionType);
    });

    this.attackerForm.get('weaponType')?.valueChanges.subscribe((weapon: string) => {
      this.updateFinisherList(weapon);
    });

    this.attackerForm.get('selectedFinisher')?.valueChanges.subscribe((finisherName: string) => {
      if (!finisherName) return;
      const entry = finisherDataMap[finisherName];
      if (entry) {
        this.attackerForm.patchValue({
          actionAtkBonus: entry.atkBonus,
        }, { emitEvent: false });
      }
    });
  }

  private updateWeaponTypes(actionType: string) {
    let types: string[];
    switch (actionType) {
      case '1H Melee':
        types = ['None', ...oneHandMeleeWeaponTypes];
        break;
      case '2H Melee':
        types = ['None', ...twoHandMeleeWeaponTypes];
        break;
      case 'Ranged':
        types = ['None', ...rangedWeaponTypes];
        break;
      case 'Dark Knight Finisher':
        types = allWeaponTypes;
        break;
      default:
        types = ['None'];
    }

    this.availableWeaponTypes = types;
    const currentWeapon = this.attackerForm.get('weaponType')?.value;
    if (currentWeapon !== 'None' && !types.includes(currentWeapon)) {
      this.attackerForm.patchValue({ weaponType: 'None' }, { emitEvent: false });
    }
  }

  private updateFinisherList(weapon: string) {
    this.finisherList = getFinishersByWeaponType(weapon);
    if (!this.finisherList.some(f => f.name === this.attackerForm.get('selectedFinisher')?.value)) {
      this.attackerForm.patchValue({ selectedFinisher: '' }, { emitEvent: false });
    }
  }

  ngOnInit() {
    if (this.initialData) {
      this.attackerForm.patchValue(this.initialData);
    }
    this.updateWeaponTypes(this.attackerForm.get('physicalActionType')?.value);
    this.updateFinisherList(this.attackerForm.get('weaponType')?.value);
  }


}
    