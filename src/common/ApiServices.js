import firebase from '../common/firebase';



export function getAllCollageAndTables() {
    return firebase.database().ref('electoraltable/').orderByChild('electoralcollege');
};

export function getAllVotes() {
    return firebase.database().ref('votes/').orderByChild('electoraltable');
};

export function getCollageInfo(infoData) {
    var collageTemp = [];
    var tempNames = [];
    for (var key in infoData) {
        if (infoData[key].electoralcollege.active === true) {

            var canSave = true;
            for(let x=0;x<tempNames.length;x++){
                if(tempNames[x] === infoData[key].electoralcollege.name ){
                    canSave = false
                }
            }

            if(canSave){
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
    return collageTemp;
};



export function getVotesInfo(infoData) {
    var collageTemp = [];

    for (var key in infoData) {
        var toAdd = 0;
        
        for(var x=0;x<collageTemp.length;x++){
            if(infoData[key].active === true){
                if(collageTemp[x].collage === infoData[key].electoraltable.electoralcollege.name){
                    toAdd++;
                }
            }
        }

        if(toAdd === 0){
            collageTemp.push({
                "collage_id" : infoData[key].electoraltable.electoralcollege.id,
                "collage" : infoData[key].electoraltable.electoralcollege.name,
                "table_id" : infoData[key].electoraltable.id,
                "table" : infoData[key].electoraltable.name,
                "total": 0
            })
        }
    }


    for(var x=0;x<collageTemp.length;x++){
        
        for (var key in infoData) {
            if(infoData[key].active === true){
                if(infoData[key].electoraltable.electoralcollege.name === collageTemp[x].collage){
                    collageTemp[x].total = collageTemp[x].total + 1;
                }
            }
        }        

    }

    return collageTemp;
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
                        "id":key
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
                active : true,
                citizen : {
                    active : personParam.citizen.active,
                    age : personParam. citizen.age,
                    email : personParam.citizen.email,
                    identification : personParam.citizen.identification,
                    name : personParam.citizen.name,
                    phone : personParam.citizen.phone,
                    type :  personParam.citizen.type
                },
                date_cretated :  personParam.date_cretated,
                 electoraltable : {
                    active : personParam.electoraltable.active,
                    date_cretated : personParam.electoraltable.date_created,
                    electoralcollege : {
                        active : personParam.electoraltable.electoralcollege.active,
                        address : personParam.electoraltable.electoralcollege.address,
                        date_cretated : personParam.electoraltable.electoralcollege.date_cretated,
                        id : personParam.electoraltable.electoralcollege.id,
                        name : personParam.electoraltable.electoralcollege.name,
                        pic : personParam.electoraltable.electoralcollege.pic,
                        video : personParam.electoraltable.electoralcollege.video
                    },
                    id : personParam.electoraltable.id,
                    name : personParam.electoraltable.name
                }
            }
        )
    }).then(res => res.json)
        .then(res => res.json);
};








export function saveContact(contactParam) {

    fetch('https://repollonet-74f4c.firebaseio.com/contact.json', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                content: contactParam.content,
                date_created: contactParam.date_created,
                email: contactParam.email,
                fullname: contactParam.fullname,
                title: contactParam.title
            }
        )
    }).then(res => res.json)
        .then(res => res.json);
};


export function saveSubscribe(subscribeParam) {

    fetch('https://repollonet-74f4c.firebaseio.com/subcribe.json', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                date_created: subscribeParam.date_created,
                email: subscribeParam.email
            }
        )
    }).then(res => res.json)
        .then(res => res.json);
};


