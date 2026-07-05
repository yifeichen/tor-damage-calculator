import { PhysicalActionType, ClassType, ElementType, Steelstance, PincerRank, CounterRank } from './enums';

export interface AttackerData {
  physicalActionType: PhysicalActionType;
  weaponType: string;
  oneHanderOffhand: string;
  attackerStr: number;
  attackerDex: number;
  weaponStr: number;
  weaponDex: number;
  weaponSkillRank: number;
  attackerClass: ClassType;
  attackerLevel: number;
  physicalDamageBonus: number;
  elementalDamageBonus: number;
  racialDamageBonus: number;
  prevailingElemBonus: number;
  attackerElement: ElementType;
  ogreSetBonus: boolean;
  strengthen: boolean;
  frightened: boolean;
  weaken: boolean;
  jijyglaSetBonus: boolean;
  criticalHit: boolean;
  physUpCard: boolean;
  bane: boolean;
  slayer: boolean;
  sanguineAssault: boolean;
  berserk: boolean;
  mightyStrike: boolean;
  antiUndead: boolean;
  weaponAtk: number;
  jewelryAtk: number;
  actionAtkBonus: number;
  elementalShotAtk: number;
  pincerRank: PincerRank;
  counterRank: CounterRank;
  selectedFinisher: string;
}

export interface DefenderData {
  defenderStr: number;
  defenderVit: number;
  defenderWeaponSkillRank: number;
  defenderLevel: number;
  defenderClass: ClassType;
  defenderElement: ElementType;
  physicalResistance: number;
  elementalResistance: number;
  racialResistance: number;
  ogreSetBonusDefender: boolean;
  steelstance: Steelstance;
  fortify: boolean;
  attuned: boolean;
  breach: boolean;
  averse: boolean;
  petrified: boolean;
  frightenedDefender: boolean;
  toughnessValue: number;
  equipmentDef: number;
  defMultiplier: number;
  defensiveMultiplier: number;
  phalanxGordianLock: boolean;
  dragonScale: boolean;
  skillMultiplier: number;
  prevailingElemPenalty: number;
}

export interface DamageResult {
  offenseValue: number;
  toughnessValue: number;
  totalAttack: number;
  totalDefense: number;
  atkOverhead: number;
  modifiedStatOverhead: number;
  finalDamage: number;
  totalDamage: number;
  effectiveModifier: number;
  offensiveMultiplier: number;
  defensiveMultiplier: number;
  totalModifier: number;
  statOverhead: number;
  hits: number;
  pincerMult: number;
  counterMult: number;
}
