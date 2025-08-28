export class UniversBastardItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['univers-bastard', 'sheet', 'item'],
      width: 520,
      height: 480,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'description',
        },
      ],
    });
  }

  /** @override */
  get template() {
    const path = 'systems/univers-bastard/templates/item';
    return `${path}/item-${this.item.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const context = super.getData();

    const itemData = context.item;
    context.rollData = {};
    let actor = this.object?.parent ?? null;
    if (actor) {
      context.rollData = actor.getRollData();
    }

    // Add item type specific data
    this._prepareItemData(context);

    return context;
  }

  /**
   * Prepare item type specific data
   */
  _prepareItemData(context) {
    const item = context.item;

    // Add weapon specific data
    if (item.type === 'arme') {
      context.portees = {
        'contact': 'UB.Portees.Contact',
        'courte': 'UB.Portees.Courte',
        'moyenne': 'UB.Portees.Moyenne',
        'longue': 'UB.Portees.Longue',
        'lointaine': 'UB.Portees.Lointaine'
      };

      context.typesDegats = {
        'cinetique': 'UB.TypesDegats.Cinetique',
        'plasma': 'UB.TypesDegats.Plasma',
        'laser': 'UB.TypesDegats.Laser'
      };

      context.attributs = {
        'violence': 'UB.Attributs.Violence',
        'adresse': 'UB.Attributs.Adresse',
        'corps': 'UB.Attributs.Corps',
        'mental': 'UB.Attributs.Mental',
        'instinct': 'UB.Attributs.Instinct',
        'charisme': 'UB.Attributs.Charisme'
      };
    }

    // Add armor specific data
    if (item.type === 'armure') {
      // Protection types are already defined in the template
    }

    // Add module specific data
    if (item.type === 'module') {
      context.typesModules = {
        'passif': 'UB.Modules.Passif',
        'actif': 'UB.Modules.Actif'
      };

      context.ciblesModules = {
        'arme': 'UB.Modules.Arme',
        'armure': 'UB.Modules.Armure',
        'vaisseau': 'UB.Modules.Vaisseau'
      };
    }

    // Add species specific data
    if (item.type === 'espece') {
      context.biomes = {
        'tempere': 'UB.Biomes.Tempere',
        'tropical': 'UB.Biomes.Tropical',
        'oceanique': 'UB.Biomes.Oceanique',
        'volcanique': 'UB.Biomes.Volcanique'
      };
    }

    // Add profession specific data
    if (item.type === 'metier') {
      context.specialisationsList = [
        'diplome', 'chercheur', 'assassin', 'espion',
        'racer', 'contrebandier', 'mecanicien', 'hacker',
        'chirurgien', 'infirmier', 'commando', 'artilleur',
        'sentinelle', 'executeur'
      ];
    }
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.
    html.on('click', '.rollable', this._onRoll.bind(this));

    // Add/Remove entries for arrays
    html.on('click', '.array-add', this._onArrayAdd.bind(this));
    html.on('click', '.array-remove', this._onArrayRemove.bind(this));
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle different roll types
    if (dataset.rollType) {
      if (dataset.rollType === 'damage') {
        const formula = this.item.system.degats || '1';
        const roll = new Roll(formula);
        roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: this.actor }),
          flavor: `Dégâts de ${this.item.name}`,
        });
        return roll;
      }
    }
  }

  /**
   * Handle adding entries to arrays
   * @param {Event} event   The originating click event
   * @private
   */
  _onArrayAdd(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const arrayPath = dataset.array;
    
    if (arrayPath) {
      const current = foundry.utils.getProperty(this.item.system, arrayPath) || [];
      current.push('');
      this.item.update({[`system.${arrayPath}`]: current});
    }
  }

  /**
   * Handle removing entries from arrays
   * @param {Event} event   The originating click event
   * @private
   */
  _onArrayRemove(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const arrayPath = dataset.array;
    const index = parseInt(dataset.index);
    
    if (arrayPath && !isNaN(index)) {
      const current = foundry.utils.getProperty(this.item.system, arrayPath) || [];
      current.splice(index, 1);
      this.item.update({[`system.${arrayPath}`]: current});
    }
  }
}