export class UniversBastardItem extends Item {

  /** @override */
  prepareData() {
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /** @override */
  prepareDerivedData() {
    const itemData = this;
    const systemData = itemData.system;
    const flags = itemData.flags.universBastard || {};

    // Make modifications to data here
    switch (itemData.type) {
      case 'arme':
        this._prepareArmeData(itemData);
        break;
      case 'armure':
        this._prepareArmureData(itemData);
        break;
      case 'module':
        this._prepareModuleData(itemData);
        break;
      case 'espece':
        this._prepareEspeceData(itemData);
        break;
      case 'metier':
        this._prepareMetierData(itemData);
        break;
    }
  }

  /**
   * Prepare weapon specific data
   */
  _prepareArmeData(itemData) {
    if (itemData.type !== 'arme') return;

    const systemData = itemData.system;

    // Determine weapon category based on damage
    const degats = systemData.degats || 1;
    if (degats <= 3) {
      systemData.categorie = 'legere';
    } else if (degats <= 6) {
      systemData.categorie = 'intermediaire';
    } else {
      systemData.categorie = 'lourde';
    }

    // Set default attribute for attack rolls
    if (!systemData.attribut) {
      if (systemData.portee === 'contact') {
        systemData.attribut = 'violence';
      } else {
        systemData.attribut = 'adresse';
      }
    }
  }

  /**
   * Prepare armor specific data
   */
  _prepareArmureData(itemData) {
    if (itemData.type !== 'armure') return;

    const systemData = itemData.system;

    // Calculate protection values if not set
    if (!systemData.protection) {
      systemData.protection = {
        cinetique: 0,
        plasma: 0,
        laser: 0
      };
    }

    // Determine armor category
    const maxPR = Math.max(
      systemData.protection.cinetique || 0,
      systemData.protection.plasma || 0,
      systemData.protection.laser || 0
    );

    if (maxPR <= 3) {
      systemData.categorie = 'legere';
    } else if (maxPR <= 6) {
      systemData.categorie = 'intermediaire';
    } else {
      systemData.categorie = 'lourde';
    }
  }

  /**
   * Prepare module specific data
   */
  _prepareModuleData(itemData) {
    if (itemData.type !== 'module') return;

    const systemData = itemData.system;

    // Ensure module type is set
    if (!systemData.typeModule) {
      systemData.typeModule = 'passif';
    }
  }

  /**
   * Prepare species specific data
   */
  _prepareEspeceData(itemData) {
    if (itemData.type !== 'espece') return;

    const systemData = itemData.system;

    // Prepare species bonuses
    if (!systemData.biometrie) {
      systemData.biometrie = {};
    }
  }

  /**
   * Prepare profession specific data
   */
  _prepareMetierData(itemData) {
    if (itemData.type !== 'metier') return;

    const systemData = itemData.system;

    // Prepare profession data
    if (!systemData.specialisations) {
      systemData.specialisations = [];
    }

    if (!systemData.equipementDepart) {
      systemData.equipementDepart = [];
    }
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    const item = this;

    // Initialize chat data.
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    const label = `[${item.type}] ${item.name}`;

    // If there's no roll data, send a chat message.
    if (!this.system.formula) {
      ChatMessage.create({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
        content: item.system.description ?? ''
      });
    }
    // Otherwise, create a roll and send a chat message from it.
    else {
      // Retrieve roll data.
      const rollData = this.getRollData();

      // Invoke the roll and submit it to chat.
      const roll = new Roll(rollData.item.formula, rollData);
      
      // If you need to store the value first, uncomment the next line.
      // await roll.evaluate();
      
      roll.toMessage({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
      });
      return roll;
    }
  }

  /**
   * Prepare a data object which is passed to any Roll formulas which are created related to this Item
   * @private
   */
  getRollData() {
    // If present, return the actor's roll data.
    if (!this.actor) return null;
    const rollData = this.actor.getRollData();
    rollData.item = foundry.utils.deepClone(this.system);

    return rollData;
  }
}