export function aboutInfo() {

    return fetch('https://repollonet-74f4c.firebaseio.com/aboutus.json', {
        method: 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(results => { return results.json() })
        .then(data => {
            var aboutData = {};
            for (var key in data) {
                aboutData = {
                    "content": data[key].content,
                    "content_es": data[key].content_es,
                    "pic": data[key].pic,
                    "title": data[key].title,
                    "title_es": data[key].title_es
                }
            }
            return aboutData;
        });
};

export function writersInfo() {

    return fetch('https://repollonet-74f4c.firebaseio.com/user.json', {
        method: 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(results => { return results.json() })
        .then(data => {
            var writersData = [];
            for (var key in data) {
                writersData.push(
                    {
                        "description": data[key].description,
                        "description_es": data[key].description_es,
                        "title": data[key].title,
                        "title_es": data[key].title_es,
                        "email": data[key].email,
                        "fullname": data[key].firstname + ' ' + data[key].lastname,
                        "phones": data[key].phones,
                        "pic": data[key].pic,
                    }
                );
            }
            return writersData;
        });
};

export function getPostByType(type_param) {
    return firebase.database().ref('info/').orderByChild('type').equalTo(type_param);
};


export function getPostAllPost() {
    return firebase.database().ref('info/').orderByChild('type');
};

export function getPostById(id) {
    return firebase.database().ref('info/').child(id);
};

export function countActiveInfo(infoData) {
    var count = 0;
    for (var key in infoData) {
        if (infoData[key].active === true) {
            count++;
        }
    }
    return count;
};

export function getLastInfo(infoData) {
    var lastInfoData = {};
    for (var key in infoData) {
        if (infoData[key].active === true) {
            lastInfoData = {
                "id": key,
                "content": infoData[key].content,
                "content_es": infoData[key].content_es,
                "date_cretated": infoData[key].date_created,
                "date_lastviewed": infoData[key].data_lastviewed,
                "ingredients": infoData[key].ingredients,
                "liked": infoData[key].liked,
                "pic": infoData[key].pic,
                "title": infoData[key].title,
                "title_es": infoData[key].title_es,
                "type": infoData[key].type,
                "user": infoData[key].user,
                "viewed": infoData[key].viewed,
                "video": infoData[key].video,
                "subtype": infoData[key].subtype
            };
        }
    }
    return lastInfoData;
};

export function getLastsInfo(infoData, quantity) {
    var lastInfoData = [];
    var cont = 0;
    for (var key in infoData) {
        if (infoData[key].active === true) {
            if (cont < quantity) {
                lastInfoData.push(
                    {
                        "id": key,
                        "content": infoData[key].content,
                        "content_es": infoData[key].content_es,
                        "date_cretated": infoData[key].date_created,
                        "date_lastviewed": infoData[key].data_lastviewed,
                        "ingredients": infoData[key].ingredients,
                        "liked": infoData[key].liked,
                        "pic": infoData[key].pic,
                        "title": infoData[key].title,
                        "title_es": infoData[key].title_es,
                        "type": infoData[key].type,
                        "user": infoData[key].user,
                        "viewed": infoData[key].viewed,
                        "video": infoData[key].video,
                        "subtype": infoData[key].subtype
                    }
                );
                cont++;
            }
        }
    }
    return lastInfoData;
};

export function getPostInfo(infoData, type) {
    var lastInfoData = [];
    for (var key in infoData) {
        if (infoData[key].active === true) {
            if (type === 'all') {
                lastInfoData.push(
                    {
                        "id": key,
                        "content": infoData[key].content,
                        "content_es": infoData[key].content_es,
                        "date_cretated": infoData[key].date_created,
                        "date_lastviewed": infoData[key].data_lastviewed,
                        "ingredients": infoData[key].ingredients,
                        "liked": infoData[key].liked,
                        "pic": infoData[key].pic,
                        "title": infoData[key].title,
                        "title_es": infoData[key].title_es,
                        "type": infoData[key].type,
                        "user": infoData[key].user,
                        "viewed": infoData[key].viewed,
                        "video": infoData[key].video,
                        "subtype": infoData[key].subtype
                    }
                );
            } else {
                if (infoData[key].type === type) {
                    lastInfoData.push(
                        {
                            "id": key,
                            "content": infoData[key].content,
                            "content_es": infoData[key].content_es,
                            "date_cretated": infoData[key].date_created,
                            "date_lastviewed": infoData[key].data_lastviewed,
                            "ingredients": infoData[key].ingredients,
                            "liked": infoData[key].liked,
                            "pic": infoData[key].pic,
                            "title": infoData[key].title,
                            "title_es": infoData[key].title_es,
                            "type": infoData[key].type,
                            "user": infoData[key].user,
                            "viewed": infoData[key].viewed,
                            "video": infoData[key].video,
                            "subtype": infoData[key].subtype
                        }
                    );
                }
            }
        }
    }
    return lastInfoData;
};

export default function ApiServices() { };
