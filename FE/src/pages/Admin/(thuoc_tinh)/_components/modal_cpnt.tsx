/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Modal_cpnt({ props }: any) {
    const handleOk = () => {
        props?.setIsModalOpen(false);
    };

    const handleCancel = () => {
        props?.setIsModalOpen(false);
    };
    return (
        <div className={`${props?.isModalOpen ? 'translate-y-0' : 'translate-y-[-200%]'} fixed top-0 left-0 h-screen z-[100]`}>
            <div className={`bg-[#33333333] w-screen h-screen fixed top-0 left-0 z-[100]`} onClick={handleCancel}>
            </div>
            <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 py-5 px-4 rounded bg-white z-[110]">
                ${props?.name_attribute}
            </div>
        </div>
    )
}
