import * as api from "@/firebase/init"


export default {
    actions: {
        async takeRooms(ct) {
            const res = await new Promise((resolve) => {
                let result
                api.database.ref(`/rooms/`).on("value", function(snapshot) {
                    result = snapshot && snapshot.val() ? Object.keys(snapshot.val()).map(key => ({...snapshot.val()[key], id: key })) : []
                    resolve(result)
                })
                ct.commit('SetRooms', result)
            })
            return res
        },
        async takeRoomData({ commit }, payload) {
            return await new Promise((resolve) => {
                api.database.ref("/rooms/" + payload).on("value", function(snapshot) {

                    let result = snapshot.val()
                    result.id = payload
                    let inc = result && result.incoming ? result.incoming : []
                    resolve({
                        data: result,
                        incoming: Object.keys(inc)
                    })
                })
            })
        },
        async takeRoomIncomming11(ct, payload) {
            await ct.commit('SetRoomIncomming', [])
            let result = []
            api.database.ref(`/rooms/` + payload).on("value", function(snapshot) {
                result = snapshot && snapshot.val() ? snapshot.val() : []
                ct.commit('SetRoomIncomming', [result.incoming])
                ct.commit('SetRoom', [result])
            })
        },
        async takeRoom({ commit }, payload) {
            var res = api.database.ref("/rooms/" + payload).on("value", function(snapshot) {
                let result = snapshot.val()
                result.id = payload
                let inc = result && result.incoming ? result.incoming : []
            })
            return res
        },
        async takeRoomIncomming3({ commit }, payload) {
            return await new Promise((resolve) => {
                api.database.ref("/rooms/" + payload + "/incoming/").on("value", function(snapshot) {
                    let result = snapshot.val()
                    let inc = result && result.incoming ? result.incoming : []
                    resolve({
                        incoming: Object.keys(inc)
                    })
                })
            })
        },
        async takeUserIncomming({ commit }, inc) {
            var result = []
            await api.database.ref("/users/" + inc).on("value", (snapshot) => {
                snapshot && snapshot.val() ? result = snapshot.val() : []
            })
            return result
        },
        takeRoomIncomming2({ dispatch }, payload) {
            var result = []
            api.database.ref("/rooms/" + payload + "/incoming/").on("child_added", function(snapshot) {
                snapshot && snapshot.key ? result = snapshot.key : []
                result = dispatch('takeUserIncomming', result)
            })
            return result
        },

        // function se(ee) {
        //     let res = []
        //     api.database.ref("/users/" + ee).on("value", (snapshot) => {
        //         res = snapshot.val()

        //     })
        //     return res
        // }
        async takeRoomIncomming({ commit }, payload) {
            var result = new Array
            await api.database.ref("/rooms/" + payload + "/incoming/").on("value", function(snapshot) {
                let res = snapshot && snapshot.val() ? snapshot.val() : []
                result = Object.keys(res)
            })
            commit('SetRoomIncomming', result)
        },
        // 

        //return commentsRef

        // 
        // return commentsRef.on('value', function(data) {
        //     var dis = dispatch('takeUserIncomming', data.key)
        //         //console.log(dis)
        //     return dis
        // })
        async pushLocation({ commit }, roomId) {
            var user = await api.auth.currentUser
            var userId = user.uid ? user.uid : null
            var result = await api.database.ref("/users/" + userId).update({ location: roomId })
            return user.uid
        },
        async pushIncomming({ commit }, roomId) {
            var user = await api.auth.currentUser
            var userId = user.uid ? user.uid : null
            let upd = {}
            upd["/rooms/" + roomId + "/incoming/" + userId] = { timestamp: Date.now() }
            api.database.ref().update(upd)
        },
        async leaveLocation2({ commit }, roomId) {
            var user = await api.auth.currentUser
            var userId = user.uid ? user.uid : null
            api.database.ref("/rooms/" + roomId + "/incoming/" + userId).remove()
            return roomId
        },

        // arr.push(result.incoming)
        // commit('SetRoomIncomming', arr)
        //commit('SetRoomIncomming', result.incoming)
        // console.log(payload)
        // var result = []
        // api.database.ref("rooms").child(payload).on("value", function(snapshot) {
        //     var sn = snapshot.val()
        // })
        // commit('SetRoom', result)
        // return result
        // async takeRoomData({ commit }, payload) {
        //     return await new Promise((resolve) => {
        //         api.database.ref("rooms").child(payload).on("value", function(snapshot) {
        //             var sn = snapshot.val()
        //             sn.id = payload
        //             const resp = sn
        //             const respInc = resp.incoming ? Object.keys(resp.incoming) : []

        //             commit('SetRoom', resp)
        //             commit('SetRoomIncomming', respInc)
        //             resolve(resp)
        //         })
        //     })
        // },
        // async getRoomIncomming({ commit }, payload) {
        //     var result = []
        //     await api.database.ref(`/rooms/${payload}/incoming/`).on("value", function(snapshot) {
        //         snapshot && snapshot.val() ? result = Object.keys(snapshot.val()).map(key => ({...snapshot.val()[key], id: key })) : []
        //         commit('SetIncommingUsers', result)
        //         return result
        //     })
        // },
        // async getUsersData({ commit }, payload) {

        //     try {
        //         var resp = []
        //         for (let index = 0; index < payload.length; index++) {
        //             var userId = await payload[index]
        //             await api.database.ref(`/users/${userId}`).on("value", function(snapshot) {
        //                 setTimeout(function() {
        //                     resp.push(snapshot.val())
        //                 }, 1)
        //             })
        //         }
        //         return resp
        //     } catch (e) {
        //         console.log(e)
        //     }
        // },
        // let upd = {}
        // upd['/users/' + userId + '/location/'] = locationObj
        // let newKey = await api.database.ref().child('/users/' + user.uid + '/location/').push().user.uid
        // api.database.ref().update(upd)

        // let locationObj = {
        //     id: roomId,
        //     timestamp: Date.now()
        // }
        // await api.database.ref("/users/" + user.uid).set({ location: locationObj })


        async pushlocation12({ commit }, { roomId, routeName, userId, side = 0 }) {

            //const user = await api.auth.currentUser

            let locationObj = {
                routeName: routeName,
                id: roomId,
                side: side,
                timestamp: Date.now()
            }
            let upd = {}
            upd['/users/' + userId + '/location/'] = locationObj
            api.database.ref().child('/rooms/' + roomId + '/incoming/').push().userId
            api.database.ref().update(upd)


            if (routeName === 'RoomsPlace') {
                api.database.ref('/rooms/' + roomId + '/incoming/' + userId).remove()
                commit('SetRoom', [])
            } else {
                upd['/rooms/' + roomId + '/incoming/' + userId] = { timestamp: Date.now() }
                api.database.ref().update(upd)
            }
        },
        async leaveIncomming({ commit }, { roomId, side = 0 }) {
            const user = await api.auth.currentUser
            let routeName = {
                routeName: 'RoomPlace',
            }
            let upd = {}
            upd['/users/' + user.uid + '/location/'] = routeName
                //upd['/rooms/' + roomId + '/incoming/'] = user.uid

            const res = await new Promise((resolve) => {
                api.database.ref().update(upd)
                let resultR = api.database.ref('/rooms/' + roomId + '/incoming/' + user.uid).remove()
                resolve(resultR)
            })
        },
        async createRoom({ commit }, { roomTitle, lock, author, timestamp = Date.now() }) {
            try {
                return await api.database.ref(`/rooms/`).push({ roomTitle, lock, author, timestamp }).then(resp => { return resp })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        // async pushI2ncomming({ commit, dispatch }, { roomId, user }) {
        //     // api.updateRoom()
        //     user.timestamp = Date.now()
        //     try {
        //         const updateIncommingObj = {
        //             room: roomId,
        //             user
        //         }
        //         return new Promise((resolve) => {
        //             api.updateRoom(updateIncommingObj, resp => resolve(resp))
        //         })
        //     } catch (e) {
        //         commit('setError', e)
        //         throw e
        //     }
        // },
    },
    mutations: {
        SetRooms(state, rooms) {
            state.rooms = rooms
        },
        SetRoom(state, rm) {
            state.roomthis = rm
        },
        SetRoomIncomming(state, rmi) {
            state.roomincoming = rmi
        },

    },
    state: {
        rooms: [],
        roomthis: [],
        roomincoming: [],
    },
    getters: {
        GetRooms(state) {
            return state.rooms
        },
        GetRoom(state) {
            return state.roomthis
        },
        GetRoomIncomming(state) {
            return state.roomincoming
                // return await new Promise((resolve) => {
                //         const obj = getters.GetRoom && getters.GetRoom.incoming ? Object.entries(getters.GetRoom.incoming) : []
                //         var arr = []

            //         for (let [key, value] of obj) {
            //             //if (value.side !== 0) {
            //             arr.push(key)
            //                 //}
            //         }
            //         resolve(arr)
            //     })
            //let gr = getters.GetRoom && getters.GetRoom.incoming ? getters.GetRoom.incoming : []


            // return new Promise((resolve) => {
            //     let gr = state.roomthis && state.roomthis.incoming ? state.roomthis.incoming : []
            //     let gres = Object.keys(gr)
            //     let res = []
            //     for (let i of gres) {
            //         res.push(i)
            //     }
            //     console.log(res)
            //     resolve(res)
            // })


        }
    }
}