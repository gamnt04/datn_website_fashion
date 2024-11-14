/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';


const useStore = create<any>((set: any) => ({
    img: '',
    setImg: () => set((newImg: string) => ({
        img: newImg
    }))
}))

export default useStore