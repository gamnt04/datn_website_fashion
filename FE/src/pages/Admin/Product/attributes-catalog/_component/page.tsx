/* eslint-disable @typescript-eslint/no-explicit-any */
import { SquarePen } from 'lucide-react'
import { useRef } from 'react'
import useFormAttributeCatalog from '../../../../../common/hooks/Attributes/useHookForm_Attribute';

export default function List_data_attribute_catalog({ dataProps }: any) {
    const btnEditNameVarriant = useRef<HTMLButtonElement>(null);
    const refKey = useRef<any>('')
    // edit value varriant 
    function handleEdit(e: string | number) {
        refKey.current = e;
        btnEditNameVarriant?.current?.classList?.add('block');
        btnEditNameVarriant?.current?.classList?.remove('hidden');
    }
    const { onSubmit, form_attributeCatalog } = useFormAttributeCatalog('UPDATE');

    const update_name_varriant = (value: any, id: string | number) => {
        const attributeValue = value[`attribute-${id}`];
        const data_request = {
            _id: id,
            attribute: attributeValue
        }
        onSubmit(data_request)
    }


    return (
        <div className='border rounded bg-[#F6F6F6]'>
            <div className='grid grid-cols-[50px_260px_auto_150px] gap-2 py-2 px-4 border-b *:text-sm'>
                <div></div>
                <span>Tên</span>
                <span>Loại</span>
                <span>Thao tác</span>
            </div>
            {/* {
                (dataProps?.loadingAttributeCatalog || isLoading) && <div className='w-screen h-screen grid place-items-center'>
                    <Loading_Dots />
                </div>
            } */}
            {
                dataProps?.arr_attributeCatalog?.map((item: any) => (
                    <div key={item?._id} className='grid grid-cols-[50px_260px_auto_150px] items-center gap-2 my-4 py-2 px-4 *:text-sm'>
                        <div style={{ backgroundColor: item?.symbol_attribute }} className='w-6 h-6 rounded'></div>
                        <form className='flex items-center gap-2' onSubmit={form_attributeCatalog?.handleSubmit((data: any) => update_name_varriant(data, item?._id))}>
                            <input type="text" defaultValue={item?.attribute}
                                {...form_attributeCatalog?.register(`attribute-${item?._id}`)}
                                className='outline-none border rounded text-sm px-2 py-1 my-2 w-[180px]'
                                onChange={() => handleEdit(item?.key)} />
                            <button className='' ref={btnEditNameVarriant}>
                                <SquarePen className='h-5 hover:scale-105 duration-200' />
                            </button>
                        </form>
                        <span>{item?.category_attribute}</span>
                        <div>
                            <button onClick={() => dataProps?.clearAttributeCatalog(item?._id)} className='text-rose-500 text-start'>Xóa</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
