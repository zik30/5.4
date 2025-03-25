import { create } from "zustand";


export const useUsersStore = create( (set) =>({
    users: [],
    setUsers: (users) => set((state)=>({
        users: users
    }))
}))