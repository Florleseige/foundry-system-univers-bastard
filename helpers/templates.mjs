/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/univers-bastard/templates/actor/parts/actor-attributs.hbs',
    'systems/univers-bastard/templates/actor/parts/actor-items.hbs',
    'systems/univers-bastard/templates/actor/parts/actor-armes.hbs',
    'systems/univers-bastard/templates/actor/parts/actor-armures.hbs',
    'systems/univers-bastard/templates/actor/parts/actor-equipement.hbs',
    'systems/univers-bastard/templates/actor/parts/actor-capacites.hbs',
    'systems/univers-bastard/templates/actor/parts/actor-vaisseau-stats.hbs',
    'systems/univers-bastard/templates/actor/parts/actor-vaisseau-modules.hbs',
    
    // Item partials
    'systems/univers-bastard/templates/item/parts/item-effects.hbs',
    'systems/univers-bastard/templates/item/parts/item-description.hbs',
    'systems/univers-bastard/templates/item/parts/arme-stats.hbs',
    'systems/univers-bastard/templates/item/parts/armure-stats.hbs',
    'systems/univers-bastard/templates/item/parts/module-stats.hbs',
  ]);
};