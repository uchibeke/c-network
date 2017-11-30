'use strict';
/**
* Write your transction processor functions here
*/

/**
* AddNew transaction processor function.
* @param {org.uchi.biznet.AddNew} AddNew The transaction to save a new genome file to the blockchain.
* @transaction
*/
function OnAddNew(AddNew) {
    return getAssetRegistry('org.uchi.biznet.GenomeFile')
    .then(function (genomeFileRegistry) {
        // Get the factory.
        var factory = getFactory();
        // Create a new asset.
        var newAsset = factory.newResource('org.uchi.biznet', 'GenomeFile', AddNew.fileId);
        // Set the properties of the new asset.
        newAsset.fileId = AddNew.fileId;
        newAsset.owner = factory.newRelationship('org.uchi.biznet', 'Person', AddNew.owner);
        newAsset.description = AddNew.description;
        newAsset.createdAt = new Date();
        newAsset.updatedAt = new Date();
        newAsset.url = AddNew.url;
        newAsset.viewers = AddNew.viewers;
        newAsset.editors = AddNew.editors;
        return genomeFileRegistry.add(newAsset);
    })
}

/**
* UpdateGenome transaction processor function.
* @param {org.uchi.biznet.UpdateGenome} update The transaction to save a new genome file to the blockchain.
* @transaction
*/
function UpdateGenome(update) {
    // Save the old value of the asset.
    var oldValue = update.genome;
    var factory = getFactory();
    
    // Update the asset with the new value.
    if (update.url) {
    	update.genome.url = update.url;
    }
    if (update.description) {
    	update.genome.description = update.description;
    }
    update.genome.viewers = update.viewers.concat(update.viewers).filter(function(e){return this.indexOf(e)<0;},update.remove);
    update.genome.editors = update.viewers.concat(update.editors).filter(function(e){return this.indexOf(e)<0;},update.remove);
    
    // Get the asset registry for the asset.
    return getAssetRegistry('org.uchi.biznet.GenomeFile')
    .then(function (assetRegistry) {
        
        // Update the asset in the asset registry.
        return assetRegistry.update(update.genome);
        
    })
    .then(function () {
        // Emit an event for the modified asset.
        // var event = getFactory().newEvent('org.uchi.biznet', 'SampleEvent');
        // event.genome = update.genome;
        // event.oldValue = oldValue;
        // event.newValue = update.description;
        // emit(event);
        
    });
}


/**
* RemoveGenome transaction processor function.
* @param {org.uchi.biznet.RemoveGenome} remove The transaction to save a new genome file to the blockchain.
* @transaction
*/
function RemoveGenome(remove) {
    // Save the old value of the asset.
    var oldValue = remove.genome;
    var factory = getFactory();
    return getAssetRegistry('org.uchi.biznet.GenomeFile')
    .then(function (assetRegistry) {
        return assetRegistry.remove(remove.genome);
        
    })
    .then(function () {
        // Emit an event for the modified asset.
        // var event = getFactory().newEvent('org.uchi.biznet', 'SampleEvent');
        // event.genome = update.genome;
        // event.oldValue = oldValue;
        // event.newValue = update.description;
        // emit(event);
        
    });
}

function IssueId () {
    const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
    let businessNetworkConnection = new BusinessNetworkConnection();
    return businessNetworkConnection.connect('admin@digitalPropertyNetwork')
        .then(() => {
            return businessNetworkConnection.issueIdentity('net.biz.digitalPropertyNetwork.Person#mae@biznet.org', 'maeid1')
        })
        .then((result) => {
            console.log(`userID = ${result.userID}`);
            console.log(`userSecret = ${result.userSecret}`);
            return businessNetworkConnection.disconnect();
        })
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
}


