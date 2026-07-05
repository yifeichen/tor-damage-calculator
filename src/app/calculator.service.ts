import { Injectable } from '@angular/core';
import { AttackerType, ClassType, ElementType } from './enums';
import { AttackerData, DefenderData, DamageResult } from './models';
import {
  strScalingMap,
  dexScalingMap,
  defenderStrScalingMap,
  defenderVitScalingMap,
  steelstanceMultiplierMap,
  elementAdvantageMap,
  levelScalingMap,
  classToAttackerTypeMap,
  atkMultiplierMap,
  classBaseAtkMap,
  classBaseDefMap,
  pincerMultiplierMap,
  counterMultiplierMap,
  finisherDataMap
} from './constants';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  getStrScaling(actionType: string): number {
    return strScalingMap[actionType] || 1.0;
  }

  getDexScaling(actionType: string): number {
    return dexScalingMap[actionType] || 1.0;
  }

  getDefenderStrScaling(actionType: string): number {
    return defenderStrScalingMap[actionType] || 0.7;
  }

  getDefenderVitScaling(actionType: string): number {
    return defenderVitScalingMap[actionType] || 1.0;
  }

  calculateLevelScalingBonus(attackerType: string, attackerLevel: number): number {
    const scalingFunction = levelScalingMap[attackerType];
    return scalingFunction ? scalingFunction(attackerLevel) : 0;
  }

  getAttackerTypeFromClass(attackerClass: string): AttackerType {
    return classToAttackerTypeMap[attackerClass.trim()] || AttackerType.Humanoid;
  }

  getClassBaseAtk(attackerClass: ClassType): number {
    return classBaseAtkMap[attackerClass] || 0;
  }

  getClassBaseDef(defenderClass: ClassType): number {
    return classBaseDefMap[defenderClass] || 0;
  }

  calculateAtkMultiplier(actionType: string): number {
    return atkMultiplierMap[actionType] || 1.0;
  }

  calculateDetailedPhysicalDamage(attackerData: AttackerData, defenderData: DefenderData): DamageResult {
    const actionType = attackerData.physicalActionType?.trim() || '';
    const weaponSkillRank = Math.min(90, attackerData.weaponSkillRank);

    const offenseValue = this.calculateOffenseValue(attackerData, actionType, weaponSkillRank);
    const toughnessValue = this.calculateToughnessValue(defenderData, actionType);
    const statOverhead = this.calculateStatOverhead(offenseValue, toughnessValue, actionType);

    const { totalModifier, effectiveModifier } = this.calculateEffectiveModifier(attackerData, defenderData);
    const modifiedStatOverhead = statOverhead * effectiveModifier;

    const equipmentAttack = this.calculateEquipmentAttack(attackerData, actionType);
    const equipmentDefense = this.calculateEquipmentDefense(defenderData);
    const atkOverhead = equipmentAttack - equipmentDefense;

    const offensiveMultiplier = this.calculateOffensiveMultiplier(attackerData);
    const defensiveMultiplier = this.calculateDefensiveMultiplier(defenderData);
    const finalDamage = Math.min(modifiedStatOverhead + atkOverhead, 9999);

    const finisherEntry = attackerData.selectedFinisher ? finisherDataMap[attackerData.selectedFinisher] : undefined;
    const hits = finisherEntry ? finisherEntry.hits : 1;
    const pincerMult = pincerMultiplierMap[attackerData.pincerRank] || 1;
    const counterMult = counterMultiplierMap[attackerData.counterRank] || 1;
    const totalDamage = this.calculateTotalDamage(finalDamage, attackerData, offensiveMultiplier, defensiveMultiplier, hits, pincerMult, counterMult);

    return {
      offenseValue,
      toughnessValue,
      modifiedStatOverhead,
      totalAttack: equipmentAttack,
      totalDefense: equipmentDefense,
      atkOverhead,
      finalDamage,
      totalDamage,
      effectiveModifier,
      offensiveMultiplier,
      defensiveMultiplier,
      totalModifier,
      statOverhead,
      hits,
      pincerMult,
      counterMult,
    };
  }

  private calculateEffectiveStats(attackerData: AttackerData, actionType: string): { effectiveStr: number; effectiveDex: number } {
    const attackerStr = this.safeNumber(attackerData.attackerStr);
    const attackerDex = this.safeNumber(attackerData.attackerDex);
    const weaponStr = this.safeNumber(attackerData.weaponStr, 1);
    const weaponDex = this.safeNumber(attackerData.weaponDex, 1);

    const isEvanescence = actionType === 'Evanescence';
    const isMonsterSpecial = actionType === 'Monster Special';
    const isHumanoidSpecial = actionType === 'Humanoid Special';
    const noOffhand = attackerData.oneHanderOffhand?.trim().toLowerCase() === 'no';

    let effectiveStr = attackerStr;
    let effectiveDex = attackerDex;
    if ((isEvanescence || isMonsterSpecial || isHumanoidSpecial) && noOffhand) {
      effectiveStr -= weaponStr;
      effectiveDex -= weaponDex;
    }
    return { effectiveStr, effectiveDex };
  }

  private calculateOffenseValue(attackerData: AttackerData, actionType: string, weaponSkillRank: number): number {
    const { effectiveStr, effectiveDex } = this.calculateEffectiveStats(attackerData, actionType);

    const strContribution = effectiveStr * this.getStrScaling(actionType);
    const dexContribution = effectiveDex * this.getDexScaling(actionType);

    const isElementalShot = actionType === 'Elemental Shot';
    const isEvanescence = actionType === 'Evanescence';
    const isMonsterSpecial = actionType === 'Monster Special';
    const isHumanoidSpecial = actionType === 'Humanoid Special';
    const isElementalOrb = actionType === 'Elemental Orb';

    let weaponSkillBonus = isElementalShot ? 0 : weaponSkillRank * 0.6;
    if (isEvanescence || isMonsterSpecial || isHumanoidSpecial || isElementalOrb) {
      weaponSkillBonus -= weaponSkillRank * 0.6;
    }

    let offenseValue = strContribution + dexContribution + weaponSkillBonus;
    offenseValue *= attackerData.ogreSetBonus ? 1.2 : 1;
    offenseValue *= attackerData.frightened ? 0.85 : 1;

    return offenseValue;
  }

  private calculateToughnessValue(defenderData: DefenderData, actionType: string): number {
    const defenderStr = this.safeNumber(defenderData.defenderStr);
    const defenderVit = this.safeNumber(defenderData.defenderVit);
    const defenderWeaponSkillRank = this.safeNumber(defenderData.defenderWeaponSkillRank);

    const weaponSkillContribution = defenderWeaponSkillRank > 40 ? 4 : defenderWeaponSkillRank * 0.1;
    const petrifiedBonus = defenderData.petrified ? 100 : 0;

    const baseToughness = (defenderStr * this.getDefenderStrScaling(actionType))
                        + (defenderVit * this.getDefenderVitScaling(actionType))
                        + weaponSkillContribution
                        + petrifiedBonus;

    const ogreMultiplier = defenderData.ogreSetBonusDefender ? 1.2 : 1;
    const steelstanceMultiplier = steelstanceMultiplierMap[defenderData.steelstance] || 1;
    const frightenedMultiplier = defenderData.frightenedDefender ? 0.85 : 1;

    return baseToughness * ogreMultiplier * steelstanceMultiplier * frightenedMultiplier;
  }

  private calculateStatOverhead(offenseValue: number, toughnessValue: number, actionType: string): number {
    if (actionType === 'Elemental Shot') return 0;
    return Math.max(0, offenseValue - toughnessValue);
  }

  private calculateEquipmentAttack(attackerData: AttackerData, actionType: string): number {
    const weaponAtk = this.safeNumber(attackerData.weaponAtk);
    const jewelryAtk = this.safeNumber(attackerData.jewelryAtk);
    const actionAtkBonus = this.safeNumber(attackerData.actionAtkBonus);
    const baseAtk = weaponAtk + jewelryAtk + this.getClassBaseAtk(attackerData.attackerClass) + actionAtkBonus;

    const atkMult = this.calculateAtkMultiplier(actionType);
    const ogreMult = attackerData.ogreSetBonus ? 1.2 : 1;
    const frightenedMult = attackerData.frightened ? 0.85 : 1;

    return baseAtk * atkMult * ogreMult * frightenedMult;
  }

  private calculateEquipmentDefense(defenderData: DefenderData): number {
    const baseDef = this.safeNumber(defenderData.equipmentDef) + this.safeNumber(this.getClassBaseDef(defenderData.defenderClass));

    const defMult = this.safeNumber(defenderData.defMultiplier, 1);
    const ogreMult = defenderData.ogreSetBonusDefender ? 1.2 : 1;
    const steelstanceMult = steelstanceMultiplierMap[defenderData.steelstance] || 1;
    const frightenedMult = defenderData.frightenedDefender ? 0.85 : 1;

    return baseDef * defMult * ogreMult * steelstanceMult * frightenedMult;
  }

  private calculateOffensiveMultiplier(attackerData: AttackerData): number {
    let product = 1;
    if (attackerData.slayer) product *= 4;
    if (attackerData.bane) product *= 2;
    if (attackerData.sanguineAssault) product *= 1.75;
    if (attackerData.berserk) product *= 1.5;
    if (attackerData.mightyStrike) product *= 1.25;
    if (attackerData.antiUndead) product *= 1.2;

    const critAdd = attackerData.criticalHit ? 1 : 0;
    const physUpAdd = attackerData.physUpCard ? 0.5 : 0;

    return product + critAdd + physUpAdd;
  }

  private calculateTotalDamage(
    finalDamage: number,
    attackerData: AttackerData,
    offensiveMultiplier: number,
    defensiveMultiplier: number,
    hits: number,
    pincerMult: number,
    counterMult: number
  ): number {
    let damage = finalDamage;
    damage *= attackerData.jijyglaSetBonus ? 1.5 : 1;
    damage *= offensiveMultiplier;
    damage *= defensiveMultiplier;
    damage = Math.min(damage, 9999);
    damage *= hits * pincerMult * counterMult;
    return damage;
  }

  private calculateEffectiveModifier(attackerData: AttackerData, defenderData: DefenderData): { totalModifier: number; effectiveModifier: number } {
    const physPct = this.safeNumber(attackerData.physicalDamageBonus) / 100;
    const elemPct = this.safeNumber(attackerData.elementalDamageBonus) / 100;
    const racialPct = this.safeNumber(attackerData.racialDamageBonus) / 100;
    const prevailingPct = this.safeNumber(attackerData.prevailingElemBonus) / 100;

    const elementAffinity = this.calculateElementAffinity(attackerData.attackerElement, defenderData.defenderElement);
    const finisherAffinity = this.calculateFinisherAffinity(attackerData, defenderData);

    const strengthenMod = attackerData.strengthen ? 0.10 : 0;
    const breachMod = defenderData.breach ? 0.50 : 0;

    const physResist = this.safeNumber(defenderData.physicalResistance) / 100;
    const elemResist = this.safeNumber(defenderData.elementalResistance) / 100;
    const racialResist = this.safeNumber(defenderData.racialResistance) / 100;

    const prevailingPenalty = this.safeNumber(defenderData.prevailingElemPenalty) / 100;

    const fortifyMod = defenderData.fortify ? 0.10 : 0;
    const attunedMod = defenderData.attuned ? 0.15 : 0;
    const weakenMod = attackerData.weaken ? 0.50 : 0;
    const averseMod = defenderData.averse ? 0.10 : 0;

    const totalModifier = 1 + physPct + elemPct + racialPct + prevailingPct
                      + elementAffinity
                      + finisherAffinity
                      + strengthenMod + breachMod
                      - physResist - elemResist - racialResist
                      - prevailingPenalty
                      - fortifyMod - attunedMod - weakenMod
                      + averseMod;

    const effectiveModifier = Math.max(0, Math.min(2.50, totalModifier));

    return { totalModifier, effectiveModifier };
  }

  private calculateElementAffinity(attackerElement: string, defenderElement: string): number {
    if (!attackerElement || !defenderElement) return 0;
    if (elementAdvantageMap[attackerElement as ElementType] === defenderElement) return 0.30;
    if (elementAdvantageMap[defenderElement as ElementType] === attackerElement) return -0.10;
    return 0;
  }

  private calculateFinisherAffinity(attackerData: AttackerData, defenderData: DefenderData): number {
    if (!attackerData.selectedFinisher) return 0;
    const entry = finisherDataMap[attackerData.selectedFinisher];
    if (!entry || !entry.element) return 0;
    return this.calculateElementAffinity(entry.element, defenderData.defenderElement);
  }

  private calculateDefensiveMultiplier(defenderData: DefenderData): number {
    if (defenderData.phalanxGordianLock) return 0.1;
    if (defenderData.dragonScale) return 0.2;
    return this.safeNumber(defenderData.defensiveMultiplier, 1);
  }

  private safeNumber(value: any, fallback: number = 0): number {
    const n = Number(value);
    return isNaN(n) ? fallback : n;
  }
}
