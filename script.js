'use strict';
// ═══════════════════════════════════════════════════════════════
// ARENA BLOOD V3.1 — script.js
// ═══════════════════════════════════════════════════════════════

const SAVE_KEY   = 'arenaBloodV3';
const ROMAN_DAYS = ['Lunae','Martis','Mercurii','Iovis','Veneris','Saturni'];

// ── SKIN COLORS ──────────────────────────────────────────────────
const SKIN = {
  ivory: { base:'#F5DEB3', mid:'#D2A679', dark:'#A07040' },
  tan:   { base:'#D2A679', mid:'#A07040', dark:'#784828' },
  olive: { base:'#B8864E', mid:'#886030', dark:'#5A3810' },
  brown: { base:'#8B5E3C', mid:'#5E3A1C', dark:'#3A1A08' },
  deep:  { base:'#4A2C0A', mid:'#2A1400', dark:'#140A00' },
};

// ── ITEM DATABASE ────────────────────────────────────────────────
const ITEMS = {
  // Melee — tiers 0-4
  bare_fists:      {id:'bare_fists',      name:'Bare Fists',         slot:'melee', tier:0, icon:'👊', stats:{atk:2},          desc:'+2 ATK',            price:0,   type:'equipment'},
  rusty_sword:     {id:'rusty_sword',     name:'Rusty Sword',        slot:'melee', tier:1, icon:'🗡', stats:{atk:8},           desc:'+8 ATK',            price:0,   type:'equipment'},
  short_sword:     {id:'short_sword',     name:'Short Sword',        slot:'melee', tier:2, icon:'⚔', stats:{atk:14},          desc:'+14 ATK',           price:90,  type:'equipment'},
  gladius:         {id:'gladius',         name:'Gladius',            slot:'melee', tier:2, icon:'🗡', stats:{atk:16,spd:1},    desc:'+16 ATK +1 SPD',    price:150, type:'equipment'},
  battle_axe:      {id:'battle_axe',      name:'Battle Axe',         slot:'melee', tier:3, icon:'🪓', stats:{atk:22,spd:-1},   desc:'+22 ATK -1 SPD',    price:200, type:'equipment'},
  war_hammer:      {id:'war_hammer',      name:'War Hammer',         slot:'melee', tier:3, icon:'🔨', stats:{atk:26,spd:-2},   desc:'+26 ATK -2 SPD',    price:280, type:'equipment'},
  champions_blade: {id:'champions_blade', name:"Champion's Blade",   slot:'melee', tier:4, icon:'⚔', stats:{atk:32,spd:1},    desc:'+32 ATK +1 SPD',    price:420, type:'equipment'},
  death_scythe:    {id:'death_scythe',    name:'Death Scythe',       slot:'melee', tier:4, icon:'⚔', stats:{atk:38,spd:-1},   desc:'+38 ATK -1 SPD',    price:500, type:'equipment'},

  // Ranged — tiers 1-4
  throwing_knife:  {id:'throwing_knife',  name:'Throwing Knife',     slot:'ranged',tier:1, icon:'🔪', stats:{ratk:10},         desc:'+10 RATK',          price:55,  type:'equipment'},
  short_bow:       {id:'short_bow',       name:'Short Bow',          slot:'ranged',tier:2, icon:'🏹', stats:{ratk:16},         desc:'+16 RATK',          price:110, type:'equipment'},
  trident:         {id:'trident',         name:'Trident',            slot:'ranged',tier:2, icon:'🔱', stats:{ratk:18,atk:6},   desc:'+18 RATK +6 ATK',   price:175, type:'equipment'},
  longbow:         {id:'longbow',         name:'Longbow',            slot:'ranged',tier:3, icon:'🏹', stats:{ratk:24},         desc:'+24 RATK',          price:245, type:'equipment'},
  roman_pilum:     {id:'roman_pilum',     name:'Roman Pilum',        slot:'ranged',tier:3, icon:'🏹', stats:{ratk:20,atk:8},   desc:'+20 RATK +8 ATK',   price:215, type:'equipment'},
  siege_bolt:      {id:'siege_bolt',      name:'Siege Bolt',         slot:'ranged',tier:4, icon:'🏹', stats:{ratk:30},         desc:'+30 RATK',          price:375, type:'equipment'},

  // Armor — tiers 0-4
  loin_cloth:      {id:'loin_cloth',      name:'Loin Cloth',         slot:'armor', tier:0, icon:'👘', stats:{def:2},           desc:'+2 DEF',            price:0,   type:'equipment'},
  leather_vest:    {id:'leather_vest',    name:'Leather Vest',       slot:'armor', tier:1, icon:'🥋', stats:{def:6},           desc:'+6 DEF',            price:65,  type:'equipment'},
  chain_mail:      {id:'chain_mail',      name:'Chain Mail',         slot:'armor', tier:2, icon:'🛡', stats:{def:11},          desc:'+11 DEF',           price:155, type:'equipment'},
  lorica_segm:     {id:'lorica_segm',     name:'Lorica Segmentata',  slot:'armor', tier:3, icon:'🛡', stats:{def:17},          desc:'+17 DEF',           price:255, type:'equipment'},
  plate_armor:     {id:'plate_armor',     name:'Plate Armor',        slot:'armor', tier:4, icon:'🪖', stats:{def:24,spd:-1},   desc:'+24 DEF -1 SPD',    price:375, type:'equipment'},

  // Helms — tiers 1-4
  iron_helm:       {id:'iron_helm',       name:'Iron Helm',          slot:'helm',  tier:1, icon:'⛑', stats:{def:4,hp:12},     desc:'+4 DEF +12 HP',     price:75,  type:'equipment'},
  bronze_galea:    {id:'bronze_galea',    name:'Bronze Galea',       slot:'helm',  tier:2, icon:'🪖', stats:{def:8,hp:20},     desc:'+8 DEF +20 HP',     price:145, type:'equipment'},
  imperial_helm:   {id:'imperial_helm',   name:'Imperial Helm',      slot:'helm',  tier:3, icon:'👑', stats:{def:13,hp:35},    desc:'+13 DEF +35 HP',    price:235, type:'equipment'},
  centurion_helm:  {id:'centurion_helm',  name:'Centurion Helm',     slot:'helm',  tier:4, icon:'👑', stats:{def:18,hp:50},    desc:'+18 DEF +50 HP',    price:345, type:'equipment'},

  // Shields — tiers 1-4
  wooden_shield:   {id:'wooden_shield',   name:'Wooden Shield',      slot:'shield',tier:1, icon:'🛡', stats:{def:5},           desc:'+5 DEF',            price:45,  type:'equipment'},
  iron_shield:     {id:'iron_shield',     name:'Iron Shield',        slot:'shield',tier:2, icon:'🛡', stats:{def:10,spd:-1},   desc:'+10 DEF -1 SPD',    price:125, type:'equipment'},
  scutum:          {id:'scutum',          name:'Scutum',             slot:'shield',tier:3, icon:'🛡', stats:{def:16,spd:-1},   desc:'+16 DEF -1 SPD',    price:215, type:'equipment'},
  tower_shield:    {id:'tower_shield',    name:'Tower Shield',       slot:'shield',tier:4, icon:'🛡', stats:{def:22,spd:-2},   desc:'+22 DEF -2 SPD',    price:315, type:'equipment'},

  // Boots — tiers 1-4
  sandals:         {id:'sandals',         name:'Sandals',            slot:'boots', tier:1, icon:'👡', stats:{spd:2},           desc:'+2 SPD',            price:38,  type:'equipment'},
  iron_greaves:    {id:'iron_greaves',    name:'Iron Greaves',       slot:'boots', tier:2, icon:'🥾', stats:{spd:1,def:3},     desc:'+1 SPD +3 DEF',     price:95,  type:'equipment'},
  roman_greaves:   {id:'roman_greaves',   name:'Roman Greaves',      slot:'boots', tier:3, icon:'🥾', stats:{spd:2,def:5},     desc:'+2 SPD +5 DEF',     price:175, type:'equipment'},
  hermes_boots:    {id:'hermes_boots',    name:"Hermes' Boots",      slot:'boots', tier:4, icon:'👟', stats:{spd:4,def:3},     desc:'+4 SPD +3 DEF',     price:275, type:'equipment'},

  // Consumables
  health_potion:   {id:'health_potion',   name:'Health Potion',      slot:null, tier:0, icon:'🧪', healAmt:45,  stats:{}, desc:'Restore 45 HP',     price:32,  type:'consumable'},
  great_potion:    {id:'great_potion',    name:'Great Potion',       slot:null, tier:0, icon:'🫙', healAmt:100, stats:{}, desc:'Restore 100 HP',    price:75,  type:'consumable'},
  elixir:          {id:'elixir',          name:'Elixir',             slot:null, tier:0, icon:'💊', healAmt:999, stats:{}, desc:'Full HP restore',   price:155, type:'consumable'},
  str_draught:     {id:'str_draught',     name:'Strength Draught',   slot:null, tier:0, icon:'💪', buffAtk:8, buffTurns:4, stats:{}, desc:'+8 ATK for 4 turns', price:58, type:'consumable'},
};

