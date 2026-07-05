import { ElementType, AttackerType } from './enums';

export const strScalingMap: Record<string, number> = {
  '1H Melee': 1.8,
  '2H Melee': 1.8,
  'Cudgel': 1.0,
  'Dagger/1H Katana': 1.5,
  'Ranged': 1.3,
  'Melee Weapon Finisher': 1.8,
  'Ranged Weapon Finisher': 1.3,
  'Dark Knight Finisher': 1.8,
  'Evanescence': 1.0,
  'Elemental Shot': 0,
  'Elemental Orb': 1.6,
  'Monster Special': 1.6,
  'Humanoid Special': 1.8,
  'Monster Melee': 1.6,
  'Monster Ranged': 1.5
};

export const dexScalingMap: Record<string, number> = {
  '1H Melee': 1.3,
  '2H Melee': 1.4,
  'Cudgel': 0.6,
  'Dagger/1H Katana': 1.6,
  'Ranged': 1.7,
  'Melee Weapon Finisher': 1.4,
  'Ranged Weapon Finisher': 1.7,
  'Dark Knight Finisher': 1.4,
  'Evanescence': 1.0,
  'Elemental Shot': 0,
  'Elemental Orb': 1.2,
  'Monster Special': 1.2,
  'Humanoid Special': 1.4,
  'Monster Melee': 1.2,
  'Monster Ranged': 1.1
};

export const defenderStrScalingMap: Record<string, number> = {
  '1H Melee': 0.7,
  '2H Melee': 0.7,
  'Cudgel': 0.7,
  'Dagger/1H Katana': 0.7,
  'Ranged': 0.7,
  'Melee Weapon Finisher': 0.7,
  'Ranged Weapon Finisher': 0.7,
  'Dark Knight Finisher': 0.7,
  'Evanescence': 0.7,
  'Elemental Shot': 0,
  'Elemental Orb': 0.7,
  'Monster Special': 0.7,
  'Humanoid Special': 0.7,
  'Monster Melee': 0.7,
  'Monster Ranged': 0.7
};

export const defenderVitScalingMap: Record<string, number> = {
  '1H Melee': 1.0,
  '2H Melee': 1.0,
  'Cudgel': 1.0,
  'Dagger/1H Katana': 1.0,
  'Ranged': 1.0,
  'Melee Weapon Finisher': 1.0,
  'Ranged Weapon Finisher': 1.0,
  'Dark Knight Finisher': 1.0,
  'Evanescence': 1.0,
  'Elemental Shot': 0,
  'Elemental Orb': 1.0,
  'Monster Special': 1.0,
  'Humanoid Special': 1.0,
  'Monster Melee': 1.0,
  'Monster Ranged': 1.0
};

export const steelstanceMultiplierMap: Record<string, number> = {
  'No': 1,
  'Rank I': 1.25,
  'Rank II': 1.3,
  'Rank III': 1.35,
  'Rank IV': 1.4
};

export const elementAdvantageMap: Record<ElementType, ElementType> = {
  Fire: ElementType.Ice,
  Water: ElementType.Fire,
  Wind: ElementType.Earth,
  Earth: ElementType.Lightning,
  Lightning: ElementType.Water,
  Ice: ElementType.Wind,
  Light: ElementType.Dark,
  Dark: ElementType.Light
};

export const levelScalingMap: Record<string, (level: number) => number> = {
  'Humanoid': (level: number) => Math.floor((level - 1) / 10),
  'Cockatrice': (level: number) => Math.floor((1.7 * level) - 1.7),
  'Cyclops': (level: number) => Math.floor((1.7 * level) - 1.7),
  'Octopus': (level: number) => Math.floor((1.7 * level) - 1.7),
  'Gryphon': (level: number) => Math.floor((1.7 * level) - 1.7),
  'Dragon': (level: number) => Math.floor((1.6 * level) - 1.6),
  'Hydra': (level: number) => Math.floor((1.6 * level) - 1.6),
  'Golem': (level: number) => Math.floor((1.6 * level) - 1.6),
  'Guardian': (level: number) => Math.floor((3 * level) - 3),
  'Dark Lord II': (level: number) => Math.floor(((level - 1) / 10) * 3)
};

