import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { AttackerData, DefenderData } from './models';
import { PhysicalActionType, ClassType, Steelstance, PincerRank, CounterRank, ElementType } from './enums';

function defaultAttacker(overrides?: Partial<AttackerData>): AttackerData {
  return {
    physicalActionType: PhysicalActionType['1H Melee'],
    weaponType: '',
    oneHanderOffhand: 'No',
    attackerStr: 100,
    attackerDex: 100,
    weaponStr: 0,
    weaponDex: 0,
    weaponSkillRank: 90,
    attackerClass: ClassType.Warrior,
    attackerLevel: 50,
    physicalDamageBonus: 0,
    elementalDamageBonus: 0,
    racialDamageBonus: 0,
    prevailingElemBonus: 0,
    attackerElement: ElementType.Fire,
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
    selectedFinisher: '',
    ...overrides,
  };
}

function defaultDefender(overrides?: Partial<DefenderData>): DefenderData {
  return {
    defenderStr: 100,
    defenderVit: 100,
    defenderWeaponSkillRank: 40,
    defenderLevel: 50,
    defenderClass: ClassType.Warrior,
    defenderElement: ElementType.Fire,
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
    ...overrides,
  };
}

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  describe('full calculation baseline', () => {
    it('computes a basic physical damage correctly', () => {
      const a = defaultAttacker();
      const d = defaultDefender();
      const r = service.calculateDetailedPhysicalDamage(a, d);

      // Offense: 100*1.8 + 100*1.3 + 90*0.6 = 180 + 130 + 54 = 364
      expect(r.offenseValue).toBeCloseTo(364, 2);

      // Toughness: 100*0.7 + 100*1.0 + 40*0.1 + 0 = 70 + 100 + 4 = 174
      expect(r.toughnessValue).toBeCloseTo(174, 2);

      // Stat Overhead = max(0, 364-174) = 190
      expect(r.statOverhead).toBeCloseTo(190, 2);

      // Total Modifier: base 1, clamp(1, 0, 2.5) = 1
      expect(r.totalModifier).toBeCloseTo(1, 2);
      expect(r.effectiveModifier).toBeCloseTo(1, 2);

      // Modified Stat Overhead = 190 * 1 = 190
      expect(r.modifiedStatOverhead).toBeCloseTo(190, 2);

      // Total ATK: (100+10+4+0) * 1.0 * 1 * 1 = 114
      expect(r.totalAttack).toBeCloseTo(114, 2);

      // Total DEF: (100+2) * 1 * 1 * 1 * 1 = 102
      expect(r.totalDefense).toBeCloseTo(102, 2);

      // ATK Overhead = 114 - 102 = 12
      expect(r.atkOverhead).toBeCloseTo(12, 2);

      // Final Damage = min(190 + 12, 9999) = 202
      expect(r.finalDamage).toBeCloseTo(202, 2);

      // Offensive Mult = 1 (nothing active)
      expect(r.offensiveMultiplier).toBeCloseTo(1, 2);

      // Defensive Mult = 1 (nothing active)
      expect(r.defensiveMultiplier).toBeCloseTo(1, 2);

      // Total Damage = min(202 * 1 * 1 * 1, 9999) * 1 * 1 * 1 = 202
      expect(r.totalDamage).toBeCloseTo(202, 2);
    });
  });

  describe('effective modifier', () => {
    it('sums damage bonuses and subtracts resistances', () => {
      const a = defaultAttacker({
        physicalDamageBonus: 50,
        elementalDamageBonus: 20,
        racialDamageBonus: 10,
        prevailingElemBonus: 5,
      });
      const d = defaultDefender({
        physicalResistance: 10,
        elementalResistance: 5,
        racialResistance: 2,
      });
      const r = service.calculateDetailedPhysicalDamage(a, d);

      // totalModifier = 1 + 0.50 + 0.20 + 0.10 + 0.05 - 0.10 - 0.05 - 0.02 = 1.68
      expect(r.totalModifier).toBeCloseTo(1.68, 4);
      expect(r.effectiveModifier).toBeCloseTo(1.68, 4);
    });

    it('applies Strengthen (+10%) and Breach (+50%)', () => {
      const a = defaultAttacker({ strengthen: true });
      const d = defaultDefender({ breach: true });
      const r = service.calculateDetailedPhysicalDamage(a, d);

      // totalModifier = 1 + 0 + 0 + 0.10 + 0.50 = 1.60
      expect(r.totalModifier).toBeCloseTo(1.60, 4);
    });

    it('applies Fortify (-10%), Attuned (-15%), Weaken (-50%) and Averse (+10%)', () => {
      const a = defaultAttacker({ weaken: true });
      const d = defaultDefender({ fortify: true, attuned: true, averse: true });
      const r = service.calculateDetailedPhysicalDamage(a, d);

      // totalModifier = 1 + 0 - 0.10 - 0.15 - 0.50 + 0.10 = 0.35
      expect(r.totalModifier).toBeCloseTo(0.35, 4);
      expect(r.effectiveModifier).toBeCloseTo(0.35, 4);
    });

    it('clamps to 250% maximum', () => {
      const a = defaultAttacker({
        physicalDamageBonus: 500,
        elementalDamageBonus: 500,
      });
      const d = defaultDefender();
      const r = service.calculateDetailedPhysicalDamage(a, d);

      expect(r.totalModifier).toBeCloseTo(11.0, 4);
      expect(r.effectiveModifier).toBeCloseTo(2.50, 4);
    });

    it('applies PrevailingElemPenalty', () => {
      const a = defaultAttacker({ prevailingElemBonus: 30 });
      const d = defaultDefender({ prevailingElemPenalty: 10 });
      const r = service.calculateDetailedPhysicalDamage(a, d);

      // totalModifier = 1 + 0.30 - 0.10 = 1.20
      expect(r.totalModifier).toBeCloseTo(1.20, 4);
    });
  });

  describe('element affinity', () => {
    it('Strong: attacker element beats defender element (+30%)', () => {
      const a = defaultAttacker({ attackerElement: ElementType.Fire });
      const d = defaultDefender({ defenderElement: ElementType.Ice });
      const r = service.calculateDetailedPhysicalDamage(a, d);

      // 1 + Fire beats Ice (+0.30) = 1.30
      expect(r.totalModifier).toBeCloseTo(1.30, 4);
    });

    it('Weak: defender element beats attacker element (-10%)', () => {
      const a = defaultAttacker({ attackerElement: ElementType.Ice });
      const d = defaultDefender({ defenderElement: ElementType.Fire });
      const r = service.calculateDetailedPhysicalDamage(a, d);

      // 1 + Fire beats Ice → Ice is weak (-0.10) = 0.90
      expect(r.totalModifier).toBeCloseTo(0.90, 4);
    });

    it('Neutral: same element yields base 1', () => {
      const a = defaultAttacker({ attackerElement: ElementType.Fire });
      const d = defaultDefender({ defenderElement: ElementType.Fire });
      const r = service.calculateDetailedPhysicalDamage(a, d);

      expect(r.totalModifier).toBeCloseTo(1, 4);
    });

    it('Neutral: unrelated elements yield base 1', () => {
      const a = defaultAttacker({ attackerElement: ElementType.Fire });
      const d = defaultDefender({ defenderElement: ElementType.Wind });
      const r = service.calculateDetailedPhysicalDamage(a, d);

      expect(r.totalModifier).toBeCloseTo(1, 4);
    });

    it('covers full element wheel (Fire→Ice, Water→Fire, etc.)', () => {
      const wheel: Array<[ElementType, ElementType]> = [
        [ElementType.Fire, ElementType.Ice],
        [ElementType.Water, ElementType.Fire],
        [ElementType.Wind, ElementType.Earth],
        [ElementType.Earth, ElementType.Lightning],
        [ElementType.Lightning, ElementType.Water],
        [ElementType.Ice, ElementType.Wind],
        [ElementType.Light, ElementType.Dark],
        [ElementType.Dark, ElementType.Light],
      ];
      for (const [atk, def] of wheel) {
        const a = defaultAttacker({ attackerElement: atk });
        const d = defaultDefender({ defenderElement: def });
        const r = service.calculateDetailedPhysicalDamage(a, d);
        expect(r.totalModifier).toBeCloseTo(1.30, 4);
      }
    });
  });

  describe('finisher element affinity', () => {
    it('stacks with attacker element affinity (base 1 + 0.30 + 0.30 = 1.60)', () => {
      // 1 + 0.30 (attacker Fire beats defender Ice) + 0.30 (finisher Fire beats Ice) = 1.60
      const a = defaultAttacker({ selectedFinisher: 'Flaming Fists' });
      const d = defaultDefender({ defenderElement: ElementType.Ice });
      const r = service.calculateDetailedPhysicalDamage(a, d);
      expect(r.totalModifier).toBeCloseTo(1.60, 4);
    });

    it('stacks negative affinities (base 1 + -0.10 + -0.10 = 0.80)', () => {
      // 1 + -0.10 (attacker Fire loses to Water) + -0.10 (finisher Fire loses to Water) = 0.80
      const a = defaultAttacker({ selectedFinisher: 'Flaming Fists' });
      const d = defaultDefender({ defenderElement: ElementType.Water });
      const r = service.calculateDetailedPhysicalDamage(a, d);
      expect(r.totalModifier).toBeCloseTo(0.80, 4);
    });

    it('returns base 1 when finisher has no element', () => {
      // Rapid Strike has element ''
      const a = defaultAttacker({ selectedFinisher: 'Rapid Strike' });
      const r = service.calculateDetailedPhysicalDamage(a, defaultDefender());
      expect(r.totalModifier).toBeCloseTo(1, 4);
    });

    it('returns base 1 when no finisher selected', () => {
      const r = service.calculateDetailedPhysicalDamage(defaultAttacker(), defaultDefender());
      expect(r.totalModifier).toBeCloseTo(1, 4);
    });
  });

  describe('equipment attack multipliers', () => {
    it('applies ATK Mult, Ogre, and Frightened', () => {
      const a = defaultAttacker({
        physicalActionType: PhysicalActionType.Ranged,
        weaponAtk: 100,
        jewelryAtk: 0,
        attackerClass: ClassType.Warrior,
        actionAtkBonus: 0,
        ogreSetBonus: true,
        frightened: true,
      });
      const r = service.calculateDetailedPhysicalDamage(a, defaultDefender());

      // base: (100+0+4+0) = 104
      // ATK Mult (Ranged) = 2.5
      // Ogre = 1.2, Frightened = 0.85
      // Total = 104 * 2.5 * 1.2 * 0.85 = 265.2
      expect(r.totalAttack).toBeCloseTo(265.2, 2);
    });
  });

  describe('equipment defense multipliers', () => {
    it('applies DEF Mult, Ogre, Steelstance, and Frightened', () => {
      const d = defaultDefender({
        equipmentDef: 100,
        defenderClass: ClassType.Warrior,
        defMultiplier: 2,
        ogreSetBonusDefender: true,
        steelstance: Steelstance['Rank IV'],
        frightenedDefender: true,
      });
      const r = service.calculateDetailedPhysicalDamage(defaultAttacker(), d);

      // base: 100 + 2 = 102
      // DEF Mult = 2, Ogre = 1.2, Steelstance IV = 1.4, Frightened = 0.85
      // Total = 102 * 2 * 1.2 * 1.4 * 0.85 = 291.312
      expect(r.totalDefense).toBeCloseTo(291.312, 2);
    });
  });

  describe('offensive multiplier', () => {
    it('starts at 1 with nothing active', () => {
      const r = service.calculateDetailedPhysicalDamage(defaultAttacker(), defaultDefender());
      expect(r.offensiveMultiplier).toBeCloseTo(1, 2);
    });

    it('multiplies slayer × bane × sanguine × berserk × mighty × antiUndead', () => {
      const a = defaultAttacker({
        slayer: true,
        bane: true,
        sanguineAssault: true,
        berserk: true,
        mightyStrike: true,
        antiUndead: true,
      });
      const r = service.calculateDetailedPhysicalDamage(a, defaultDefender());
      // product = 4 * 2 * 1.75 * 1.5 * 1.25 * 1.2 = 31.5
      expect(r.offensiveMultiplier).toBeCloseTo(31.5, 4);
    });

    it('adds Critical Hit (+1)', () => {
      const r = service.calculateDetailedPhysicalDamage(defaultAttacker({ criticalHit: true }), defaultDefender());
      expect(r.offensiveMultiplier).toBeCloseTo(2, 2);
    });

    it('adds PhysUp Card (+0.5)', () => {
      const r = service.calculateDetailedPhysicalDamage(defaultAttacker({ physUpCard: true }), defaultDefender());
      expect(r.offensiveMultiplier).toBeCloseTo(1.5, 2);
    });

    it('combines product with crit and physUp additively', () => {
      const a = defaultAttacker({ slayer: true, criticalHit: true, physUpCard: true });
      const r = service.calculateDetailedPhysicalDamage(a, defaultDefender());
      // product = 4, critAdd = 1, physUpAdd = 0.5 → 4 + 1 + 0.5 = 5.5
      expect(r.offensiveMultiplier).toBeCloseTo(5.5, 4);
    });
  });

  describe('defensive multiplier', () => {
    it('defaults to 1', () => {
      const r = service.calculateDetailedPhysicalDamage(defaultAttacker(), defaultDefender());
      expect(r.defensiveMultiplier).toBeCloseTo(1, 2);
    });

    it('Phalanx/GordianLock returns 0.1', () => {
      const d = defaultDefender({ phalanxGordianLock: true });
      const r = service.calculateDetailedPhysicalDamage(defaultAttacker(), d);
      expect(r.defensiveMultiplier).toBeCloseTo(0.1, 2);
    });

    it('DragonScale returns 0.2', () => {
      const d = defaultDefender({ dragonScale: true });
      const r = service.calculateDetailedPhysicalDamage(defaultAttacker(), d);
      expect(r.defensiveMultiplier).toBeCloseTo(0.2, 2);
    });

    it('uses user-specified defensiveMultiplier when no toggle active', () => {
      const d = defaultDefender({ defensiveMultiplier: 0.75 });
      const r = service.calculateDetailedPhysicalDamage(defaultAttacker(), d);
      expect(r.defensiveMultiplier).toBeCloseTo(0.75, 2);
    });
  });

  describe('total damage formula', () => {
    it('applies Ji\'ygla set bonus (×1.5)', () => {
      const a = defaultAttacker({ jijyglaSetBonus: true });
      const r = service.calculateDetailedPhysicalDamage(a, defaultDefender());
      // baseline totalDamage = 202, ×1.5 = 303
      expect(r.totalDamage).toBeCloseTo(303, 2);
    });

    it('caps at 9999 before hits/pincer/counter multiply', () => {
      const a = defaultAttacker({
        attackerStr: 9999,
        attackerDex: 9999,
        weaponSkillRank: 90,
        weaponAtk: 9999,
        jewelryAtk: 9999,
        jijyglaSetBonus: true,
        slayer: true,
        selectedFinisher: 'Spiral Scourge', // 3 hits
      });
      const r = service.calculateDetailedPhysicalDamage(a, defaultDefender());
      // finalDamage should be capped to 9999 before ×hits
      // After ×3 hits, damage should be ~29997
      expect(r.finalDamage).toBeLessThanOrEqual(9999);
      expect(r.totalDamage).toBeGreaterThan(9999);
    });

    it('multiplies by hits, pincer, counter after the cap', () => {
      const a = defaultAttacker({
        selectedFinisher: 'Double Fang', // 2 hits
        pincerRank: PincerRank['Rank IV'],
        counterRank: CounterRank['Rank IV'],
      });
      const r = service.calculateDetailedPhysicalDamage(a, defaultDefender());
      // baseline totalDamage = 202
      // × hits(2) × pincer(1.5) × counter(1.0) = 202 * 2 * 1.5 * 1 = 606
      expect(r.totalDamage).toBeCloseTo(606, 2);
    });
  });

  describe('elemental shot', () => {
    it('returns 0 for stat overhead', () => {
      const a = defaultAttacker({ physicalActionType: PhysicalActionType['Elemental Shot'] });
      const r = service.calculateDetailedPhysicalDamage(a, defaultDefender());
      expect(r.statOverhead).toBe(0);
      expect(r.offenseValue).toBeCloseTo(200, 2);
    });
  });

  describe('modified stat overhead applies effective modifier', () => {
    it('multiplies statOverhead by effectiveModifier', () => {
      const a = defaultAttacker({ physicalDamageBonus: 100 }); // +100% → totalModifier = 1 + 1.0 = 2.0
      const d = defaultDefender();
      const r = service.calculateDetailedPhysicalDamage(a, d);

      // statOverhead = 190
      // effectiveModifier = 2.0 (clamp(2.0, 0, 2.5))
      // modifiedStatOverhead = 190 * 2.0 = 380
      expect(r.effectiveModifier).toBeCloseTo(2.0, 2);
      expect(r.modifiedStatOverhead).toBeCloseTo(380, 2);
    });

    it('with 50% penalty, effectiveModifier is 0.50', () => {
      const a = defaultAttacker({ physicalDamageBonus: -50 }); // -50% → totalModifier = 1 - 0.50 = 0.50
      const d = defaultDefender();
      const r = service.calculateDetailedPhysicalDamage(a, d);

      // totalModifier = 1 - 0.50 = 0.50
      // modifiedStatOverhead = 190 * 0.50 = 95
      expect(r.effectiveModifier).toBeCloseTo(0.50, 2);
      expect(r.modifiedStatOverhead).toBeCloseTo(95, 2);
    });
  });

  describe('pincer and counter multiplier maps', () => {
    function assertPincer(rank: PincerRank, expected: number) {
      const a = defaultAttacker({ pincerRank: rank });
      const r = service.calculateDetailedPhysicalDamage(a, defaultDefender());
      expect(r.pincerMult).toBeCloseTo(expected, 2);
    }
    function assertCounter(rank: CounterRank, expected: number) {
      const a = defaultAttacker({ counterRank: rank });
      const r = service.calculateDetailedPhysicalDamage(a, defaultDefender());
      expect(r.counterMult).toBeCloseTo(expected, 2);
    }

    it('pincer: None=1, I=0.75, II=1, III=1.25, IV=1.5', () => {
      assertPincer(PincerRank.None, 1);
      assertPincer(PincerRank['Rank I'], 0.75);
      assertPincer(PincerRank['Rank II'], 1);
      assertPincer(PincerRank['Rank III'], 1.25);
      assertPincer(PincerRank['Rank IV'], 1.5);
    });

    it('counter: None=1, I=0.25, II=0.5, III=0.75, IV=1.0', () => {
      assertCounter(CounterRank.None, 1);
      assertCounter(CounterRank['Rank I'], 0.25);
      assertCounter(CounterRank['Rank II'], 0.5);
      assertCounter(CounterRank['Rank III'], 0.75);
      assertCounter(CounterRank['Rank IV'], 1.0);
    });
  });
});
