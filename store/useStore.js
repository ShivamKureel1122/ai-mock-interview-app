import { create } from "zustand";
import axios from "axios";

export const useStore = create((set) => ({
    interviewDetails: null,
    loading: false,

    getInterviewDetails: async (interviewId) => {
        try {
            set({ loading: true })

            const res = await axios.get('/api/interview', { 
                params: { interviewId },
            })
            set({ 
                interviewDetails: res?.data?.interview,
                loading: true
            }) 

            // console.log('Interview details fetched successfully.')
        } catch (error) {
            console.log('Error occurred: ', error.response?.data?.message)
        }
    },

}))