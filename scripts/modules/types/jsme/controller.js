
define(['modules/defaultcontroller'], function(Default) {
	
	function controller() {};
	controller.prototype = $.extend(true, {}, Default, {

		onChange: function(mol, smiles) {
			console.log(mol, smiles);
			this.setVarFromEvent('onStructureChange', mol, 'mol');
			this.setVarFromEvent('onStructureChange', smiles, 'smiles');
		},

		configurationSend: {
			
			events: {
				'onStructureChange': {
					label: 'Molecular structure has changed'
				}
			},
			
			rels: {
				'mol': {
					label: 'Mol 2D'
				},

				'smiles': {
					label: 'Smiles'
				}
			}
		},
		
		configurationReceive: {
			
			mol: {
				type: ['mol2d',"molfile2d"],
				label: 'Mol 2D'
			}

		},

		moduleInformations: {
		},

		actions: {
			rel: {
				
			}
		},

		actionsReceive: {
			
		},

		doConfiguration: function(section) {
			return {
				groups: {
					'gencfg': {
						config: {
							type: 'list'
						},

						fields: [
							{
								type: 'Checkbox',
								name: 'prefs',
								title: 'Options',
								options: {
									'noxbutton': 'Hide X button',
								 	'rbutton': 'Show R button',
								 	'nohydrogens': 'Hide hydrogens',
								 	'query': 'Enable query features',
								 	'autoez': 'Automatic generation of SMULES with E,Z stereochemistry',
								 	'nocanonize': 'Prevent canonicalization and detection of aromaticity',
								 	'nostereo': 'No stereochemistry in SMILES',
								 	'reaction': 'Enable reaction input',
								 	'multipart': 'Allow multipart structures',
									'polarnitro': "Don't convert automatically nitro to unpolar form",
									'number': 'Allow to number atoms',
									'depict': 'Only display structure (no editing)',
									'border': 'With depict option, display the border around the molecule',
									'oldlook': 'Use the old look'
								}
							}
						]
					}
				}
			}
		},
		
		doFillConfiguration: function() {
			return {
				groups: {
					gencfg: [{
						prefs: [this.module.getConfiguration().prefs || []],
					}]
				}
			}
		},
		
		doSaveConfiguration: function(confSection) {
			this.module.getConfiguration().prefs = confSection[0].gencfg[0].prefs[0];
			return;
		}


	});

	return controller;
});

