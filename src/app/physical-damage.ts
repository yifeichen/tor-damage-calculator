import { Component, effect, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalculatorService } from './calculator.service';
import { AttackerData, DefenderData, DamageResult } from './models';
import { ClassType, PhysicalActionType, Steelstance, ElementType, PincerRank, CounterRank } from './enums';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { combineLatest, startWith } from 'rxjs';
import { AttackerPanelComponent } from './attacker-panel.component';
import { DefenderPanelComponent } from './defender-panel.component';

@Component({
  selector: 'app-physical-damage',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, AttackerPanelComponent, DefenderPanelComponent],
  templateUrl: './physical-damage.html',
  styleUrls: ['./physical-damage.css']
})
export class PhysicalDamageComponent {

  attackerData = signal<AttackerData>({
    physicalActionType: PhysicalActionType['2H Melee'],
    weaponType: '',
    oneHanderOffhand: 'No',
    attackerStr: 100,
    attackerDex: 100,
    weaponStr: 0,
    weaponDex: 0,
    weaponSkillRank: 1,
    attackerClass: ClassType.Warrior,
    attackerLevel: 1,
    physicalDamageBonus: 0,
    elementalDamageBonus: 0,
    racialDamageBonus: 0,
    prevailingElemBonus: 0,

    ogreSetBonus: false,
    strengthen: false,
    frightened: false,
    weaken: false,
    jijyglaSetBonus: false,
    criticalHit: false,
    physUpCard: false,
    bane: false,
    slayer: false,
    sanguineAssault: false,
    berserk: false,
    mightyStrike: false,
    antiUndead: false,
    weaponAtk: 100,
    jewelryAtk: 10,
    actionAtkBonus: 0,
    elementalShotAtk: 0,
    pincerRank: PincerRank.None,
    counterRank: CounterRank.None,
    attackerElement: ElementType.Fire,
    selectedFinisher: '',
  });

  defenderData = signal<DefenderData>({
    defenderStr: 100,
    defenderVit: 100,
    defenderWeaponSkillRank: 1,
    defenderLevel: 1,
    defenderClass: ClassType.Warrior,
    physicalResistance: 0,
    elementalResistance: 0,
    racialResistance: 0,
    ogreSetBonusDefender: false,
    steelstance: Steelstance.No,
    fortify: false,
    attuned: false,
    breach: false,
    averse: false,
    petrified: false,
    frightenedDefender: false,
    toughnessValue: 0,
    equipmentDef: 100,
    defMultiplier: 1,
    defensiveMultiplier: 1,
    phalanxGordianLock: false,
    dragonScale: false,
    skillMultiplier: 0,
    prevailingElemPenalty: 0,
    defenderElement: ElementType.Fire,
  } );
  result!: DamageResult;

  constructor(
    private calculator: CalculatorService
  ) {
    effect(() => {
      this.result = this.calculator.calculateDetailedPhysicalDamage(this.attackerData(),this.defenderData());
    });
  }

  attackerDataChange(data: AttackerData) {
    this.attackerData.set(data);
  }

  defenderDataChange(data: DefenderData) {
    this.defenderData.set(data);
  }


}

