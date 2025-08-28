import { UniversBastardActor } from "./documents/actor.mjs";
import { UniversBastardItem } from "./documents/item.mjs";
import { UniversBastardActorSheet } from "./sheets/actor-sheet.mjs";
import { UniversBastardItemSheet } from "./sheets/item-sheet.mjs";
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function() {
  console.log('Univers Bastard | Initializing system');

  // Define custom Document classes
  CONFIG.Actor.documentClass = UniversBastardActor;
  CONFIG.Item.documentClass = UniversBastardItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("univers-bastard", UniversBastardActorSheet, {
    types: ["personnage", "pnj", "vaisseau"],
    makeDefault: true,
    label: "UB.SheetLabels.Actor"
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("univers-bastard", UniversBastardItemSheet, {
    types: ["arme", "armure", "module", "equipement", "espece", "metier", "handicap", "capacite"],
    makeDefault: true,
    label: "UB.SheetLabels.Item"
  });

  // Preload Handlebars templates
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

Hooks.once("ready", function() {
  // Custom Handlebars helpers
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });

  Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
  });

  Handlebars.registerHelper('add', function(a, b) {
    return parseInt(a) + parseInt(b);
  });

  Handlebars.registerHelper('subtract', function(a, b) {
    return parseInt(a) - parseInt(b);
  });
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once("ready", function() {
  console.log('Univers Bastard | System ready');
});

/* -------------------------------------------- */
/*  Dice Rolling Hook                           */
/* -------------------------------------------- */

Hooks.on("preCreateChatMessage", function(document, data, options, user) {
  // Custom dice rolling logic can be added here
  return true;
});

// Custom dice roll function
window.rollUB = async function(formula, flavor = "", data = {}) {
  const roll = new Roll(formula, data);
  await roll.evaluate();
  
  let resultClass = "";
  const total = roll.total;
  
  if (total >= 16) {
    resultClass = "reussite-totale";
  } else if (total >= 11) {
    resultClass = "reussite-negative";
  } else if (total >= 7) {
    resultClass = "echec-positif";
  } else {
    resultClass = "echec-total";
  }
  
  roll.toMessage({
    speaker: ChatMessage.getSpeaker(),
    flavor: flavor,
    flags: {
      "univers-bastard": {
        resultClass: resultClass,
        total: total
      }
    }
  });
  
  return roll;
};