// ── SHOP STOCK BY LEVEL ─────────────────────────────────────────
function getShopStock(level) {
  const tier = level >= 7 ? 4 : level >= 5 ? 3 : level >= 3 ? 2 : 1;
  const always = ['health_potion','great_potion','str_draught'];
  const byTier = {
    1: ['short_sword','leather_vest','wooden_shield','sandals','iron_helm','throwing_knife'],
    2: ['gladius','chain_mail','iron_shield','iron_greaves','bronze_galea','short_bow','trident','elixir'],
    3: ['battle_axe','war_hammer','lorica_segm','scutum','roman_greaves','imperial_helm','longbow','roman_pilum'],
    4: ['champions_blade','death_scythe','plate_armor','tower_shield','hermes_boots','centurion_helm','siege_bolt'],
  };
  let pool = [...always];
  if (tier === 1) pool = [...pool, ...(byTier[1] || [])];
  if (tier >= 2)  pool = [...pool, ...(byTier[1] || []), ...(byTier[2] || [])];
  if (tier >= 3)  pool = [...pool, ...(byTier[2] || []), ...(byTier[3] || [])];
  if (tier >= 4)  pool = [...pool, ...(byTier[3] || []), ...(byTier[4] || [])];
  return pool.filter(id => {
    const it = ITEMS[id];
    return it && (it.type === 'consumable' || it.tier >= Math.max(1, tier - 1));
  });
}

function nextTierItem(slot, currentTier) {
  return Object.values(ITEMS).find(i => i.slot === slot && i.tier === currentTier + 1) || null;
}

// ── ENEMY POOL ───────────────────────────────────────────────────
const ENEMY_POOL = [
  // Tier 1
  {id:'sickly_goblin',    name:'Sickly Goblin',        sprite:'t1_sickly_goblin',    tier:1, bHp:55,  atk:12, def:3,  spd:3, prefRange:0,  hasRanged:false, xp:22, gold:14, diff:'easy'},
  {id:'mangy_dog',        name:'Mangy Dog',             sprite:'t1_mangy_dog',        tier:1, bHp:45,  atk:14, def:2,  spd:5, prefRange:0,  hasRanged:false, xp:18, gold:10, diff:'easy'},
  {id:'drunk_slave',      name:'Drunk Slave',           sprite:'t1_drunk_slave',      tier:1, bHp:65,  atk:11, def:4,  spd:2, prefRange:0,  hasRanged:false, xp:25, gold:18, diff:'easy'},
  {id:'burly_beggar',     name:'Burly Beggar',          sprite:'t1_burly_beggar',     tier:1, bHp:38,  atk:10, def:1,  spd:2, prefRange:0,  hasRanged:false, xp:16, gold:8,  diff:'easy'},
  {id:'street_thug',      name:'Street Thug',           sprite:'t1_street_thug',      tier:1, bHp:70,  atk:15, def:5,  spd:2, prefRange:0,  hasRanged:false, xp:28, gold:20, diff:'avg'},
  {id:'arena_rat',        name:'Arena Rat',             sprite:'t1_arena_rat',        tier:1, bHp:48,  atk:16, def:2,  spd:6, prefRange:0,  hasRanged:false, xp:24, gold:15, diff:'avg'},
  {id:'mad_dog_gladiator',name:'Mad Dog Gladiator',     sprite:'t1_mad_dog_gladiator',tier:1, bHp:80,  atk:18, def:6,  spd:4, prefRange:0,  hasRanged:false, xp:32, gold:22, diff:'hard'},
  {id:'starved_hyena',    name:'Starved Hyena',         sprite:'t1_starved_hyena',    tier:1, bHp:72,  atk:20, def:4,  spd:5, prefRange:0,  hasRanged:false, xp:30, gold:20, diff:'hard'},
  // Tier 2
  {id:'tiger_cub',        name:'Tiger Cub',             sprite:'t2_tiger_cub',        tier:2, bHp:90,  atk:18, def:7,  spd:3, prefRange:0,  hasRanged:false, xp:45, gold:35, diff:'easy'},
  {id:'net_fighter',      name:'Net Fighter',           sprite:'t2_net_fighter',      tier:2, bHp:80,  atk:14, def:6,  spd:4, prefRange:30, hasRanged:true,  xp:48, gold:38, diff:'easy'},
  {id:'irish_bard',       name:'Irish Bard',            sprite:'t2_irish_bard',       tier:2, bHp:100, atk:20, def:8,  spd:3, prefRange:0,  hasRanged:false, xp:55, gold:40, diff:'avg'},
  {id:'sicilian_pirate',  name:'Sicilian Pirate',       sprite:'t2_sicilian_pirate',  tier:2, bHp:75,  atk:18, def:5,  spd:7, prefRange:0,  hasRanged:false, xp:52, gold:38, diff:'avg'},
  {id:'prussian_boxer',   name:'Prussian Boxer',        sprite:'t2_prussian_boxer',   tier:2, bHp:100, atk:24, def:6,  spd:5, prefRange:0,  hasRanged:false, xp:58, gold:45, diff:'hard'},
  {id:'african_panther',  name:'African Panther',       sprite:'t2_african_panther',  tier:2, bHp:110, atk:26, def:5,  spd:4, prefRange:0,  hasRanged:false, xp:65, gold:48, diff:'hard'},
  // Tier 3
  {id:'disgraced_lego',   name:'Disgraced Legionnaire', sprite:'t3_disgraced_lego',   tier:3, bHp:140, atk:26, def:15, spd:3, prefRange:0,  hasRanged:false, xp:85, gold:65, diff:'easy'},
  {id:'carthage_archer',  name:'Carthaginian Archer',   sprite:'t3_carthage_archer',  tier:3, bHp:110, atk:20, def:10, spd:5, prefRange:40, hasRanged:true,  xp:88, gold:68, diff:'easy'},
  {id:'bavarian_barbarian',name:'Bavarian Barbarian',   sprite:'t3_bavarian_barbarian',tier:3,bHp:130, atk:29, def:16, spd:2, prefRange:0,  hasRanged:false, xp:80, gold:60, diff:'avg'},
  {id:'swiss_lumberjack', name:'Swiss Lumberjack',      sprite:'t3_swiss_lumberjack', tier:3, bHp:160, atk:30, def:12, spd:3, prefRange:0,  hasRanged:false, xp:95, gold:75, diff:'avg'},
  {id:'samurai_warrior',  name:'Samurai Warrior',       sprite:'t3_samurai_warrior',  tier:3, bHp:130, atk:28, def:10, spd:6, prefRange:30, hasRanged:true,  xp:92, gold:72, diff:'hard'},
  {id:'wild_elephant',    name:'Wild Elephant',         sprite:'t3_wild_elephant',    tier:3, bHp:180, atk:34, def:16, spd:3, prefRange:0,  hasRanged:false, xp:110,gold:90, diff:'hard'},
  // Tier 4
  {id:'elite_praetorian', name:'Elite Praetorian',      sprite:'t4_elite_praetorian', tier:4, bHp:220, atk:36, def:22, spd:4, prefRange:0,  hasRanged:false, xp:150,gold:120,diff:'easy'},
  {id:'persian_immortal', name:'Persian Immortal',      sprite:'t4_persian_immortal', tier:4, bHp:240, atk:38, def:24, spd:3, prefRange:0,  hasRanged:false, xp:160,gold:125,diff:'easy'},
  {id:'numidian_warlord', name:'Numidian Warlord',      sprite:'t4_numidian_warlord', tier:4, bHp:270, atk:40, def:20, spd:5, prefRange:30, hasRanged:true,  xp:180,gold:140,diff:'avg'},
  {id:'greek_champion',   name:'Greek Champion',        sprite:'t4_greek_champion',   tier:4, bHp:260, atk:38, def:22, spd:4, prefRange:0,  hasRanged:false, xp:175,gold:138,diff:'avg'},
  {id:'shadow_assassin',  name:'Shadow Assassin',       sprite:'t4_shadow_assassin',  tier:4, bHp:200, atk:44, def:16, spd:8, prefRange:20, hasRanged:true,  xp:170,gold:135,diff:'hard'},
  {id:'titan_warrior',    name:'Titan Warrior',         sprite:'t4_titan_warrior',    tier:4, bHp:320, atk:42, def:24, spd:2, prefRange:0,  hasRanged:false, xp:200,gold:160,diff:'hard'},
];

function tierForLevel(level) {
  if (level >= 7) return 4;
  if (level >= 5) return 3;
  if (level >= 3) return 2;
  return 1;
}

function generateEnemyChoices(playerLevel) {
  const t = tierForLevel(playerLevel);
  const pool = ENEMY_POOL.filter(e => e.tier === t);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const byDiff = (d) => shuffled.find(e => e.diff === d) || shuffled[0];
  const easy = byDiff('easy');
  const avg  = pool.some(e => e.diff === 'avg')  ? byDiff('avg')  : shuffled[Math.min(1, shuffled.length - 1)];
  const hard = pool.some(e => e.diff === 'hard') ? byDiff('hard') : shuffled[Math.min(2, shuffled.length - 1)];
  return [easy, avg, hard].map(e => scaleEnemy(e, playerLevel));
}

function scaleEnemy(template, playerLevel) {
  const scale = 1 + (playerLevel - 1) * 0.15;
  const hp  = Math.floor(template.bHp  * scale);
  const atk = Math.floor(template.atk  * scale);
  const def = Math.floor(template.def  * scale);
  return {
    ...template,
    hp, maxHp: hp, atk, def,
    xpReward:   Math.floor(template.xp   * scale),
    goldReward: Math.floor(template.gold * scale),
    isEnemy: true, isDefending: false, lastAction: null,
  };
}

// ── PRIZE FIGHT ──────────────────────────────────────────────────
const ROMAN_NAMES    = ['Maximus','Brutus','Octavian','Severus','Galba','Vitellius','Commodus','Caracalla','Aurelian'];
const ROMAN_EPITHETS = ['the Butcher','the Relentless','Iron-Handed','Crimson Blade','the Merciless','Deathbringer','the Titan','Scourge of Rome'];

