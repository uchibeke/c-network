# org.assetchain.biznet

- Install hyperledger fabric and composer by following instructions here: https://hyperledger.github.io/composer/installing/development-tools
- Genrate .bna file: `composer archive create -t dir -n .`
- Install composer runtime: `composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName tutorial-network`
- Start network: `composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile tutorial-network@0.0.1.bna --file networkadmin.card`
- Ping a network: `composer network ping --card admin@t-network`
- Import an admin card: `composer card import --file networkadmin.card`
- Start rest server: `composer-rest-server`
- Update with new .bna file `composer network update -a <business-network-archive> -c <card-name>`

## AddFile

```
{
  "$class": "org.assetchain.biznet.AddFile",
  "description": "",
  "url": "http://uchi.me",
  "fileId": "theUniqueIdOfFile",
  "owner": "userIdOfOwner",
  "viewers": ["userId", "userId"],
  "editors": ["userId", "userId"],
  "description": "My cool asset"
}
```



##  CanView
```
{
  "$class": "org.assetchain.biznet.CanView",
  "file": "theUniqueIdOfFile",
  "user": "userIdOfUserToConfirmViewPrevilegeFor"
}

```


## GiveAccess
```
{
  "$class": "org.assetchain.biznet.GiveAssess",
  "file": "theUniqueIdOfFile",
  "owner": "userIdOfOwner",
  "viewers": ["userIdToGiveAccess", "userIdToGiveAccess"],
  "editors": []
}
```


## RevokeAccess
```
{
  "$class": "org.assetchain.biznet.RevokeAccess",
  "file": "theUniqueIdOfFile",
  "owner": "userIdOfOwner",
  "users": ["userIdToRevokeAccess", "userIdToRevokeAccess"]
}
```

## UpdateFile

```
{
  "$class": "org.assetchain.biznet.UpdateFile",
  "url": "",
  "file": "theUniqueIdOfFile",
  "owner": "userIdOfOwner",
  "viewers": [list of user ids new viewers],
  "editors": [list of user ids new editors],
  "remove": [list of user ids to remove as viewers and editors]
}
```