export const classToAttackerTypeMap: Record<string, AttackerType> = {
  'Warrior': AttackerType.Humanoid,
  'Archer': AttackerType.Humanoid,
  'Wizard': AttackerType.Humanoid,
  'Cleric': AttackerType.Humanoid,
  'Rune Fencer': AttackerType.Humanoid,
  'Assassin': AttackerType.Humanoid,
  'Knight': AttackerType.Humanoid,
  'Dark Knight': AttackerType.Humanoid,
  'Terror Knight': AttackerType.Humanoid,
  'Gunner': AttackerType.Humanoid,
  'Berserker': AttackerType.Humanoid,
  'Swordmaster': AttackerType.Humanoid,
  'Dragoon': AttackerType.Humanoid,
  'Ninja': AttackerType.Humanoid,
  'Beast Tamer': AttackerType.Humanoid,
  'Fusilier': AttackerType.Humanoid,
  'Warlock': AttackerType.Humanoid,
  'Necromancer': AttackerType.Humanoid,
  'Lich': AttackerType.Humanoid,
  'Divine Knight': AttackerType.Humanoid,
  'Shaman': AttackerType.Humanoid,
  'Wicce': AttackerType.Humanoid,
  'Princess': AttackerType.Humanoid,
  'Priest': AttackerType.Humanoid,
  'Dark Priest': AttackerType.Humanoid,
  'Lord': AttackerType.Humanoid,
  'Buccaneer': AttackerType.Humanoid,
  'Ranger': AttackerType.Humanoid,
  'Knight Commander': AttackerType.Humanoid,
  'White Knight': AttackerType.Humanoid,
  'Paladin': AttackerType.Humanoid,
  'Hoplite': AttackerType.Humanoid,
  'Patriarch': AttackerType.Humanoid,
  'Familiar': AttackerType.Humanoid,
  'Dragon': AttackerType.Dragon,
  'Arc/Dark Dragon': AttackerType.Dragon,
  'Hydra': AttackerType.Hydra,
  'Gryphon': AttackerType.Gryphon,
  'Cockatrice': AttackerType.Cockatrice,
  'Octopus': AttackerType.Octopus,
  'Cyclops': AttackerType.Cyclops,
  'Clay Golem': AttackerType.Golem,
  'Stone Golem': AttackerType.Golem,
  'Iron Golem': AttackerType.Golem,
  'Baldur Golem': AttackerType.Golem,
  'Golem': AttackerType.Golem,
  'Guardian': AttackerType.Guardian,
  'Dark Lord II': AttackerType['Dark Lord II']
};

export const atkMultiplierMap: Record<string, number> = {
  '1H Melee': 1.0,
  '2H Melee': 1.0,
  'Cudgel': 1.0,
  'Dagger/1H Katana': 1.2,
  'Ranged': 2.5,
  'Melee Weapon Finisher': 1.0,
  'Ranged Weapon Finisher': 2.5,
  'Dark Knight Finisher': 1.0,
  'Evanescence': 1.0,
  'Elemental Shot': 1.0,
  'Elemental Orb': 1.0,
  'Monster Special': 1.0,
  'Humanoid Special': 1.0,
  'Monster Melee': 1.0,
  'Monster Ranged': 2.0
};

export const classBaseAtkMap: Record<string, number> = {
  'Warrior': 4,
  'Archer': 4,
  'Wizard': 3,
  'Cleric': 3,
  'Rune Fencer': 2,
  'Knight': 1,
  'Terror Knight': 4,
  'Berserker': 4,
  'Swordmaster': 5,
  'Dragoon': 3,
  'Ninja': 4,
  'Beast Tamer': 4,
  'Fusilier': 2,
  'Warlock': 3,
  'Necromancer': 2,
  'Lich': 1,
  'Divine Knight': 3,
  'Shaman': 1,
  'Wicce': 1,
  'Princess': 2,
  'Priest': 1,
  'Dark Priest': 1,
  'Lord': 4,
  'Buccaneer': 5,
  'Ranger': 3,
  'Knight Commander': 3,
  'White Knight': 2,
  'Paladin': 2,
  'Clay Golem': 55,
  'Stone Golem': 58,
  'Iron Golem': 61,
  'Baldur Golem': 64
};

export const pincerMultiplierMap: Record<string, number> = {
  'None': 1,
  'Rank I': 0.75,
  'Rank II': 1,
  'Rank III': 1.25,
  'Rank IV': 1.5
};

export const counterMultiplierMap: Record<string, number> = {
  'None': 1,
  'Rank I': 0.25,
  'Rank II': 0.5,
  'Rank III': 0.75,
  'Rank IV': 1.0
};