function generatePrizeFight(player) {
  const name    = ROMAN_NAMES[Math.floor(Math.random() * ROMAN_NAMES.length)];
  const epithet = ROMAN_EPITHETS[Math.floor(Math.random() * ROMAN_EPITHETS.length)];
  const ratio   = 0.80 + Math.random() * 0.10;
  const avgHit  = Math.max(1, player.atk * 0.55);
  const hp      = Math.floor(avgHit * 11);
  const atk     = Math.floor(player.atk * ratio * 0.92);
  const def     = Math.floor(player.def * ratio * 0.80);
  const hasRanged = Math.random() > 0.5;
  return {
    id: 'prize_fighter',
    name: `${name} ${epithet}`,
    sprite: 'champion',
    hp, maxHp: hp, atk, def,
    spd: 3 + Math.floor(Math.random() * 3),
    prefRange: hasRanged ? 20 : 0,
    hasRanged,
    xpReward:   Math.floor(player.level * 55 + 60),
    goldReward: Math.floor(player.level * 40 + 50),
    isPrizeFight: true,
    isEnemy: true, isDefending: false, lastAction: null,
    tier: tierForLevel(player.level),
  };
}

// ── XP TABLE ─────────────────────────────────────────────────────
function xpForLevel(lvl) { return Math.floor(120 * Math.pow(lvl, 1.55)); }

// ── PLAYER CLASS ──────────────────────────────────────────────────
class Player {
  constructor(name, gender, skin, style) {
    this.name     = name;
    this.gender   = gender;
    this.skin     = skin;
    this.style    = style;
    this.level    = 1;
    this.xp       = 0;
    this.gold     = 50;
    this.fightNum = 0;

    const bases = {
      retiarius: {hp:110, atk:18, def:6,  spd:5, ratk:14},
      secutor:   {hp:130, atk:20, def:10, spd:3, ratk:0},
      murmillo:  {hp:150, atk:24, def:12, spd:2, ratk:0},
    };
    const b = bases[style] || bases.secutor;
    this.baseHp   = b.hp;
    this.baseAtk  = b.atk;
    this.baseDef  = b.def;
    this.baseSpd  = b.spd;
    this.baseRatk = b.ratk;
    this.maxHp    = b.hp;
    this.hp       = b.hp;

    this.equipped  = {melee:null, ranged:null, armor:null, helm:null, shield:null, boots:null};
    this.inventory = [];

    this.kills         = 0;
    this.killsByEnemy  = {};
    this.damageTaken   = 0;
    this.totalGold     = 50;
    this.wins          = 0;

    this.isDefending    = false;
    this.buffAtk        = 0;
    this.buffTurns      = 0;
    this.lastAttackType = 'melee';

    this._equipStarter();
    this.addToInventory(ITEMS['health_potion'], 2);
  }

  _equipStarter() {
    this.equipItem(ITEMS['rusty_sword']);
    this.equipItem(ITEMS['loin_cloth']);
    if (this.style === 'retiarius') this.addToInventory(ITEMS['throwing_knife'], 1);
  }

  get atk() {
    let v = this.baseAtk + (this.level - 1) * 3;
    for (const s in this.equipped) { const it = this.equipped[s]; if (it?.stats?.atk) v += it.stats.atk; }
    return v + this.buffAtk;
  }
  get ratk() {
    let v = this.baseRatk + (this.level - 1) * 2;
    for (const s in this.equipped) { const it = this.equipped[s]; if (it?.stats?.ratk) v += it.stats.ratk; }
    return v;
  }
  get def() {
    let v = this.baseDef + (this.level - 1) * 2;
    for (const s in this.equipped) { const it = this.equipped[s]; if (it?.stats?.def) v += it.stats.def; }
    return v;
  }
  get spd() {
    let v = this.baseSpd;
    for (const s in this.equipped) { const it = this.equipped[s]; if (it?.stats?.spd) v += it.stats.spd; }
    return Math.max(1, v);
  }
  get bonusMaxHp() {
    let v = 0;
    for (const s in this.equipped) { const it = this.equipped[s]; if (it?.stats?.hp) v += it.stats.hp; }
    return v;
  }
  get hasRangedWeapon() { return !!this.equipped.ranged; }

  recalcMaxHp() {
    const base = this.baseHp + (this.level - 1) * 12;
    this.maxHp = base + this.bonusMaxHp;
    this.hp    = Math.min(this.hp, this.maxHp);
  }

  equipItem(itemDef) {
    if (!itemDef.slot) return false;
    const old = this.equipped[itemDef.slot];
    if (old) this.addToInventory(old, 1);
    this.equipped[itemDef.slot] = {...itemDef};
    this.recalcMaxHp();
    return true;
  }
  unequipSlot(slot) {
    const it = this.equipped[slot];
    if (!it) return;
    this.equipped[slot] = null;
    this.addToInventory(it, 1);
    this.recalcMaxHp();
  }

  addToInventory(itemDef, qty = 1) {
    const ex = this.inventory.find(e => e.item.id === itemDef.id);
    if (ex) { ex.qty += qty; }
    else    { this.inventory.push({item:{...itemDef}, qty}); }
  }
  removeFromInventory(itemId, qty = 1) {
    const idx = this.inventory.findIndex(e => e.item.id === itemId);
    if (idx < 0) return false;
    this.inventory[idx].qty -= qty;
    if (this.inventory[idx].qty <= 0) this.inventory.splice(idx, 1);
    return true;
  }
  getConsumables() { return this.inventory.filter(e => e.item.type === 'consumable' && e.qty > 0); }

  addXP(amt) {
    this.xp += amt;
    let leveled = false;
    while (this.xp >= xpForLevel(this.level)) {
      this.xp -= xpForLevel(this.level);
      this.level++;
      this.baseHp  += 12; this.baseAtk += 3; this.baseDef += 2;
      this.recalcMaxHp();
      this.hp = Math.min(this.hp + 25, this.maxHp);
      leveled = true;
    }
    return leveled;
  }

  heal(amt) {
    const before = this.hp;
    this.hp = Math.min(this.hp + amt, this.maxHp);
    return this.hp - before;
  }

  resetCombat() { this.isDefending = false; this.buffAtk = 0; this.buffTurns = 0; }
  tickBuffs()   { if (this.buffTurns > 0) { this.buffTurns--; if (this.buffTurns === 0) this.buffAtk = 0; } }

  get weekDayIdx()  { return this.fightNum % 6; }
  get weekDayName() { return ROMAN_DAYS[this.weekDayIdx]; }
  get isPrizeDay()  { return this.weekDayIdx === 5; }

  get favoriteEnemy() {
    let best = null, count = 0;
    for (const [id, c] of Object.entries(this.killsByEnemy || {})) {
      if (c > count) { count = c; best = id; }
    }
    if (!best) return '—';
    const e = ENEMY_POOL.find(x => x.id === best);
    return e ? e.name : best;
  }

  toSave() {
    return {
      name:this.name, gender:this.gender, skin:this.skin, style:this.style,
      level:this.level, xp:this.xp, gold:this.gold, fightNum:this.fightNum,
      baseHp:this.baseHp, baseAtk:this.baseAtk, baseDef:this.baseDef,
      baseSpd:this.baseSpd, baseRatk:this.baseRatk,
      maxHp:this.maxHp, hp:this.hp,
      equipped:this.equipped, inventory:this.inventory,
      kills:this.kills, killsByEnemy:this.killsByEnemy,
      damageTaken:this.damageTaken, totalGold:this.totalGold,
      wins:this.wins, lastAttackType:this.lastAttackType,
    };
  }

  static fromSave(o) {
    const p = new Player(o.name, o.gender, o.skin, o.style);
    Object.assign(p, {
      level:o.level||1, xp:o.xp||0, gold:o.gold||50, fightNum:o.fightNum||0,
      baseHp:o.baseHp, baseAtk:o.baseAtk, baseDef:o.baseDef,
      baseSpd:o.baseSpd, baseRatk:o.baseRatk||0,
      maxHp:o.maxHp, hp:o.hp,
      equipped:o.equipped||{melee:null,ranged:null,armor:null,helm:null,shield:null,boots:null},
      inventory:o.inventory||[],
      kills:o.kills||0, killsByEnemy:o.killsByEnemy||{},
      damageTaken:o.damageTaken||0, totalGold:o.totalGold||50,
      wins:o.wins||0, lastAttackType:o.lastAttackType||'melee',
    });
    return p;
  }
}

// ── COMBAT ENGINE ─────────────────────────────────────────────────
class CombatEngine {
  constructor(player) {
    this.player   = player;
    this.enemy    = null;
    this.distance = 10;
    this.turn     = 0;
    this.active   = false;
    this.playerTurn = true;
    this._busy    = false;
    this.lastEnemyBackedUp = false;
    this.onEnd    = null;
  }

  // start() sets enemy BEFORE setupCombat() calls refreshCombat()
  start(enemy) {
    this.enemy    = {...enemy};
    this.distance = 10;
    this.turn     = 0;
    this.active   = true;
    this._busy    = false;
    this.lastEnemyBackedUp = false;
    this.player.resetCombat();
    this.enemy.isDefending = false;
    this.enemy.lastAction  = null;
    this.playerTurn = this.player.spd >= this.enemy.spd;
    UI.log(`⚔ ${this.player.name} vs ${this.enemy.name}! Distance: ${this.distance} ft.`, 'system');
    UI.log(`${this.playerTurn ? this.player.name : this.enemy.name} acts first.`, 'system');
    // setupCombat() calls refreshCombat() after us — no call needed here
    if (!this.playerTurn) this._delayEnemy();
  }

