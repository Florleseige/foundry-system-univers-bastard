import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

export class UniversBastardActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['univers-bastard', 'sheet', 'actor'],
      width: 800,
      height: 700,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'caracteristiques',
        },
      ],
    });
  }

  /** @override */
  get template() {
    return `systems/univers-bastard/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const context = super.getData();

    const actorData = this.actor.toObject(false);
    context.system = actorData.system;
    context.flags = actorData.flags;

    // Prepare character data and items.
    if (actorData.type == 'personnage') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'pnj') {
      this._prepareItems(context);
    }

    // Prepare Vaisseau data.
    if (actorData.type == 'vaisseau') {
      this._prepareVaisseauData(context);
    }

    // Add roll data for TinyMCE editors.
    context.rollData = context.actor.getRollData();

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(
      this.actor.effects,
    );

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   */
  _prepareCharacterData(context) {
    // Handle attribute modifiers
    for (let [k, v] of Object.entries(context.system.attributs)) {
      v.label = game.i18n.localize(`UB.Attributs.${k}`) ?? k;
      v.mod = this._getModifier(v.value);
    }
  }

  /**
   * Organize and classify Items for all sheets.
   */
  _prepareItems(context) {
    // Initialize containers.
    const gear = [];
    const armes = [];
    const armures = [];
    const modules = [];
    const capacites = [];
    const espece = null;
    const metier = null;

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      
      // Append to appropriate array
      if (i.type === 'arme') {
        armes.push(i);
      } else if (i.type === 'armure') {
        armures.push(i);
      } else if (i.type === 'module') {
        modules.push(i);
      } else if (i.type === 'capacite') {
        capacites.push(i);
      } else if (i.type === 'espece') {
        context.espece = i;
      } else if (i.type === 'metier') {
        context.metier = i;
      } else if (i.type === 'equipement') {
        gear.push(i);
      }
    }

    // Assign and return
    context.gear = gear;
    context.armes = armes;
    context.armures = armures;
    context.modules = modules;
    context.capacites = capacites;
  }

  /**
   * Organize and classify data for Vaisseau sheets.
   */
  _prepareVaisseauData(context) {
    // Prepare ship specific data
    context.system.pc.pourcentage = Math.floor((context.system.pc.value / context.system.pc.max) * 100);
    context.system.pe.pourcentage = Math.floor((context.system.pe.value / context.system.pe.max) * 100);
  }

  /**
   * Get modifier value from attribute value
   */
  _getModifier(value) {
    if (value >= 4) return 3;
    if (value >= 3) return 2;
    if (value >= 2) return 1;
    if (value >= 1) return 0;
    if (value >= 0) return -1;
    if (value >= -1) return -2;
    return -3;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.on('click', '.item-edit', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.on('click', '.item-create', this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.on('click', '.item-delete', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.on('click', '.effect-control', (ev) => {
      const row = ev.currentTarget.closest('li');
      const document =
        row.dataset.parentId === this.actor.id
          ? this.actor
          : this.actor.items.get(row.dataset.parentId);
      onManageActiveEffect(ev, document);
    });

    // Rollable abilities.
    html.on('click', '.rollable', this._onRoll.bind(this));

    // Attribute rolls
    html.on('click', '.attribute-roll', this._onAttributeRoll.bind(this));

    // Weapon attacks
    html.on('click', '.weapon-attack', this._onWeaponAttack.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains('inventory-header')) return;
        li.setAttribute('draggable', true);
        li.addEventListener('dragstart', handler, false);
      });
    }
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data,
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system['type'];

    // Finally, create the item!
    return await Item.create(itemData, { parent: this.actor });
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

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[ability] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

  /**
   * Handle attribute rolls
   * @param {Event} event   The originating click event
   * @private
   */
  async _onAttributeRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const attributeName = dataset.attribute;

    if (attributeName) {
      return this.actor.rollAttribute(attributeName);
    }
  }

  /**
   * Handle weapon attacks
   * @param {Event} event   The originating click event
   * @private
   */
  async _onWeaponAttack(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest('.item').dataset.itemId;

    if (itemId) {
      return this.actor.rollWeapon(itemId);
    }
  }
}