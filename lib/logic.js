'use strict';
/**
* Write your transction processor functions here
*/

/**
* AddNew transaction processor function.
* @param {org.assetchain.biznet.AddNew} AddNew The transaction to save a new asset to the blockchain.
* @transaction
*/
function Add(Add) {
    return getAssetRegistry('org.assetchain.biznet.Resource')
    .then(function (AssetRegistry) {
        // Get the factory.
        var factory = getFactory();
        return getParticipantRegistry('org.assetchain.biznet.User')
            .then(function (userRegistry) {
                return userRegistry.get(Add.owner.id);
            }).then(function (user) {
                // Create a new asset.
                var newAsset = factory.newResource('org.assetchain.biznet', 'Resource', Add.assetId);
                // Set the properties of the new asset.
                newAsset.assetId = Add.assetId;
                newAsset.description = Add.description || "";
                newAsset.createdAt = new Date();
                newAsset.updatedAt = new Date();
                newAsset.url = Add.url || "";
                newAsset.viewers = Add.viewers;
                newAsset.editors = Add.editors;
                console.log(user)
                if (user == undefined) {
                    return true
                } else {
                    newAsset.owner = Add.owner
                    return AssetRegistry.add(newAsset);
                }
            })
    })
}

/**
* CanView transaction processor function.
* @param {org.assetchain.biznet.CanView} CanView The transaction to save a new asset to the blockchain.
* @transaction
*/
function Check(CanView) {
    return getAssetRegistry('org.assetchain.biznet.Resource')
    .then(function (AssetRegistry) {
        return AssetRegistry.get(CanView.asset.assetId);
    }).then (function(asset) {
        console.log(asset)
        if(asset != undefined) {
            return asset.viewers.indexOf(CanView.asset) >= 0
        } else {
            return false
        }
    })
}


/**
* Update transaction processor function.
* @param {org.assetchain.biznet.Update} Update The transaction to save a new asset to the blockchain.
* @transaction
*/
function Update(update) {
    // Save the old value of the asset.
    var oldValue = update.asset;
    var factory = getFactory();
    
    // Update the asset with the new value.
    if (update.url) {
        update.asset.url = update.url;
    }
    if (update.description) {
        update.asset.description = update.description;
    }
    update.asset.viewers = update.viewers.concat(update.viewers)
        .filter(function(e){
            return this.indexOf(e) < 0;
        }, update.remove);
  
    update.asset.editors = update.viewers.concat(update.editors)
        .filter(function(e){
            return this.indexOf(e) < 0;
        }, update.remove);
    
    // Get the asset registry for the asset.
    return getAssetRegistry('org.assetchain.biznet.Resource')
        .then(function (assetRegistry) {
        
        // Update the asset in the asset registry.
        return assetRegistry.update(update.asset);
        
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
* @param {org.assetchain.biznet.GiveAccess} GiveAccess The transaction to save a new asset to the blockchain.
* @transaction
*/
function Give(give) {
    // Save the old value of the asset.
    var oldValue = give.asset;
    var factory = getFactory();
    
    // Update the asset with the new value.
    give.asset.viewers = give.viewers.concat(give.viewers)
    give.asset.editors = give.editors.concat(give.editors)
    
    // Get the asset registry for the asset.
    return getAssetRegistry('org.assetchain.biznet.Resource')
        .then(function (assetRegistry) {
        
        // Update the asset in the asset registry.
        return assetRegistry.update(give.asset);
    })
    .then(function () {
    });
}


/**
* RevokeAccess transaction processor function.
* @param {org.assetchain.biznet.RevokeAccess} RevokeAccess The transaction to save a new asset to the blockchain.
* @transaction
*/
function Revoke(revoke) {
    // Save the old value of the asset.
    var oldValue = revoke.asset;
    var factory = getFactory();
    
    revoke.asset.viewers = revoke.asset.viewers.filter(function(viewers){
        return revoke.users.indexOf(viewers) == -1;
    }); 
    revoke.asset.editors = revoke.asset.editors.filter(function(editors){
        return revoke.users.indexOf(editors) == -1;
    }); 
    
    // Get the asset registry for the asset.
    return getAssetRegistry('org.assetchain.biznet.Resource')
        .then(function (assetRegistry) {
        
        // Update the asset in the asset registry.
        return assetRegistry.update(revoke.asset);
    })
    .then(function () {
    });
}


/**
* Remove transaction processor function.
* @param {org.assetchain.biznet.Remove} Remove The transaction to save a new genome asset to the blockchain.
* @transaction
*/
function Remove(remove) {
    // Save the old value of the asset.
    var oldValue = remove.asset;
    var factory = getFactory();
    return getAssetRegistry('org.assetchain.biznet.Resource')
    .then(function (assetRegistry) {
        return assetRegistry.remove(remove.asset);
        
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