  calcDamage(atkVal, defVal, defBonus = 0, isRanged = false) {
    const eff  = Math.max(2, atkVal - defVal - defBonus + (isRanged ? 3 : 0));
    const roll = Math.random();
    if (roll < 0.09) return {dmg:0, type:'miss'};
    if (roll > 0.87) return {dmg:Math.floor(eff * 1.75), type:'crit'};
    return {dmg:Math.max(1, Math.floor(eff * (0.80 + Math.random() * 0.40))), type:'normal'};
  }

  playerAction(action) {
    if (!this.active || !this.playerTurn || this._busy) return;
    this._busy = true;
    this.player.isDefending = false;

    switch (action) {
      case 'attack':
        if (this.distance !== 0) { UI.log('Must be at 0 ft to attack!','system'); this._busy=false; return; }
        this._pMelee(); break;
      case 'ranged':
        if (this.distance === 0) { UI.log('Cannot use ranged at 0 ft!','system'); this._busy=false; return; }
        if (!this.player.hasRangedWeapon) { UI.log('No ranged weapon equipped!','system'); this._busy=false; return; }
        this._pRanged(); break;
      case 'advance':
        if (this.distance === 0) { UI.log('Already at 0 ft!','system'); this._busy=false; return; }
        this.distance = Math.max(0, this.distance - 10);
        UI.log(`You advance! Distance: ${this.distance} ft.`, 'dist');
        if (this.distance === 0) {
          const {dmg, type} = this.calcDamage(Math.floor(this.player.atk * 0.7), this.enemy.def);
          if (type !== 'miss' && dmg > 0) {
            this.enemy.hp = Math.max(0, this.enemy.hp - dmg);
            UI.log(`Closing strike! ${dmg} damage.`, 'player');
            UI.floatDamage(dmg, false);
            if (this.enemy.hp <= 0) { UI.refreshCombat(); this._endBattle(true); return; }
          }
        }
        UI.refreshCombat(); this._endPlayerTurn(); break;
      case 'backup':
        if (this.distance >= 60) { UI.log('Maximum distance reached!','system'); this._busy=false; return; }
        this.distance = Math.min(60, this.distance + 10);
        UI.log(`You back up! Distance: ${this.distance} ft.`, 'dist');
        UI.refreshCombat(); this._endPlayerTurn(); break;
      case 'item':
        this._busy = false; UI.openItemOverlay(); return;
      case 'mercy':
        if (this.player.hp / this.player.maxHp > 0.20) { UI.log('Mercy only available at ≤20% HP!','system'); this._busy=false; return; }
        this._doMercy(); break;
    }
  }

  _pMelee() {
    this.player.lastAttackType = 'melee';
    const defBonus = this.enemy.isDefending ? Math.floor(this.enemy.def * 0.5) : 0;
    const {dmg, type} = this.calcDamage(this.player.atk, this.enemy.def, defBonus);
    const wep = this.player.equipped.melee?.name || 'fists';
    if (type === 'miss') {
      UI.log(`${this.player.name} swings ${wep}... MISS!`, 'miss');
      UI.floatDamage('MISS', false, true);
    } else if (type === 'crit') {
      this.enemy.hp = Math.max(0, this.enemy.hp - dmg);
      UI.log(`💥 CRITICAL! ${this.player.name} deals ${dmg} with ${wep}!`, 'crit');
      UI.floatDamage(dmg, false, false, true); UI.shakeEl('cb-esprite');
    } else {
      this.enemy.hp = Math.max(0, this.enemy.hp - dmg);
      UI.log(`${this.player.name} strikes for ${dmg} with ${wep}.`, 'player');
      UI.floatDamage(dmg, false); UI.shakeEl('cb-esprite');
    }
    UI.drawAvatar('cv-combat', this.player);
    UI.refreshCombat();
    if (this.enemy.hp <= 0) { this._endBattle(true); return; }
    this._endPlayerTurn();
  }

  _pRanged() {
    this.player.lastAttackType = 'ranged';
    const defBonus = this.enemy.isDefending ? Math.floor(this.enemy.def * 0.4) : 0;
    const {dmg, type} = this.calcDamage(this.player.ratk, this.enemy.def, defBonus, true);
    const wep = this.player.equipped.ranged?.name || 'ranged weapon';
    if (type === 'miss') {
      UI.log(`${this.player.name} fires ${wep}... MISS!`, 'miss');
      UI.floatDamage('MISS', false, true);
    } else if (type === 'crit') {
      this.enemy.hp = Math.max(0, this.enemy.hp - dmg);
      UI.log(`💥 RANGED CRIT! ${dmg} with ${wep}!`, 'crit');
      UI.floatDamage(dmg, false, false, true); UI.shakeEl('cb-esprite');
    } else {
      this.enemy.hp = Math.max(0, this.enemy.hp - dmg);
      UI.log(`${this.player.name} fires for ${dmg} with ${wep}.`, 'player');
      UI.floatDamage(dmg, false); UI.shakeEl('cb-esprite');
    }
    UI.drawAvatar('cv-combat', this.player);
    UI.refreshCombat();
    if (this.enemy.hp <= 0) { this._endBattle(true); return; }
    this._endPlayerTurn();
  }

  useItem(itemId) {
    const entry = this.player.inventory.find(e => e.item.id === itemId);
    if (!entry) return;
    const item = entry.item;
    this._busy = true;
    UI.closeItemOverlay();
    if (item.healAmt) {
      const healed = this.player.heal(item.healAmt);
      UI.log(`${this.player.name} uses ${item.name} → +${healed} HP!`, 'heal');
      UI.floatDamage(`+${healed}HP`, true, false, false, true);
    }
    if (item.buffAtk) {
      this.player.buffAtk = item.buffAtk; this.player.buffTurns = item.buffTurns;
      UI.log(`${this.player.name} drinks ${item.name}! ATK +${item.buffAtk} for ${item.buffTurns} turns.`, 'player');
    }
    this.player.removeFromInventory(itemId);
    UI.refreshCombat();
    this._endPlayerTurn();
  }

  _doMercy() {
    const granted = Math.random() < 0.80;
    UI.showMercyOverlay(granted, () => {
      this.active = false;
      if (granted) {
        UI.log('The Emperor grants MERCY! You escape with your life.', 'mercy');
        this.onEnd({mercy:true, executed:false});
      } else {
        UI.log('The Emperor turns thumb down — EXECUTION!', 'mercy');
        this.onEnd({mercy:true, executed:true});
      }
    });
  }

  _endPlayerTurn() {
    this.player.tickBuffs();
    this.turn++;
    this.playerTurn = false;
    UI.refreshCombat();
    this._delayEnemy();
  }

  _delayEnemy() { setTimeout(() => this._enemyTurn(), 950); }

  _enemyTurn() {
    if (!this.active) return;
    this.enemy.isDefending = false;
    const d     = this.distance;
    const pref  = this.enemy.prefRange;
    const hpPct = this.enemy.hp / this.enemy.maxHp;
    let action;

    if (this.turn >= 16) {
      action = d === 0 ? 'attack' : (this.enemy.hasRanged && d > 0 ? 'ranged' : 'advance');
    } else if (hpPct < 0.25 && d <= 10) {
      action = d === 0 ? 'attack' : 'advance';
    } else if (d < pref && !this.lastEnemyBackedUp && d < 60) {
      action = 'backup';
    } else if (d > pref) {
      action = 'advance';
    } else {
      if (pref === 0 || d === 0)            action = 'attack';
      else if (this.enemy.hasRanged && d>0) action = 'ranged';
      else                                  action = 'advance';
    }

    this.lastEnemyBackedUp = (action === 'backup');

    if (action === 'backup') {
      this.distance = Math.min(60, d + 10);
      UI.log(`${this.enemy.name} backs away! Distance: ${this.distance} ft.`, 'dist');
      UI.refreshCombat();
    } else if (action === 'advance') {
      this.distance = Math.max(0, d - 10);
      UI.log(`${this.enemy.name} advances! Distance: ${this.distance} ft.`, 'dist');
      UI.refreshCombat();
      if (this.distance === 0) { this._enemyStrike(false, true); if (!this.active) return; }
    } else if (action === 'attack') {
      if (this.distance !== 0) {
        this.distance = Math.max(0, this.distance - 10);
        UI.log(`${this.enemy.name} closes in! Distance: ${this.distance} ft.`, 'dist');
        UI.refreshCombat();
      } else {
        this._enemyStrike(false, false); if (!this.active) return;
      }
    } else if (action === 'ranged') {
      this._enemyStrike(this.distance > 0, false); if (!this.active) return;
    }

    this.turn++;
    this.playerTurn = true;
    this._busy = false;
    UI.refreshCombat();
  }

  _enemyStrike(isRanged, isLight) {
    const defBonus = this.player.isDefending ? Math.floor(this.player.def * 0.5) : 0;
    let atkVal = isRanged
      ? Math.floor(this.enemy.atk * 0.85)
      : (this.enemy.hp / this.enemy.maxHp < 0.25 ? Math.floor(this.enemy.atk * 1.3) : this.enemy.atk);
    if (isLight) atkVal = Math.floor(atkVal * 0.6);
    const {dmg, type} = this.calcDamage(atkVal, this.player.def, defBonus, isRanged);
    const method = isRanged ? 'fires at' : (isLight ? 'grazes' : 'strikes');
    if (type === 'miss') {
      UI.log(`${this.enemy.name} ${method} you... MISS!`, 'miss');
      UI.floatDamage('MISS', true, true);
    } else if (type === 'crit') {
      this.player.hp = Math.max(0, this.player.hp - dmg);
      this.player.damageTaken += dmg;
      UI.log(`💥 CRIT! ${this.enemy.name} ${method} you for ${dmg}!`, 'crit');
      UI.floatDamage(dmg, true, false, true); UI.shakeEl('cv-combat');
    } else {
      this.player.hp = Math.max(0, this.player.hp - dmg);
      this.player.damageTaken += dmg;
      UI.log(`${this.enemy.name} ${method} you for ${dmg}.`, 'enemy');
      UI.floatDamage(dmg, true); UI.shakeEl('cv-combat');
    }
    UI.refreshCombat();
    if (this.player.hp <= 0) { this._endBattle(false); }
  }

