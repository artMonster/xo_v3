import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp({
    apiKey: "AIzaSyD4nwr6lTBHfyTZX8J1qS-Hv0OO2T2fkIg",
    authDomain: "xoapp-f73a1.firebaseapp.com",
    databaseURL: "https://xoapp-f73a1.firebaseio.com",
    projectId: "xoapp-f73a1",
    storageBucket: "xoapp-f73a1.appspot.com",
    messagingSenderId: "74588182061",
    appId: "1:74588182061:web:81cf9578944bb7702ecaa4",
    measurementId: "G-Y9Z3H084NB"
})

export const db = firebase.firestore()
export const auth = firebase.auth()
export const database = firebase.database()


export function getAllRooms(cont) {
    database.ref(`/rooms/`).on("value", function(snapshot) {
        const result = Object.keys(snapshot.val()).map(key => ({...snapshot.val()[key], id: key }))
        cont(result)
    })
}

export function getIncomming(payload, commit) {
    database.ref(`/rooms/${payload}/incoming/`).on("value", function(snapshot) {
        console.log(snapshot.val())
        console.log(payload)
        const result = Object.keys(snapshot.val()).map(key => ({...snapshot.val()[key], id: key }))
        commit(result ? result : '[]')
    })
}

export function getUser(userId, cont) {
    database.ref(`/users/${userId}`).on("value", function(snapshot) {
        cont(snapshot.val())
    })
}

export function getUsers(cont) {
    var result = []
    database.ref(`/users/`).on("value", function(snapshot) {
        result = Object.keys(snapshot.val()).map(key => ({...snapshot.val()[key], id: key }))
        cont(result)
    })
}

export function updateUser(upd, cont) {
    var s = []
    s[upd.obj.key] = upd.obj.val
    database.ref().child(`/users/${upd.ref}/`).update({...s }).then(result => {
        cont(upd.obj.val)
    })
}

export function updateGame(upd, cont) {
    var s = []
    s[upd.obj.key] = upd.obj.val
    database.ref().child(`/rooms/${upd.ref}/`).update({...s }).then(result => {
        cont(result)
    })
}

export function _addGame(g, cont) {
    const gObj = {
        steps: [],
        stride: 'o',
        o: {
            id: g.id,
            score: 0,
        },
        x: {
            id: '',
            score: 0,
        },
        timestamp: Date.now()
    }

    const result = database.ref(`/rooms/${g.room}/games/`).push(gObj)

    setTimeout(function() {
        cont({
            data: {
                id: result.key,
                stride: gObj.stride,
                o: gObj.o,
                x: gObj.x,
                timestamp: gObj.timestamp,
            },
            steps: gObj.steps
        })
    }, 10)
}

export function addRoom(roomObj, cont) {
    const result = database.ref(`/rooms/`).push(roomObj)
    setTimeout(function() {
        cont(result)
    }, 10)
}
export function addGame(obj, cont) {
    var newGameKey = database.ref().child('games').push().key
    var upd = {}
    upd['/games/' + newGameKey] = obj.game
    upd['/rooms/' + obj.roomId + '/games/'] = newGameKey
    const result = database.ref().update(upd);
    setTimeout(function() {
        cont(result)
    }, 10)
}
export function updateRoom(obj, cont) {
    let upd = {}
    upd['/users/' + obj.user.id + '/roomId/'] = obj.room
    upd['/rooms/' + obj.room + '/incoming/' + obj.user.id] = obj.user
    database.ref().update(upd).then(resp => {
        cont(resp)
    })

}

export function getGame(cont) {
    var result = []
    database.ref(`/rooms/`).on("value", function(snapshot) {
        result = Object.keys(snapshot.val()).map(key => ({...snapshot.val()[key], id: key }))
        cont(result)
    })
}


export function addUser(roomObj, cont) {
    const result = database.ref('/users/' + roomObj.id).set(roomObj)
    setTimeout(function() {
        cont(result)
    }, 10)
}