import { useMutation } from '@tanstack/react-query'
import instance from '../../../configs/axios'
// import { useToast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const useSignUp = () => {
    // const { toast } = useToast()
    const navigate = useNavigate()
    const { mutate } = useMutation({
        mutationFn: async (formData) => {
            const { data } = await instance.post(`auth/signup`, formData)
            return data
        },
        onSuccess: () => {
            alert("Đăng ký thành công")
            // toast({
            //     title: "Đăng ký thành công",
            //     variant: "success"
            // })
        },
    })
    const onSubmit = (formData: any) => {
        mutate(formData);
        navigate('/signin')
    }
    return { onSubmit }
}

export default useSignUp