  _endBattle(playerWon) {
    this.active = false;
    this.onEnd({victory: playerWon});
  }
}

// ── SHOP ──────────────────────────────────────────────────────────
class Shop {
  constructor() { this.stock = []; }
  restock(level) { this.stock = getShopStock(level).map(id => ({...ITEMS[id]})); }
  buy(player, itemId) {
    const item = this.stock.find(i => i.id === itemId);
    if (!item) return {ok:false, msg:'Not in stock.'};
    if (player.gold < item.price) return {ok:false, msg:'Not enough gold!'};
    player.gold -= item.price;
    player.addToInventory(item, 1);
    return {ok:true};
  }
  sell(player, itemId) {
    const entry = player.inventory.find(e => e.item.id === itemId);
    if (!entry) return {ok:false, msg:'Item not found.'};
    const price = Math.max(1, Math.floor((entry.item.price || 0) * 0.10));
    player.gold += price;
    player.removeFromInventory(itemId, 1);
    return {ok:true, price};
  }
}

// ── SAVE / LOAD ───────────────────────────────────────────────────
const Save = {
  load()   { try { const r = localStorage.getItem(SAVE_KEY); return r ? JSON.parse(r) : null; } catch { return null; } },
  write(d) { try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); } catch {} },
  getData() { return this.load() || {currentCharacter:null, pastCharacters:[]}; },

  saveActive(player) {
    const d = this.getData();
    d.currentCharacter = {...player.toSave(), status:'active'};
    this.write(d);
  },
  killCurrent(player, killedBy) {
    const d = this.getData();
    d.pastCharacters.push({...player.toSave(), status:'dead', killedBy});
    d.currentCharacter = null;
    this.write(d);
  },
  retireAndStartNew(oldPlayer, newPlayer) {
    const d = this.getData();
    if (oldPlayer) d.pastCharacters.push({...oldPlayer.toSave(), status:'retired'});
    d.currentCharacter = {...newPlayer.toSave(), status:'active'};
    this.write(d);
  },
  nameExists(name) {
    const d = this.getData();
    const all = [d.currentCharacter, ...(d.pastCharacters||[])].filter(Boolean);
    return all.some(c => c.name.toLowerCase() === name.toLowerCase());
  },
  hallOfLegends() {
    const d = this.getData();
    const all = [d.currentCharacter, ...(d.pastCharacters||[])].filter(Boolean);
    return all.sort((a,b) => {
      if (b.level !== a.level) return b.level - a.level;
      if ((b.kills||0) !== (a.kills||0)) return (b.kills||0) - (a.kills||0);
      return (b.totalGold||0) - (a.totalGold||0);
    }).slice(0, 10);
  },
};

// ── CANVAS AVATAR ─────────────────────────────────────────────────
const AvatarRenderer = {
  draw(canvasId, player, px = 8) {
    const cv = document.getElementById(canvasId);
    if (!cv) return;
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cv.width, cv.height);

    const sk = SKIN[player.skin] || SKIN.ivory;
    const eq = player.equipped || {};
    const helmc   = this._helmColor(eq.helm);
    const armorc  = this._armorColor(eq.armor);
    const shieldc = this._shieldColor(eq.shield);
    const bootsc  = this._bootsColor(eq.boots);
    const weaponItem = player.lastAttackType === 'ranged' ? eq.ranged : eq.melee;

    const G = [
      [0,0,0,'H','H','H','H','H','H',0,0],
      [0,0,'H','H','H','H','H','H','H','H',0],
      [0,'h','h','F','F','F','F','F','F','h',0],
      [0,'h','F','F','F','F','F','F','F','h',0],
      [0,'h','F','e','F','F','F','e','F','h',0],
      [0,'h','F','F','F','F','F','F','F','h',0],
      [0,0,'F','F','F','F','F','F','F',0,0],
      [0,0,0,'F','F','F','F','F',0,0,0],
      [0,'S','A','A','A','A','A','A','A','S',0],
      ['S','A','A','A','A','A','A','A','A','A','W'],
      ['S','A','A','a','A','A','A','a','A','A','W'],
      ['S','A','b','b','b','b','b','b','b','A','W'],
      [0,'A','A','A','A','A','A','A','A','A',0],
      [0,'A','A','A','A','A','A','A','A','A',0],
      [0,0,'L','L','L',0,'L','L','L',0,0],
      [0,0,'L','L','L',0,'L','L','L',0,0],
      [0,0,'G','G','G',0,'G','G','G',0,0],
      [0,'B','B','B','B',0,'B','B','B','B',0],
    ];

    const colorMap = {
      'H': helmc || sk.dark,
      'h': helmc ? this._darken(helmc) : sk.dark,
      'F': sk.base, 'e': '#1A1008',
      'S': shieldc || '#4A6888',
      'A': armorc, 'a': this._darken(armorc),
      'b': '#2A1808',
      'W': weaponItem ? '#A0A0A0' : sk.mid,
      'L': sk.mid, 'G': '#909090', 'B': bootsc,
    };

    G.forEach((row, ri) => {
      row.forEach((cell, ci) => {
        if (!cell || cell === 0) return;
        ctx.fillStyle = colorMap[cell] || '#FF00FF';
        ctx.fillRect(ci*px, ri*px, px, px);
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        ctx.fillRect(ci*px, ri*px+px-1, px, 1);
        ctx.fillRect(ci*px+px-1, ri*px, 1, px);
      });
    });

    if (weaponItem) {
      ctx.font = `${px*2.2}px serif`;
      ctx.textAlign = 'left';
      const wx = 11*px+2, wy = 9*px+px*2;
      if (wx < cv.width) ctx.fillText(weaponItem.icon || '⚔', wx, wy);
    }
  },

  _helmColor(item) {
    if (!item) return null;
    return {iron_helm:'#909090',bronze_galea:'#C87828',imperial_helm:'#C0A010',centurion_helm:'#C89428'}[item.id] || '#909090';
  },
  _armorColor(item) {
    if (!item) return '#6B4F1A';
    return {loin_cloth:'#8B6914',leather_vest:'#7B3A10',chain_mail:'#707070',lorica_segm:'#808090',plate_armor:'#909090'}[item.id] || '#707070';
  },
  _shieldColor(item) {
    if (!item) return null;
    return {wooden_shield:'#8B6914',iron_shield:'#606070',scutum:'#800000',tower_shield:'#404040'}[item.id] || '#606060';
  },
  _bootsColor(item) {
    if (!item) return '#3A2810';
    return {sandals:'#C8A060',iron_greaves:'#808080',roman_greaves:'#909090',hermes_boots:'#C0A010'}[item.id] || '#808080';
  },
  _darken(hex) {
    if (!hex || hex[0] !== '#' || hex.length < 7) return '#444';
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return `rgb(${Math.floor(r*0.7)},${Math.floor(g*0.7)},${Math.floor(b*0.7)})`;
  },
};