export interface FinisherEntry {
  name: string;
  weaponType: string;
  atkBonus: number;
  element: string;
  hits: number;
  isDarkKnight: boolean;
}

export const finisherDataList: FinisherEntry[] = [
  // Fists (Melee)
  { name: 'Flaming Fists', weaponType: 'Fists', atkBonus: 100, element: 'Fire', hits: 1, isDarkKnight: false },
  { name: 'Rapid Strike', weaponType: 'Fists', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Howling Rage', weaponType: 'Fists', atkBonus: 250, element: '', hits: 1, isDarkKnight: false },
  { name: 'Retribution', weaponType: 'Fists', atkBonus: 250, element: 'Dark', hits: 1, isDarkKnight: false },
  { name: 'Tempest Blade*', weaponType: 'Fists', atkBonus: 70, element: 'Lightning', hits: 1, isDarkKnight: true },
  // Daggers (Melee)
  { name: 'Heart Crusher', weaponType: 'Daggers', atkBonus: 100, element: 'Air', hits: 1, isDarkKnight: false },
  { name: 'Shadowpin', weaponType: 'Daggers', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Double Fang', weaponType: 'Daggers', atkBonus: 0, element: '', hits: 2, isDarkKnight: false },
  { name: 'Overwhelm', weaponType: 'Daggers', atkBonus: 250, element: '', hits: 1, isDarkKnight: false },
  // Swords (Melee)
  { name: 'Rending Gale', weaponType: 'Swords', atkBonus: 0, element: '', hits: 2, isDarkKnight: false },
  { name: 'Vile Wound', weaponType: 'Swords', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Cherry Ronde', weaponType: 'Swords', atkBonus: 100, element: 'Ice', hits: 1, isDarkKnight: false },
  { name: 'Papillion Reel', weaponType: 'Swords', atkBonus: 250, element: 'Light', hits: 1, isDarkKnight: false },
  { name: 'Venomous Strike*', weaponType: 'Swords', atkBonus: 70, element: 'Water', hits: 1, isDarkKnight: true },
  { name: 'Apocalypse*', weaponType: 'Swords', atkBonus: 70, element: 'Light', hits: 1, isDarkKnight: true },
  // 2H Swords (Melee)
  { name: 'Sonic Blade', weaponType: '2H Swords', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Lightning Strike', weaponType: '2H Swords', atkBonus: 100, element: 'Lightning', hits: 1, isDarkKnight: false },
  { name: 'Cyclone Saber', weaponType: '2H Swords', atkBonus: 100, element: 'Air', hits: 1, isDarkKnight: false },
  { name: 'Grand Cross', weaponType: '2H Swords', atkBonus: 250, element: 'Lightning', hits: 1, isDarkKnight: false },
  { name: 'Crushing Blow*', weaponType: '2H Swords', atkBonus: 0, element: 'Air', hits: 2, isDarkKnight: true },
  // Axes (Melee)
  { name: 'Ice Prison', weaponType: 'Axes', atkBonus: 100, element: 'Ice', hits: 1, isDarkKnight: false },
  { name: 'Mistral Edge', weaponType: 'Axes', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Mantis Strike', weaponType: 'Axes', atkBonus: 0, element: '', hits: 2, isDarkKnight: false },
  { name: 'Infinity', weaponType: 'Axes', atkBonus: 250, element: 'Earth', hits: 1, isDarkKnight: false },
  { name: 'Dark Prison*', weaponType: 'Axes', atkBonus: 70, element: 'Dark', hits: 1, isDarkKnight: true },
  // Spears (Melee)
  { name: 'Ruination', weaponType: 'Spears', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Scythe Wind', weaponType: 'Spears', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Giga Tempest', weaponType: 'Spears', atkBonus: 100, element: 'Lightning', hits: 1, isDarkKnight: false },
  { name: 'Spiral Scourge', weaponType: 'Spears', atkBonus: 0, element: '', hits: 3, isDarkKnight: false },
  { name: 'Fiery Death*', weaponType: 'Spears', atkBonus: 70, element: 'Fire', hits: 1, isDarkKnight: true },
  // Hammers (Melee)
  { name: "Tyrant's Mace", weaponType: 'Hammers', atkBonus: 100, element: 'Ice', hits: 1, isDarkKnight: false },
  { name: 'Gaia Sunder', weaponType: 'Hammers', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Crimson Reach', weaponType: 'Hammers', atkBonus: 100, element: 'Fire', hits: 1, isDarkKnight: false },
  { name: 'Dancing Sprite', weaponType: 'Hammers', atkBonus: 250, element: 'Lightning', hits: 1, isDarkKnight: false },
  { name: 'Angel of Death*', weaponType: 'Hammers', atkBonus: 70, element: 'Earth', hits: 1, isDarkKnight: true },
  // 1H Katana (Melee)
  { name: 'Dark Blade', weaponType: '1H Katana', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Thunderwave', weaponType: '1H Katana', atkBonus: 100, element: 'Lightning', hits: 1, isDarkKnight: false },
  { name: 'Swallow Slash', weaponType: '1H Katana', atkBonus: 0, element: '', hits: 2, isDarkKnight: false },
  { name: 'Advent Sign', weaponType: '1H Katana', atkBonus: 100, element: 'Light', hits: 1, isDarkKnight: false },
  // 2H Katana (Melee)
  { name: 'Skyrend', weaponType: '2H Katana', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Stonebloom', weaponType: '2H Katana', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Sunblossom', weaponType: '2H Katana', atkBonus: 100, element: 'Fire', hits: 1, isDarkKnight: false },
  { name: 'Ghostwail', weaponType: '2H Katana', atkBonus: 250, element: 'Dark', hits: 1, isDarkKnight: false },
  // Cudgels (Melee)
  { name: 'Wrathful Strike', weaponType: 'Cudgels', atkBonus: 100, element: 'Light', hits: 1, isDarkKnight: false },
  { name: 'Raining Blows', weaponType: 'Cudgels', atkBonus: 0, element: 'Light', hits: 2, isDarkKnight: false },
  { name: 'Pressure Whirl', weaponType: 'Cudgels', atkBonus: 100, element: 'Light', hits: 1, isDarkKnight: false },
  { name: 'Trinity Pulse', weaponType: 'Cudgels', atkBonus: 0, element: 'Light', hits: 3, isDarkKnight: false },
  // Whips (Melee)
  { name: 'Flood Lash', weaponType: 'Whips', atkBonus: 100, element: 'Water', hits: 1, isDarkKnight: false },
  { name: 'Wrenching Coil', weaponType: 'Whips', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Swift Thrash', weaponType: 'Whips', atkBonus: 0, element: '', hits: 2, isDarkKnight: false },
  { name: 'Armageddon', weaponType: 'Whips', atkBonus: 300, element: '', hits: 1, isDarkKnight: false },
  { name: 'Demon Rose*', weaponType: 'Whips', atkBonus: 70, element: 'Ice', hits: 1, isDarkKnight: true },
  // Spellbooks (Melee)
  { name: 'Disembrain', weaponType: 'Spellbooks', atkBonus: 100, element: 'Earth', hits: 1, isDarkKnight: false },
  { name: 'Raging Pummel', weaponType: 'Spellbooks', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Eviscerate', weaponType: 'Spellbooks', atkBonus: 0, element: '', hits: 2, isDarkKnight: false },
  { name: 'Devastate', weaponType: 'Spellbooks', atkBonus: 250, element: 'Dark', hits: 1, isDarkKnight: false },
  // Instruments (Melee)
  { name: 'Aggressive Rendition', weaponType: 'Instruments', atkBonus: 0, element: '', hits: 2, isDarkKnight: false },
  { name: 'Harmonic Blast', weaponType: 'Instruments', atkBonus: 100, element: 'Air', hits: 1, isDarkKnight: false },
  { name: 'Torrential Rhapsody', weaponType: 'Instruments', atkBonus: 100, element: 'Water', hits: 1, isDarkKnight: false },
  { name: 'Forced Fermata', weaponType: 'Instruments', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  // Blowguns (Ranged)
  { name: 'Frigid Blast', weaponType: 'Blowguns', atkBonus: 100, element: 'Ice', hits: 1, isDarkKnight: false },
  { name: 'Scorpion Shot', weaponType: 'Blowguns', atkBonus: 100, element: 'Lightning', hits: 1, isDarkKnight: false },
  { name: 'Venom Sting', weaponType: 'Blowguns', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: "Heaven's Scorn", weaponType: 'Blowguns', atkBonus: 250, element: 'Light', hits: 1, isDarkKnight: false },
  // Bows (Ranged)
  { name: 'Dark Weight', weaponType: 'Bows', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Slumber Shot', weaponType: 'Bows', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Flaming Blast', weaponType: 'Bows', atkBonus: 100, element: 'Fire', hits: 1, isDarkKnight: false },
  { name: 'Empyreal Shot', weaponType: 'Bows', atkBonus: 100, element: 'Lightning', hits: 1, isDarkKnight: false },
  // Crossbows (Ranged)
  { name: 'Dullbind', weaponType: 'Crossbows', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Brimstone Hail', weaponType: 'Crossbows', atkBonus: 100, element: 'Fire', hits: 1, isDarkKnight: false },
  { name: 'Sanctus Flare', weaponType: 'Crossbows', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Deathwail', weaponType: 'Crossbows', atkBonus: 0, element: '', hits: 3, isDarkKnight: false },
  // Fusils (Ranged)
  { name: 'Mirage Strike', weaponType: 'Fusils', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Rapid Blast', weaponType: 'Fusils', atkBonus: 100, element: '', hits: 1, isDarkKnight: false },
  { name: 'Atonement', weaponType: 'Fusils', atkBonus: 100, element: 'Light', hits: 1, isDarkKnight: false },
  { name: 'Scatter Shot', weaponType: 'Fusils', atkBonus: 0, element: 'Air', hits: 2, isDarkKnight: false },
];

export const oneHandMeleeWeaponTypes = ['Daggers', 'Swords', 'Axes', 'Hammers', '1H Katana', 'Cudgels', 'Whips', 'Spellbooks', 'Instruments'];
export const twoHandMeleeWeaponTypes = ['Fists', '2H Swords', 'Axes', '2H Katana', 'Spears', 'Hammers'];
export const meleeWeaponTypes = [...oneHandMeleeWeaponTypes, ...twoHandMeleeWeaponTypes];
export const rangedWeaponTypes = ['Blowguns', 'Bows', 'Crossbows', 'Fusils'];
export const allWeaponTypes = ['None', ...meleeWeaponTypes, ...rangedWeaponTypes];

export const finisherDataMap: Record<string, FinisherEntry> = {};
for (const f of finisherDataList) {
  finisherDataMap[f.name] = f;
}

export function getFinishersByWeaponType(weaponType: string): FinisherEntry[] {
  if (!weaponType || weaponType === 'None') return [];
  return finisherDataList.filter(f => f.weaponType === weaponType);
}

export function getFinishersByActionType(actionType: string): { weaponType: string; finishers: FinisherEntry[] }[] {
  const isMelee = actionType === 'Melee Weapon Finisher';
  const isRanged = actionType === 'Ranged Weapon Finisher';
  const isDarkKnight = actionType === 'Dark Knight Finisher';

  let weaponTypes: string[];
  if (isDarkKnight) {
    weaponTypes = [...new Set(finisherDataList.filter(f => f.isDarkKnight).map(f => f.weaponType))];
  } else if (isMelee) {
    weaponTypes = meleeWeaponTypes;
  } else if (isRanged) {
    weaponTypes = rangedWeaponTypes;
  } else {
    return [];
  }

  return weaponTypes
    .map(wt => ({
      weaponType: wt,
      finishers: finisherDataList.filter(f => {
        if (isDarkKnight) return f.isDarkKnight && f.weaponType === wt;
        return f.weaponType === wt && !f.isDarkKnight;
      })
    }))
    .filter(g => g.finishers.length > 0);
}

export const classBaseDefMap: Record<string, number> = {
  'Warrior': 2,
  'Archer': 2,
  'Wizard': 3,
  'Cleric': 3,
  'Rune Fencer': 4,
  'Knight': 4,
  'Terror Knight': 2,
  'Berserker': 2,
  'Swordmaster': 1,
  'Dragoon': 3,
  'Ninja': 2,
  'Beast Tamer': 2,
  'Fusilier': 4,
  'Warlock': 3,
  'Necromancer': 4,
  'Lich': 5,
  'Divine Knight': 3,
  'Shaman': 5,
  'Wicce': 5,
  'Princess': 4,
  'Priest': 5,
  'Dark Priest': 5,
  'Lord': 2,
  'Buccaneer': 1,
  'Ranger': 3,
  'Knight Commander': 3,
  'White Knight': 4,
  'Paladin': 4,
  'Clay Golem': 60,
  'Stone Golem': 60,
  'Iron Golem': 62,
  'Baldur Golem': 64
};
