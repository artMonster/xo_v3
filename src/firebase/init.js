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
    var result = []
    database.ref(`/rooms/`).on("value", function(snapshot) {
        result = Object.keys(snapshot.val()).map(key => ({...snapshot.val()[key], id: key }))
        cont(result)
    })
}

export function getRoom(rId, cont) {
    console.log(rId)
    database.ref(`/rooms/${rId}`).on("value", function(snapshot) {
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

export function getGameData(gd, cont) {
    console.log(gd)
    var result = []
        //database.ref("rooms/" + gd + "/games").on("value", function(snapshot) {
        //result = Object.keys(snapshot.val()).map(key => ({...snapshot.val()[key], id: key }))
        //
        //cont(result)
        //  })
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

export function addGame(g, cont) {
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

    console.log(gObj)
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

export function addRoom(room, cont) {
    const roomObj = {
        title: room.title,
        lock: room.lock,
        author: room.authorUid,
        id: room.id,
        timestamp: Date.now()
    }
    const result = database.ref(`/users/`).push(roomObj)

    setTimeout(function() {
        cont(result)
    }, 10)
}