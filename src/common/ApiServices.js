import firebase from '../common/firebase';



export function getAllCollageAndTables() {
    return firebase.database().ref('electoraltable/').orderByChild('electoralcollege');
};

export function getAllVotes() {
    return firebase.database().ref('votes/').orderByChild('electoraltable');
};

export function getAllUsers() {
    return firebase.database().ref('users/');
};

export function getCollageInfo(infoData) {
    var collageTemp = [];
    var tempNames = [];
    for (var key in infoData) {
        if (infoData[key].electoralcollege.active === true) {

            var canSave = true;
            for (let x = 0; x < tempNames.length; x++) {
                if (tempNames[x] === infoData[key].electoralcollege.name) {
                    canSave = false
                }
            }

            if (canSave) {
                collageTemp.push(
                    {
                        "active": infoData[key].electoralcollege.active,
                        "address": infoData[key].electoralcollege.address,
                        "date_cretated": infoData[key].electoralcollege.date_cretated,
                        "id": infoData[key].electoralcollege.id,
                        "name": infoData[key].electoralcollege.name,
                        "pic": infoData[key].electoralcollege.pic,
                        "video": infoData[key].electoralcollege.video
                    }
                );

                tempNames.push(infoData[key].electoralcollege.name);
            }
        }
    }
    return collageTemp.sort((a, b) => a.name.localeCompare(b.name));
};



export function getVotesInfo(infoData) {
    var collageTemp = [];

    for (var key in infoData) {
        var toAdd = 0;

        for (var x = 0; x < collageTemp.length; x++) {
            if (infoData[key].active === true) {
                if (collageTemp[x].collage === infoData[key].electoraltable.electoralcollege.name) {
                    toAdd++;
                }
            }
        }

        if (toAdd === 0) {
            collageTemp.push({
                "collage_id": infoData[key].electoraltable.electoralcollege.id,
                "collage": infoData[key].electoraltable.electoralcollege.name,
                "table_id": infoData[key].electoraltable.id,
                "table": infoData[key].electoraltable.name,
                "total": 0
            })
        }
    }


    for (var x = 0; x < collageTemp.length; x++) {

        for (var key in infoData) {
            if (infoData[key].active === true) {
                if (infoData[key].electoraltable.electoralcollege.name === collageTemp[x].collage) {
                    collageTemp[x].total = collageTemp[x].total + 1;
                }
            }
        }

    }

    return collageTemp;
};


export function getVotesInfoDetails(infoData) {
    var tableTemp = [];
    var tableTempOrder = [];


    for (var key in infoData) {
        var toAdd = 0;

        for (var x = 0; x < tableTemp.length; x++) {
            if (infoData[key].active === true) {
                if ((tableTemp[x].collage === infoData[key].electoraltable.electoralcollege.name) && (tableTemp[x].table === infoData[key].electoraltable.name)) {
                    toAdd++;
                }
            }
        }

        if (toAdd === 0) {
            tableTemp.push({
                "collage_id": infoData[key].electoraltable.electoralcollege.id,
                "collage": infoData[key].electoraltable.electoralcollege.name,
                "table_id": infoData[key].electoraltable.id,
                "table": infoData[key].electoraltable.name,
                "total": 0
            })
        }
    }


    for (var x = 0; x < tableTemp.length; x++) {

        for (var key in infoData) {
            if (infoData[key].active === true) {
                if ((infoData[key].electoraltable.electoralcollege.name === tableTemp[x].collage) && (infoData[key].electoraltable.name === tableTemp[x].table)) {
                    tableTemp[x].total = tableTemp[x].total + 1;
                }
            }
        }

    }


    /*ORDER */
    var infoTemp = tableTemp;
    var titleTemp = [];
    for (var x = 0; x < infoTemp.length; x++) {

        var toAdd = 0;
        for (var f = 0; f < titleTemp.length; f++) {
            if (infoTemp[x].collage === titleTemp[f]) {
                toAdd++;
            }
        }

        if (toAdd === 0) {

            titleTemp.push(infoTemp[x].collage);
            for (var k = 0; k < tableTemp.length; k++) {
                if (tableTemp[k].collage === infoTemp[x].collage) {
                    tableTempOrder.push(tableTemp[k]);
                }
            }
        }


    }


    /** END ORDER */
    return tableTempOrder;
};



export function getTableInfo(infoData) {
    var tableTemp = [];
    for (var key in infoData) {
        if (infoData[key].active === true) {
            tableTemp.push(
                {
                    "active": infoData[key].active,
                    "date_cretated": infoData[key].date_cretated,
                    "electoralcollege": {
                        "active": infoData[key].electoralcollege.active,
                        "address": infoData[key].electoralcollege.address,
                        "date_cretated": infoData[key].electoralcollege.date_cretated,
                        "id": infoData[key].electoralcollege.id,
                        "name": infoData[key].electoralcollege.name,
                        "pic": infoData[key].electoralcollege.pic,
                        "video": infoData[key].electoralcollege.video
                    },
                    "name": infoData[key].name,
                    "id": key
                }
            );
        }
    }
    return tableTemp;
};



export function savePerson(personParam) {

    fetch('https://political-campaign.firebaseio.com/votes.json', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                active: true,
                citizen: {
                    active: personParam.citizen.active,
                    age: personParam.citizen.age,
                    email: personParam.citizen.email,
                    identification: personParam.citizen.identification,
                    name: personParam.citizen.name,
                    phone: personParam.citizen.phone,
                    type: personParam.citizen.type
                },
                date_cretated: personParam.date_cretated,
                electoraltable: {
                    active: personParam.electoraltable.active,
                    date_cretated: personParam.electoraltable.date_created,
                    electoralcollege: {
                        active: personParam.electoraltable.electoralcollege.active,
                        address: personParam.electoraltable.electoralcollege.address,
                        date_cretated: personParam.electoraltable.electoralcollege.date_cretated,
                        id: personParam.electoraltable.electoralcollege.id,
                        name: personParam.electoraltable.electoralcollege.name,
                        pic: personParam.electoraltable.electoralcollege.pic,
                        video: personParam.electoraltable.electoralcollege.video
                    },
                    id: personParam.electoraltable.id,
                    name: personParam.electoraltable.name
                }
            }
        )
    }).then(res => res.json)
        .then(res => res.json);
};

export function getUsersInfo(infoData) {
    var tableTemp = [];
    for (var key in infoData) {
        if (infoData[key].active === true) {
            tableTemp.push(
                {
                    "active": infoData[key].active,
                    "type": infoData[key].admin,
                    "username": infoData[key].username,
                    "name": infoData[key].name,
                    "password": infoData[key].password,
                    "id": key
                }
            );
        }
    }
    return tableTemp;
};


export default function ApiServices() { };