// ── CENTRAL UI OBJECT ─────────────────────────────────────────────
const UI = {
  _fromScreen: 'select',

  show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('screen-' + id);
    if (el) el.classList.add('active');
  },

  renderMenu() {
    const d = Save.load();
    const badge = document.getElementById('save-badge');
    if (!badge) return;
    if (d?.currentCharacter) {
      const c = d.currentCharacter;
      badge.textContent = `Active: ${c.name} — Level ${c.level}, ${c.wins||0} wins`;
    } else {
      badge.textContent = 'No active gladiator.';
    }
    this._randomiseMenuSprites();
  },

  _randomiseMenuSprites() {
    const pool = [...new Set(
      ENEMY_POOL.filter(e => e.tier >= 1 && e.tier <= 3).map(e => e.sprite)
    )];
    const shuffled = pool.sort(() => Math.random() - 0.5);
    const imgL = document.getElementById('menu-sprite-left');
    const imgR = document.getElementById('menu-sprite-right');
    if (imgL) imgL.src = `assets/enemies/${shuffled[0]}.png`;
    if (imgR) imgR.src = `assets/enemies/${shuffled[1]}.png`;
  },

  renderLoadPrompt(c) {
    document.getElementById('lp-info').innerHTML =
      `<strong>${c.name}</strong> — Level ${c.level} ${c.style}<br>
       HP: ${c.hp}/${c.maxHp} &nbsp; Gold: ${c.gold}g &nbsp; Wins: ${c.wins||0}`;
  },

  initCreation() {
    this._bindCG('cg-gender');
    this._bindCG('cg-skin');
    this._bindCG('cg-style');
    document.querySelectorAll('#cg-style .cbtn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('style-tip').textContent = btn.dataset.tip || '';
        this._updateStylePips(btn.dataset.v);
        this._redrawCreateAvatar();
      });
    });
    document.querySelectorAll('#cg-skin .cbtn, #cg-gender .cbtn').forEach(btn => {
      btn.addEventListener('click', () => this._redrawCreateAvatar());
    });
    this._updateStylePips('retiarius');
    this._redrawCreateAvatar();
  },

  _bindCG(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.querySelectorAll('.cbtn').forEach(btn => {
      btn.addEventListener('click', () => {
        el.querySelectorAll('.cbtn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  },

  getCreationVals() {
    return {
      name:   (document.getElementById('inp-name')?.value || '').trim() || 'Gladiator',
      gender: document.querySelector('#cg-gender .cbtn.active')?.dataset.v || 'male',
      skin:   document.querySelector('#cg-skin .cbtn.active')?.dataset.v   || 'ivory',
      style:  document.querySelector('#cg-style .cbtn.active')?.dataset.v  || 'retiarius',
    };
  },

  _updateStylePips(style) {
    const pcts = {
      retiarius:{hp:45,atk:70,def:30,spd:90},
      secutor:  {hp:65,atk:75,def:55,spd:55},
      murmillo: {hp:85,atk:90,def:65,spd:35},
    };
    const p = pcts[style] || pcts.secutor;
    ['hp','atk','def','spd'].forEach(k => {
      const el = document.getElementById('spf-' + k);
      if (el) el.style.setProperty('--w', p[k] + '%');
    });
  },

  _redrawCreateAvatar() {
    const {gender, skin, style} = this.getCreationVals();
    AvatarRenderer.draw('cv-create', {gender, skin, style, equipped:{}, lastAttackType:'melee'}, 14);
  },

  drawAvatar(canvasId, player) {
    AvatarRenderer.draw(canvasId, player, canvasId === 'cv-combat' ? 10 : 12);
  },

  renderSelect(player, enemies, isPrize) {
    const rwEl = document.getElementById('rw-label');
    if (!rwEl) return;
    if (isPrize) {
      rwEl.innerHTML = `⭐ <span style="color:var(--gd2)">SATURNI NIGHT — PRIZE FIGHT!</span>`;
    } else {
      rwEl.innerHTML = `<span style="color:var(--gd2)">${player.weekDayName}</span> <span style="color:var(--tx2)">— Fight ${player.fightNum+1}</span>`;
    }

    document.getElementById('sel-hud').innerHTML = `
      <div class="hud-item"><span class="hud-k">NAME</span><span class="hud-v">${player.name}</span></div>
      <div class="hud-item"><span class="hud-k">LVL</span><span class="hud-v">${player.level}</span></div>
      <div class="hud-item"><span class="hud-k">HP</span><span class="hud-v">${player.hp}/${player.maxHp}</span></div>
      <div class="hud-item"><span class="hud-k">GOLD</span><span class="hud-v gd">${player.gold}g</span></div>
      <div class="hud-item"><span class="hud-k">WINS</span><span class="hud-v">${player.wins}</span></div>
    `;

    const body = document.getElementById('sel-body');
    body.innerHTML = '';

    if (isPrize) {
      const e = enemies[0];
      const wrap = document.createElement('div');
      wrap.className = 'prize-wrap';
      wrap.innerHTML = `
        <div class="prize-banner">⭐ SATURNI NIGHT — PRIZE FIGHT! ⭐</div>
        <div class="prize-card">
          <img src="assets/enemies/${e.sprite}.png" alt="${e.name}" class="pxl"/>
          <div style="font-family:var(--ft);font-size:17px;color:var(--gd2);margin-bottom:8px;letter-spacing:2px;">${e.name}</div>
          <div style="font-size:16px;color:var(--tx1);line-height:1.8;">
            HP: ${e.maxHp} &nbsp; ATK: ${e.atk} &nbsp; DEF: ${e.def} &nbsp; SPD: ${e.spd}
          </div>
          <div style="margin-top:10px;font-size:15px;color:var(--gd);">
            Reward: +${e.xpReward} XP &nbsp; +${e.goldReward}g &nbsp; + Gear Upgrade
          </div>
        </div>
        <button class="btn-gold sm" id="btn-prize-fight">⚔ FIGHT FOR GLORY</button>
      `;
      body.appendChild(wrap);
      document.getElementById('btn-prize-fight').onclick = () => G.selectEnemy(0);
    } else {
      const grid = document.createElement('div');
      grid.className = 'enemy-grid';
      const tops = {easy:'var(--gr2)', avg:'var(--gd)', hard:'var(--rd2)'};
      enemies.forEach((e, i) => {
        const card = document.createElement('div');
        card.className = 'ecard';
        card.style.setProperty('--ec-top', tops[e.diff] || 'var(--gdk)');
        card.innerHTML = `
          <div style="text-align:center;margin-bottom:4px;">
            <span class="dbadge ${e.diff}">${e.diff==='avg'?'AVERAGE':e.diff.toUpperCase()}</span>
          </div>
          <div class="ecard-sprite"><img src="assets/enemies/${e.sprite}.png" alt="${e.name}"/></div>
          <div class="ecard-name">${e.name}</div>
          <div class="ecard-stats">
            HP: ${e.maxHp} &nbsp; ATK: ${e.atk}<br>
            DEF: ${e.def} &nbsp; SPD: ${e.spd}<br>
            ${e.hasRanged ? '🏹 <span style="color:var(--gd2)">Ranged capable</span>' : '⚔ Melee focused'}
          </div>
          <div class="ecard-reward">
            <span style="color:var(--bl3)">+${e.xpReward} XP</span> &nbsp;
            <span style="color:var(--gd2)">+${e.goldReward}g</span>
          </div>
        `;
        card.addEventListener('click', () => G.selectEnemy(i));
        grid.appendChild(card);
      });
      body.appendChild(grid);
    }
  },

  // setupCombat called AFTER combat.start() so enemy is guaranteed non-null
  setupCombat(player, enemy) {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('cb-pname',  player.name);
    set('cb-plevel', `LVL ${player.level}`);
    set('cb-ename',  enemy.name);
    set('cb-elevel', '');
    set('cb-day',    `${player.weekDayName} — Fight ${player.fightNum+1}`);
    const img = document.getElementById('cb-esprite');
    if (img) { img.src = `assets/enemies/${enemy.sprite}.png`; img.style.height = '144px'; }
    this.drawAvatar('cv-combat', player);
    this.refreshCombat();
  },

  // Null guard: enemy may be null if called before start()
  refreshCombat() {
    const ce = G.combat;
    if (!ce || !ce.enemy) return;
    const p = ce.player, e = ce.enemy;

    const turnEl = document.getElementById('cb-turn');
    if (turnEl) turnEl.textContent = `Turn ${ce.turn+1}`;

    const pPct = Math.max(0, (p.hp / p.maxHp) * 100);
    const pBar = document.getElementById('cb-php');
    if (pBar) {
      pBar.style.width = pPct + '%';
      pBar.style.background = pPct > 60 ? 'var(--gr2)' : pPct > 30 ? '#C09020' : 'var(--rd2)';
    }
    const phpn = document.getElementById('cb-phpn');
    if (phpn) phpn.textContent = `${p.hp} / ${p.maxHp}`;

    const ePct = Math.max(0, (e.hp / e.maxHp) * 100);
    const eBar = document.getElementById('cb-ehp');
    if (eBar) eBar.style.width = ePct + '%';
    const ehpn = document.getElementById('cb-ehpn');
    if (ehpn) ehpn.textContent = `${e.hp} / ${e.maxHp}`;

    document.querySelectorAll('.dist-pip').forEach(pip => {
      pip.classList.toggle('on', parseInt(pip.dataset.d) === ce.distance);
    });
    const distBig = document.getElementById('dist-big');
    if (distBig) distBig.textContent = `${ce.distance} ft`;
    const hint = document.getElementById('dist-hint');
    if (hint) {
      if (ce.distance === 0)      hint.textContent = '⚔ Melee range — Attack!';
      else if (ce.distance <= 20) hint.textContent = 'Close — advance to attack';
      else                        hint.textContent = '';
    }

    const pChips = document.getElementById('cb-pstatus');
    if (pChips) {
      pChips.innerHTML = '';
      if (p.isDefending)  pChips.innerHTML += `<span class="schip def">DEFENDING</span>`;
      if (p.buffTurns > 0) pChips.innerHTML += `<span class="schip buff">STR+${p.buffAtk}(${p.buffTurns})</span>`;
    }
    const eChips = document.getElementById('cb-estatus');
    if (eChips) {
      eChips.innerHTML = '';
      if (e.isDefending) eChips.innerHTML += `<span class="schip def">DEFENDING</span>`;
    }

    const myTurn = ce.playerTurn && ce.active && !ce._busy;
    document.querySelectorAll('.abtn').forEach(b => b.disabled = !myTurn);
    if (myTurn) {
      const ab = id => document.getElementById(id);
      if (ab('ab-attack'))  ab('ab-attack').disabled  = ce.distance !== 0;
      if (ab('ab-ranged'))  ab('ab-ranged').disabled  = ce.distance === 0 || !p.hasRangedWeapon;
      if (ab('ab-advance')) ab('ab-advance').disabled = ce.distance === 0;
      if (ab('ab-backup'))  ab('ab-backup').disabled  = ce.distance >= 60;
      const cons = p.getConsumables();
      if (ab('ab-item'))    ab('ab-item').disabled    = cons.length === 0;
      const noteItem = document.getElementById('abn-item');
      if (noteItem) noteItem.textContent = `${cons.reduce((s,c)=>s+c.qty,0)} items`;
      if (ab('ab-mercy'))   ab('ab-mercy').disabled   = (p.hp/p.maxHp) > 0.20;
    }
  },

  log(msg, cls = '') {
    const body = document.getElementById('log-body');
    if (!body) return;
    const div = document.createElement('div');
    div.className = 'le ' + cls;
    div.textContent = msg;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  },

  floatDamage(value, onPlayer, isMiss=false, isCrit=false, isHeal=false) {
    const id = onPlayer ? 'cb-php' : 'cb-ehp';
    const anchor = document.getElementById(id);
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const div = document.createElement('div');
    div.className = 'dmg-float ' + (isHeal?'heal':isMiss?'miss':isCrit?'crit':(onPlayer?'pd':'ed'));
    div.textContent = isMiss ? 'MISS' : (isCrit ? `CRIT! ${value}` : value);
    div.style.left = (rect.left + rect.width/2 - 16) + 'px';
    div.style.top  = (rect.top - 8) + 'px';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 1100);
  },

  shakeEl(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 400);
  },

  openItemOverlay() {
    const list = document.getElementById('ov-item-list');
    if (!list) return;
    list.innerHTML = '';
    const cons = G.player.getConsumables();
    if (!cons.length) {
      list.innerHTML = '<div style="color:var(--tx2);text-align:center;padding:10px;">No usable items.</div>';
    } else {
      cons.forEach(({item, qty}) => {
        const row = document.createElement('div');
        row.className = 'item-use-row';
        row.innerHTML = `<span class="item-use-name">${item.icon} ${item.name} — ${item.desc}</span><span class="item-use-qty">x${qty}</span>`;
        row.onclick = () => G.combat.useItem(item.id);
        list.appendChild(row);
      });
    }
    const ov = document.getElementById('ov-item');
    if (ov) ov.classList.remove('hidden');
  },

  closeItemOverlay() {
    const ov = document.getElementById('ov-item');
    if (ov) ov.classList.add('hidden');
    if (G.combat) G.combat._busy = false;
  },

  showMercyOverlay(granted, callback) {
    const ov  = document.getElementById('ov-mercy');
    const th  = document.getElementById('mercy-thumb');
    const msg = document.getElementById('mercy-msg');
    if (!ov||!th||!msg) { callback(); return; }
    ov.classList.remove('hidden');
    th.textContent  = granted ? '👍' : '👎';
    msg.textContent = granted
      ? 'The Emperor shows mercy. You live... this time.'
      : 'The Emperor turns his thumb down. Executioner!';
    setTimeout(() => { ov.classList.add('hidden'); callback(); }, 2600);
  },

  showLevelUp(level) {
    const el = document.createElement('div');
    el.className = 'lvl-flash';
    el.innerHTML = `⬆ LEVEL UP!<br>Now Level ${level}`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  },

  renderPost(player, enemy, result) {
    const banner  = document.getElementById('post-result');
    const rewards = document.getElementById('post-rewards');

    // storeOnly must never fall into the defeat branch
    if (result.storeOnly) {
      banner.textContent = '🏪 ARMOURY';
      banner.className = 'result-banner res-fled';
      rewards.textContent = 'Browse before your next fight.';
    } else if (result.victory) {
      banner.textContent = '⚔ VICTORIA! ⚔';
      banner.className = 'result-banner res-win';
      rewards.innerHTML = `
        <span class="xpc">+${enemy.xpReward} XP gained</span><br>
        <strong>+${enemy.goldReward}g</strong> earned<br>
        ${enemy.isPrizeFight ? '<span style="color:var(--gd2)">⭐ Prize Fight victory!</span>' : ''}
      `;
    } else if (result.mercy) {
      banner.textContent = result.executed ? '💀 EXECUTED' : '🙏 MERCY GRANTED';
      banner.className = `result-banner ${result.executed ? 'res-loss' : 'res-fled'}`;
      rewards.textContent = result.executed ? 'The Emperor demanded blood.' : 'You escaped — no rewards.';
    } else {
      banner.textContent = '💀 DEFEATED';
      banner.className = 'result-banner res-loss';
      rewards.textContent = 'You fell in battle. The crowd thirsts for more.';
    }

    const hpInfo = document.getElementById('post-hpinfo');
    if (hpInfo) hpInfo.textContent = `HP: ${player.hp} / ${player.maxHp}`;

    const smCost = 30;
    const healSmBtn = document.getElementById('btn-heal-sm');
    const healFuBtn = document.getElementById('btn-heal-full');
    if (healSmBtn) {
      healSmBtn.textContent = `HEAL +40 HP (${smCost}g)`;
      healSmBtn.onclick = () => {
        if (player.gold < smCost) { alert('Not enough gold!'); return; }
        player.gold -= smCost; player.heal(40);
        this.renderPost(player, enemy, result);
        this.renderShop(player);
      };
    }
    if (healFuBtn) {
      const fullCost = Math.max(20, Math.floor((player.maxHp - player.hp) * 0.8));
      healFuBtn.textContent = `FULL RESTORE (${fullCost}g)`;
      healFuBtn.onclick = () => {
        const cost = Math.max(20, Math.floor((player.maxHp - player.hp) * 0.8));
        if (player.gold < cost) { alert('Not enough gold!'); return; }
        player.gold -= cost; player.heal(player.maxHp);
        this.renderPost(player, enemy, result);
        this.renderShop(player);
      };
    }

    const cont = document.getElementById('btn-post-continue');
    if (cont) {
      const isGenuineLoss = !result.storeOnly && !result.victory && !(result.mercy && !result.executed);
      if (isGenuineLoss) {
        cont.textContent = 'VIEW FATE →';
        cont.onclick = () => G.showDeath(result);
      } else if (!result.storeOnly) {
        cont.textContent = 'CONTINUE →';
        cont.onclick = () => G.nextFight();
      }
    }

    this.renderShop(player);
    this.renderSell(player);
  },

  renderShop(player) {
    const goldEl = document.getElementById('post-gold');
    if (goldEl) goldEl.textContent = `Gold: ${player.gold}g`;
    const list = document.getElementById('shop-items');
    if (!list) return;
    list.innerHTML = '';
    G.shop.stock.forEach(item => {
      const row = document.createElement('div');
      row.className = 'shop-row';
      row.innerHTML = `
        <div class="shop-row-info">
          <div class="shop-row-name">${item.icon||''} ${item.name}</div>
          <div class="shop-row-desc">${item.desc}</div>
        </div>
        <span class="shop-row-price">${item.price}g</span>
        <button class="btn-buy" ${player.gold < item.price ? 'disabled' : ''}>BUY</button>
      `;
      row.querySelector('.btn-buy').onclick = () => {
        const r = G.shop.buy(player, item.id);
        if (r.ok) { this.renderShop(player); this.renderSell(player); }
        else alert(r.msg);
      };
      list.appendChild(row);
    });
  },

  renderSell(player) {
    const list = document.getElementById('sell-items');
    if (!list) return;
    list.innerHTML = '';
    if (!player.inventory.length) {
      list.innerHTML = '<div style="color:var(--tx2);font-size:15px;padding:6px;">Nothing to sell.</div>';
      return;
    }
    player.inventory.forEach(({item, qty}) => {
      const price = Math.max(1, Math.floor((item.price||0) * 0.10));
      const row = document.createElement('div');
      row.className = 'shop-row';
      row.innerHTML = `
        <div class="shop-row-info">
          <div class="shop-row-name">${item.icon||''} ${item.name}</div>
          <div class="shop-row-desc">x${qty}</div>
        </div>
        <span class="shop-row-price">${price}g</span>
        <button class="btn-sell">SELL</button>
      `;
      row.querySelector('.btn-sell').onclick = () => {
        const r = G.shop.sell(player, item.id);
        if (r.ok) { this.renderShop(player); this.renderSell(player); }
        else alert(r.msg);
      };
      list.appendChild(row);
    });
  },

  renderInventory(player) {
    const slotLabels = {melee:'MELEE',ranged:'RANGED',armor:'ARMOR',helm:'HELM',shield:'SHIELD',boots:'BOOTS'};
    const equipEl = document.getElementById('inv-equip');
    if (equipEl) {
      equipEl.innerHTML = '';
      for (const [slot, label] of Object.entries(slotLabels)) {
        const item = player.equipped[slot];
        const row  = document.createElement('div');
        row.className = 'equip-slot';
        row.innerHTML = `
          <span class="eslot-lbl">${label}</span>
          <span class="eslot-name ${!item?'empty':''}">${item ? item.icon+' '+item.name : '— empty —'}</span>
          ${item ? '<span class="eslot-x">✕ UNEQUIP</span>' : ''}
        `;
        if (item) row.onclick = () => { player.unequipSlot(slot); this.renderInventory(player); };
        equipEl.appendChild(row);
      }
    }

    AvatarRenderer.draw('cv-inv', player, 12);

    const statsEl = document.getElementById('inv-stats');
    if (statsEl) {
      statsEl.innerHTML = `
        <div class="inv-sr"><span class="inv-sk">Level</span><span class="inv-sv">${player.level}</span></div>
        <div class="inv-sr"><span class="inv-sk">XP</span><span class="inv-sv">${player.xp}/${xpForLevel(player.level)}</span></div>
        <div class="inv-sr"><span class="inv-sk">HP</span><span class="inv-sv">${player.hp}/${player.maxHp}</span></div>
        <div class="inv-sr"><span class="inv-sk">ATK</span><span class="inv-sv">${player.atk}</span></div>
        <div class="inv-sr"><span class="inv-sk">RATK</span><span class="inv-sv">${player.ratk}</span></div>
        <div class="inv-sr"><span class="inv-sk">DEF</span><span class="inv-sv">${player.def}</span></div>
        <div class="inv-sr"><span class="inv-sk">SPD</span><span class="inv-sv">${player.spd}</span></div>
        <div class="inv-sr"><span class="inv-sk">Wins</span><span class="inv-sv">${player.wins}</span></div>
      `;
    }
    const goldEl = document.getElementById('inv-gold');
    if (goldEl) goldEl.textContent = `Gold: ${player.gold}g`;

    const bagEl = document.getElementById('inv-bag');
    if (bagEl) {
      bagEl.innerHTML = '';
      if (!player.inventory.length) {
        bagEl.innerHTML = '<div style="color:var(--tx2);font-size:15px;padding:8px;">Bag is empty.</div>';
      } else {
        player.inventory.forEach(({item, qty}) => {
          const row = document.createElement('div');
          row.className = 'bag-row';
          row.innerHTML = `
            <span class="bag-row-name">${item.icon||''} ${item.name}</span>
            <span class="bag-row-type">${item.slot ? item.slot.toUpperCase() : 'CONSUMABLE'}</span>
            <span class="bag-row-qty">x${qty}</span>
          `;
          if (item.slot) {
            row.title = 'Click to equip';
            row.onclick = () => { player.removeFromInventory(item.id); player.equipItem(item); this.renderInventory(player); };
          }
          bagEl.appendChild(row);
        });
      }
    }
  },

  renderHall() {
    const legends = Save.hallOfLegends();
    const tbody   = document.getElementById('hall-body');
    const emptyEl = document.getElementById('hall-empty');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!legends.length) { if (emptyEl) emptyEl.style.display = 'block'; return; }
    if (emptyEl) emptyEl.style.display = 'none';
    legends.forEach((c, i) => {
      const fav = (() => {
        if (!c.killsByEnemy) return '—';
        const entries = Object.entries(c.killsByEnemy);
        if (!entries.length) return '—';
        const [id] = entries.sort((a,b) => b[1]-a[1])[0];
        const enemy = ENEMY_POOL.find(x => x.id === id);
        return enemy ? enemy.name : id;
      })();
      const fate = c.status === 'dead'
        ? `<span class="fate-dead">Slain by ${c.killedBy||'?'}</span>`
        : c.status === 'active'
          ? `<span class="fate-active">Active</span>`
          : `<span class="fate-retired">Retired</span>`;
      const tr = document.createElement('tr');
      tr.className = i < 3 ? `r${i+1}` : '';
      tr.innerHTML = `
        <td>${i+1}</td>
        <td><strong>${c.name}</strong></td>
        <td>${c.level}</td>
        <td>${c.kills||0}</td>
        <td>${fav}</td>
        <td>${c.damageTaken||0}</td>
        <td>${c.totalGold||0}g</td>
        <td>${fate}</td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderDeath(player, killedBy) {
    const sub = document.getElementById('death-sub');
    const epi = document.getElementById('death-epitaph');
    if (sub) sub.textContent = `${player.name} was slain after ${player.wins} victories.`;
    if (epi) epi.innerHTML = `
      Level Reached: ${player.level}<br>
      Total Kills: ${player.kills}<br>
      Damage Taken: ${player.damageTaken}<br>
      Gold Earned: ${player.totalGold}g<br>
      Slain by: ${killedBy || 'Unknown'}
    `;
  },

  onAction(action) {
    if (G.combat) G.combat.playerAction(action);
  },
};

// ── GAME CONTROLLER ───────────────────────────────────────────────
const G = {
  player:  null,
  combat:  null,
  shop:    null,
  currentEnemies: [],
  lastEnemy: null,

  init() {
    this.shop = new Shop();
    this._wireButtons();
    UI.renderMenu();
    UI.show('menu');
  },

  _wireButtons() {
    const on = (id, fn) => { const el = document.getElementById(id); if (el) el.onclick = fn; };
    on('btn-play',     () => this.onPlay());
    on('btn-hall',     () => { UI.renderHall(); UI.show('hall'); });
    on('btn-howto',    () => UI.show('howto'));
    on('btn-howto-back',  () => UI.show('menu'));
    on('btn-hall-back',   () => UI.show('menu'));
    on('btn-death-back',  () => { UI.renderMenu(); UI.show('menu'); });

    on('btn-lp-back',     () => UI.show('menu'));
    on('btn-lp-continue', () => {
      const d = Save.load();
      if (!d?.currentCharacter) return;
      this.player = Player.fromSave(d.currentCharacter);
      this._goSelect();
    });
    on('btn-lp-new', () => {
      UI.show('creation'); UI.initCreation();
      on('btn-create', () => this.onCreateCharacter(true));
    });

    on('btn-create', () => this.onCreateCharacter(false));

    on('btn-sel-inv', () => {
      UI._fromScreen = 'select';
      UI.renderInventory(this.player);
      UI.show('inv');
    });
    on('btn-sel-store', () => {
      this.shop.restock(this.player.level);
      UI.renderPost(this.player, {xpReward:0,goldReward:0,isPrizeFight:false}, {storeOnly:true});
      const cont = document.getElementById('btn-post-continue');
      if (cont) { cont.textContent = '← BACK'; cont.onclick = () => { Save.saveActive(this.player); this._goSelect(); }; }
      UI.show('post');
    });
    on('btn-sel-hall2', () => { UI.renderHall(); UI.show('hall'); });

    on('btn-inv-back', () => {
      Save.saveActive(this.player);
      if (UI._fromScreen === 'select') this._goSelect();
      else UI.show(UI._fromScreen || 'select');
    });
  },

  onPlay() {
    const d = Save.load();
    if (d?.currentCharacter) {
      UI.renderLoadPrompt(d.currentCharacter);
      UI.show('loadprompt');
    } else {
      UI.show('creation');
      UI.initCreation();
      const btn = document.getElementById('btn-create');
      if (btn) btn.onclick = () => this.onCreateCharacter(false);
    }
  },

  onCreateCharacter(retirePrev) {
    const {name, gender, skin, style} = UI.getCreationVals();
    const errEl = document.getElementById('name-err');
    if (errEl) errEl.textContent = '';
    if (!name || name.length < 2) { if (errEl) errEl.textContent = 'Name must be at least 2 characters.'; return; }
    if (Save.nameExists(name))    { if (errEl) errEl.textContent = 'That name is already taken!'; return; }

    const newPlayer = new Player(name, gender, skin, style);
    if (retirePrev) {
      const d = Save.load();
      const oldPlayer = d?.currentCharacter ? Player.fromSave(d.currentCharacter) : null;
      Save.retireAndStartNew(oldPlayer, newPlayer);
    } else {
      Save.saveActive(newPlayer);
    }
    this.player = newPlayer;
    this._goSelect();
  },

  _goSelect() {
    this.player.recalcMaxHp();
    this.shop.restock(this.player.level);
    if (this.player.isPrizeDay) {
      this.currentEnemies = [generatePrizeFight(this.player)];
      UI.renderSelect(this.player, this.currentEnemies, true);
    } else {
      this.currentEnemies = generateEnemyChoices(this.player.level);
      UI.renderSelect(this.player, this.currentEnemies, false);
    }
    UI.show('select');
  },

  // Correct order: clear log → start() → setupCombat() → show()
  selectEnemy(idx) {
    const enemy = this.currentEnemies[idx];
    this.lastEnemy = enemy;
    this.combat = new CombatEngine(this.player);
    this.combat.onEnd = (result) => this.onBattleEnd(result);
    const logEl = document.getElementById('log-body');
    if (logEl) logEl.innerHTML = '';
    this.combat.start(enemy);         // sets G.combat.enemy
    UI.setupCombat(this.player, enemy); // safe to call refreshCombat now
    UI.show('combat');
  },

  onBattleEnd(result) {
    const enemy = this.lastEnemy;

    if (result.mercy && result.executed) {
      setTimeout(() => {
        Save.killCurrent(this.player, 'The Emperor');
        UI.renderDeath(this.player, 'The Emperor');
        UI.show('death');
      }, 2900);
      return;
    }

    if (result.victory) {
      this.player.wins++;
      this.player.kills++;
      this.player.fightNum++;
      this.player.killsByEnemy[enemy.id] = (this.player.killsByEnemy[enemy.id] || 0) + 1;
      this.player.gold      += enemy.goldReward;
      this.player.totalGold += enemy.goldReward;
      const leveled = this.player.addXP(enemy.xpReward);
      if (enemy.isPrizeFight) this._grantPrizeGear();
      if (leveled) setTimeout(() => UI.showLevelUp(this.player.level), 500);
    } else if (result.mercy && !result.executed) {
      this.player.fightNum++;
    } else {
      this.player.fightNum++;
    }

    Save.saveActive(this.player);
    this.shop.restock(this.player.level);
    setTimeout(() => {
      UI.renderPost(this.player, enemy, result);
      UI.show('post');
    }, result.mercy ? 2900 : 1200);
  },

  _grantPrizeGear() {
    const slots = ['melee','armor','helm','shield','boots','ranged'];
    const slot  = slots[Math.floor(Math.random() * slots.length)];
    const curTier = this.player.equipped[slot]?.tier || 0;
    const upgrade = nextTierItem(slot, curTier);
    if (upgrade) {
      this.player.addToInventory(upgrade, 1);
      UI.log(`🏆 Prize Gear: ${upgrade.icon} ${upgrade.name} added to bag!`, 'heal');
    }
  },

  nextFight() { this._goSelect(); },

  showDeath(result) {
    const killedBy = this.lastEnemy?.name || 'Unknown';
    Save.killCurrent(this.player, killedBy);
    UI.renderDeath(this.player, killedBy);
    UI.show('death');
  },
};

// ── BOOT ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => G.init());
