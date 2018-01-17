'use strict';
/**
* Write your transction processor functions here
*/

/**
* AddNew transaction processor function.
* @param {org.assetchain.biznet.AddFile} AddNew The transaction to save a new file to the blockchain.
* @transaction
*/
function AddFile(Add) {
    return getAssetRegistry('org.assetchain.biznet.File')
    .then(function (FileRegistry) {
        // Get the factory.
        var factory = getFactory();
        // Create a new asset.
        var newAsset = factory.newResource('org.assetchain.biznet', 'File', Add.fileId);
        // Set the properties of the new asset.
        newAsset.fileId = Add.fileId;
        newAsset.owner = Add.owner //factory.newRelationship('org.assetchain.biznet', 'User', Add.owner);
        newAsset.description = Add.description || "";
        newAsset.createdAt = new Date();
        newAsset.updatedAt = new Date();
        newAsset.url = Add.url || "";
        newAsset.viewers = Add.viewers;
        newAsset.editors = Add.editors;
        return FileRegistry.add(newAsset);
    })
}

/**
* CanView transaction processor function.
* @param {org.assetchain.biznet.CanView} CanView The transaction to save a new file to the blockchain.
* @transaction
*/
function CanView(CanView) {
    return getAssetRegistry('org.assetchain.biznet.File')
    .then(function (FileRegistry) {
        return FileRegistry.get(CanView.file.fileId);
    }).then (function(file) {
        console.log(file)
        if(file != undefined) {
            return file.viewers.indexOf(CanView.file) >= 0
        } else {
            return false
        }
    })
}


/**
* Update transaction processor function.
* @param {org.assetchain.biznet.UpdateFile} update The transaction to save a new file to the blockchain.
* @transaction
*/
function UpdateFile(update) {
    // Save the old value of the asset.
    var oldValue = update.file;
    var factory = getFactory();
    
    // Update the asset with the new value.
    if (update.url) {
        update.file.url = update.url;
    }
    if (update.description) {
        update.file.description = update.description;
    }
    update.file.viewers = update.viewers.concat(update.viewers)
        .filter(function(e){
            return this.indexOf(e) < 0;
        }, update.remove);
  
    update.file.editors = update.viewers.concat(update.editors)
        .filter(function(e){
            return this.indexOf(e) < 0;
        }, update.remove);
    
    // Get the asset registry for the asset.
    return getAssetRegistry('org.assetchain.biznet.File')
        .then(function (assetRegistry) {
        
        // Update the asset in the asset registry.
        return assetRegistry.update(update.file);
        
    })
    .then(function () {
        // Emit an event for the modified asset.
        // var event = getFactory().newEvent('org.assetchain.biznet', 'SampleEvent');
        // event.genome = update.genome;
        // event.oldValue = oldValue;
        // event.newValue = update.description;
        // emit(event);
        
    });
}


/**
* GiveAccess transaction processor function.
* @param {org.assetchain.biznet.GiveAccess} update The transaction to save a new file to the blockchain.
* @transaction
*/
function GiveAccess(give) {
    // Save the old value of the asset.
    var oldValue = give.file;
    var factory = getFactory();
    
    // Update the asset with the new value.
    give.file.viewers = give.viewers.concat(give.viewers)
    give.file.editors = give.editors.concat(give.editors)
    
    // Get the asset registry for the asset.
    return getAssetRegistry('org.assetchain.biznet.File')
        .then(function (fileRegistry) {
        
        // Update the asset in the asset registry.
        return fileRegistry.update(give.file);
    })
    .then(function () {
    });
}


/**
* RevokeAccess transaction processor function.
* @param {org.assetchain.biznet.RevokeAccess} update The transaction to save a new file to the blockchain.
* @transaction
*/
function RevokeAccess(revoke) {
    // Save the old value of the asset.
    var oldValue = revoke.file;
    var factory = getFactory();
    
    revoke.file.viewers = revoke.file.viewers.filter(function(viewers){
        return revoke.users.indexOf(viewers) == -1;
    }); 
    revoke.file.editors = revoke.file.editors.filter(function(editors){
        return revoke.users.indexOf(editors) == -1;
    }); 
    
    // Get the asset registry for the asset.
    return getAssetRegistry('org.assetchain.biznet.File')
        .then(function (fileRegistry) {
        
        // Update the asset in the asset registry.
        return fileRegistry.update(revoke.file);
    })
    .then(function () {
    });
}


/**
* RemoveGenome transaction processor function.
* @param {org.assetchain.biznet.RemoveFile} remove The transaction to save a new genome file to the blockchain.
* @transaction
*/
function RemoveFile(remove) {
    // Save the old value of the asset.
    var oldValue = remove.file;
    var factory = getFactory();
    return getAssetRegistry('org.assetchain.biznet.File')
    .then(function (assetRegistry) {
        return assetRegistry.remove(remove.file);
        
    })
    .then(function () {
        // Emit an event for the modified asset.
        // var event = getFactory().newEvent('org.assetchain.biznet', 'SampleEvent');
        // event.genome = update.genome;
        // event.oldValue = oldValue;
        // event.newValue = update.description;
        // emit(event);
        
    });
}


