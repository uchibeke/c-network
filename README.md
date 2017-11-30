# org.uchi.biznet

- Genrate .bna file: `composer archive create -t dir -n .`
- Install composer runtime: `composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName tutorial-network`
- Start network: `composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile tutorial-network@0.0.1.bna --file networkadmin.card`
- Ping a network: `composer network ping --card admin@t-network`
- Import an admin card: `composer card import --file networkadmin.card`
- Start rest server: `composer-rest-server`
- Update with new .bna file `composer network update -a <business-network-archive> -c <card-name>`

## New

```
{
  "$class": "org.uchi.biznet.AddNew",
  "description": "",
  "url": "http://uchi.me",
  "fileId": "f1",
  "owner": "1",
  "viewers": [12,34],
  "editors": [10,4,13,100],
  "description": "My cool asset"
}
```

## Update

```
{
  "$class": "org.uchi.biznet.UpdateGenome",
  "owner": "1",
  "viewers": [111,333,444],
  "editors": [44,4],
  "remove": [3,2],
  "fileId": "f5",
  "genome": {
    "$class": "org.uchi.biznet.GenomeFile",
    "fileId": "f5",
    "description": "",
    "url": "",
    "createdAt": "2017-11-30T19:27:11.887Z",
    "updatedAt": "2017-11-30T19:27:11.887Z",
    "owner": "resource:org.uchi.biznet.Person#9395",
    "viewers": [],
    "editors": []
  }
}
```

## Add Prof

```
{
  "$class": "org.uchi.biznet.Professor",
  "id": "p2",
  "firstName": "Uchi",
  "lastName": "Uchibeke",
  "title": "Mr"
}
```